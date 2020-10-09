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
    </div>
</template>

<script>
export default {
  name: "HomeIndex"
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
