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
                    return [
                        {
                            price: 10,
                            count: 1
                        }
                    ]
                }
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
</style>
