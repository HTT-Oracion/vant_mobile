<template>
  <div class="article-list" ref="articleLsit">
    <van-pull-refresh
      v-model="refreshing"
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
import ArticleItem from '@/components/ArticleItem'
import { getArticleListApi } from '@/api/article'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  mounted () {
    const articleRef = this.$refs.articleLsit
    articleRef.onscroll = debounce(() => {
      this.scrollTop = articleRef.scrollTop
    }, 50)
  },
  activated () {
    this.$refs.articleLsit.scrollTop = this.scrollTop
  },
  data () {
    return {
      articles: [],
      timestamp: null,
      loading: false,
      refreshing: false,
      finished: false,
      refreshSuccessText: '',
      scrollTop: 0
    }
  },
  methods: {
    getArticleList () {
      return getArticleListApi({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })

    },
    // 下拉刷新
    async onRefresh () {
      const { data } = await this.getArticleList()
      const { results } = data.data
      this.articles.unshift(...results)
      this.refreshing = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    },
    // 加载数据
    async onLoad () {
      const { data } = await this.getArticleList()
      const { results } = data.data
      this.articles.push(...results)
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        // 加载完毕
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>