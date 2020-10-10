<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div class="channel-title" slot="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
      >编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in userChannels"
        :key="index"
        :text="item.name"
      />
    </van-grid>

    <!-- 频道推荐= 所有频道列表 - 我的频道 -->
    <van-cell center :border="false">
      <div class="channel-title" slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in recommendChannels"
        :key="index"
        :text="item.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: "ChannelEdit",
  props: {
    userChannels:{
      type: Array,
      required: true
    }
  },
  data () {
    return {
      AllChannels: [] //所有频道数据列表
    }
  },
  computed: {
    // 推荐的频道列表
    recommendChannels () {
      return  this.AllChannels.filter(channel =>　{
        return  !this.userChannels.find(userChannels => {
          return userChannels.id === channel.id
        })
      })
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      const { data } = await  getAllChannels()
      this.AllChannels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333;
  }
  .grid-item{
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content{
      background-color: #f4f5f6;
      .van-grid-item__text{
        font-size: 14px;
        color:#222 ;
      }
    }
  }
}
</style>
