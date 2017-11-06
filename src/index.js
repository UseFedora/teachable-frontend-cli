#!/usr/bin/env node

const program = require('commander')

const createApp = require('./create-app')
const runTests = require('./run-tests')
const updateApp = require('./update-app')
const webpack = require('./webpack')

program
  .command('create [name]')
  .description('Create a new app.')
  .action(createApp)

program
  .command('update [name]')
  .description('Create a new app.')
  .action(updateApp)

program
  .command('test')
  .description('Run the tests in your app.')
  .action(runTests)

program
  .command('dev')
  .description('Run the webpack-dev-server.')
  .action(webpack.dev)

program.parse(process.argv)
