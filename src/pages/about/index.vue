<script setup lang="ts">
import CardSwiper from "../../components/CardSwiper.vue"

const list = [{
  image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
  title: '昨夜星辰昨夜风，画楼西畔桂堂东'
},
{
  image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
  title: '身无彩凤双飞翼，心有灵犀一点通'
},
{
  image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
  title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
}
]


// 动态设置当前页面的标题
// wx.setNavigationBarTitle({title, success, fail, complete})
</script>

<template>

  <view class="wrap">
    <CardSwiper :list="list"></CardSwiper>
  </view>

</template>

<style lang="scss" scoped>
.content {
  padding: 10px;
}
</style>


