import { selectAll, deleteDriver, updateDriver, insertDriver, run } from '@/api/driver'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
}

const actions = {
    //查询全部司机信息
    selectAll({ commit, state }, callback) {
        return new Promise((resolved, reject) => {
            selectAll(state.token).then(data => {
                callback(data);
            })
        })
    },
    //添加仓库信息
    insertDriver({ state }, info) {
        return new Promise((resolved, reject) => {
            insertDriver(state.token, info).then(data => {
                resolved(data)
            })
        })
    },
    //删除仓库信息
    deleteDriver({ state }, w_id) {
        return new Promise((resolve, reject) => {
            deleteDriver(state.token, { id: w_id }).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error)
            })
        })
    },
    //修改仓库信息
    updateDriver({ state }, info) {
        return new Promise((resolve, reject) => {
            console.log(info);

            updateDriver(state.token, info).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error)
            })
        })
    },
    run({ state }, info) {
        return new Promise((resolve, reject) => {
            console.log(info);

            run(state.token, info).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

