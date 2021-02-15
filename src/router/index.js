import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignUpPage from '../views/SignUpPage';
import AlbumsDetailPage from '../views/AlbumsDetailPage';
import AlbumsPage from '../views/AlbumsPage';
import {Auth} from 'aws-amplify';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/album/:id',
    name: 'AlbumDetailPage',
    component: AlbumsDetailPage,
    meta: {requireAuth: true}
  },
  {
    path: '/albums',
    name: 'AlbumsPage',
    component: AlbumsPage,
    meta: {requireAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async(to, from, next) => {
  const requireAuth = to.matched.some(record=>record.meta.requireAuth);
  const isAuthenticated = await Auth.currentUserInfo();
  if(requireAuth && !isAuthenticated){
    next('/')
}else{
    next()
}
});

export default router;
