<template>
  <view class="content">
    <text class="text">
      {{  text  }}
    </text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const text = ref("About")
</script>

<style lang="scss" scoped>
.content {
  padding: 10px;
  background-color: #000;

  .text {
    font-size: 2rem;
    color: #fff;
  }
}
</style>


