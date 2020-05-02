<template>
  <div id="room_wrap">
    <div class="room_block">
      <!-- MyMessage start -->
      <template v-for="(message, index) in messages">
        <template v-if="message.name == name">
          <div class="myMsg_block" :key="index">
            <div class="myMsg">
              {{ message.body }}
              <span class="send_hour" v-if="message.sended_time">{{ message.sended_time | send_hour }}</span>
              <span class="send_hour" v-else>{{ message.send_time | send_hour }}</span>
            </div>
          </div>
        </template>
        <!-- MyMessage end-->
        <!-- friendsMessage start -->
        <template v-else>
          <div class="friendsMsg_block" :key="index">
            <span class="friendsName">{{ message.name }}</span>
            <div class="friendsMsg">
              {{ message.body }}
              <span class="send_hour" v-if="message.sended_time">{{ message.sended_time | send_hour }}</span>
              <span class="send_hour" v-else>{{ message.send_time | send_hour }}</span>
            </div>
          </div>
        </template>
      </template>
      <!-- friendsMessage end -->
    </div>
    <div class="messageInput_wrap" v-show="send_input">
      <div class="input_wrap">
        <textarea class="messageInput" ref="adjust_textarea" @keydown="adjustHeight" v-model="textareaVal"></textarea>
        <button class="msgSend submit ok" @click="subumitClick">送信</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
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
      roomData: {},
      sended_time: '',
      send_input: false,
    }
  },
  watch: {
    room: {
      handler: function (val) {
        // ルームが選択されたら入力インプットを表示する
        this.send_input = true;
        // ルームに参加
        this.socket.emit('from_client', { value: val.room_id });
        this.socket.on('joinResult', function(result) {
          console.log("ルームへ入室", result.room)
        });
        // 過去のも含むメッセージの取得
        this.getMessage()
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
        body: this.textareaVal,
        send_time: moment(new Date).format('YYYY-MM-DD HH:mm'),
      });
      axios.get("/api/send_message?user_id="+ this.$store.state.user.id +"&room_id="+ this.room.room_id +"&body="+this.textareaVal)
      .then((response) => {
        console.log(response)
        
      })    
      .catch((errors) => {
        console.log(errors)
        alert('ごめんなさい...メッセージの送信に失敗しちゃいました')
      })

      this.textareaVal = ''
    },
    getMessage() {
      // 過去のメッセージをDBから取得
      axios.get("/api/get_message?room_id="+this.room.room_id)
      .then((response) => {
        console.log(response.data)
        this.messages = response.data
      })    
      .catch((errors) => {
        console.log(errors)
        alert('ごめんなさい...メッセージの表示に失敗しちゃいました')
      })
    }
  },
  created() {

  },
  mounted() {
    this.name = this.$store.state.user.name    
    // 現在送受信したメッセージの取得
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
  background-color: #F6F7FB;
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
        color: #424242;
        padding: 2px 5px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-left: auto;
        white-space: pre-wrap;
        position: relative;
        border-radius: 15px;
        &:before{
          content: "";
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-radius: 50%;
          -webkit-transform: rotate(45deg);
          transform: rotate(135deg);
          top: -8px;
          left: auto;
          right: -4px;
          border-left: 9px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-top: 9px solid #deb887;
        }
        &:after{
          content: "";
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-radius: 50%;
          -webkit-transform: rotate(135deg);
          transform: rotate(135deg);
          top: -15px;
          border-right: 9px solid transparent;
          border-bottom: 9px solid transparent;
        }
        .send_hour {
          position: absolute;
          left: -31px;
          top: 11px;
          font-size: 10px;
        }
      }
    }
    .myMsg_block .myMsg::after {
      left: auto;
      right: -5px;
      border-left: 9px solid transparent;
      border-top: 9px solid #ffffff;
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
        color: #424242;
        padding: 2px 5px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-right: auto;
        white-space: pre-wrap;
        position: relative;
        border-radius: 15px;
        &:before{
          content: "";
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-radius: 50%;
          -webkit-transform: rotate(-135deg);
          transform: rotate(-135deg);
          top: -7px;
          right: auto;
          left: -9px;
          border-left: 9px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-top: 9px solid #b0c4de;
        }
        &:after{
          content: "";
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-radius: 50%;
          -webkit-transform: rotate(-135deg);
          transform: rotate(-135deg);
          top: -14px;
          right: auto;
          left: -4px;
          border-left: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }
        .send_hour {
          position: absolute;
          right: -31px;
          top: 11px;
          font-size: 10px;
        }
      }
    }
    .friendsMsg_block .friendsMsg::after {
      right: auto;
      left: -13px;
      border-right: 9px solid transparent;
      border-top: 9px solid #fff;
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