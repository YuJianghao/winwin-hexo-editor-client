
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('pages/Hexo.vue'),
        children: [
          {
            path: 'edit/:id',
            name: 'edit_article',
            component: () => import('components/HexoEditor/index.vue')
          },
          {
            path: 'view/:id',
            name: 'view_article',
            component: () => import('components/HexoViewer/index.vue')
          },
          {
            path: 'welcome',
            name: 'welcome',
            component: () => import('components/HexoWelcome.vue')
          },
          {
            path: '',
            redirect: 'welcome'
          },
          {
            path: '*',
            redirect: 'welcome'
          }
        ]
      },
      {
        path: 'settings',
        name: 'settings',
        redirect: { name: 's_user' },
        component: () => import('pages/Settings.vue'),
        children: [
          {
            path: 'user',
            name: 's_user',
            component: () => import('components/Settings/User.vue')
          },
          {
            path: 'hexo',
            name: 's_hexo',
            component: () => import('components/Settings/Hexo.vue')
          },
          {
            path: 'security',
            name: 's_security',
            component: () => import('components/Settings/Security.vue')
          }
        ]
      },
      {
        path: 'login',
        component: () => import('pages/Login.vue')
      }
    ]
  },
  {
    path: '/apidoc',
    component: () => import('pages/Swagger.vue')
  },
  {
    path: '/install',
    component: () => import('pages/Install.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
