<template>
    <div>    
        <h2>Dashboard</h2>
        <Nav />
        <p>OName: {{ user.username }}</p>    
    </div>
</template>
<script>
    import axios from "axios"    
    import router from "../router"    
    import Nav from '@/components/Nav.vue'
    export default {    
      name: "Dashboard",    
      components: {
        Nav
      },
      data() {    
        return {    
          user: {    
            name: "仮置き"    
          }    
        }    
      },    
      methods: {    
        getUserData: function() {        
          axios.get("/api/user")    
          .then((response) => {    
              console.log(response)
              if(response != ''){
                this.$set(this, "user", response.data.user)
              } else {
                router.push("/")   
              }
          })    
          .catch((errors) => {    
              console.log(errors)    
              router.push("/")    
          })    
        },
      },
      mounted() {
        this.getUserData()
      }
    }
</script>