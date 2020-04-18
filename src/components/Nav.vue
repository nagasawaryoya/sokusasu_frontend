<template>
    <div id="nav">
      <!-- <router-link to="/home">Home</router-link> | -->
      <router-link to="/dashboard">一覧</router-link> |
      <router-link to="/talk">トーク</router-link>|
      <router-link to="/tweet">投稿</router-link> |
    </div>
</template>

<script>
export default {
  name: 'Nav',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
