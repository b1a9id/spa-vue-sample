<template>
	<section id="toDos">
		<h3 class="message">I want to behave!!!</h3>
		<p><strong>{{ remaining }}</strong> {{ remaining | pluralize }} left</p>
		<div class="mdl-textfield mdl-js-textfield">
			<input class="mdl-textfield__input" type="text" id="todo" v-model="newTodo" @keyup.enter="addTodo">
			<label class="mdl-textfield__label" for="todo">ToDo...</label>
		</div>
		<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" @click="addTodo">
			<i class="material-icons">add</i>
		</button>
		<ul class="demo-list-control mdl-list todo-list">
			<li v-for="todo in filteredTodos" :key="todo.id" class="mdl-list__item" :class="{ completed: todo.completed }">
				<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
					<input type="checkbox" id="checkbox-1" class="mdl-checkbox__input" v-model="todo.completed" />
					<span class="mdl-checkbox__label">{{ todo.title }}</span>
				</label>
				<button class="mdl-button mdl-js-button mdl-button--icon  mdl-button--mini-fab" @click="removeTodo(todo)"><i class="material-icons">delete</i></button>
			</li>
		</ul>
	</section>
</template>

<script>
	const STORAGE_KEY = 'todos-ryosuke-2.0';
	const todoStorage = {
		fetch: function () {
			const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
			todos.forEach(function (todo, index) {
				todo.id = index;
			});
			todoStorage.uid = todos.length;
			return todos;
		},
		save: function (todos) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
	};

	const filters = {
		all: function (todos) {
			return todos;
		},
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			})
		}
	};

	export default {
		data: function () {
			return {
				toDos: todoStorage.fetch(),
				newTodo: '',
				visibility: 'all'
			}
		},
		filters: {
			pluralize: function (n) {
				return n === 1 ? 'item' : 'items';
			}
		},
		methods: {
			addTodo: function () {
				const value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				this.toDos.push({
					id: todoStorage.uid++,
					title: value,
					completed: false
				});
				this.newTodo = '';
			},
			removeTodo: function (todo) {
				console.log(todo);
				this.toDos.splice(this.toDos.indexOf(todo), 1);
			}
		},
		watch: {
			todos: {
				handler: function (todos) {
					todoStorage.save(todos);
				},
				deep: true
			}
		},
		computed: {
			filteredTodos: function () {
				return filters[this.visibility](this.toDos);
			},
			remaining: function () {
				return filters.active(this.toDos).length;
			}
		},
		name: "todo"
	}
</script>

<style scoped>
	.message {
		color: #42b983;
	}
	.demo-list-control {
		width: 300px;
	}

	.demo-list-radio {
		display: inline;
	}

	.todo-list li.completed span {
		color: #d9d9d9;
		text-decoration: line-through;
	}
</style>
