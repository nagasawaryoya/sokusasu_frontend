<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {    
    name: "App",    
    components: {
    },
  }
</script>

<style lang="scss">
// TODO 共通のcssはファイル分けるべき？
body {
  margin: 0;
  height: 100vh;
  width: 100vw;
  font-size: 12px;
  font-family: "Hiragino Sans"; 
  font-weight: 100;
  color: #757575;
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
  color: #757575;
  font-size: 12px;
  position: relative;
  .submit,
  .cancel {
    display: inline-block;
    width: 140px;
    height: 40px;
    line-height: 30px;
    border: solid 1px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    padding: 0;
    cursor: pointer;
  }
  .submit {
    border-color: #42b983;
    background-color: #42b983;
  }
  .cancel {
    border-color: #e45454;
    background-color: #e45454;
  }
  .ok-button,
  .ng-button {
    display: inline-block;
    width: 128px;
    height: 38px;
    line-height: 38px;
    border: solid 1px #424242;
    border-radius: 30px;
    font-size: 14px;
    color: #424242;
    font-weight: 400;
    padding: 0;
    cursor: pointer;
  }
  .ok-button:hover {
    border-color: #42b983;
    color: #42b983;
  }
  .ng-button:hover {
    border-color: #e45454;
    color: #e45454;
  }
  .box {
    width: 100%;
    height: 100%;
    padding: 60px 174px;
    box-sizing: border-box;
    .content_wrap {
      width: 100%;
      height: 100%;
      padding: 30px 0px;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
      border-radius: 8px;
      .content_block {
        display: block;
        font-size: 14px;
        font-weight: normal;
        padding: 0 72px 0 60px;
        
      }
      .content_head {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 72px 0 60px;
        box-sizing: border-box;
        .title {
          text-align: left;
          font-size: 28px;
          font-weight: 400;
          color: #424242;
          .title_bar {
            display: inline-block;
            width: 2px;
            height: 22px;
            background-color: #42b983;
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
