<template>
  <div class="top-header">
      <div class="content-wrapper">
          <div class="avatar">
              <img width="64" height="64" :src="seller.avatar"/>
          </div>
          <div class="content">
              <div class="title">
                  <span class="brand"></span>
                  <span class="name">{{seller.name}}</span>
              </div>
              <div class="description">
                  {{seller.description}}/{{seller.deliveryTime}}分钟送达
              </div>
              <div v-if="seller.supports" class="supports">
                  <span class="icon" :class="sellerIconClass"></span>
                  <span class="text">{{seller.supports[0].description}}</span>
              </div>
          </div>
          <div v-if="seller.supports" class="supports-count" @click="showSellerDetail">
              <span class="count">{{seller.supports.length}}个</span>
              <i class="icon-keyboard_arrow_right"></i>
          </div>
      </div>
      <div class="bulletin-wrapper" @click="showSellerDetail">
          <span class="bulletin-title"></span>
          <span class="bulletin-text">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="header-background">
          <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <div v-show="detailShow" class="seller-detail">
          <div class="detail-wrapper clearfix">
              <div class="detail-main">
                  <h1 class="detail-name">{{seller.name}}</h1>
                  <div class="star-wrapper">
                      <starRating :size="48" :score="seller.score"></starRating>
                  </div>
                  <div class="title">
                      <div class="line"></div>
                      <div class="text">优惠信息</div>
                      <div class="line"></div>
                  </div>
                  <ul v-if="seller.supports" class="supports">
                      <li class="support-item" v-for="(item, index) in seller.supports" :key="item.id">
                          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                          <span class="text">{{ seller.supports[index].description }}</span>
                      </li>
                  </ul>
                  <div class="title">
                      <div class="line"></div>
                      <div class="text">商家公告</div>
                      <div class="line"></div>
                  </div>
                  <div class="bulletin">
                      <p class="content">{{ seller.bulletin }}</p>
                  </div>
              </div>
          </div>
          <div class="detail-close" @click="closeSellerDetail">
              <span>关闭</span>
          </div>
      </div>
  </div>
</template>

<script>
    import starRating from '../starRating/starRating.vue'
    export default {
        name: 'top-header',
        data () {
            return {
                detailShow: false,
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            }
        },
        props: {
            seller: {
                type: Object
            }
        },
        computed: {
          sellerIconClass: function () {
              const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
              let className = classMap[this.seller.supports[0].type]
              return className
          }
        },
        methods: {
            showSellerDetail: function () {
                this.detailShow = true
            },
            closeSellerDetail: function () {
                this.detailShow = false
            }
        },
        components: {
            starRating
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="true">
    @import "../../common/stylus/mixin"
    @import "../../common/stylus/base.styl"
    .top-header
      color #fff
      background rgba(7, 17, 27, 0.5)
      position relative
      overflow hidden
      .content-wrapper
        position relative
        font-size 0
        padding 24px 12px 18px 24px
        .avatar
            display inline-block
            vertical-align top
        .content
            display inline-block
            margin-left 15px
            font-size 14px
            .title
                margin 2px 0 8px 0
                .brand
                    display inline-block
                    vertical-align top
                    width 30px
                    height 18px
                    bg-image('brand')
                    background-size 30px 18px
                    background-repeat no-repeat
                .name
                    margin-left 6px
                    font-size 16px
                    line-height 18px
                    font-weight bold
            .description
                margin-bottom 10px
                line-height 12px
                font-size 12px
            .supports
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 4px
                    background-size 12px 12px
                    background-repeat no-repeat
                .text
                    line-height 12px
                    font-size 12px
                    vertical-align top
        .supports-count
            position absolute
            right 12px
            bottom 14px
            padding 0 8px
            height 24px
            line-height 24px
            border-radius 14px
            background rgba(0 0 0 0.2)
            text-align center
            .count
                font-size 10px
            .icon-keyboard_arrow_right
                font-size 10px
                margin-left 2px
                line-height 24px
    .discount
        bg-image('discount_1')
    .decrease
        bg-image('decrease_1')
    .guarantee
        bg-image('guarantee_1')
    .invoice
        bg-image('invoice_1')
    .special
        bg-image('decrease_1')
      .bulletin-wrapper
        height 28px
        line-height 28px
        padding 0 22px 0 12px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        background rgba(7, 17, 27, 0.2)
        .bulletin-title
            display inline-block
            width 22px
            height 12px
            bg-image('bulletin')
            background-size 22px 12px
            vertical-align top
            margin-top 8px
        .bulletin-text
            margin-left 5px
            font-size 10px
            vertical-align top
      .header-background
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index -1
        filter blur(10px)
      .seller-detail
        position fixed
        z-index 100
        width 100%
        height 100%
        overflow auto
        background rgba(7, 17, 27, 0.8)
        top 0
        left 0
        .detail-wrapper
            min-height 100%
            width 100%
            .detail-main
                margin-top  64px
                padding-bottom 32px
                .detail-name
                    line-height 16px
                    text-align center
                    font-size 16px
                    font-weight 700
                .star-wrapper
                    margin-top 18px
                    padding 2px 0
                    text-align center
                .title
                    display flex
                    width 80%
                    margin 28px auto 24px
                    .line
                        flex 1
                        position relative
                        top -6px
                        border-bottom 1px solid rgba(255, 255, 255, .2)
                    .text
                        padding 0 12px
                        font-weight 700
                        font-size 14px
                .supports
                    width 80%
                    margin 0 auto
                    .support-item
                        padding 10px 12px
                        padding-bottom 12px;
                        font-size 12px
                        .icon
                            display inline-block
                            width 16px
                            height 16px
                            vertical-align top
                            margin-right 6px
                            background-size 16px 16px
                            background-repeat no-repeat
                        .text
                            ont-size: 12px
                            height 16px
                            line-height: 16px
                .bulletin
                    width 80%
                    margin 0 auto
                    .content
                        padding 0 12px
                        line-height 24px
                        font-size 12px
        .detail-close
            position relative
            width 32px
            height 32px
            margin -32px auto 0 auto
            clear both font-size 15px
</style>
