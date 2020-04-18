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
        <ul>
          <li class="invite_list">
            <div class="invite_info">
              <p class="invite_user">誘ってきたユーザー</p>
              <p class="invite_dateTime">2019年５月6日〜2019年５月8日</p>
              <!-- <p>2019年５月6日 19:00~21:00</p> -->
              <!-- <p>2019年５月6日</p> -->
              </div>
            <div class="action_block">
              <a class="failure_button show_detail_invite-button">詳細を見る</a>
              <button class="success_button ok-button">行ける</button>
              <button class="failure_button ng-button">都合悪い...</button>
            </div>
          </li>
          <li class="invite_list">
            <div class="invite_info">
              <p class="invite_user">誘ったユーザー</p>
              <p class="invite_dateTime">2019年５月6日〜2019年５月8日</p>
              <!-- <p>2019年５月6日 19:00~21:00</p> -->
              <!-- <p>2019年５月6日</p> -->
              </div>
            <div class="action_block">
              <a class="failure_button show_detail_invite-button">詳細を見る</a>
            </div>
          </li>
          <li class="invite_list">
            <div class="invite_info">
              <p class="invite_user">誘ってきたユーザー</p>
              <p class="invite_dateTime">2019年５月6日〜2019年５月8日</p>
              <!-- <p>2019年５月6日 19:00~21:00</p> -->
              <!-- <p>2019年５月6日</p> -->
              </div>
            <div class="action_block">
              <a class="failure_button show_detail_invite-button">詳細を見る</a>
              <button class="success_button ok-button">行ける</button>
              <button class="failure_button ng-button">都合悪い...</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invite',
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
          .ok-button {
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
      }
    }
  }
}
</style>
