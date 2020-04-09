<template>
  <div class="signin_wrap">
    <h2>ログイン</h2>
    <!-- <input type="text" name="username" placeholder="Id" v-model="username">
    <input type="password" name='password' placeholder="Password" v-model="password">
    <button v-on:click="signIn" class="signIn nomal_signIn">ログイン</button> -->

    <form action="/api/login" method="post">
      <div>
          <label>お名前：</label>
          <input type="text" name="username" v-model="username"/>
      </div>
      <div>
          <label>パスワード：</label>
          <input type="password" name="password" v-model="password"/>
      </div>
      <!-- 通常ログイン -->
      <input class="signIn nomal_signIn" type="submit" value="ログイン"/>
    </form>
    <!-- twitterログイン -->
    <div class="twitter_auth_wrap">
      <a href="/api/auth/twitter" class="twitter_signIn"></a>
    </div>
    <p>アカウントを作っていない方は 
      <router-link to="/signup">こちら</router-link>
    </p>
  </div>
</template>

<script>
// import axios from "axios";
// import router from "../router" 

export default {
  name: 'Signin',
  data () {
    return {
      username: 'テストユーザー',
      password: 'password',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.signin_wrap {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .signIn {
    width: 90px;
    height: 30px;
    border: solid 1px;
    border-radius: 4px;
    font-size: 12px;
  }
  .nomal_signIn {
    border-color: #42b983;
    background-color: #42b983;
    color: #fff;
    padding: 0;
  }
  .twitter_auth_wrap {
    width: 30px;
    height: 30px;
    display: block;
    background-image: url("../assets/Twitter_Social_Icon_Rounded_Square_Color.svg");
    cursor: pointer;
    .twitter_signIn {
      width: 100%;
      height: 100%;
    }
  }
}
</style>