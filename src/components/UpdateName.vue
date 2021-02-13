<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="name-field-wrap">
      <van-field
        type="textarea"
        v-model="localName"
        placeholder="请输入昵称"
        rows="2"
        autosize
        maxlength="7"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserApi } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      try {
        const { data } = await updateUserApi({
          name: this.localName
        })
        console.log(data);
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast.success('保存成功')
      } catch (error) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style lang="less">
.name-field-wrap {
  padding: 10px;
}
</style>