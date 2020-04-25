<template>
    <div>    
      <!-- <p>OName: {{ user.name }}</p>  -->
      <Invite :invite-details="inviteDetails" />
    </div>
</template>
<script>
    import axios from "axios"
    import router from "../router"
    import Invite from '@/components/Invite.vue'
    import store from '../store'
    export default {    
      name: "Dashboard",    
      components: {
        Invite
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
                this.getUserId()
              } else {
                router.push("/")   
              }
          })    
          .catch((errors) => {    
              console.log(errors)    
              router.push("/")    
          })    
        },
        // ログインしたユーザーのidをstoreに保存
        getUserId() {
          store.commit('getUserId', this.user)
        },
        // 誘った + 誘われた情報取得
        getInviteList() {    
          axios.get("/api/inviteList?id="+this.$store.state.user.id)    
          .then((response) => {    
            this.inviteDetails = response
            console.log(this.inviteDetails)
          })
          .catch((errors) => {
            console.log(errors)      
          })    
        },        
      },
      created() {
        this.getUserData()
      },
      beforeMount() {
        this.getInviteList()
      },
    }
</script>