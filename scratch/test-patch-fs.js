/* eslint-disable */
const nodeFs = require('node:fs');
const fs = require('fs');

const patch = (module) => {
  const originalReaddirSync = module.readdirSync;
  module.readdirSync = function(path, ...args) {
    try {
      const result = originalReaddirSync.call(module, path, ...args);
      console.log(`[readdirSync] path: "${path}" -> Success (${result.length} items)`);
      return result;
    } catch (err) {
      console.log(`[readdirSync] path: "${path}" -> Error: ${err.message}`);
      throw err;
    }
  };

  const originalStatSync = module.statSync;
  module.statSync = function(path, ...args) {
    try {
      const result = originalStatSync.call(module, path, ...args);
      console.log(`[statSync] path: "${path}" -> Success (isDirectory: ${result.isDirectory()})`);
      return result;
    } catch (err) {
      console.log(`[statSync] path: "${path}" -> Error: ${err.message}`);
      throw err;
    }
  };

  const originalReadlinkSync = module.readlinkSync;
  module.readlinkSync = function(path, ...args) {
    try {
      const result = originalReadlinkSync.call(module, path, ...args);
      console.log(`[readlinkSync] path: "${path}" -> Success: "${result}"`);
      return result;
    } catch (err) {
      console.log(`[readlinkSync] path: "${path}" -> Error: ${err.message}`);
      throw err;
    }
  };
};

patch(nodeFs);
patch(fs);

const { Scanner } = require('@tailwindcss/oxide');

console.log('--- Testing Scanner with base: "/" ---');
try {
  const scanner = new Scanner({
    sources: [{
      base: '/',
      pattern: '**/*',
      negated: false
    }]
  });
  scanner.scan();
} catch (e) {
  console.error(e);
}
