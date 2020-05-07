<template>
<div class="wrap">
  <Nav />
  <div id="friend_candidate" class="box">
    <div class="content_wrap">
      <div class="content_head">
        <h3 class="title"><span class="title_bar"></span>友達かも</h3>
      </div>
      <div class="content_block">       
        <div class="center_block">
          <ul class="center_list">
            <li v-for="(friend,index) in friends" :key="index" @click="currentInvite(index)">
              <div class="apply_name">{{ friend.name }}</div>
              <template v-if="friend.follow_status === 'following'">
                <div class="apply_badge">申請中</div>
                <button class="failure_button ng-button">キャンセル</button>
              </template>
              <template v-if="friend.follow_status === 'followed'">
                <div class="apply_badge">申請受取</div>
                <button class="failure_button ng-button">キャンセル</button>
                <button class="success_button ok-button">追加</button>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from "axios"
  import Nav from '@/components/Nav.vue'
  import moment from "moment";
  export default {    
    name: "FriendCandidate",
    components: {
      Nav
    },
    data() {  
      return {    
        friends: [],
      }
    },
    filters: {
      format_date: function (date) {
        return moment(date).format('YYYY-MM-DD');
      }
    },
    methods: {
      // 友達候補一覧取得
      showFriendCandidate() {
        axios.get('/api/get_Friend_candidate?user_id='+this.$store.state.user.id)
        .then((response) => {
          console.log(response)
          this.friends = response.data
        })    
        .catch((errors) => {    
          console.log(errors)    
        })   
      }
    },
    mounted() {
      this.showFriendCandidate()
    }
  }
</script>

<style lang="scss">
#app {
  .wrap {
    width: 100%;
    height: 100%;
    #friend_candidate {
      width: 550px;
      margin: 0 auto;
      padding: 60px 0;
      box-sizing: border-box;
      .center_list {
        font-size: 20px;
        li {
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          text-align: left;
          .apply_name {
            padding-right: 5px;
          }
          button {
            width: 80px;
            height: 28px;
            line-height: 28px;
          }
          .apply_badge {
            cursor: default;
            border: solid 1px #424242;
            border-radius: 30px;
            font-size: 14px;
            color: #424242;
            width: 60px;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            margin-right: auto;
            &:hover{
              border: solid 1px #424242;
              color: #424242;
            }
          }
        }
      }
    }
  }
}
</style>