/* eslint-disable */
const fs = require('fs');
const path = require('path');

class JSScanner {
  constructor(opts) {
    this.opts = opts;
    this._files = [];
    this._globs = [];
    this._normalizedSources = [];

    if (opts && opts.sources) {
      this._normalizedSources = opts.sources.map(s => ({ base: s.base, pattern: s.pattern }));
      this._globs = opts.sources.map(s => ({ base: s.base, pattern: '*' }));
    }
  }

  get files() {
    return this._files;
  }

  get globs() {
    return this._globs;
  }

  get normalizedSources() {
    return this._normalizedSources;
  }

  _traverse(dir, fileList) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || 
            entry.name === '.next' || 
            entry.name === '.git' || 
            entry.name === 'dist' ||
            entry.name === 'out') {
          continue;
        }
        this._traverse(fullPath, fileList);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (ext === '.tsx' || ext === '.ts' || ext === '.jsx' || ext === '.js' || 
            ext === '.html' || ext === '.css' || ext === '.md' || ext === '.mdx') {
          fileList.push(fullPath);
        }
      }
    }
  }

  scan() {
    const fileList = [];
    const cwd = process.cwd();
    this._traverse(cwd, fileList);
    this._files = fileList;

    const candidateSet = new Set();
    const regex = /[^<>"'`\s]+/g;

    for (const file of fileList) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        let match;
        while ((match = regex.exec(content)) !== null) {
          const token = match[0];
          if (token.length > 1) {
            candidateSet.add(token);
          }
        }
      } catch (e) {}
    }

    return Array.from(candidateSet);
  }
}

const scanner = new JSScanner();
const candidates = scanner.scan();
console.log('Total files scanned:', scanner.files.length);
console.log('Total candidates found:', candidates.length);
console.log('Sample candidates (first 50):', candidates.slice(0, 50));
