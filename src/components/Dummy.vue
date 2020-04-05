<template>
  <p>リダイレクト中...</p>
</template>
<script>  
    import router from "../router"    
    export default {    
      name: "Dummy",      
      mounted() {
        router.push("/dashboard")
      }
    }
</script>