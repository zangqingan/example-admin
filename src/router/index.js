import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            title: '系统首页'
          },
          component: () => import('@/views/Dashboard/Dashboard.vue')
        },
        {
          path: '/table',
          name: 'basetable',
          meta: {
            title: '表格'
          },
          component: () => import('@/views/BaseTable/BaseTable.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: () => import('@/views/Login.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | example-admin`
  const role = localStorage.getItem('local_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403')
  } else {
    next()
  }
})

export default router
