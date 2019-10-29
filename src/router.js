//Vue setup with router
import Vue from 'vue'
import Router from 'vue-router'

// Imported routes
import Home from './components/Home'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Products from './components/Products/Products';
import Account from './components/Auth/Account';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/products',
            name: 'products',
            component: Products
        },
        {
            path: '/account',
            name: 'account',
            component: Account
        }
    ]
})