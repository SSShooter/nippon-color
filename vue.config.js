var ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/nippon-color/' : '/',
  pwa: {
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production', // Disable during development
        pngquant: {
          quality: '95-100',
        },
      }),
    ],
  },
  chainWebpack: config => {
    config.resolve.symlinks(true)
    config.plugin('preload').tap(options => {
      options[0] = {
        rel: 'preload',
        as (entry) {
          if (/\.css$/.test(entry)) return 'style'
          if (/\.(woff||ttf)$/.test(entry)) return 'font'
          if (/\.png$/.test(entry)) return 'image'
          return 'script'
        },
        include: 'allAssets',
        fileBlacklist: [ /\.map$/, /hot-update\.js$/ ],
      }
      return options
    })
    return config
  },
}
