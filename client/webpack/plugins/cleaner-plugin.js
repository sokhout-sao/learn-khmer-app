'use strict';

const FileSystem = require('fs');
const exec = require('child_process').exec;

class CleanerPlugin {
  apply(compiler) {
    compiler.plugin('run', (compiler, done) => {
      exec('rm -rf dist');
    });
  }
};

module.exports = CleanerPlugin;
