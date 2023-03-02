module.exports = {
  publicPath: './',
  lintOnSave: false,
  runtimeCompiler: false,
  productionSourceMap: false,
  filenameHashing: true,
  devServer: {
    port: 9998,
    host: '0.0.0.0',
    https: false,
    open: true,
    proxy: {
      '/': {
        target: 'http://localhost:9999',
        ws: false,
        changeOrigin: true,
        xfwd: false
      }
    }
  },
  css: {
    extract: false,
    sourceMap: false
  }
}
