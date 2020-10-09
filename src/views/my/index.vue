<template>
    <div class="my-container">
      <!-- 登录状态 -->
      <van-cell-group v-if="user" class="user-info">
        <van-cell
          class="base-info"
          center
          :border="false"
        >
          <van-image
            class="avatat"
            slot="icon"
            round
            fit="cover"
            :src="currentUser.photo"
          />
          <div class="name" slot="title">{{currentUser.name}}</div>
          <van-button
            class="update-btn"
            size="small"
            round
          >编辑资料</van-button>
        </van-cell>

        <van-grid class="data-info" :border="false">
          <van-grid-item class="data-info-item">
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.art_count}}</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.follow_count}}</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>

      <!-- 未登录状态 -->
      <div v-else class="not-login">
        <div class="mobile" @click="$router.push('/login')"></div>
        <div class="text" >点击登录</div>
      </div>

      <van-grid class="nav-grid mb-4" :column-num="2">
        <van-grid-item
          class="nav-grid-item"
          icon-prefix="toutiao"
          icon="shoucang"
          text="收藏"
        />
        <van-grid-item
          class="nav-grid-item"
          icon-prefix="toutiao"
          icon="lishi"
          text="历史"
        />
      </van-grid>

      <van-cell title="消息通知" is-link to="" />
      <van-cell title="小智同学" class="mb-4" is-link to="" />

      <van-cell
        v-if="user"
        title="退出登录"
        class="logout"
        @click="onLogout"
      />

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: "MyIndex",
  comments: {},
  props: {},
  data () {
    return {
      currentUser:{}
    }
  },
  // 计算属性
  computed: {
    ...mapState(['user'])  // 映射到当前组件中
  },
  created() {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      // console.log(data)
      this.currentUser = data.data
    },

    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '退出当前账号信息，将不能同步收藏，发布评论和云端分享等'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped lang="less">
.user-info{
  background: url("./banner.png") no-repeat;
  background-size: cover;
  .base-info{
    height: 115px;
    padding-top: 38px;
    padding-bottom: 11px;
    box-sizing: border-box;
    background-color: unset;
    .avatat{
      width: 66px;
      height: 66px;
      box-sizing: border-box;
      margin-right: 11px;
      border: 1px solid #fff;
    }
    .name{
      font-size: 15px;
      color: #fff;
    }
    .update-btn{
      height: 16px;
      font-size: 10px;
      color: #666;
    }
  }
  .data-info{
    .data-info-item{
      height: 65px;
      color: #fff;
      .text-wrap{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count{
          font-size: 18px;
        }
        .text{
          font-size: 11px;
        }
      }
    }
  }
  /deep/ .van-grid-item__content {
    background-color: unset;
  }
}
/deep/ .nav-grid{
  .nav-grid-item{
    height: 70px;
    .toutiao{
      font-size: 22px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi{
      color: #ff9d1d;
    }
    .van-grid-item__text{
      font-size: 14px;
      color: #333;
    }
  }
}
.logout{
  text-align: center;
  color: #d86262;
}
.mb-4{
  margin-bottom: 4px;
}
.not-login{
  height: 180px;
  background: url("./banner.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .mobile{
    width: 66px;
    height: 66px;
    margin-bottom: 10px;
    background: url("./mobile.png") no-repeat;
    background-size: cover;
  }
  .text{
    font-size: 13px;
    color: #fff;
  }
}

</style>
