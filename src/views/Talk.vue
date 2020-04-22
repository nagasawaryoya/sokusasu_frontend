<template>
  <div id="component_wrap">
    <div class="talk_wrap">
      <ul class="talk_list">
        <li class="room_door">
          <div class="top_icon"></div><!-- TODOトプ画 -->
          <div class="friend_window">
            <div>友達のなまえ</div>
            <div>トークの冒頭と三点リーダー...</div>
          </div>
          <div class="last_get_message_date">AM 19:10</div>
        </li>
        <li class="room_door">
          <div class="top_icon"></div><!-- TODOトプ画 -->
          <div class="friend_window">
            <div class="friend_name">友達のなまえ</div>
            <div>トークの冒頭と三点リーダー...</div>
          </div>
          <div class="last_get_message_date">昨日</div>
        </li>
        <li class="room_door">
          <div class="top_icon"></div><!-- TODOトプ画 -->
          <div class="friend_window">
            <div class="friend_name">友達のなまえ</div>
            <div>トークの冒頭と三点リーダー...</div>
          </div>
          <div class="last_get_message_date">月曜日</div>
        </li>
        <li class="room_door">
          <div class="top_icon"></div><!-- TODOトプ画 -->
          <div class="friend_window">
            <div class="friend_name">友達のなまえ</div>
            <div>トークの冒頭と三点リーダー...</div>
          </div>
          <div class="last_get_message_date">3/5</div>
        </li>
        <li class="room_door">
          <div class="top_icon"></div><!-- TODOトプ画 -->
          <div class="friend_window">
            <div class="friend_name">友達のなまえ</div>
            <div>トークの冒頭と三点リーダー...</div>
          </div>
          <div class="last_get_message_date">一昨日</div>
        </li>            
        <li class="room_door">
          <div class="top_icon"></div><!-- TODOトプ画 -->
          <div class="friend_window">
            <div class="friend_name">友達のなまえ</div>
            <div>トークの冒頭と三点リーダー...</div>
          </div>
          <div class="last_get_message_date">金曜日</div>
        </li>
      </ul>
    </div>
    <Room />
  </div>
</template>

<script>
import Room from '@/components/Room.vue'
export default {
  name: 'Talk',
  components: {
    Room
  },
  data(){
    return{

    }
  },
  methods: {

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