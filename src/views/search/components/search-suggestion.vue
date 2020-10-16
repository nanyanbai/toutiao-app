<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions:[] // 联想建议数据列表
    }
  },
  // watch 详细的使用语法参考：https://cn.vuejs.org/v2/api/#watch
  watch: {
    // 属性名：要监视的数据的名称
    // searchText () {
    //   console.log('hello')
    // }
    // 这才是监视的完整写法
    searchText: {
      // 当数据发生变化则会执行 handler 处理函数
      // debounce 函数
      //  参数1：函数
      //  参数2：时间
      //  返回值：防抖处理的函数
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    highlight (str) {
      return  str.replace(new RegExp(this.searchText, 'gi') ,`<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">

</style>
