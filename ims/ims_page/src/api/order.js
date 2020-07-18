import request from '@/utils/request';


//查询所有点单
export function selectAll(token) {
  return request({
    url: '/order/selectAll',
    method: 'post',
    params: { token },
  })
}

//查询所有待审核订单
export function selectCheckAll(token) {
  return request({
    url: '/order/selectCheckAll',
    method: 'post',
    params: { token },
  })
}

//查询所有审核订单
export function selectCheckAll1(token) {
  return request({
    url: '/order/selectCheckAll1',
    method: 'post',
    params: { token },
  })
}

//获取退换货单
export function getReturnInfo(token) {
  return request({
    url: '/order/getReturnInfo',
    method: 'post',
    params: { token },
  })
}

//新增订单
export function insertOrder(token, data) {
  return request({
    url: '/order/insertOrder',
    method: 'post',
    params: { token },
    data
  })
}

//删除订单
export function deleteOrder(token, data) {
  return request({
    url: '/order/deleteOrder',
    method: 'post',
    params: { token },
    data
  })
}

//退货处理
export function returnGoods(token, data) {
  return request({
    url: '/order/returnGoods',
    method: 'post',
    params: { token },
    data
  })
}

//订单审核
export function checkOrder(token, data) {
  console.log(11111);
  
  console.log(data);
  
  return request({
    url: '/order/checkOrder',
    method: 'post',
    params: { token },
    data
  })
}

//修改订单
export function updateOrder(token, data) {
  console.log(data);
  
  return request({
    url: '/order/updateOrder',
    method: 'post',
    params: { token },
    data
  })
}

//换货

export function barterGoods(token, data) {
  console.log(data);
  
  return request({
    url: '/order/barterGoods',
    method: 'post',
    params: { token },
    data
  })
}