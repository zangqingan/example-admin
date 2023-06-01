import request from '@/utils/request'

export const fetchData = query => {
  return request({
    url: '/common/getDataById',
    method: 'get',
    params: query
  })
}
