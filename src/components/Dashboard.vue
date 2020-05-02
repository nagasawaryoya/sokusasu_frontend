<template>
    <div>    
      <Nav />
      <Invite :invite-details="inviteDetails" />
    </div>
</template>
<script>
    import axios from "axios"
    import router from "../router"
    import Invite from '@/components/Invite.vue'
    import Nav from '@/components/Nav.vue'
    import store from '../store'
    export default {    
      name: "Dashboard",    
      components: {
        Invite,
        Nav
      },
      data() {    
        return {    
          user: {    
            id: 0,
            twitter_id: 0,
            name: '非認証ユーザー',
            mail: '',
            password: '',
            provider: ''
          },
          inviteDetails: []
        }    
      },
      watch: {
        user: {
          handler: function (val) {
            var user_id = val.id
            this.getInviteList(user_id)

            // ユーザーの状態を保持
            // this.getUserData()
            // store.commit('getUserId', this.user)
          },
          deep: true
        }
      },
      methods: {
        // ログインしたユーザーの情報を取得
        getUserData() {
          axios.get("/api/user")
          .then((response) => {
            console.log(response)
            if(response != ''){
              this.$set(this, "user", response.data.user)
              this.user.id = response.data.user.id
              this.user.twitter_id = response.data.user.twitter_id
              this.user.name = response.data.user.name
              this.user.mail = response.data.user.mail
              this.user.password = response.data.user.password
              this.user.provider = response.data.user.provider
              // this.getUserId()
            } else {
              router.push("/")   
            }
          })    
          .catch((errors) => {    
              console.log(errors)    
              router.push("/")    
          })    
        },
        // ログインしたユーザーをstoreに保存
        getUserId() {
          store.commit('getUserId', this.user)
        },
        // 誘った + 誘われた情報取得
        getInviteList(user_id) {    
          axios.get("/api/inviteList?id="+user_id)    
          .then((response) => {    
            this.inviteDetails = response
            console.log(this.inviteDetails)
          })
          .catch((errors) => {
            console.log(errors)      
          })    
        },        
      },
      beforeMount() {
        this.getUserData()
      },
    }
</script>