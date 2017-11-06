const fs = require('fs-extra')
const exec = require('child_process').exec
const rimraf = require('rimraf')
const path = require('path')

const boilerplate = path.resolve(__dirname, '../boilerplate')

/**
 * The folder exists now, time to copy the boilerplate over.
 *
 * @param {String} dir The absolute path to the target directory.
 */
function copyBoilerplate(dir) {
  fs.copy(boilerplate, dir, (err) => {
    if (err) {
      // If something goes wrong, delete the newly created directory.
      rimraf(dir, () => {
        console.error(err)
      })

      return
    }

    console.log('Success')
  })
}

module.exports = (name) => {
  const currentDir = process.cwd()
  const targetDir = `${currentDir}/${name}`

  let isExistingDir = false

  if (fs.existsSync(targetDir)) {
    console.error('Directory already exists.', targetDir)
    return
  }

  fs.mkdir(targetDir, (err) => {
    if (err) {
      console.error(err)
      return
    }

    copyBoilerplate(targetDir)
  })
}
