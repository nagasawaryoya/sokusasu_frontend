<template>
  <div class="hello">
    <!-- Home画面の見た目作るところ-->
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Top',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
