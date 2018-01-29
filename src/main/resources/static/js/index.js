import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMdl from 'vue-mdl';
import Hello from './Hello';

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

const getUsers = function (callback) {
	setTimeout(function () {
		callback(null, [
			{
				id: '001',
				name: 'Takuya Tejima'
			},
			{
				id: '002',
				name: 'Yohei Noda'
			}
		])
	}, 1000)
};

const UserList = {
	template: '#user-list',
	data: function () {
		return {
			loading: false,
			users: function () {
				return []
			},
			error: null
		}
	},
	created: function () {
		this.fetchData()
	},
	watch: {
		'$route': 'fetchData'
	},
	methods: {
		fetchData: function () {
			this.loading = true;
			getUsers((function (err, users) {
				this.loading = false;
				if (err) {
					this.error = err.toString();
				} else {
					this.users = users;
				}
			}).bind(this))
		}
	}
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
			component: UserList
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
		},
		{
			path: '/clients',
			redirect: '/client-list'
		},
		{
			path: '/client-list',
			component: {
				template: '<p>クライアント一覧だよ</p>'
			}
		},
		{
			path: '/not-found',
			component: {
				template: '<p>404</p>'
			}
		},
		{
			path: '*',
			redirect: '/not-found'
		},
		{
			path: '/a',
			component: {
				template: '<p>Aですよ</p>'
			},
			alias: '/b'
		},
		{
			path: '/c',
			component: {
				template: '<p>Cですよ</p>'
			},
			alias: ['/d', '/e']
		},
		{
			path: '/hello',
			component: Hello
		}
	]
});

const app = new Vue({
	router: router,
	components: {Hello}
}).$mount('#app');
