<template>
	<h3 class="message">メッセージ:{{msg}}</h3>
</template>

<script>
	export default {
		data: function () {
			return {msg: 'HELLO!!!!!!!!'}
		},
		name: "hello"
	}
</script>

<style scoped>
	.message {
		color: #42b983;
	}
</style>
