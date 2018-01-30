<template>
	<section id="toDos">
		<h3 class="message">I want to behave!!!</h3>
		<div class="mdl-textfield mdl-js-textfield">
			<input class="mdl-textfield__input" type="text" id="todo" v-model="newTodo" @keyup.enter="addTodo">
			<label class="mdl-textfield__label" for="todo">ToDo...</label>
		</div>
		<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
			<i class="material-icons">add</i>
		</button>
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
	}

	export default {
		data: function () {
			return {
				toDos: todoStorage.fetch(),
				newTodo: ''
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
		name: "todo"
	}
</script>

<style scoped>
	.message {
		color: #42b983;
	}
</style>
