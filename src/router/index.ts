const routes = [
    {
        path: '/home',
        name: 'feed',
        icon: 'nc-icon nc-bank',
        component: () => import('../pages/feedView'),
        layout: '',
        subRoutes: []
    }
];
export default routes;
