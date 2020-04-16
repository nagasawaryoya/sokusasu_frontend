<template>
    <div>    
        <h2>Dashboard</h2>
        <Nav />
        <p>id: {{ this.$store.state.user.id }}</p>
        <p>OName: {{ user.name }}</p>    
    </div>
</template>
<script>
    import axios from "axios"    
    import router from "../router"    
    import Nav from '@/components/Nav.vue'
    import store from '../store'
    export default {    
      name: "Dashboard",    
      components: {
        Nav
      },
      data() {    
        return {    
          user: {    
            name: "仮置き"
          },
          // ユーザーid
          id: 0
        }    
      },
      methods: {
        getUserData: function() {    
          axios.get("/api/user")    
          .then((response) => {    
              console.log(response)
              if(response != ''){
                this.$set(this, "user", response.data.user)
                this.id = response.data.user.id
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
          store.commit('getUserId', this.id)
        },
      },
      mounted() {
        this.getUserData()
      }
    }
</script>