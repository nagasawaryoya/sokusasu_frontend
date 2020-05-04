<template>
  <p>friendList</p>
</template>
<script>  
    import router from "../router"
    export default {    
      name: "FriendList",
      mounted() {
        router.push("/friend-list")
      }
    }
</script>