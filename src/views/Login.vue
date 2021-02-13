<template>
  <div class="login-page">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      ref="loginForm"
      @submit="login"
      @falied="onFailed"
      :show-error="false"
      :show-error-message="false"
      validate-first
    >
      <van-field
        v-model="user.mobile"
        :rules="loginRules.moibile"
        placeholder="请输入手机号"
        icon-prefix="toutiao"
        left-icon="shouji"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        :rules="loginRules.code"
        placeholder="请输入验证码"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        name="code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDown"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            size="mini"
            type="primary"
            :loading="isSendLoad"
            @click.prevent="sendCode"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi, sendCodeApi } from '@/api/user'
import { loginRules } from '@/utils/validateRules'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '17090086870',
        code: '246810'
      },
      loginRules,
      isCountDown: false,
      isSendLoad: false
    }
  },
  methods: {
    // 登录
    async login () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await loginApi(this.user)
        if (data.data.token) {
          this.$toast.success('登陆成功')
          this.$store.commit('SET_USER', data.data.token)
          this.$store.commit('SET_REFRESH', data.data.refresh_token)
          // this.$router.push(this.$route.query.redirect || '/')
          this.$router.push('/')
        }
      } catch (error) {
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async sendCode () {
      try {
        await this.$refs['loginForm'].validate('mobile')
        this.isSendLoad = true
        await sendCodeApi(this.user.mobile)
        this.isCountDown = true
      } catch (err) {
        let message = ''
        console.log(err);
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendLoad = false
    }
  }
}
</script>

<style lang="less">
.login-page {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>