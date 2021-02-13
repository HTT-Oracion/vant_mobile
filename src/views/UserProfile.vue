<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      accept="image/*"
      hidden
      ref="file"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo">
      </van-image>
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditName = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGender = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirth = true"
    ></van-cell>
    <!-- 修改头像 -->
    <van-popup
      v-model="isEditPhoto"
      position="bottom"
      class="update-photo-popup"
      :style="{ height: '100%' }"
    >
      <update-photo
        v-if="isEditPhoto"
        :file="previewImage"
        @close="isEditPhoto = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- 修改昵称 -->
    <van-popup
      v-model="isEditName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="isEditName"
        v-model="user.name"
        @close="isEditName = false"
      ></update-name>
    </van-popup>
    <!-- 修改性别 -->
    <van-popup v-model="isEditGender" position="bottom"
      ><update-gender
        v-if="isEditGender"
        v-model="user.gender"
        @close="isEditGender = false"
      />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="isEditBirth" position="bottom">
      <update-birth
        v-if="isEditBirth"
        v-model="user.birthday"
        @close="isEditBirth = false"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdatePhoto from '@/components/UpdatePhoto'
import UpdateName from '@/components/UpdateName'
import UpdateGender from '@/components/UpdateGender'
import UpdateBirth from '@/components/UpdateBirth'
import { getUserInfoApi } from '@/api/user'
export default {
  name: 'UserProfile',
  components: {
    UpdatePhoto,
    UpdateName,
    UpdateGender,
    UpdateBirth
  },
  data () {
    return {
      user: {},
      previewImage: null,
      isEditPhoto: false,
      isEditName: false,
      isEditGender: false,
      isEditBirth: false
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.previewImage = file
      this.isEditPhoto = true
      this.$refs.file.value = ''
    },
    async getUserInfo () {
      const { data } = await getUserInfoApi()
      this.user = data.data
      console.log(this.user);
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
</style>