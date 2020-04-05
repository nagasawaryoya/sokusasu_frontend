<template>
  <div id="component_wrap">
    <div class="talk_wrap">
      <!-- MyMessage start -->
      <!-- <pre> -->
      <div class="myMsg" v-for="(MyMessage, index) in MyMessages" :key="index">{{ MyMessage }}</div>
      <!-- </pre> -->
      <!-- MyMessage end-->
      <!-- friendsMessage start -->
      <div class="friendsMsg">{{ friendsMsg }}</div>
      <!-- friendsMessage end -->
    </div>
    <div class="messageInput_wrap">
      <div class="input_wrap">
        <textarea class="messageInput" ref="adjust_textarea" @keydown="adjustHeight" v-model="textareaVal"></textarea>
        <button class="msgSend" @click="subumitClick">送信</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: 'Talk',
  components: {

  },
  data(){
    return{
      textareaVal: '',
      MyMessages: [],
      // MyMessage: '',
      friendsMsg: '',
    }
  },
  methods: {
    adjustHeight(){
      const textarea = this.$refs.adjust_textarea
      const resetHeight = new Promise(function(resolve) {
        resolve(textarea.style.height = 'auto')
      });
      resetHeight.then(function(){
        // テキストエリアを広げる
        textarea.style.height = textarea.scrollHeight + 'px'
      });
    },
    subumitClick() {
      const sendedTextArea = this.$refs.adjust_textarea
      this.MyMessages.push(this.textareaVal)
      this.textareaVal = ''
      // テキストエリア初期化
      sendedTextArea.style.height = '30px'

      axios.get("/api/hoge",{
        params: {
          // 最後のメッセージ
          message: this.MyMessages.slice(-1)[0],
          room_id: 1
          // mese: this.MyMessage
        }
      })
      .then(res=>{
          console.log('成功')
          // this.MyMessages = res.data.message＜＝こいつが悪さしてるけど必要
          console.log(res)//string
      })
      .catch(err => {
        console.log(typeof err);
      });
    }
  }
}
</script>

<style lang="scss">
#component_wrap {
    width: 100%;
    height: 100%;
  .talk_wrap{
    width: 100%;
    height: 85%;

    .myMsgArea,
    .friendsMsgArea {
    width: 50%;
    height: 90%;
    }

    .myMsgArea {
      float: right;
    }

    .friendsMsgArea {
      float: left;
    }
    .myMsg {
      height: auto;
      max-width: 60%;
      width: max-content;
      word-break: break-all;
      text-align: left;
      border: solid 1px #deb887;
      background-color: #deb887;
      color: #444444;
      padding: 2px 5px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-left: auto;
      white-space: pre;
    }
    .friendsMsg {
      height: auto;
      max-width: 60%;
      width: max-content;
      word-break: break-all;
      text-align: left;
      border: solid 1px #b0c4de;
      background-color: #b0c4de;
      color: #444444;
      padding: 2px 5px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-right: auto;
    }
  }
  .messageInput_wrap {
    width: 100%;
    height: 30px;
    display: flex;
    .messageInput {
      width: 85%;
      height: 100%;
      word-break: break-all;
    }
    .input_wrap {
      width: 100%;
      .messageInput {
        border: solid 1px #444444;
        box-sizing: border-box;
      }
      .msgSend {
        height: 30px;
        width: 15%;
        border: solid 1px #4DA3EB;
        color: #fff;
        background-color: #4DA3EB;
        border-radius: 4px;
        box-sizing: border-box;
      }
    }
  }
}

</style>