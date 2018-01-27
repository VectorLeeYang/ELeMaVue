/*
*
*  网络请求
*
* */

/* eslint-disable */

import axios from 'axios'
import qs from 'qs'

// 当前正在调用的接口
let requestArray = []

// axios 全局默认配置
let instance = axios.create({})
instance.defaults.timeout = 60000
instance.defaults.baseURL = '/api/'
instance.defaults.headers.post['Content-Type'] = 'application/json'
// request 拦截器
instance.interceptors.request.use(function (config) {
  // TODO: loading 动画
  if (config.method === 'post') {
    config.data = JSON.stringify(config.data)
  }

  console.log(config.data)
  console.log('请求拦截器')
  console.log(config)

  return config
}, function (error) {
  console.log('request error: ' + error.messages)
  console.log('request 失败拦截器' + error.messages)
  return Promise.reject(error)
})

// response 拦截器
instance.interceptors.response.use(function (response) {
  console.log('响应拦截器')
    /* 用mock数据 模拟请求过程没有是否成功的标志，都会成功
   if (response.messageCode === 'SESSION_INVALIDATE') {
     // TODO: session 过期处理
     alert('session 过期处理')
     return Promise.reject({notRealPromiseException: true})
   }
   */
   return response
 }, function (error) {
   console.log(error)
   console.log('response 失败拦截器')
    /* 用mock数据 模拟请求过程没有是否成功的标志，都会成功
   if (error.response.status >= 400 && error.response.status < 600) {
     alert(error.message)
     return Promise.reject({notRealPromiseException: true})
   }
   */
   return Promise.reject(error)
 })

 // 请求封装实体
 const Network = {
     /*
    *  get 请求
    *
    *  @param url 请求相对url
    *  @param params 请求参数
    *  @description 基于 Promise 实现，通过 .then() 添加请求成功处理方法，.catch() 添加请求错误处理方法
    *
    * */
    get: function (url) {
        return new Promise(function (resolve, reject) {
            // 创建 cancelToken 用于取消请求
            let cancelToken = axios.CancelToken
            let source = cancelToken.source()
            requestArray.push({key: '/api/' + url})
            instance.get(url, {
            }).then(function (response) {
                removeDoneRequest(url)
                console.log('get success: ')
                resolve(response.data.data)
                /* 用mock数据 模拟请求过程没有是否成功的标志，都会成功
                if (response.data.messageCode === '1') {
                    console.log('messageCode == 1')
                    resolve(response.data)
                } else {
                    console.log('messageCode !== 1')
                    return Promise.reject(response.data)
                }
                */
            }).catch(function (error) {
                if (error.notRealPromiseException) {
                    // 主动中断 Promise 链
                    return true
                }
                removeDoneRequest(url)
                console.log('get error: ')
                console.log(error)
                reject(error)
            })
        })
    },


  /*
  *  get 请求
  *
  *  @param url 请求相对url
  *  @param params 请求参数
  *  @description 基于 Promise 实现，通过 .then() 添加请求成功处理方法，.catch() 添加请求错误处理方法
  *
  * */
  getWithParams: function (url, params) {
    return new Promise(function (resolve, reject) {
      // 创建 cancelToken 用于取消请求
      let cancelToken = axios.CancelToken
      let source = cancelToken.source()
      requestArray.push({key: '/api/' + url, source: source})
      instance.get(url, {
        params: qs.stringify(params),
        cancelToken: source.token
      }).then(function (response) {
        removeDoneRequest(url)
        console.log('。。。。')
        console.log(params)
        console.log('get success: ')
        console.log(response)
        if (response.data.messageCode === '1') {
          console.log('messageCode == 1')
          resolve(response.data)
        } else {
          console.log('messageCode !== 1')
          return Promise.reject(response.data)
        }
      }).catch(function (error) {
        if (error.notRealPromiseException) {
          // 主动中断 Promise 链
          return true
        }
        removeDoneRequest(url)
        console.log('get error: ')
        console.log(error)
        reject(error)
      })
    })
  },
  /*
  *  post 请求
  *
  *  @param url 请求相对url
  *  @param params 请求参数
  *  @description 基于 Promise 实现，通过 .then() 添加请求成功处理方法，.catch() 添加请求错误处理方法
  *
  * */
  post: function (url, params) {
    return new Promise(function (resolve, reject) {
      // 创建 cancelToken 用于取消请求
      let cancelToken = axios.CancelToken
      let source = cancelToken.source()
      requestArray.push({key: '/api/' + url, source: source})
      instance.post(url, params, {
        cancelToken: source.token
      }).then(function (response) {
        removeDoneRequest(url)
        console.log('post success: ')
        console.log(response)
        if (response.data.messageCode === '1') {
          console.log('messageCode == 1')
          resolve(response.data.responseObject)
        } else {
          console.log('messageCode !== 1')
          return Promise.reject(response.data)
        }
      }).catch(function (error) {
        if (error.notRealPromiseException) {
            // 主动中断 Promise 链
          return true
        }
        removeDoneRequest(url)
        console.log('post error: ')
        console.log(error)
        reject(error)
      })
    })
  },
  /*
  *  取消一个请求
  *
  *  @param url 要取消的请求相对 url
  * */
  cancelRequest: function (url) {
    console.log('cnacel request method  ' + url)
    console.log(requestArray.length)
    let obj = requestArray[0]
    console.log(obj.key)
    console.log(obj.source)
    if (requestArray.length > 0) {
      requestArray.every(function (obj, index) {
        if (obj.key === url) {
          obj.source.cancel()
          requestArray.splice(index, 1)
          console.log('cnacel request success')
          return false
        }
        return true
      })
    }
  },
  /*
  *  取消当前所有的请求
  * */
  cancelAllRequest: function () {
    if (requestArray.length > 0) {
      requestArray.forEach(function (obj) {
        obj.source.cancel()
      })
      requestArray.splice(0, requestArray.length)
    }
  }
}

/*
*  移除请求数组中已完成的请求
* */
function removeDoneRequest (url) {
  requestArray.every(function (obj, index) {
    if (obj.key === url) {
      requestArray.splice(index, 1)
      return false
    }
    return true
  })
}

export default Network

/* eslint-enable */
