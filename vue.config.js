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
}
