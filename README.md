## ELeMaVue
该项目是模仿饿了么app商家界面，利用vue.js实现

### 项目技术
vue.js2.x + vue-router + axios + stylus  + webpack

### 项目心得
#### 1、axios网络框架封装
network.js文件是对axios网络框架进行的封装，并做了如下处理：

+ 创建axios对象，统一设置超时时间、baseURL、请求头
+ 设置axios对象的请求拦截器，处理post请求下的数据格式转换
+ 设置axios对象的响应拦截器，处理session过期
+ 封装get、post方法，并对请求参数进行数据格式转换
+ 封装取消网络请求方法

#### 2、sticky footer布局
stciky footer布局最主要有以下要点：

+ 需要四个容器，一个外层容器，包裹一个内容容器并且再包含一个显示具体内容的容器，最后一个底部固定容器与内容容器平级
+ 设置显示具体内容的padding-bottom与固定在底部的容器的margin-top和height相等
+ 外层容器使用fixed定位，固定在底部的容器使用relative定位


```
   .seller-detail  // 最外层容器
        position fixed
        width 100%
        height 100%
        overflow auto
        .detail-wrapper  // 内容容器
            min-height 100%
            width 100%
            .detail-main // 显示内容的容器
                padding-bottom 32px
        .detail-close // 固定在底部的容器
            position relative
            width 32px
            height 32px
            margin -32px auto 0 auto
            clear both 
```


#### 3、自定义实现商品界面列两个列表的联动
该功能主要技术点和逻辑处理如下：

+ 利用overflow-y scroll实现列表的垂直方向滚动，并且overflow-x hidden隐藏水平方向的滚动
+ 在data中定义listHeight数组，存放每个li标签的高度
+ 监听食品列表的滑动事件，记录滑动的位置
+ 给食品分类列表绑定一个计算属性，计算当前滑动的位置在listHeight数组中的哪一个区间，从而返回对应的数组下标，即对应食品列表中相应的分类
+ 当点击食品分类列表中的item时，获取到当前item对应的下标，从listHeight中取出高度，同时让食品列表滚动到对于的高度

#### 4、vue2.x新特性
+ v-for使用过程中，需要注意添加“：key”，否则会报错，原因官网也未做具体说明。

```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div> 
```
