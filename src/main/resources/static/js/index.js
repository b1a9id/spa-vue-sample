import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let User = {
	template:
	'<div class="user">' +
	'<h2>ユーザーIDは {{ $route.params.userId }} です。</h2>' +
	'<router-link :to="\'/user/\' + $route.params.userId + \'/profile\'">ユーザーのプロフィールページを見る</router-link>' +
	'<router-link :to="\'/user/\' + $route.params.userId + \'/posts\'">ユーザーの投稿ページを見る</router-link>' +
	'<router-view></router-view>' +
	'</div>'
};

let UserProfile = {
	template:
	'<div class="user-profile">' +
	'<h3>こちらはユーザー {{ $route.params.userId }} のプロフィールページです。</h3>' +
	'</div>'
};

let UserPosts = {
	template:
	'<div class="user-posts">' +
	'<h3>こちらはユーザー {{ $route.params.userId }} の投稿ページです。</h3>' +
	'</div>'
};


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
			component: User,
			children: [
				{
					path: 'profile',
					component: UserProfile
				},
				{
					path: 'posts',
					component: UserPosts
				}
			]
		}
	]
});

const app = new Vue({
	router: router
}).$mount('#app');
