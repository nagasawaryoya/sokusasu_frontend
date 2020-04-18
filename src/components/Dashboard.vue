<template>
    <div>    
      <!-- <p>OName: {{ user.name }}</p>  -->
      <Invite />
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
        }    
      },
      methods: {
        getUserData: function() {    
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
                // console.log(this.id)
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
        getUserId: function() {
          store.commit('getUserId', this.user)
        },
      },
      mounted() {
        this.getUserData()
      }
    }
</script>