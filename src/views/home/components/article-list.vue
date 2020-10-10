<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isPullDownLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!--<van-cell
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title"
        /> -->
        <article-item
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      timestamp: null,  // 获取下一页数据的时间戳
      isPullDownLoading: false, // 下拉刷新的 loading 状态
      refreshSuccessText: '' // 下拉刷新成功提示文本
    }
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      const { data } = await  getArticles({
        channel_id: this.channel.id, // 频道id
        // 请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        // timestamp（相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次）
        // 返回的数据中的时间戳
        timestamp:this.timestamp || Date.now(),
        with_top: 1   // 是否包含置顶，进入页面第一次请求时要包含置顶文章， 1（包含置顶） 0 （不包含）
      })
      console.log(data);
      // 2. 把数据放到 articles 数组中 (把得到的数组合并到articles数组中)
      const { results } = data.data
      this.articles.push(...results)
      // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
      this.loading = false
      // 4. 数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了， 把加载状态设置结束， 不再触发加载更多
        this.finished = true
      }
    },

    async onRefresh() {
      console.log('onRefresh')
      // 下拉刷新， 组件自己就会展示 loading 状态
      // 1、请求获取数据
      const { data } = await  getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(),
        with_top: 1
      })
      // 2、把数据放到数据列表中（往顶部追加）
      const { results } = data.data
      this.articles.unshift(...results)
      // 3、关闭刷新的状态 loading
      this.isPullDownLoading = false

      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
