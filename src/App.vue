<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

</script>

<style lang="scss">
body {
  margin: 0;
  height: 100vh;
  width: 100vw;
  font-size: 12px;
  font-family: "Hiragino Sans"; 
  font-weight: 100;
  color: #444444;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: none;
}
input {
  margin: 10px 0;
  padding: 10px;
}

#app {
  width: 100%;
  height: 100%;
  font-family: "Hiragino Sans"; 
  font-weight: 100;
  text-align: center;
  color: #444444;
  font-size: 12px;
  .submit {
    width: 90px;
    height: 30px;
    border: solid 1px;
    border-radius: 4px;
    font-size: 12px;
    border-color: #42b983;
    background-color: #42b983;
    color: #fff;
    padding: 0;
  }
}
</style>
