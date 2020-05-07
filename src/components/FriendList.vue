<template>
<div class="wrap">
  <Nav />
  <div id="friend_list" class="box">
    <div class="content_wrap">
      <div class="content_head">
        <h3 class="title"><span class="title_bar"></span>友達一覧</h3>
      </div>
      <div class="content_block">       
        <div class="left_block">
          <ul class="left_list">
            <li v-for="(friend,index) in friends" :key="index" @click="currentInvite(index)">
              <div class="apply_name">{{ friend.name }}</div>
              <!-- <template v-if="friend.follow_status === 'following'">
                <button class="success_button ok-button">申請中</button>
                <button class="failure_button ng-button">キャンセル</button>
              </template>
              <template v-if="friend.follow_status === 'followed'">
                <button class="failure_button ng-button">キャンセル</button>
                <button class="success_button ok-button">追加</button>
              </template> -->
            </li>
          </ul>
        </div>
        <div class="right_block">
          <div class="right_list">
            <h4>直近のお誘い内容</h4>
            <template v-if="show_status">
            <ul class="right_detail">
              <li>
              <span>タイトル</span>
              {{ clickCurrentInvite.title }}
              </li>
              <li>
              <span>開催日</span>
              {{ clickCurrentInvite.date | format_date }}
              </li>
              <li>
              <span>時間</span>
              {{ clickCurrentInvite.start_time }}〜{{ clickCurrentInvite.end_time }}
              </li>
              <li>
              <span>場所</span>
              {{ clickCurrentInvite.locate }}
              </li>
              <li>
              <span>金額</span>
              {{ clickCurrentInvite.min_price }}〜{{ clickCurrentInvite.max_price }}円
              </li>
            </ul>
            </template>
          </div>
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
    name: "FriendList",
    components: {
      Nav
    },
    data() {  
      return {    
        friends: [],
        show_status: false,
        clickCurrentInvite: {}
      }
    },
    filters: {
      format_date: function (date) {
        return moment(date).format('YYYY-MM-DD');
      }
    },
    methods: {
      // 友達一覧情報取得
      showFriendList() {
        axios.get('/api/get_friend_list?user_id='+this.$store.state.user.id)
        .then((response) => {
          console.log(response)
          this.friends = response.data
        })    
        .catch((errors) => {    
          console.log(errors)    
        })   
      },
      // 直近のお誘いの情報を表示
      currentInvite(index) {
        this.clickCurrentInvite = this.friends[index]
        this.show_status = true
      }
    },
    mounted() {
      this.showFriendList()
      
    }
  }
</script>

<style lang="scss">
#app {
  .wrap {
    width: 100%;
    height: 100%;
    #friend_list {
      text-align: left;
      height: calc(100% - 60px);
      .content_block {
        display: flex;
        font-size: 22px;
        height: calc(100% - 100px);
        .left_block,
        .right_block {
          height: auto;
          overflow: auto;
          .left_list,
          .right_list {
            display: flex;
            flex-direction: column;
          }
          .left_list {
            li {
              margin-bottom: 24px;
              display: flex;
              align-items: center;
              cursor: pointer;
              button {
                width: 100px;
                height: 28px;
                line-height: 28px;
              }
            }
            .apply_name {
              flex-grow: 0.7;
              &:hover {
                color: #42b983;
              }
            }
          }
          .right_list  {
            padding-left: 100px;
            // text-align: center;
            h4 {
              font-weight: normal;
              margin-bottom: 0;
            }
          }
        }
        .left_block {
          width: 60%;
          border-right: solid 1px #757575;
        }
        .right_block {
          width: 40%;
          .right_detail {
            display: grid;
            li {
              span {
                display: block;
                font-size: 16px;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>