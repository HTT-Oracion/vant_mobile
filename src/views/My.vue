<template>
  <div class="my-page">
    <!-- 已登录 -->
    <van-cell-group v-if="user" class="my-info">
      <van-cell class="base-info" :border="false" center>
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{ currentUser.name }}</div>
        <van-button class="update-btn" size="small" round to="/user/profile"
          >编辑信息</van-button
        >
      </van-cell>
      <van-grid class="data-info" :boder="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录 -->
    <div v-else class="not-login">
      <div
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my'
            }
          })
        "
      >
        <img class="mobile" src="../assets/img/mobile.png" alt="" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="logout"
    />
  </div>
</template>

<script>
import { getUserApi } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  data () {
    return {
      currentUser: {}
    }
  },
  methods: {
    async getUserDetail () {
      const { data } = await getUserApi()
      this.currentUser = data.data
    },
    logout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      }).then(() => {
        this.$store.commit('SET_USER', null)
      }).catch(() => { })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  activated () {
    if (this.user) {
      this.getUserDetail()
    }
  }
}
</script>

<style lang="less" scoped>
.my-page {
  .my-info {
    background: url('../assets/img/banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        text-align: left;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        /deep/.van-grid-item__content::after {
          border-width: 0 0 0 0;
        }
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    [class*='van-hairline']::after {
      border: 0;
    }
  }
  .not-login {
    height: 180px;
    background: url('../assets/img/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
}
</style>