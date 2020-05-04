<template>
    <div id="nav">
      <!-- <router-link to="/home">Home</router-link> | -->
      <div>
        <router-link to="/dashboard">一覧</router-link> |
        <router-link to="/talk">トーク</router-link>|
        <router-link to="/tweet">投稿</router-link> |
      </div>
      <div class="config_wrap" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave">
        <div class="config_text">設定</div>
        <Config v-if="mouseOverStatus" />
      </div>
      
    </div>
</template>

<script>
import Config from '@/components/Config.vue'
export default {
  name: 'Nav',
  components: {
    Config
  },  
  data () {
    return {
      mouseOverStatus: false
    }
  },
  methods: {
    mouseover() {
      this.mouseOverStatus = true
    },
    mouseleave() {
      this.mouseOverStatus = false
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#nav {
  height: 60px;
  line-height: 40px;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: solid 1px #757575;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;

  a {
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .config_wrap {
    color: #2c3e50;
    display: block;
    float: right;
    cursor: pointer;
    position: relative;
    top: -38px;
    .config_text {
      width: 120px;
      height: 50px;
      float: right;
    }
  }
}
</style>
