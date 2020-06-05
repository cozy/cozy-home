/* global cozy */

import CozyStackAdapter from './adapters/CozyStackAdapter'

export default class CozyClient {
  constructor(config) {
    const { cozyURL, ...options } = config
    this.options = options
    this.indexes = {}
    this.specialDirectories = {}
    cozy.client.init(config)
    this.stackAdapter = new CozyStackAdapter()
    this.stackAdapter.init(config)
  }

  async fetchCollection(name, doctype, options = {}, skip = 0) {
    if (options.selector) {
      const index = await this.getCollectionIndex(name, doctype, options)
      return this.stackAdapter.queryDocuments(doctype, index, {
        ...options,
        skip
      })
    }
    return this.stackAdapter.fetchDocuments(doctype)
  }

  fetchTriggers(name, worker) {
    return this.stackAdapter.fetchTriggers(worker)
  }

  fetchKonnectors() {
    return this.stackAdapter.fetchKonnectors()
  }

  updateDocument(doc) {
    return this.stackAdapter.updateDocument(doc)
  }

  async checkUniquenessOf(doctype, property, value) {
    const index = await this.getUniqueIndex(doctype, property)
    const existingDocs = await cozy.client.data.query(index, {
      selector: { [property]: value },
      fields: ['_id']
    })
    return existingDocs.length === 0
  }

  async getCollectionIndex(name, doctype, options) {
    if (!this.indexes[name]) {
      this.indexes[name] = await this.stackAdapter.createIndex(
        doctype,
        this.getIndexFields(options)
      )
    }
    return this.indexes[name]
  }

  async getUniqueIndex(doctype, property) {
    const name = `${doctype}/${property}`
    if (!this.indexes[name]) {
      this.indexes[name] = await this.stackAdapter.createIndex(doctype, [
        property
      ])
    }
    return this.indexes[name]
  }

  getIndexFields(options) {
    const { selector, sort } = options
    if (sort) {
      // We filter possible duplicated fields
      return [...Object.keys(selector), ...Object.keys(sort)].filter(
        (f, i, arr) => arr.indexOf(f) === i
      )
    }
    return Object.keys(selector)
  }
}
