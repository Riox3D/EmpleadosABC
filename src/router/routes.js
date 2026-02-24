const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SolicitudesRH.vue') },
      { path: '/registro', component: () => import('pages/RegistroSolicitud.vue') },
      { path: '/seguimiento', component: () => import('pages/SeguimientoSolicitud.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
