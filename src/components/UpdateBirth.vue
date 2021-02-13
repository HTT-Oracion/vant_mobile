<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserApi } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirth',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      const data = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserApi({
        birthday: data
      })
      this.$emit('input', data)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style>
</style>