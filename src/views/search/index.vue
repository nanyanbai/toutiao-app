<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。-->
    <form action="/">
     <van-search
       v-model="searchText"
       placeholder="请输入搜索关键词"
       show-action
       @search="onSearch"
       @cancel="onCancel"
       @focus="isResultShow = false"
     />
    </form>
   <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" />
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
      isResultShow: false // 控制搜素结果的显示状态
    }
  },
  methods: {
    onSearch () {
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
