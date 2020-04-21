<template>
  <div id="invite" class="box">
    <div class="content_wrap">
      <div class="content_head">
        <h3 class="title"><span class="title_bar"></span>お誘い一覧</h3>
        <div class="button_design_help">
          <a href="/#/newInvite" class="new_invite-button ok-button">新たに誘う</a>
        </div>
      </div>
      <div class="content_block">
        <!-- v-if="inviteDetail.target_user_id==user.id" を2回書かずに実装できるのでは? -->
        <!-- モーダルを別コンポーネントで分けたいが、モーダルの中身が違うケースを想定するとどうやるのか、モーダルコンポーネントで条件分岐させるのか？ -->
        <template v-for="(inviteDetail, index) in inviteDetails.data">
          <div class="invite_list" :key="index">
            <div class="invite_info">
              <p class="invite_user" v-if="inviteDetail.target_user_id==user.id">
                {{ inviteDetail.target_user_name + ' に誘われました' }}
              </p>
              <p class="invite_user" v-else>
                {{ inviteDetail.target_user_name + ' を誘いました' }}
              </p>              
              <p class="invite_dateTime">{{ inviteDetail.date }}{{ inviteDetail.start_time }}</p>
            </div>
            <div class="action_block">
              <a class="failure_button show_detail_invite-button" v-on:click="inviteDetailModalOpen(index)">詳細を見る</a>
              <template v-if="inviteDetail.target_user_id==user.id">
                <button class="failure_button ng-button">都合悪い...</button>
                <button class="success_button ok-button">行ける</button>
              </template>
            </div>
            <div class="inviteDetail_modal" v-show="modalTrigger">
              <div class="modal_closse_button" v-on:click="inviteDetailModalClose"></div>
              <div class="modal_title"> {{ inviteDetails.data[modalNumber]['title'] }} </div>
              <table class="modal_conten_table">
                <tr>
                  <th>開催日：</th>
                  <td> {{ inviteDetails.data[modalNumber]['date'] }} </td>
                </tr>
                <tr>
                  <th>空いてる時間：</th>
                  <td> {{ inviteDetails.data[modalNumber]['start_time'] }} 〜 {{ inviteDetails.data[modalNumber]['end_time'] }} </td>
                </tr>
                <tr>
                  <th>誘ってきた人：</th>
                  <td>{{ inviteDetails.data[modalNumber]['target_user_name'] }} </td>
                </tr>
                <tr>
                  <th>誘った人：</th>
                  <td>{{ inviteDetails.data[modalNumber]['target_user_name'] }} </td>
                </tr>
                <tr>
                  <th>予算：</th>
                  <td> {{ inviteDetails.data[modalNumber]['min_price'] }} 〜 {{ inviteDetails.data[modalNumber]['max_price'] }} </td>
                </tr>
                <tr>
                  <th>場所：</th>
                  <td> {{ inviteDetails.data[modalNumber]['locate'] }} </td>
                </tr>
                <tr>
                  <th>コメント：</th>
                  <td> {{ inviteDetails.data[modalNumber]['other'] }} </td>
                </tr>
              </table>
              <template v-if="inviteDetail.target_user_id==user.id">
                <button class="failure_button ng-button sorry_inModal">都合悪い...</button>
                <button class="success_button ok-button">行ける</button>
              </template>
            </div>
            <div class="modal_overlay" v-show="modalTrigger" v-on:click="inviteDetailModalClose"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invite',
  props: {
    inviteDetails: Array, 
  },
  data() {  
    return {    
      user: {    
        id: this.$store.state.user.id,
      },
      modalNumber: 0,
      modalTrigger: false
    }
  },
  methods: {
    inviteDetailModalOpen(index) {
      this.modalTrigger = true
      this.modalNumber = index
    },
    inviteDetailModalClose() {
      this.modalTrigger = false
    }
  }
}
</script>

<style lang="scss">
p {
  margin: 0;
  text-align: left;
}
body {
  #app {
    #invite {
      .button_design_help {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        .new_invite-button {
          background-color: #42b983;
          border: solid 1px #42b983;
          color: #fff;
          margin-right: 32px;
        }
        .new_invite-button:hover {
          color: #fff;
        }
      }
      .invite_list {
        display: flex;
        display: -webkit-box;
        display: -ms-flexbox;
        padding: 30px 24px 22px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        border-bottom: solid 1px #eceff1;
        .invite_info {
          .invite_user {
            font-size: 18px;
            padding-bottom: 4px;
          }
          .invite_dateTime {
            font-weight: 200;
          }
        }
        .action_block {
          text-align: left;
          width: 50%;
          display: flex;
          align-items: baseline;
          .ng-button {
            margin: 0 14px 0 18px;
          }
          .show_detail_invite-button {
            background-color: #fff;
            display: inline-block;
            width: 100px;
            height: 32px;
            line-height: 33px;
            color: #424242;
            cursor: pointer;
            text-align: center;
          }
          .show_detail_invite-button:hover {
            color: #42b983;
          }
        }
        // お誘い詳細モーダルエリア
        .inviteDetail_modal {
          width: 40%;
          height: 60%;
          max-width: 800px;
          max-height: 800px;
          padding: 30px;
          z-index: 1;
          border-radius: 4px;
          background-color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          .modal_conten_block{
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .modal_closse_button {
            font-size: 24px;
            position: relative;
            width: 1.4em;
            height: 1.4em;
            border: 0.1em solid #757575;
            border-radius: 100%;
            margin-left: auto;
            cursor: pointer;
          }
          .modal_closse_button::before {
            position: absolute;
            top: 0.2em;
            left: 0.6em;
            width: 0.2em;
            height: 1em;
            content: "";
            background-color: #757575;
            transform: rotate(45deg);
          }
          .modal_closse_button::after {
            position: absolute;
            top: 0.6em;
            left: 0.2em;
            width: 1em;
            height: 0.2em;
            content: "";
            background-color: #757575;
            transform: rotate(225deg);
          }
          // モーダルの中身
          .modal_title {
            font-size: 22px;
            margin: 10px 0 20px;
          }
          .modal_conten_table {
            margin: 0 auto;
            padding-bottom: 40px;
            th {
              width: 100px;
              text-align: right;
              font-weight: 200;
            }
            td {
              text-align: left;
              padding-left: 8px;
              padding-bottom: 8px;
              font-weight: 300;
            }
          }
          .failure_button {
            margin-right: 30px;
          }
        }
        .modal_overlay {
          position: absolute;
          width: 100vw;
          height: 100vh;
          left: 0;
          top: 0;
          background-color: #444444;
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
