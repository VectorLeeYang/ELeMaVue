<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount > 0}">
                        <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
                    </div>
                    <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight': totalCount > 0}">￥{{totalPrice}}元</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">{{payDece}}</div>
            </div>
        </div>
        <div class="ball-container">
            <template  v-for="(ball, index) in balls">
                <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" :key="index">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'shopcart',
        props: {
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            selectedFoods: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data () {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                dropBalls: [],
                fold: true
            }
        },
        computed: {
            totalPrice: function () {
                let totalPrice = 0
                this.selectedFoods.forEach((food) => {
                    totalPrice += food.price * food.count
                })
                return totalPrice
            },
            totalCount: function () {
                let count = 0
                this.selectedFoods.forEach((food) => {
                    count += food.count
                })
                return count
            },
            payDece: function () {
                if (this.totalPrice === 0) {
                    return '需￥' + this.minPrice + '起送'
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice
                    return '还差￥' + diff + '元起送'
                } else {
                    return '去结算'
                }
            },
            payClass: function () {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough'
                } else {
                    return 'enough'
                }
            }
        },
        methods: {
            drop (el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i]
                    if (!ball.show) {
                        ball.show = true
                        ball.el = el
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            beforeEnter (el) {
                let count = this.balls.length
                while (count--) {
                    let ball = this.balls[count]
                    if (ball.show) {
                        // getBoundingClientRect 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom
                        let rect = ball.el.getBoundingClientRect()
                        let x = rect.left - 32
                        let y = -(window.innerHeight - rect.top - 22)

                        el.style.display = ''

                        el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                        el.style.transform = `translate3d(0, ${y}px, 0)`

                        let inner = el.getElementsByClassName('inner-hook')[0]
                        inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
                        inner.style.transform = `translate3d(${x}px, 0, 0)`
                    }
                }
            },
            enter (el) {
                /* 触发浏览器重绘 */
                /* eslint-disable */
                let rf = el.offsetHeight
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0, 0, 0)'
                    el.style.transform = 'translate3d(0, 0, 0)'

                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)'
                    inner.style.transform = 'translate3d(0, 0, 0)'
                })
            },
            afterEnter (el) {
                let ball = this.dropBalls.shift()
                if (ball) {
                    ball.show = false
                    el.style.display = 'none'
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="true">
    @import "../../common/stylus/icon.styl"
    .shopcart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        background #000
        .content
            display flex
            background #141d27
            color #80858a
            .content-left
                flex 1
                font-size 0
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    border-radius 50%
                    background #141d27
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b343c
                        text-align center
                        &.highlight
                            background rgb(0, 160, 220)
                        .icon-shopping_cart
                            font-size 24px
                            line-height 44px
                            &.highlight
                                color #fff
                    .num
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        font-size 9px
                        font-weight 700
                        color white
                        background red
                        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                        border-radius 10px
                .price
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin-top 12px
                    box-sizing border-box
                    padding-right 12px
                    border-right  1px solid rgba(255, 255, 255, 0.1)
                    font-size 16px
                    font-weight 700
                    &.highlight
                        color white
                .desc
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin 12px 0 0 12px
                    font-size 15px
            .content-right
                flex 0 0 105px
                width 105px
                background #2b333b
                .pay
                    line-height 48px
                    height 48px
                    text-align center
                    font-size 15px
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color  white
        .ball-container
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 200
                .inner
                    width 16px
                    height 16px
                    border-radius 50%
                    background rgb(0, 160, 220)
                &.drop-enter-active
                    transition: all .5s cubic-bezier(.49, -0.29, .75, .41)
                    .inner
                        transition: all .5s linear

</style>
