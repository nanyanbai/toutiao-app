<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      lett-arrow
      @click-left="$router.back()"
    />

    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <van-cell class="user-info" center>
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="article.aut_photo"
      />
      <div slot="title" class="name">{{ article.aut_name }}</div>
      <div slot="label" class="time">{{ article.pubdate | relativeTime  }}</div>
      <van-button
        class="follow-btn"
        round
        size="small"
        :type="article.is_followed ?'default':'info'"
        :icon="article.is_followed ? '':'plus'"
        :loading="isFollowLoading"
        @click="onFollow"
      >{{ article.is_followed ? '已关注':'关注' }}</van-button>
    </van-cell>
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      >
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        color="#777"
      />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :color="article.attitude === 1 ? 'hotpink' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import './github-markdown.css'
import { ImagePreview } from 'vant'
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章数据对象
      isFollowLoading: false, // 关注用户按钮的 loading 状态
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      // console.log(data)
      this.article = data.data

      // 数据改变影响试图更新（DOM数据） 不是立即的
      // 所以如果需要在修改数据之后马上操作被改数据影响的视图 DOM， 需要吧这个代码放到 $nextTick 中
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },

    // 处理图片预览
    handlePerviewImage () {
      const articleContent = this.$refs['article-content']
      // 得到所有的 img 的标签
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = [] // 收集所有的图片路径
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index // 起始位置
          })
        }
      })
    },

    async onFollow () {
      this.isFollowLoading = true
      // 已关注，取消关注
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
        // this.article.is_followed = false
      } else { // 没有关注，添加关注
        await addFollow(this.article.aut_id)
        // this.article.is_followed = true
      }
      this.article.is_followed = !this.article.is_followed  // 上面的代码共同的可以提出来写一句
      this.isFollowLoading = false
    },

    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.is_collected) { // 如果已收藏 ，取消收藏
        await deleteCollect(this.articleId)
      } else { // 否则没有收藏，添加收藏
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },

    // 点赞
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        await addLike(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    }
  }
}
</script>

<style scoped lang="less">
.article-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
  .title{
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .user-info{
    .avatar{
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .name{
      font-size: 12px;
      color: #333;
    }
    .time{
      font-size: 11px;
      color: #b4b4b4;
    }
    .follow-btn{
      width: 85px;
      height: 29px;
    }
  }
}

ul {
  list-style: unset;
}

.markdown-body{
  padding: 14px;
  background-color: #fff;
}
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
}

</style>
