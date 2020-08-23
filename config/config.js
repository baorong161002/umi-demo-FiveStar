export default {
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/demo/list', component: '@/pages/user/List' },
        {
          exact: true,
          path: '/brand/confirm/test',
          component: '@/pages/test/test',
        },
        { exact: true, path: '/demo/count', component: '@/pages/count/index' },
        { exact: true, path: '/demo/form', component: '@/pages/user/UserForm' },
        {
          exact: true,
          path: '/brand/confirm',
          component: '@/pages/brand/index',
        },
        {
          exact: true,
          path: '/brand/attributr',
          component: '@/pages/commodityAttributr/index',
        },
        {
          exact: true,
          path: '/brand/industrial',
          component: '@/pages/commodityIndustrial/index',
        },
        {
          exact: true,
          path: '/brand/introduction',
          component: '@/pages/commodityIntroduction/index',
        },
        {
          exact: true,
          path: '/commodity/entry',
          component: '@/pages/commodityIntroduction/commodityEntry/index',
        },
      ],
    },
  ],
};
