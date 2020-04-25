<template>
  <div id="newInvite" class="box">
    <div class="content_wrap">
      <div class="content_head">
        <h3 class="title"><span class="title_bar"></span>新規お誘い作成</h3>
      </div>
      <div class="content_block">
        <form action="/api/create" method="get">
          <div>
            <div>
              <label for="mail">タイトル</label>
            </div>
            <div>
              <input class="" type="text" name="title">
            </div>
          </div>
          <div>
            <div>
              <label for="date">開催日</label>
            </div>
            <div>
              <input class="" type="date" name="date">
            </div>
          </div>
          <div>
            <div>
              <label for="time">空いてる時間</label>
            </div>
            <div>
              <input class="" type="time" name="start_time">
              <span> 〜 </span>
              <input class="" type="time" name="end_time">
            </div>
          </div>  
          <div>
            <div>
              <label for="friend">誘う友達</label>
            </div>
            <div>
              <select name="friend_user_id" id="">
                <option value="1">永澤</option>
                <option value="2">友達一号</option>
              </select>
            </div>
          </div>                    
          <div>
            <div>
              <label for="localte">場所</label>
            </div>
            <div>
              <input class="" type="text" name="locate">
            </div>
          </div>          
          <div>
            <div>
              <label for="price">希望金額</label>
            </div>
            <div>
              <input class="" type="text" name="min_price">
              <span> 〜 </span>
              <input class="" type="text" name="max_price">
            </div>
          </div>
          <div>
            <div>
              <label for="other">備考</label>
            </div>
            <div>
              <textarea name="other" cols="30" rows="10"></textarea>
            </div>
          </div>    
          <!-- user_id = 誘った側 -->
          <input name="user_id" class="submit" type="submit" :value="user_id" @click="inviteCreate"/>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
// import router from "../router"    
export default {
  name: 'NewInvite',
  components: {
  },
  data () {
    return {
      // TODO 型がstring->intになるのダメな気する
      user_id: '誘う' //初期値はボタンに表示させるため"誘う"としている
    }
  },
  methods: {
    // 新規お誘い作成
    inviteCreate() {        
      this.user_id = this.$store.state.user.id
    }
  }
}
</script>

<style lang="scss">
body {
  #app {
    #newInvite {

    }
  }
}
</style>
