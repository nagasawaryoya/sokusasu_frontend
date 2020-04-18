<template>
  <div class="signup">
    <h2>アカウント登録</h2>
    <div>
      <label>お名前：</label>
      <input type="text" name="name" placeholder="お名前太郎" v-model="name"/>
    </div>
    <div>
      <label>メールアドレス：</label>
      <input type="text" name="mail" placeholder="◯◯◯@◯◯.◯◯" v-model="mail"/>
    </div>
    <div>
      <label>パスワード：</label>
      <input type="password" name="password" placeholder="password" v-model="password"/>
    </div>
    <input type="submit" class="submit" value="登録" v-on:click="registClick"/>
    <p>
      アカウントをお持ちの方は
      <router-link to="/signin">ログイン</router-link>
      する
    </p>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router" 
export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      mail: 'nagasawaryoya@gmail.com',
      password: 'password'
    }
  },
  methods: {
    registClick() {
      const name = this.name
      const mail = this.mail
      const password = this.password

      axios.post("/api/regist",{
        params: {
          // ユーザー情報
          name: name,
          mail: mail,
          password: password
        }
      })
      .then(res=>{
        console.log(res);
        router.push("/")
      })
      .catch(err => {
        console.log(err);
        router.push("/signup")
      });
    }
  }
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