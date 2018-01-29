<template>
  <div id="app">
    <top-header :seller="seller"></top-header>
    <div class="tab-navigater">
        <router-link class="tab-item" to="/goods">商品</router-link>
        <router-link class="tab-item" to="/ratings">评论</router-link>
        <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
      <router-view :seller="seller"></router-view>
    <!--<div class="content">-->
      <!--content-->
    <!--</div>-->
  </div>
</template>

<script>
  import topHeader from 'components/header/topHeader.vue'

  export default {
    name: 'App',
    data () {
        return {
            seller: {}
        }
    },
    components: {
        'top-header': topHeader
    },
    created () {
        let _this = this
        this.$axios.get('seller').then(function (response) {
            _this.seller = response
            console.log('数据是' + _this.seller)
        })
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
    #app
      .tab-navigater
        display flex
        width 100%
        height 40px
        line-height 40px
        .tab-item
            flex 1
            text-align center
            display block
            font-size 14px
            color rgb(77, 85, 93)
        .router-link-active
            color rgb(240, 20, 20)
</style>
