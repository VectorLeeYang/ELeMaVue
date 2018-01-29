<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" :key="item.id" class="menu-item">
                    <span class="text">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" :key="item.id" class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" :key="food.id" class="food-item">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon"/>
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Goods',
        data () {
            return {
                goods: [],
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                topStatus: '',
                pageNo: 1,
                allLoaded: false,
                bottomText: '上拉加载更多...',
                numPerPage: 4,
                settings: {
                    title: '添加常客'
                },
                bottomStatus: '',
                wrapperHeight: 0,
                translate: 0,
                moveTranslate: 0
            }
        },
        props: {
            seller: {
                type: Object
            }
        },
        created () {
            let _this = this
            this.$axios.get('goods').then(function (response) {
                _this.goods = response
            })
        },
        methods: {
            translateChange (translate) {
                const translateNum = +translate
                this.translate = translateNum.toFixed(2)
                this.moveTranslate = (1 + translateNum / 70).toFixed(2)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="true">
    @import "../../common/stylus/mixin"
    .goods
        display flex
        position absolute
        top 174px
        bottom 46px
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background #f3f5f7
            overflow-y scroll
            overflow-x hidden
            .menu-item
                display table
                height 54px
                width 56px
                line-height 14px
                padding 0 12px
                .icon
                    display inline-block
                    width 16px
                    height 16px
                    vertical-align top
                    margin-right 2px
                    background-size 16px 16px
                    background-repeat no-repeat
                .text
                    display table-cell
                    width 56px
                    vertical-align middle
                    font-size 12px
        .foods-wrapper
            flex 1
            overflow-y scroll
            .food-list
                .title
                    padding-left 14px
                    height 26px
                    line-height 26px
                    border-left 2px solid #d9dde1
                    font-size 12px
                    color rgb(147, 153, 159)
                    background #f3f5f7
                .food-item
                    display flex
                    margin 18px
                    .icon
                        flex 0 0 57px
                        margin-right 10px
                    .content
                        flex 1
                        .name
                            margin 2px 0 8px 0
                            height 14px
                            line-height 14px
                            font-size 14px
                            color rgb(7, 17, 27)
                        .desc
                            margin-bottom 8px
                            line-height 10px
                            font-size  10px
                            color rgb(147, 153, 159)
                        .extra
                            line-height 10px
                            font-size  10px
                            color rgb(147, 153, 159)
                            &.count
                                margin-right 12px
                        .price
                            line-height 10px
                            font-size  12px
                            margin-top 10px
                            .now
                                color orangered
                            .old
                                color rgb(147, 153, 159)
        .discount
            bg-image('../header/discount_2')
        .decrease
            bg-image('../header/decrease_2')
        .guarantee
            bg-image('../header/guarantee_2')
        .invoice
            bg-image('../header/invoice_2')
        .special
            bg-image('../header/decrease_2')
        ::-webkit-scrollbar
            display none // 隐藏滚动条
</style>
