<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view @click="choose">选择联系人</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Login')
const choose = () => {
  wx.chooseContact({
    success(res){
      console.log(res)
    },
    fail(res){
      console.log(res)
    }
  })
}
</script>

<style>
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
</style>
