<template>
  <div class="signup">
    <h2>アカウント登録</h2>
    <input type="text" placeholder="username" v-model="username">
    <input type="password" placeholder="password" v-model="password">
    <button>登録</button>
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
input {
  margin: 10px 0;
  padding: 10px;
}
</style>