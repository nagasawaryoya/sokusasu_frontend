<template>
  <div id="qr_code_read">
      <Nav />
      <div class="component">
          <p class="error">{{ error }}</p>
          <template v-if="view_status === false">
            <p>申請したい人のQRコードを読み込ませてください！</p>
            <qrcode-capture v-if="reader_status = 'capture'"  @decode="onDecode" @init="onInit"></qrcode-capture>
            <qrcode-stream v-else-if="reader_status = 'stream'" @decode="onDecode" @init="onInit"></qrcode-stream>
            <qrcode-drop-zone v-else-if="reader_status = 'zone'" @decode="onDecode" @init="onInit"></qrcode-drop-zone>
          </template>
          <template v-if="view_status === true">
            <div class="decode_result"><span class="follow_user_name">{{ follow_user_info.name }}</span> さん</div>
            <button class="failure_button ng-button" v-on:click="unFollow()">やっぱやめる</button>
            <button class="success_button ok-button" v-on:click="follow()">申請する</button>
          </template>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import Nav from '@/components/Nav.vue'
export default {
  name: 'QRcodeRead',
  components: {
    Nav,
    QrcodeCapture,
    QrcodeStream,
    QrcodeDropZone,
  },  
  data () {
    return {
      result: '',
      error: '',
      reader_status: 'image',
      follow_user_info: {},
      view_status: false,
      follower_user_id: 0,
      follower_user_name: ''
    }
  },
  methods: {
    // ページリロード
    reload() {
      this.$router.go({path: this.$router.currentRoute.path, force: true});
    },    
    // QRコード読み取り
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
    onDecode (result) {
      // result = 読み取ったQRコード内ですでにURL情報などを載せてるのでaxiosで使える
      axios.get(result)
      .then((response) => {
        if(response.data != '') {
          // 申請するユーザーのid
          this.follower_user_id = response.data.id
          // 申請するユーザーの名前
          this.follower_user_name = response.data.name          
          this.follow_user_info = response.data
          this.view_status = true
          console.log(response) 
        }else {
          alert('QRコードが間違ってるようです')
        }
      })    
      .catch((errors) => {
        alert('QRコードが間違ってるようです')
        console.log(errors)
        this.view_status = false
      })
    },
    // 友達申請
    follow() {
      // 自分のid
      let follow_user_id = this.$store.state.user.id
      // 申請先の友達のid
      this.follower_user_id
      axios.get('/api/follow?follow_user_id='+follow_user_id+'&follower_user_id='+this.follower_user_id)
      .then((response) => {
        if(response.data.existmessage) {
          alert('すでに'+this.follower_user_name+'さんには申請済です')
        }else {
          alert(this.follower_user_name+'さんに申請しました')
          console.log(response) 
        }
        this.reload()
      })    
      .catch((errors) => {
        alert('ごめんなさい...申請に失敗しちゃいました')
        console.log(errors)
      })
    },
    unFollow() {
      this.view_status = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#qr_code_read {
  width: 100%;
  height: 100%;
  font-weight: 200;
  font-size: 18px;
  p {
    text-align: center;
    padding-bottom: 10px;
  }
  .component {
    width: 100%;
    height: calc(100% - 60px);
    padding-top: 20px;
    padding: 60px 174px;
    box-sizing: border-box;
    input {
      margin: 10px 0;
      padding: 10px;
      display: block;
      margin: auto;
    }
    .decode_result {
      font-size: 16px;
      margin-bottom: 32px;
      .follow_user_name {
        font-size: 22px;
      }
      .failure_button {
        margin: 0 14px 0 18px;
      }
    }
  }
}
</style>