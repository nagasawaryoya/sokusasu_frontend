<template>
  <div id="room_wrap">
    <div class="room_block">
      <!-- MyMessage start -->
      <template v-for="(message, index) in messages">
        <template v-if="message.name == name">
          <div class="myMsg_block"  :key="index">
            <div class="myMsg">
              {{ message.message }}
              <span class="send_hour">{{ message.send_time | send_hour }}</span>
            </div>
          </div>
        </template>
        <!-- MyMessage end-->
        <!-- friendsMessage start -->
        <template v-else>
          <div class="friendsMsg_block" :key="index">
            <span class="friendsName">{{ message.name }}</span>
            <div class="friendsMsg">
              {{ message.message }}
              <span class="send_hour">{{ message.send_time | send_hour }}</span>
            </div>
          </div>
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
import moment from "moment";
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
      textareaHeight: {},
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
  filters: {
    send_hour: function (hour) {
      return moment(hour).format('HH:mm');
    }
  },
  methods: {
    // エンタークリックでテキストエリアの幅を広げる
    adjustHeight(){
      let textarea = this.$refs.adjust_textarea
      this.textareaHeight = textarea

      const resetHeight = new Promise(function(resolve) {
        resolve(textarea.style.height = 'auto')
      });
      resetHeight.then(function(){
        // テキストエリアを広げる
        if(textarea.scrollHeight < 108) {
          textarea.style.height = textarea.scrollHeight + 'px'
        }else {
          textarea.style.height = '108px'
        }
      });
    },
    // メッセージの送信
    subumitClick(e) {
      // テキストエリアの高さをリセット
      this.textareaHeight.style.height = '30px'

      e.preventDefault();
      this.socket.emit('POST_MESSAGE', {
        room_id: this.room.room_id,
        name: this.$store.state.user.name,
        message: this.textareaVal,
        send_time: moment(new Date).format('YYYY-MM-DD HH:mm'),
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
  width: 380px;
  height: 95%;
  background-color: #FFF;
  box-sizing: border-box;
  background-color: #f1f3fb;
  margin: 0 auto;
  padding-top: 30px;
  .room_block {
    width: 100%;
    height: 85%;
    min-width: 379px;
    background-color: #fff;
    border: solid 1px #e2e5ef;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
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
    .myMsg_block {
      margin: 10px 0;
      .myMsg {
        height: auto;
        max-width: 80%;
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
        white-space: pre-wrap;
        position: relative;
        .send_hour {
          position: absolute;
          left: -31px;
          top: 11px;
          font-size: 10px;
        }
      }
    }
    .friendsMsg_block {
      text-align: left;
      margin: 10px 0;
      .friendsName {
        font-size: 10px;
      }
      .friendsMsg {
        height: auto;
        max-width: 80%;
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
        white-space: pre-wrap;
        position: relative;
        .send_hour {
          position: absolute;
          right: -31px;
          top: 11px;
          font-size: 10px;
        }
      }
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
      resize: none;
    }
    .input_wrap {
      width: 100%;
      .messageInput {
        border: solid 1px #928f8f;
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
        vertical-align: top;
      }
    }
  }
}

</style>