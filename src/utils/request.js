import axios from 'axios'

// 设置全局默认请求头类型和编码
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const instance = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求是否都要携带token
    //  重复请求如何处理

    // 最终发出请求
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应状态码判断后对数据进行对应处理再返回
    if (response.status === 200) {
      return response.data
    } else {
      Promise.reject()
    }
  },
  error => {
    console.log(error)
    // 通过判断错误信息报不同的错误信息
    return Promise.reject(error)
  }
)

// 导出axios实例
export default instance
