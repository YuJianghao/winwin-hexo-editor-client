
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
            name: 'edit',
            component: () => import('components/HexoEditor/index.vue')
          },
          {
            path: 'view/:id',
            name: 'view',
            component: () => import('components/HexoViewer/index.vue')
          },
          {
            path: 'welcome',
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
        path: 'login',
        component: () => import('pages/Login.vue')
      }
    ]
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
