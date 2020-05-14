
module.exports = {
  router: {
    middleware: ['isLogget'],
    prefetchLinks: false,
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '',
    titleTemplate: '%s-SCP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/BaseSpinner/BaseSpinner.vue',
  /*
  ** Global CSS
  */
  css: [
    {
      src: '~/assets/styles/styles.scss',
      lang: 'scss',
    },
    {
      src: '~/assets/styles/reset.scss',
      lang: 'scss',
    },
  ],
  styleResources: {
    scss: '~/assets/styles/settings.scss',
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/firebase', mode: 'all' },
    { src: '~/plugins/VueBar', mode: 'client' },
    { src: '~/plugins/VueMediaQueries', mode: 'client' },
    { src: '~/plugins/closestPolyfill', mode: 'client' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: process.env.NODE_ENV === 'production',
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    postcss: {
      preset: {
        autoprefixer: {
          flexbox: true,
          grid: true,
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: '3000',
  },
};
