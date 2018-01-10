import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/top',
			component: {
				template: '<p>TOPです。</p>'
			}
		},
		{
			path: '/users',
			component: {
				template: '<p>ユーザ一覧</p>'
			}
		},
		{
			path: '/user/:userId',
			name: 'user',
			component: {
				template: '<p>ユーザIDは、{{ $route.params.userId }}です。</p>'
			}
		}
	]
});

const app = new Vue({
	router: router
}).$mount('#app');
