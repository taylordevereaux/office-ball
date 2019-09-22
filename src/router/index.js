// Vue imports
import Vue from 'vue';
import Router from 'vue-router';

// 3rd party imports
import Auth from '@okta/okta-vue';

// our own imports
import Dashboard from '@/components/Dashboard';
import Login from '@/components/Login';

Vue.use(Auth, {
  issuer: 'https://dev-886606.okta.com',
  client_id: '0oa1ebrlwrpRSUaZm357',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
});

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
