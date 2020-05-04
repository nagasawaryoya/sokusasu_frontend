<template>
  <div id="qr_code">
      <Nav />
      <div class="component">
          <p class="share_title">保存して友達にQRコードをシェア！！</p>
          <vue-qrcode v-if="qr_string" :value="qr_string" :options="option" tag="img"></vue-qrcode>
          <span class="createQR" @click="create_QR">QRコードを更新</span>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import Nav from '@/components/Nav.vue'
export default {
  name: 'QRcode',
  components: {
    Nav,
    VueQrcode,
  },  
  data () {
    return {
      qr_string: "",
      option: {
        errorCorrectionLevel: "M",
        maskPattern: 0,
        margin: 10,
        scale: 2,
        width: 30,
        color: {
          dark: "#000000FF",
          light: "#FFFFFFFF"
        }
      }
    }
  },
  methods: {
    // QR初期表示
    show_QR() {
      let user_id = this.$store.state.user.id
      console.log(user_id)
      axios.get("/api/get_qr?user_id="+user_id)
      .then((response) => {
        if(response.data.qr_text != '') {
          this.qr_string = '/api/fiend_application?qr_text='+response.data.qr_text;
        }
      })   
      .catch((errors) => {    
        console.log(errors)
      })
    },
    // 自分のQRコード更新
    create_QR() {
      let user_id = this.$store.state.user.id
      console.log(user_id)
      axios.get("/api/create_qr?user_id="+user_id)
      .then((response) => {
        console.log(response)
        this.qr_string = '/api/fiend_application?qr_text='+response.data.qr_text;
      })    
      .catch((errors) => {    
        console.log(errors)
      })
    }
  },
  mounted() {
    this.show_QR()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#qr_code {
  width: 100%;
  height: 100%;
  font-weight: 200;
  font-size: 18px;
  .component {
    width: 100%;
    height: calc(100% - 60px);
    padding-top: 40px;
    padding: 60px 174px;
    box-sizing: border-box;
    .share_title,
    .createQR {
      text-align: center;
    }
    .createQR {
      display: flex;
      justify-content: center;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #42b983;
      }
    }
  }
}
</style>