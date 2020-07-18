import request from '@/utils/request'

export function getInfo(token, data) {
    return request({
        url: '/goodinfo/Ginfo',
        method: 'post',
        params: { token },
        data
    })
}
export function Delete(token, data) {
    return request({
        url: '/goodinfo/Delete',
        method: 'post',
        params: { token },
        data
    })
}

export function update(token, data) {
    return request({
        url: '/goodinfo/update',
        method: 'post',
        params: { token },
        data
    })
}

export function insertHouse(token, data) {
    return request({
        url: '/goodinfo/insertHouse',
        method: 'post',
        params: { token },
        data
    })
}

export function buyHouse(token, data) {
    return request({
        url: '/goodinfo/buyHouse',
        method: 'post',
        params: { token },
        data
    })
}


