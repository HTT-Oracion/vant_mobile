<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from '@/components/SearchSuggestion'
import SearchHistory from '@/components/SearchHistory'
import SearchResult from '@/components/SearchResult'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
  },
  mounted () { },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText

      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }

      this.searchHistories.unshift(searchText)
      this.isResultShow = true
    },

    async loadSearchHistories () {
      const searchHistories = getItem('search-histories') || []
      this.searchHistories = searchHistories
    }
  }
}
</script>

<style scoped lang="less"></style>
