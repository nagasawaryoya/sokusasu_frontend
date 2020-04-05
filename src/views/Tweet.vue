<template>
  <div class="about">
    <h1>post</h1>
    <Nav />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'Tweet',
  components: {
    Nav
  }
}
</script>