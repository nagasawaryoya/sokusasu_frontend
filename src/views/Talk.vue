<template>
  <div id="component_wrap">
    <div class="talk_wrap">
      <ul class="talk_list">
        <template v-for="(roomInfo, index) in roomInfos">
        <li class="room_door" :key="index" v-on:click="goRoom(index)">
          <div class="hold_time">
            <span class="hold_year">{{ roomInfo.date | hold_year }}</span>
            <span class="hold_date">{{ roomInfo.date | hold_date }}</span>
          </div>
          <div class="friend_window">
            <div class="friend_name">{{ roomInfo.title }}</div>
            <div class="last_get_message_message" v-if="roomInfo.room_id===currentMessage.room_id">{{ currentMessage.message }}</div>
          </div>
          <div class="last_get_message_date" v-if="roomInfo.room_id===currentMessage.room_id">{{ currentMessage.send_time }}</div>
          <div class="last_get_message_date" v-else></div>
        </li>
        </template>
      </ul>
    </div>
    <Room :room="room" :room-member="roomMember" />
  </div>
</template>

<script>
import axios from "axios"
import Room from '@/components/Room.vue'
import io from 'socket.io-client';
import moment from "moment";
export default {
  name: 'Talk',
  components: {
    Room
  },
  data(){
    return{
      socket : io('localhost:3000'),
      roomInfos: {},
      room: {},
      roomMember: {},
      currentMessage: [],
    }
  },
  filters: {
    hold_year: function (year) {
      return moment(year).format('YYYY');
    },
    hold_date: function (date) {
      return moment(date).format('MM/DD');
    }
  },
  methods: {
    // 自分が参加しているルームの情報取得
    getRoomDatas() {
      axios.get("/api/get_rooms?user_id="+this.$store.state.user.id)
      .then((response) => {
        console.log(response)
        this.roomInfos = response.data
      })    
      .catch((errors) => {    
        console.log(errors)
      })
    },
    // クリックしたルームを表示する
    goRoom(index) {
      // ルームに紐づいている、お誘い情報をルームコンポーネントに渡す
      this.room = this.roomInfos[index];
      let room_id = this.roomInfos[index]['room_id'];

      // ルームに参加しているメンバー取得
      axios.get("/api/get_room_member?user_id="+this.$store.state.user.id+'&room_id='+room_id)
      .then((response) => {
        console.log(response)
        this.roomMember = response.data
      })    
      .catch((errors) => {    
        console.log(errors)
      })
    },
    // 直近のメッセージの取得
    getCurrentMessage() {
      this.socket.on('CURRENT_MESSAGE', (data) => {
        this.currentMessage = data;
        console.log(this.currentMessage)
        // 送信時間
        let transmission_time = this.currentMessage.send_time
        this.currentMessage.send_time = this.getCurrentMessageTime(transmission_time)
      });
    },
    getCurrentMessageTime(transmission_time) {
      // 送信時間（年月日）
      let send_date = moment(transmission_time).format('YYYY-MM-DD');
      // 送信時間（時間）
      let send_hour = moment(transmission_time).format('HH:mm');
      // 現在時間（年月日 時間）
      let now = moment(new Date).format('YYYY-MM-DD HH:mm')
      // 現在（年月日）
      let now_date = moment(now).format('YYYY-MM-DD');
      // 昨日
      let yesterday = moment(transmission_time).subtract(1, 'days').format('YYYY-MM-DD');

      if (now_date == send_date) {
        return send_hour
      }else if(yesterday == send_date){
        return '昨日'
      }else {
        return moment(send_date).format('MM/DD')
      }
    }
  },
  created() {
    this.getRoomDatas()
  },
  mounted() {
    this.getCurrentMessage()
  }

}
</script>
<style lang="scss">
li {
  margin: 0;
}
#component_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  border: solid 1px #757575;
  color: #424242;
  background-color: #F6F7FB;
  .talk_wrap {
    width: 30%;
    height: 100%;
    min-width: 350px;
    border-right: solid 1px #eceff1;
    background-color: #FFF;
    .talk_list {
    display: flex;
    align-items: start;
    flex-direction: column;
    margin: 0;
    .room_door {
      width: 100%;
      height: 90px;
      padding: 20px 20px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      font-weight: 200;
      cursor: pointer;
      .hold_time {
        border-radius: 70px;
        border: solid 1px #fff;
        padding: 5px;
        height: 40px;
        width: auto;
        .hold_year {
          display: block;
        }
      }
      .friend_window {
        text-align: left;
        flex-grow: 1;
        padding: 5px 0 5px 20px;
        .friend_name {
          font-size: 14px;
          padding-bottom: 3px;
        }
        .last_get_message_message {
          overflow: hidden;
          max-width: 270px;
          max-height: 35px;
          font-size: 11px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
        }
      }
      .last_get_message_date {
        width: 60px;
        text-align: left;
        padding-left: 5px;
      }
    }
    .room_door:hover {
      // background-color: #42b983;
      background-color: #4ab383;
      color: #fff;
      opacity: 0.9;
    }
  }
}
}
</style>