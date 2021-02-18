
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Index.vue'),
        children: [
          { path: '', component: () => import('components/WelcomePart.vue') },
          { path: ':type/:id', component: () => import('components/Viewer.vue'), name: 'view' },
        ]
      },
      { path: ':type/:id/edit', component: () => import('pages/Editor.vue'), name: 'edit' },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'install', component: () => import('pages/Install.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    redirect: '/'
  }
]

export default routes
