/* global cozy */
import DataAccessFacade from './DataAccessFacade'

const TRIGGERS_DOCTYPE = 'io.cozy.triggers'
const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

export default class CozyClient {
  constructor(config) {
    const { cozyURL, ...options } = config
    this.options = options
    this.indexes = {}
    this.specialDirectories = {}
    this.facade = new DataAccessFacade()
    if (cozyURL) {
      this.facade.setup(cozyURL, options)
    }
  }

  async fetchCollection(name, doctype, options = {}, skip = 0) {
    if (options.selector) {
      const index = await this.getCollectionIndex(name, doctype, options)
      return this.getAdapter(doctype).queryDocuments(doctype, index, {
        ...options,
        skip
      })
    }
    return this.getAdapter(doctype).fetchDocuments(doctype)
  }

  fetchTriggers(name, worker) {
    return this.getAdapter(TRIGGERS_DOCTYPE).fetchTriggers(worker)
  }

  fetchKonnectors() {
    return this.getAdapter(KONNECTORS_DOCTYPE).fetchKonnectors()
  }

  updateDocument(doc) {
    return this.getAdapter(doc._type).updateDocument(doc)
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
      this.indexes[name] = await this.getAdapter(doctype).createIndex(
        doctype,
        this.getIndexFields(options)
      )
    }
    return this.indexes[name]
  }

  async getUniqueIndex(doctype, property) {
    const name = `${doctype}/${property}`
    if (!this.indexes[name]) {
      this.indexes[name] = await this.getAdapter(doctype).createIndex(doctype, [
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
