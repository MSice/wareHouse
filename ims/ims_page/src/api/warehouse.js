import request from '@/utils/request';

export function getWareInfo(token, data) {
  return request({
    url: '/warehouse/getWareInfo',
    method: 'post',
    params: { token },
    data
  })
}

export function selectAll(token) {
  return request({
    url: '/warehouse/selectAll',
    method: 'post',
    params: { token },
  })
}

export function insertWare(token, data) {
  return request({
    url: '/warehouse/insertWare',
    method: 'post',
    params: { token },
    data
  })
}

export function deleteWare(token, data) {
  return request({
    url: '/warehouse/deleteWare',
    method: 'post',
    params: { token },
    data
  })
}

export function updateWare(token, data) {
  console.log(data);
  
  return request({
    url: '/warehouse/updateWare',
    method: 'post',
    params: { token },
    data
  })
}

export function getUser(token, data) {
  console.log(data);
  return request({
    url: '/warehouse/getUser',
    method: 'post',
    params: { token },
    data
  })
}
