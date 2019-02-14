# wx-promise

将微信 API ```promise``` 处理

## Usage

```javascript
import _wx from 'wx-promise'

// use then
_wx
  .login()
  .then(res => {
    console.log('login success: ', res)
  })
  .catch(err => {
    // do something
  })

// or use async/await

async function () {
  try {
    const res = await _wx.login()
    console.log('login success: ', res)console.log()
  } catch (e) {
    // do something
  }
}
```