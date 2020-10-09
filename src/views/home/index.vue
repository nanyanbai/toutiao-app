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
      <van-tabs v-model="active">
        <van-tab
          v-for="item in  channels"
          :key="item.id"
          :title="item.name"
        >{{ item.name }}的内容</van-tab>
      </van-tabs>
      <!-- /文章频道列表 -->


    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'

export default {
  name: "HomeIndex",
  comments: {},
  props: {},
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
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

</style>
