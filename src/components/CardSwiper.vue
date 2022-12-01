<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

// 定义组件props
interface List {
    image: string
    title: string
}

interface Props {
    list: List[]
    borderRadius: number | string
    height: number | string
    indicatorMode: 'rect' | 'dot' | 'number' | 'round'
    indicatorPos: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
    effect3d: boolean
    effect3dPreviousMargin: number | string
    current: number
}

const props = withDefaults(defineProps<Props>(), {
    list: () => [{ image: '', title: '' }],
    borderRadius: 16,
    height: 516,
    indicatorMode: 'rect',
    indicatorPos: 'bottomCenter',
    effect3d: true,
    effect3dPreviousMargin: 40,
    current: 0 // 初始化时，默认显示第几项
})

// 监听外部current的变化，实时修改内部依赖于此测uCurrent值，如果更新了current，而不是更新uCurrent，
// 就会错乱，因为指示器是依赖于uCurrent的
/**
 * --- Vue3 watch 注意事项  --- 
 * 不能直接侦听响应式对象的属性值, 需要用一个返回该属性的 getter 函数
 * watch(props.current, xx) 错误，因为 watch() 得到的参数是一个 number
 */
 watch(() => props.current, (n) => { uCurrent.value = n })

// 当前活跃的swiper-item的index
const uCurrent = ref(props.current)

// 如果外部的list发生变化，判断长度是否被修改，如果前后长度不一致，重置uCurrent值，避免溢出
watch(props.list, (nVal, oVal) => { if (nVal.length !== oVal.length) uCurrent.value = 0 })





const justifyContent = computed(() => {
    if (props.indicatorPos == 'topLeft' || props.indicatorPos == 'bottomLeft') return 'flex-start';
    if (props.indicatorPos == 'topCenter' || props.indicatorPos == 'bottomCenter') return 'center';
    if (props.indicatorPos == 'topRight' || props.indicatorPos == 'bottomRight') return 'flex-end';
})

const elCurrent = computed(() => Number(props.current))

const emit = defineEmits(['change'])
const change = (e: any) => {
    let current = e.detail.current;
    uCurrent.value = current;
    // 发出change事件，表示当前自动切换的index，从0开始
    emit('change', current);
}
</script>


<template>
    <view class="u-swiper-wrap" :style="{
        borderRadius: `${borderRadius}rpx`
    }">
        <swiper :current="elCurrent" @change="change" :previous-margin="effect3d ? effect3dPreviousMargin + 'rpx' : '0'"
            :next-margin="effect3d ? effect3dPreviousMargin + 'rpx' : '0'" :style="{
                height: height + 'rpx',
            }">
            <swiper-item class="u-swiper-item" v-for="(item, index) in list" :key="index">
                <!-- 里面要实现一个卡片？能否将卡片通过 slot 传入呢 -- 也很麻烦，还得在父组件中渲染 swiper-item, 又得搞 作用域插槽 -->
                <view class="u-list-image-wrap" :class="[uCurrent != index ? 'u-list-scale' : '']" :style="{
                    borderRadius: `${borderRadius}rpx`,
                    transform: effect3d && uCurrent != index ? 'scaleY(1)' : 'scaleY(1)',
                    margin: effect3d && uCurrent != index ? '0 20rpx' : 0,
                }">
                    <scroll-view :scroll-y="true" style="height: 100%;">
                        <image class="u-swiper-image" :src="item.image"></image>
                        <image class="u-swiper-image" :src="item.image"></image>
                        <image class="u-swiper-image" :src="item.image"></image>
                        <image class="u-swiper-image" :src="item.image"></image>
                    </scroll-view>
                </view>

            </swiper-item>
        </swiper>
        <view class="u-swiper-indicator" :style="{
            justifyContent: justifyContent,
            padding: `0 ${effect3d ? '74rpx' : '24rpx'}`
        }">
            <block v-if="indicatorMode == 'rect'">
                <view class="u-indicator-item-rect" :class="{ 'u-indicator-item-rect-active': index == uCurrent }"
                    v-for="(item, index) in list" :key="index"></view>
            </block>
            <block v-if="indicatorMode == 'dot'">
                <view class="u-indicator-item-dot" :class="{ 'u-indicator-item-dot-active': index == uCurrent }"
                    v-for="(item, index) in list" :key="index"></view>
            </block>
            <block v-if="indicatorMode == 'round'">
                <view class="u-indicator-item-round" :class="{ 'u-indicator-item-round-active': index == uCurrent }"
                    v-for="(item, index) in list" :key="index"></view>
            </block>
            <block v-if="indicatorMode == 'number'">
                <view class="u-indicator-item-number">{{ uCurrent + 1 }}/{{ list.length }}</view>
            </block>
        </view>
        <slot></slot>
    </view>
</template>


<style lang="scss" scoped>
// @mixin vue-flex($direction: row)
@import 'vk-uview-ui/libs/css/style.components.scss';

.u-swiper-wrap {
    position: relative;
    // overflow: hidden;
    transform: translateY(0);
}

.u-swiper-image {
    width: 100%;
    will-change: transform;
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    /* #ifdef H5 */
    pointer-events: none;
    /* #endif */
}

.u-swiper-indicator {
    padding: 0 24rpx;
    position: absolute;
    bottom: -40rpx;
    @include vue-flex;
    width: 100%;
    z-index: 1;
}

.u-indicator-item-rect {
    width: 56rpx;
    height: 8rpx;
    margin: 0 6rpx;
    transition: all 0.5s;
    background-color: #F5F5F5;
}

.u-indicator-item-rect-active {
    background-color: rgba(0, 0, 0, 0.6);
}

.u-indicator-item-dot {
    width: 14rpx;
    height: 14rpx;
    margin: 0 6rpx;
    border-radius: 20rpx;
    transition: all 0.5s;
    background-color: #F5F5F5;
}

.u-indicator-item-dot-active {
    background-color: rgba(0, 0, 0, 0.6);
}

.u-indicator-item-round {
    width: 14rpx;
    height: 14rpx;
    margin: 0 6rpx;
    border-radius: 20rpx;
    transition: all 0.5s;
    background-color: #F5F5F5;
}

.u-indicator-item-round-active {
    width: 34rpx;
    background-color: rgba(0, 0, 0, 0.6);
}

.u-indicator-item-number {
    padding: 6rpx 16rpx;
    line-height: 1;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 100rpx;
    font-size: 26rpx;
    color: #F5F5F5;
}

.u-list-scale {
    transform-origin: center center;
}

.u-list-image-wrap {
    width: 100%;
    height: 100%;
    flex: 1;
    transition: all 0.5s;
    overflow: hidden;
    box-sizing: content-box;
    position: relative;
}

.u-swiper-item {
    @include vue-flex;
    overflow: hidden;
    align-items: center;
}
</style>
