<template>
    <view class="u-swiper-wrap" :style="{
        borderRadius: `${borderRadius}rpx`
    }">
        <swiper :current="elCurrent" @change="change" :interval="interval" :circular="circular" :duration="duration"
            :autoplay="autoplay" :previous-margin="effect3d ? effect3dPreviousMargin + 'rpx' : '0'"
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
                        <image class="u-swiper-image" :src="item[name] || item"></image>
                        <image class="u-swiper-image" :src="item[name] || item"></image>
                        <image class="u-swiper-image" :src="item[name] || item"></image>
                        <image class="u-swiper-image" :src="item[name] || item"></image>
                    </scroll-view>
                </view>

            </swiper-item>
        </swiper>
        <view class="u-swiper-indicator" :style="{
            justifyContent: justifyContent,
            padding: `0 ${effect3d ? '74rpx' : '24rpx'}`
        }">
            <block v-if="mode == 'rect'">
                <view class="u-indicator-item-rect" :class="{ 'u-indicator-item-rect-active': index == uCurrent }"
                    v-for="(item, index) in list" :key="index"></view>
            </block>
            <block v-if="mode == 'dot'">
                <view class="u-indicator-item-dot" :class="{ 'u-indicator-item-dot-active': index == uCurrent }"
                    v-for="(item, index) in list" :key="index"></view>
            </block>
            <block v-if="mode == 'round'">
                <view class="u-indicator-item-round" :class="{ 'u-indicator-item-round-active': index == uCurrent }"
                    v-for="(item, index) in list" :key="index"></view>
            </block>
            <block v-if="mode == 'number'">
                <view class="u-indicator-item-number">{{ uCurrent + 1 }}/{{ list.length }}</view>
            </block>
        </view>
        <slot></slot>
    </view>
</template>

<script>
/**
 * CardSwiper 多卡片轮播展示组件
 * @property {Array} list 卡片数据
 * @property {String} mode 指示器模式，见官网说明（默认rect）
 * @property {String Number} height 轮播图组件高度，单位rpx（默认516）
 * @property {String} indicator-pos 指示器的位置（默认bottomCenter）
 * @property {Boolean} effect3d 是否开启3D效果（默认true）
 * @property {Boolean} autoplay 是否自动播放（默认true）
 * @property {String Number} interval 自动轮播时间间隔，单位ms（默认2500）
 * @property {Boolean} circular 是否衔接播放，见官网说明（默认true）
 * @property {String Number} border-radius 轮播图圆角值，单位rpx（默认8）
 * @property {String Number} effect3d-previous-margin mode = true模式的情况下，激活项与前后项之间的距离，单位rpx（默认50）
 * @event {Function} click 点击轮播图时触发
 */
export default {
    name: "CardSwiper",
    emits: ["change"],
    props: {
        // 轮播图的数据,格式如：[{image: 'xxxx'}, {image: 'yyyy'}]
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        // 用户自定义的指示器的样式
        indicator: {
            type: Object,
            default() {
                return {};
            }
        },
        // 圆角值
        borderRadius: {
            type: [Number, String],
            default: 16
        },
        // 隔多久自动切换
        interval: {
            type: [String, Number],
            default: 3000
        },
        // 指示器的模式，rect|dot|number|round
        mode: {
            type: String,
            default: 'rect'
        },
        // list的高度，单位rpx
        height: {
            type: [Number, String],
            default: 516
        },
        // 指示器的位置，topLeft|topCenter|topRight|bottomLeft|bottomCenter|bottomRight
        indicatorPos: {
            type: String,
            default: 'bottomCenter'
        },
        // 是否开启缩放效果
        effect3d: {
            type: Boolean,
            default: true
        },
        // 3D模式的情况下，露出前、后一项的一小部分，单位rpx
        effect3dPreviousMargin: {
            type: [Number, String],
            default: 40
        },
        // 是否自动播放
        autoplay: {
            type: Boolean,
            default: false
        },
        // 自动轮播时间间隔，单位ms
        duration: {
            type: [Number, String],
            default: 500
        },
        // 是否衔接滑动，即到最后一张时接着滑动，是否自动切换到第一张
        circular: {
            type: Boolean,
            default: false
        },
        // 从list数组中读取的图片的属性名
        name: {
            type: String,
            default: 'image'
        },
        // 初始化时，默认显示第几项
        current: {
            type: [Number, String],
            default: 0
        },
    },
    watch: {
        // 如果外部的list发生变化，判断长度是否被修改，如果前后长度不一致，重置uCurrent值，避免溢出
        list(nVal, oVal) {
            if (nVal.length !== oVal.length) this.uCurrent = 0;
        },
        // 监听外部current的变化，实时修改内部依赖于此测uCurrent值，如果更新了current，而不是更新uCurrent，
        // 就会错乱，因为指示器是依赖于uCurrent的
        current(n) {
            this.uCurrent = n;
        }
    },
    data() {
        return {
            uCurrent: this.current // 当前活跃的swiper-item的index
        };
    },
    computed: {
        justifyContent() {
            if (this.indicatorPos == 'topLeft' || this.indicatorPos == 'bottomLeft') return 'flex-start';
            if (this.indicatorPos == 'topCenter' || this.indicatorPos == 'bottomCenter') return 'center';
            if (this.indicatorPos == 'topRight' || this.indicatorPos == 'bottomRight') return 'flex-end';
        },
        // 因为uni的swiper组件的current参数只接受Number类型，这里做一个转换
        elCurrent() {
            return Number(this.current);
        }
    },
    methods: {
        change(e) {
            let current = e.detail.current;
            this.uCurrent = current;
            // 发出change事件，表示当前自动切换的index，从0开始
            this.$emit('change', current);
        },

    }
};
</script>

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
