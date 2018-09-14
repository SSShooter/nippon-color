var ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/nippon-color/' : '/',
  pwa: {
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    iconPaths: {
      favicon32: 'img/icons/fuji-mountain-32x32.png',
      favicon16: 'img/icons/fuji-mountain-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
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
          quality: '80',
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
