<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div class="channel-title" slot="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit =! isEdit"
      >{{ isEdit ? '完成': '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active:index === active }"
        :icon="(isEdit && index !==0) ? 'clear' : ''"
        v-for="(item, index) in userChannels"
        :key="index"
        :text="item.name"
        @click="onUserChannelClick(item, index)"
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
        @click="onAdd(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: "ChannelEdit",
  props: {
    userChannels:{
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      AllChannels: [], //所有频道数据列表
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐的频道列表
    // 计算属性会观测内部依赖数据的变化而重新求值
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
    },

    async onAdd(data) {
      // console.log(data)
      this.userChannels.push(data)
      // 数据持久化
      if (this.user) { // 如果登录了，就把数据存储到数据库
        await addUserChannels({
          channels: [
            {
              id: data.id ,
              seq: this.userChannels.length
            }
          ]
        })
      } else { // 没有登录，就把数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },

    onUserChannelClick (channle, index) {
      // 编辑状态，删除频道
      if(this.isEdit && index !==0) {  // 并且 index !== 0 是推荐频道不能删除，因为推荐频道的索引是 0
        this.deleteChannel(channle,index)
      }else { // 非编辑状态，切换频道
        this.switchChannel(index)
      }
    },
    async deleteChannel (channle, index) {
      if(index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // 数据持久化
      if (this.user) {
        await deleteUserChannels(channle.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      // 切换频道
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
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
        margin-top: 0;
      }
    }
    /deep/ .van-icon-clear{
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 16px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text{
      color: red !important;
    }
  }

}
</style>
