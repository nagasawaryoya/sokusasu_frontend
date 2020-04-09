<template>
  <div class="signup">
    <h2>アカウント登録</h2>
    <div>
      <label>お名前：</label>
      <input type="text" name="username" placeholder="お名前太郎" v-model="username"/>
    </div>
    <div>
      <label>パスワード：</label>
      <input type="password" name="password" placeholder="password" v-model="password"/>
    </div>
    <input class="submit" type="submit" value="登録"/>
    <p>
      アカウントをお持ちの方は
      <router-link to="/signin">ログイン</router-link>
      する
    </p>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
</style>