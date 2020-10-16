<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。-->
    <form action="/">
     <van-search
       v-model="searchText"
       placeholder="请输入搜索关键词"
       show-action
       @search="onSearch(searchText)"
       @cancel="onCancel"
       @focus="isResultShow = false"
     />
    </form>
   <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history v-else />
    <!-- /历史记录 -->

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索文本框的内容
      isResultShow: false, // 控制搜素结果的显示状态
      searchHistories: [] // 搜索历史数据
    }
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText

      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) { // 如果它不为 -1 ,则说明有（有重复的）
        // 把重复性删除
        this.searchHistories.splice(index,1)
      }
      // 记录搜索历史记录, 历史记录不能有重复的
      this.searchHistories.unshift(searchText)

      // 展示搜索结果
      this.isResultShow = true
    },

    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">

</style>
