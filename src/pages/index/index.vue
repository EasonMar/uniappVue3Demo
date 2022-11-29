<template>
  <view class="root">
    <view class="topTitle">我的模板</view>
    <view class="content">
      <input class="uni-mt-5" v-model="serchVal" placeholder="请输入模板关键字"
        @iconClick="goLogin" />
      <image class="logo" src="/static/logo.png" />
      <view class="text-area" @click="goLogin">
        <text class="title">{{ title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const serchVal = ref('')
const title = ref('Hello World')
const goLogin = () => uni.navigateTo({ url: "./login" })
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
