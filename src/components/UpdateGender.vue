<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserApi } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      await updateUserApi({
        gender: this.defaultIndex
      })
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
      this.$toast.success('保存成功')
    },
    onGenderChange (picker, value, index) {
      console.log(typeof this.value);
      this.defaultIndex = index
      console.log(typeof this.defaultIndex);
    }
  }
}
</script>

<style>
</style>