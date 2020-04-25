<template>
  <div id="room_wrap">
    <div class="room_block">
      <!-- MyMessage start -->
      <template v-for="(message, index) in messages">
        <template v-if="message.name == name">
          <div class="myMsg" :key="index">{{ message.name }}: {{ message.message }}</div>
        </template>
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
        <button class="msgSend submit ok" @click="subumitClick">送信</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
import io from 'socket.io-client';
export default {
  name: 'Room',
  components: {

  },
  props: {
    room: Object,
    roomMember: Object
  },
  data(){
    return{
      socket : io('localhost:3000'),
      name: '',
      textareaVal: '',
      messages: [],
      roomData: {}
    }
  },
  watch: {
    room: {
      handler: function (val) {
        this.socket.emit('from_client', { value: val.room_id });
        // ルームに参加
        this.socket.on('joinResult', function(result) {
            console.log("ルームへ入室", result.room)
        });
      },
      deep: true
    }
  },
  methods: {
    // エンタークリックでテキストエリアの幅を広げる
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
    roomOpen() {
      if(this.room) {
        var room_id = this.room.room_id
        this.socket.emit('from_client', { value: room_id });
        console.log("ルーム情報を配信: " + room_id);
        // ルームに参加
        this.socket.on('joinResult', function(result) {
          console.log("ルームへ入室", result.room)
        });
      }
    },
    // メッセージの送信
    subumitClick(e) {
      e.preventDefault();
      this.socket.emit('POST_MESSAGE', {
          name: this.$store.state.user.name,
          message: this.textareaVal
      })
      this.textareaVal = ''
    },
  },
  created() {

  },
  mounted() {
    this.name = this.$store.state.user.name

    // メッセージの取得
    this.socket.on('MESSAGE', (data) => {
        this.messages = [...this.messages, data];
        console.log(this.messages)
    });
  }
}
</script>
<style lang="scss">
#room_wrap {
    width: 100%;
    height: 100%;
  .room_block {
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
      color: #757575;
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
      color: #757575;
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
        // border: solid 1px #4DA3EB;
        color: #fff;
        // background-color: #4DA3EB;
        border-radius: 4px;
        box-sizing: border-box;
      }
    }
  }
}

</style>