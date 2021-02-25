<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <van-cell center class="user-info">
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          :src="article.aut_photo"
        />
        <div slot="label" class="pubdate">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button
          class="follow-btn"
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          round
          size="small"
          :loading="isFollowLoading"
          @click="onFollow"
          >{{ article.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>

      <comment-list
        :source="articleId"
        :list="commentList"
        @update-total-count="totalCommentCount = $event"
        @reply-click="onReplyClick"
      />
    </div>

    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
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

    <van-popup v-model="isPostShow" position="bottom">
      <post-comment :target="articleId" @post-success="onPostSuccess" />
    </van-popup>

    <van-popup v-model="isReplyShow" position="bottom">
      <comment-reply
        v-if="isReplyShow"
        :comment="replyComment"
        :article-id="articleId"
        @close="isReplyShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import '@/assets/css/github-markdown.css'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from '@/components/CommentList'
import PostComment from '@/components/PostComment'
import CommentReply from '@/components/CommentReply'

export default {
  name: 'ArticleIndex',
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false,
      isCollectLoading: false,
      isPostShow: false,
      commentList: [],
      totalCommentCount: 0,
      isReplyShow: false,
      replyComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () { },
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },

    handlePerviewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },

    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },

    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      if (this.article.is_collected) {
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },

    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        await addLike(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    },

    onPostSuccess (comment) {
      this.commentList.unshift(comment)
      this.totalCommentCount++
      this.isPostShow = false
    },

    onReplyClick (comment) {
      console.log('onReplyClick', comment)
      this.replyComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 24px 20px 18px;
  background-color: #fff;
  margin: 0;
}

.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}

ul {
  list-style: unset;
}

.markdown-body {
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
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
</style>
