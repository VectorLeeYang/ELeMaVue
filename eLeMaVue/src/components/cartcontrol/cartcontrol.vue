<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease"
                 v-show="food.count > 0"
                 @click="decreaseCart">
                <span class="icon-remove_circle_outline inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'cartcontrol',
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart: function () {
                if (typeof this.food.count === 'undefined') {
                    //  两种注册方式都可以
                    Vue.set(this.food, 'count', 1)
                    // this.$set(this.food, 'count', 1)
                } else {
                    this.food.count++
                }
                this.$root.eventHub.$emit('cartAdd', event.target)
            },
            decreaseCart: function () {
                if (this.food.count > 0) {
                    this.food.count--
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/icon.styl"
    .cartcontrol
        font-size 0
        .cart-decrease
            position absolute
            display inline-block
            padding 6px
            right 70px
            transition all 0.4s linear
            .inner
                display inline-block
                font-size 24px
                line-height 24px
                color rgb(0, 160, 220)
                transition all 0.4s linear
            &.move-transtion
                opacity 1
                transform translate3d(0, 0, 0)
                .inner
                    transition: all .5s;
                    transform: rotate(180deg)
            &.move-enter, &.move-leave
                opacity 0
                transform translate3d(24px, 0, 0)
        .cart-count
            position absolute
            display inline-block
            padding 6px
            font-size 16px
            line-height 24px
            color black
            vertical-align top
            right 45px
        .cart-add
            position absolute
            display inline-block
            font-size 24px
            line-height 24px
            padding 6px
            right 5px
            color rgb(0, 160, 220)
</style>
