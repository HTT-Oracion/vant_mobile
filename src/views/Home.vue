<template>
  <div class="home-page">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        v-for="channel in channelList"
        :key="channel.id"
        :title="channel.name"
      >
      </van-tab>
      <div class="wap-nav-placeholder" slot="nav-right"></div>
      <div class="wap-nav-wrap" slot="nav-right">
        <van-icon name="wap-nav" @click="editChannel = true" />
      </div>
    </van-tabs>
    <van-popup
      v-model="editChannel"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :userChannels="channelList"
        :active="active"
        @close="editChannel = false"
        @update-active="active = $event"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from '@/components/ChannelEdit'
import { getUserChannel } from '@/api/user'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'Home',
  components: {
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channelList: [],
      editChannel: false
    }
  },
  created () {
    this.getChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user () {
      this.active = 0
    }
  },
  methods: {
    async getChannels () {
      let channels = []
      if (this.user) {
        const { data } = await getUserChannel()
        console.log('login channel', data);
        channels = data.data.channels
      } else {
        const localChannels = getItem('userChannel')
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await getUserChannel()
          channels = data.data.channels
        }
      }
      this.channelList = channels
    }
  }
}
</script>

<style lang="less" scoped>
.home-page {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px;
      height: 3px;
      background-color: #5babfb;
    }
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
    &:before {
      content: '';
      width: 1px;
      background: url('../assets/img/line.png') no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
}
</style>