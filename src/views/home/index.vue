<template>
    <div class="home-container">
      <van-nav-bar class="app-nav-bar">
        <van-button
          class="search-btn"
          slot="title"
          icon="search"
          round
          size="small"
        >搜索</van-button>
      </van-nav-bar>

      <!-- 文章频道列表 -->
      <!--
       标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容
       -->
      <van-tabs class="channel-tabs" v-model="active">
        <van-tab
          v-for="item in  channels"
          :key="item.id"
          :title="item.name"
        >
          <!--文章列表 -->
          <article-list :channel="item"></article-list>
        </van-tab>
        <!-- 为了解决汉堡按钮定位，给个占位元素 -->
        <div slot="nav-right" class="flex-shrink"></div>
        <div
          class="wap-nav-wrap"
          slot="nav-right"
          @click="isChannelEditShow = true"
        >
          <van-icon name="wap-nav" />
        </div>
      </van-tabs>
      <!-- /文章频道列表 -->

      <van-popup
        v-model="isChannelEditShow"
        position="bottom"
        :style="{ height: '100%' }"
        closeable
        close-icon-position="top-left"
        get-container="body"
      >
        <channel-edit :user-channels="channels" />
      </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
  name: "HomeIndex",
  components: {ChannelEdit, ArticleList},
  comments: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: true // 控制编辑频道的状态
    }
  },
  computed: {},
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      // console.log(data);
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.app-nav-bar {
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    background: #5babfb;
    border-color: #5babfb;
    .van-icon-search{
      font-size: 16px;
      color: #fff;
    }
    .van-button__text {
      font-size: 14px;
      color: #fff;
    }
  }
}
.channel-tabs{
  /deep/ .van-tab{
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .vant-tabs__line {
    width: 15px !important;
    height: 3px;
    background: #3296fa;
  }
}
.wap-nav-wrap{
  position: fixed;
  right: 0;
  width: 33px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: .9;
  .van-icon{
    font-size: 24px;
  }
}
.flex-shrink{
  width: 33px;
  flex-shrink: 0;
}
</style>
