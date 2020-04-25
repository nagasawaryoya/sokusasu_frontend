<template>
  <div id="component_wrap">
    <div class="talk_wrap">
      <ul class="talk_list">
        <template v-for="(roomInfo, index) in roomInfos">
        <li class="room_door" :key="index" v-on:click="goRoom(index)">
          <div class="top_icon"></div><!-- TODO トプ画 -->
          <div class="friend_window">
            <div class="friend_name">{{ roomInfo.title }}</div>
            <div>トークの冒頭と三点リーダー...</div>
          </div>
          <div class="last_get_message_date">AM 19:10</div>
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
export default {
  name: 'Talk',
  components: {
    Room
  },
  data(){
    return{
      roomInfos: {},
      room: {},
      roomMember: {},
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
  },
  created() {
    this.getRoomDatas()
  },
  mounted() {
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
  .talk_wrap {
    width: 45%;
    height: 100%;
    border-right: solid 1px #eceff1;
    .talk_list {
    display: flex;
    align-items: start;
    flex-direction: column;
    margin: 0;
    .room_door {
      width: 100%;
      height: 80px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      font-weight: 200;
      cursor: pointer;
      .friend_window {
        text-align: left;
        .friend_name {
          font-size: 14px;
          padding-bottom: 3px;
        }
      }
      .last_get_message_date {
        width: 60px;
        text-align: left;
        padding-left: 5px;
      }
    }
    .room_door:hover {
      background-color: #42b983;
      color: #fff;
      // opacity: 0.1;
    }
  }
}
}
</style>