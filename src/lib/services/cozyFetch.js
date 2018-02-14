const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const exceptions = require('./exceptions')

const {
  ForbiddenException,
  ServerErrorException,
  NotFoundException,
  MethodNotAllowedException,
  UnauthorizedStackException,
  BadRequestException
} = exceptions

let COZY_URL = process.env.COZY_URL
let COZY_CREDENTIALS = process.env.COZY_CREDENTIALS

// DEV ONLY
if (process.env.NODE_ENV !== 'production') {
  const devOptionsPath = path.join(__dirname, '../../../cozy_dev.json')
  if (fs.existsSync(devOptionsPath)) {
    const devOptions = require(devOptionsPath)
    COZY_URL = devOptions.COZY_URL
    COZY_CREDENTIALS = devOptions.COZY_CREDENTIALS
  }
}

const errorStatuses = {
  '400': BadRequestException,
  '401': UnauthorizedStackException,
  '403': ForbiddenException,
  '404': NotFoundException,
  '405': MethodNotAllowedException,
  '500': ServerErrorException
}

function cozyFetch(method, path, body, json = false, options = {}) {
  options = Object.assign({}, options, {
    headers: {
      Authorization: `Bearer ${COZY_CREDENTIALS}`
    },
    credentials: 'include',
    method
  })
  if (json && body && method !== 'GET' && method !== 'HEAD') {
    if (options.headers['Content-Type']) {
      options.body = body
    } else {
      options.headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(body)
    }
  }
  options = Object.assign({}, options)
  return fetch(`${COZY_URL}${path}`, options)
    .then(res => {
      if (typeof errorStatuses[res.status] === 'function') {
        throw new errorStatuses[res.status]()
      }

      if (!json) return res
      return res.json().then(data => {
        // if data querying
        if (data.rows && data.rows.length) {
          const docs = []

          for (const row of data.rows) {
            const doc = row.doc
            // if not couchDB indexes
            if (!doc._id.match(/_design\//)) docs.push(doc)
          }
          return docs
        } else {
          return data
        }
      })
    })
    .catch(err => {
      throw err
    })
}

module.exports = cozyFetch
