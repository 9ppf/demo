<template>
	<div id="app"><router-view /></div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
ul,
li,
p,
body {
	margin: 0px;
	padding: 0px;
}
button,
input {
	border: none;
	outline: none;
}
input {
	background: #ffffff;
}
.header {
	width: 100%;
	height: 3rem;
	line-height: 3rem;
	color: #fff;
	background: linear-gradient(90deg, #27a6fa, #8e71f5);
	z-index: 1;
	display: flex;
	justify-content: space-around;
}
.header a {
	color: #ffffff;
	font-size: 1rem;
}
.header > .title {
	text-align: center;
	width: 87%;
}
</style>
