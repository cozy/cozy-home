#!/usr/bin/env node

import fs from 'fs-extra'
import { endsWith } from 'lodash'
import tar from 'tar'
import { manual as cozyPublishManual } from 'cozy-app-publish'
import { spawn } from 'child_process'

const BUILD_FOLDER = './build/'
const COZY_URL = 'downcloud.cozycloud.cc'
const MANIFEST_FILE = 'manifest.webapp'
const APP_NAME = require('../package.json').name
const ARCHIVE_FILENAME = `${APP_NAME}.tar.gz`
const REGISTRY_NAMESPACE = fs.readJsonSync(`./${MANIFEST_FILE}`)[
  'registry_namespace'
]

// Test si le répertoire de build existe
if (!fs.existsSync(BUILD_FOLDER)) {
  console.error(
    "↳ ❌  Le dossier build n'existe pas. Lancer la commande `yarn build` avant.\n"
  )
  process.exit(1)
}

const launchCmd = (cmd, params, options) => {
  return new Promise(async (resolve, reject) => {
    const result = { stdout: [], stderr: [] }
    const cmdOptions = { encoding: 'utf8', ...options }
    const process = await spawn(cmd, params, cmdOptions)
    process.stdout.on('data', data => result.stdout.push(data.toString()))
    process.stderr.on('data', data => result.stderr.push(data.toString()))
    process.on('close', code => {
      result.code = code
      if (code === 0) {
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
}

const deleteArchive = async () => {
  try {
    await fs.remove(BUILD_FOLDER + ARCHIVE_FILENAME)
  } catch (error) {
    console.error(`↳ ⚠️  Unable to delete the previous archive.`)
  }
}

const createManifest = async (generalManifest, manifestVersion) => {
  console.log(`↳ ℹ️  Writing manifest`)
  const manifest = { ...generalManifest, version: manifestVersion }

  // Modification du manifest
  const manifestPath = `./build/${MANIFEST_FILE}`
  try {
    await fs.writeJson(manifestPath, manifest, { spaces: 2 })
  } catch (error) {
    console.error(
      `↳ ❌ Unable to write manifest file ${manifestPath}. Error : ${
        error.message
      }`
    )
  }
}

const getManifestVersion = () => require('../package.json').version

const getCommitHash = async () => {
  const result = await launchCmd('git', ['rev-parse', 'HEAD'])
  return result.stdout[0].replace('\n', '')
}

const pushArchive = async (version, commit) => {
  console.log(`↳ ℹ️  Sending archive`)
  const folder = `www-upload/${APP_NAME}/${version}-${commit}/`
  return launchCmd(
    'rsync',
    [
      // to remove host validation question on CI
      '-e',
      'ssh -o StrictHostKeyChecking=no',
      '-a',
      ARCHIVE_FILENAME,
      `upload@${COZY_URL}:${folder}`
    ],
    { cwd: BUILD_FOLDER }
  )
}

const getRegistryVersion = async (manifestVersion, commitHash) => {
  try {
    // get tag on head commit
    const result = await launchCmd('git', ['tag', '-l', '--points-at', 'HEAD'])
    if (result.stdout.length !== 0) {
      const tags = result.stdout
        .join('')
        .split('\n')
        .filter(Boolean)

      const stableRegexp = new RegExp(/^(v?)(\d+\.\d+\.\d+)$/)
      const stableTag = tags.find(tag => tag.match(stableRegexp))
      const getStableVersion = tag => tag.match(stableRegexp)[2]
      if (stableTag) {
        return getStableVersion(stableTag)
      }

      const betaRegexp = new RegExp(/^(v?)(\d+\.\d+\.\d+-beta\.(\d{1,4}))$/)
      // $ "v1.0.0-beta.1".match(betaRegexp) = [ 'v1.0.0-beta.1', 'v', '1.0.0-beta.1', '1']
      // $ "1.0.0-beta.1".match(betaRegexp) = [ '1.0.0-beta.1', '', '1.0.0-beta.1', '1']
      const getLastNumber = tag => parseInt(tag.match(betaRegexp)[2], 10)
      const getBetaVersion = tag => tag.match(betaRegexp)[2]
      const betaTags = tags
        .filter(tag => tag.match(betaRegexp))
        .sort((a, b) => getLastNumber(a) < getLastNumber(b))

      if (betaTags.length > 0) {
        return getBetaVersion(betaTags[0])
      }
    }
    return `${manifestVersion}-dev.${commitHash}`
  } catch (e) {
    console.error(`↳ ❌  Erreur lors de la récupération du tag :\n`)
    console.error(' ', e.stderr ? e.stderr : e, '\n')
    process.exit(1)
  }
}

const publish = async (manifestVersion, commitHash, registryVersion) => {
  const appBuildUrl = `https://${COZY_URL}/upload/${APP_NAME}/${manifestVersion}-${commitHash}/${ARCHIVE_FILENAME}`
  const override = { confirm: 'y' }

  try {
    console.log('↳ ℹ️  Publishing to registry')
    await cozyPublishManual(
      {
        registryToken: process.env.REGISTRY_TOKEN,
        manualVersion: registryVersion,
        spaceName: REGISTRY_NAMESPACE,
        appBuildUrl
      },
      override,
      manualInterruptionError => {
        throw manualInterruptionError
      }
    )
  } catch (error) {
    const alreadyPublishedStatus = 409
    if (error.status === alreadyPublishedStatus) {
      console.log(
        `↳ ℹ️  Version ${registryVersion} have already been published.`
      )
    } else {
      console.error(`↳ ❌  Error while publishing : ${error}`)
      process.exit(1)
    }
  }
}

const createArchive = async () => {
  console.log(`↳ ℹ️  Creating archive ${ARCHIVE_FILENAME}`)
  const fileList = await fs.readdir(BUILD_FOLDER)
  const filteredFileList = fileList.filter(file => !endsWith(file, 'mesinfos'))
  const options = {
    gzip: true,
    cwd: BUILD_FOLDER,
    file: BUILD_FOLDER + ARCHIVE_FILENAME
  }
  try {
    await tar.c(options, filteredFileList)
  } catch (error) {
    console.error(
      `↳ ❌ Unable to generate app archive. Is tar installed as a devDependency ? Error : ${
        error.message
      }`
    )
    process.exit(1)
  }
}

const main = async () => {
  const manifest = await fs.readJson(`./${MANIFEST_FILE}`)
  const manifestVersion = getManifestVersion()
  const commitHash = await getCommitHash()
  const registryVersion = await getRegistryVersion(manifestVersion, commitHash)
  console.log('📦  Publishing ' + APP_NAME + ' v' + registryVersion)

  if (!process.env.REGISTRY_TOKEN) {
    console.error('↳ ❌  Environment variable REGISTRY_TOKEN must be set.')
    process.exit(1)
  }

  createManifest(manifest, manifestVersion)
  await deleteArchive()
  await createArchive()
  try {
    await pushArchive(manifestVersion, commitHash)
  } catch (e) {
    console.error(`↳ ❌  Error while uploading :\n`)
    console.error(' ', e.stderr, '\n')
    process.exit(1)
  }

  await publish(manifestVersion, commitHash, registryVersion)
}

main()
