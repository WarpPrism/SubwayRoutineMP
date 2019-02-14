# 微信小程序服务模块

## 使用说明

``` step 01 ```

在package.json中添加字段

``` json
"dependencies": {
  "service": "packages/lib/service"
}
```

``` step 02 ```

安装依赖包

```bash
npm install
```

## 构造参数

与原生小程序api中wx.request参数相同，在此基础上，新增 ``` baseURL ``` 字段

可参考如下示例：

> 先创建一个service实例


```javascript
// api/index.js
import service from 'service'

const Docer = service.create({
  baseURL: 'https://www.docer.com/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

```

> 暴露具体的请求接口,service实例支持和原生小程序同样的请求方式，如：post、get、put、delete等

```javascript
export const getA = ({ a, b } = {}) => Docer.post('/actionA', {
  data: { a, b }
})
```

> 调用接口

```javascript
import * as Api from '@/api'

Api.getA({
  a: 1,
  b: 2
}).then(res => {
  console.log(res)
})
```
