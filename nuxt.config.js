module.exports = {
  head: {
    title: 'Romain Avalle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#f3f2f1' },
      { name: 'msapplication-TileColor', content: '#f3f2f1' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: 'Interactive developer based in Paris.' },
      { hid: 'og:description', property: 'og:description', content: 'Interactive developer based in Paris.' },
      { hid: 'twitter:description', property: 'twitter:description', content: 'Interactive developer based in Paris.' },
      { hid: 'og:url', property: 'og:url', content: 'https://www.romainavalle.dev' },
      { hid: 'twitter:url', property: 'twitter:url', content: 'https://www.romainavalle.dev' },
      {
        hid: `og:title`,
        property: 'og:title',
        content: 'Romain Avalle'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Romain Avalle'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Romain Avalle'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: 'Romain Avalle'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.romainavalle.dev/images/share.jpg'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: 'https://www.romainavalle.dev/images/share.jpg'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://res.cloudinary.com' },
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
    ]
  },
  /*
  ** Customize the progress bar color©©
  */
  loading: { color: '#3B8070' },
  modules: [
    ['@nuxtjs/pwa',{ workbox: {cachingExtensions: '~plugins/workbox-range-request.js'}}],
    ['@nuxtjs/google-analytics', {
      id: 'UA-XXXXXXXXX-1'
    }],
    'nuxt-svg'
  ],
  plugins: [
    '~plugins/vuex-router-sync.js'/*,
    {
      src: '~/plugins/pixi',
      ssr: false
    }*/
  ],
  router: {
   /* extendRoutes (routes, resolve) {
      routes.push({
        name: 'error',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }*/
  },
  generate: {
    dir: '../www',
    routes: function () {

      var routes_array = []
      var projects = JSON.parse(require('fs').readFileSync(`./assets/datas/works.json`, 'utf-8'))
      projects.forEach((el)=>{
        routes_array.push('/work/'+el.slug)
      })
      return routes_array
    }
  },
  css: [
    {src: '~/assets/stylus/main.styl', lang: 'stylus'}
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    /*analyze: true,*/

   //publicPath: 'https://romainavalle.s3.us-east-2.amazonaws.com',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },

    extend(config, {isDev,isClient}) {

      [].concat(...config.module.rules.find(e => e.test.toString().match(/\.styl/)).oneOf.map(e => e.use.filter(e => e.loader == 'stylus-loader'))).forEach(stylus => {
          Object.assign(stylus.options, {
              import: [
                '~assets/stylus/vars/index.styl'
              ]
          })
      });
    }
  }
}

