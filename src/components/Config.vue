<template>
  <div id="config">
      <ul class="config_item_wrap">
        <li><a href="#/qrcode">QRコード作成</a></li>
        <li><a href="#/qrcode-read">友達追加</a></li>
        <li><a href="#/friend-list">友達一覧</a></li>
        <li><a href="#/friend-candidate">友達かも</a></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Config',
  data () {
    return {
 
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#config {
  position: absolute;
  top: 50px;
  .config_item_wrap {
    border: solid 1px #757575;
    border-radius: 4px;
    text-align: left;
    li {
      line-height: 1;
      padding: 0 10px;
      margin: 0;
      font-size: 14px;
      box-sizing: border-box;
      a {
        width: 100%;
        height: 100%;
        &:hover {
          color: #42b983;
        }
      }
    }
  }
}
</style>