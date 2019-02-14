/**
 * 微信小程序服务模块
 */

import merge from 'lodash/merge'

const __WX__ = !!wx // 环境常量，判断是否处于小程序

export default class Service {
  constructor (props = {}) {
    this.props = merge({
      baseURL: ''
    }, props)
  }

  static create (props = {}) {
    return new Service(props)
  }

  // request
  fetch (params = {}) {
    if (__WX__) {
      return this._wxFetch(params)
    } else {
      return Promise.reject(new Error('暂只支持小程序环境'))
    }
  }

  // wx request
  _wxFetch (params = {}) {
    return new Promise((resolve, reject) => {
      try {
        wx.request(merge({}, this.props, params, {
          success: resolve,
          fail: reject
        }))
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 拼接完整请求地址
   *
   * @param {any} baseUrl
   * @param {any} relativeUrl
   * @returns
   * @memberof DataService
   */
  combineURLs (baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL
  }

  // method

  option (url, params) {
    return this.fetch(merge({}, params, {
      url: this.combineURLs(this.props.baseURL, url),
      method: 'OPTIONS'
    }))
  }

  get (url, params) {
    return this.fetch(merge({}, params, {
      url: this.combineURLs(this.props.baseURL, url),
      method: 'GET'
    }))
  }

  post (url, params) {
    return this.fetch(merge({}, params, {
      url: this.combineURLs(this.props.baseURL, url),
      method: 'POST'
    }))
  }

  put (url, params) {
    return this.fetch(merge({}, params, {
      url: this.combineURLs(this.props.baseURL, url),
      method: 'PUT'
    }))
  }

  delete (url, params) {
    return this.fetch(merge({}, params, {
      url: this.combineURLs(this.props.baseURL, url),
      method: 'DELETE'
    }))
  }
}
