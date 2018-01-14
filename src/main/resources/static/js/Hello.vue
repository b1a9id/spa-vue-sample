<template>
	<p class="message">メッセージ:{{msg}}</p>
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
