<template>
  <div class="signin_wrap">
    <h2>ログイン</h2>
    <form action="/api/login" method="post">
      <div>
          <label>メールアドレス：</label>
          <input type="text" name="username" v-model="mail"/>
      </div>
      <div>
          <label>パスワード：</label>
          <input type="password" name="password" v-model="password"/>
      </div>
      <!-- 通常ログイン -->
      <input class="submit" type="submit" value="ログイン"/>
    </form>
    <!-- twitterログイン -->
    <div class="twitter_auth_wrap">
      <a href="/api/auth/twitter" class="twitter_signIn"></a>
    </div>
    <p>アカウントをお持ちでない方は 
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
      mail: 'nagasawaryoya@gmail.com',
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
// div#nav {
//   display: none;
// }
.signin_wrap {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .twitter_auth_wrap {
    width: 30px;
    height: 30px;
    display: block;
    background-image: url("../assets/Twitter_Social_Icon_Rounded_Square_Color.svg");
    cursor: pointer;
    .twitter_signIn {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>