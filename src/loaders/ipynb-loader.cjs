module.exports = function (code) {
    const callback = this.async()
    // Note that `import()` caches, so this should be fast enough.
    import('./ipynb-loader.mjs').then((module) =>
      module.loader.call(this, code, callback)
    )
  }
  