import request from '@/utils/request';

export function selectAll(token) {
  return request({
    url: '/driver/selectAll',
    method: 'post',
    params: { token },
  })
}

export function insertDriver(token, data) {
  return request({
    url: '/driver/insertDriver',
    method: 'post',
    params: { token },
    data
  })
}

export function deleteDriver(token, data) {
  return request({
    url: '/driver/deleteDriver',
    method: 'post',
    params: { token },
    data
  })
}

export function updateDriver(token, data) {
  console.log(data);
  
  return request({
    url: '/driver/updateDriver',
    method: 'post',
    params: { token },
    data
  })
}

export function run(token, data) {
  console.log(data);
  
  return request({
    url: '/driver/run',
    method: 'post',
    params: { token },
    data
  })
}

