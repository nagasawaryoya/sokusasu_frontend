<template>
  <div class="signin_wrap">
    <h2>ログイン</h2>
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
      <input class="submit nomal_signIn" type="submit" value="ログイン"/>
    </form>
    <!-- twitterログイン -->
    <div class="twitter_auth_wrap">
      <a href="/api/auth/twitter" class="signIn twitter_signIn">twitter</a>
    </div>
    <p>アカウントを作っていない方は 
      <router-link to="/signup">こちら</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router"  

export default {
  name: 'Signin',
  data () {
    return {
      username: 'user@email.com',
      password: 'password',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    }
  },
  methods: {
    // 通常ログイン
    signIn() {
      axios.post("/api/login",{
        params: {
          username: this.username,
          password: this.password
        }
      })
      .then(res=>{
          console.log(res.data)//string
          
          router.push("/dashboard")
      })
      .catch(err=>{
        console.log('Cannot log in');
        console.log(err)
      });
    },
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
}
input {
  margin: 10px 0;
  padding: 10px;
}

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
  }
  .twitter_signIn {
    border-color: #28b7ef;
    background-color: #28b7ef;
    color: #fff;
  }
}
</style>