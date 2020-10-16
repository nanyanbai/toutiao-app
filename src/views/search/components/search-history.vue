<template>
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
      <div v-if="isDeleteShow">
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = true"
      />
    </van-cell>
    <van-cell
      v-for="(historyRecord, index) in searchHistorys"
      :key="index"
      :title="historyRecord"
      @click="onDelete(historyRecord,index)"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 删除的显示状态
    }
  },
  methods: {
    onDelete (historyRecord, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistorys.splice(index,1)
      }
      // 非删除状态，展示搜索结果
      this.$emit('search', historyRecord)
    }
  }
}
</script>

<style scoped  lang="less">

</style>
