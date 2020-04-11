<template>
  <div id="component_wrap">
    <div class="talk_wrap">
      <!-- MyMessage start -->
      <template v-for="(message, index) in messages">
        <template v-if="message.name == 'テストユーザー'">
        <div class="myMsg" :key="index">{{ message.name }}: {{ message.message }}</div>
        </template>
        <!-- </pre> -->
        <!-- MyMessage end-->
        <!-- friendsMessage start -->
        <template v-else>
        <div class="friendsMsg" :key="index">{{ message.name }}: {{ message.message }}</div>
        </template>
      </template>
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
// import axios from "axios";
import io from 'socket.io-client';
export default {
  name: 'Talk',
  components: {

  },
  data(){
    return{
      socket : io('localhost:3000'),
      name: '',
      textareaVal: '',
      messages: [],
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
    subumitClick(e) {
      // メッセージの送信
      e.preventDefault();
      this.socket.emit('POST_MESSAGE', {
          name: 'テストユーザー',// ハードコーディング
          message: this.textareaVal
      })
      this.textareaVal = ''
    },
  },
  mounted() {
    // メッセージの取得
    this.socket.on('MESSAGE', (data) => {
        this.messages = [...this.messages, data];
        console.log(this.messages)
    });
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