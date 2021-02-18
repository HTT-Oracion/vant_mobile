<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        round
        plain
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in realChannels"
        :key="index"
        :text="channel.name"
        @click="channelClick(channel, index)"
      >
      </van-grid-item>
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recChannels"
        :key="index"
        :text="channel.name"
        @click="add(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannelsApi, addChannelApi, deleteChannelApi } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEdit: false,
      realChannels: this.userChannels.slice(),
      allChannels: []
    }
  },
  computed: {
    ...mapState(['user']),
    recChannels () {
      return this.allChannels.filter(channel => {
        return !this.realChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  created () {
    this.getAllChannels()
    console.log('real', this.realChannels);
  },
  watch: {
    realChannels (newVal) {
      this.$emit('update-channel', newVal)
      console.log(newVal);
    }
  },
  methods: {
    async getAllChannels () {
      const { data } = await getChannelsApi()
      this.allChannels = data.data.channels
    },
    channelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.realChannels.splice(index, 1)
      if (this.user) {
        await deleteChannelApi(channel.id)
      } else {
        setItem('userChannel', this.userChannels)
      }
    },
    switchChannel (index) {
      this.$emit('update-active', index)
      this.$emit('close')
    },
    async add (channel) {
      if (!this.isEdit) return
      this.realChannels.push(channel)
      if (this.user) {
        await addChannelApi({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        setItem('userChannel', this.realChannels)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;

  .channel-title {
    font-size: 16px;
    color: #333333;
  }

  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
      z-index: 5;
    }
  }

  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>