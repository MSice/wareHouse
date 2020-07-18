import { getInfo, Delete, update, insertHouse, buyHouse } from '@/api/good'
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
    getInfo({ commit, state }, info = '') {
        return new Promise((resolve, reject) => {
            getInfo(state.token, { id: info }).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                // const { } = data
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    Delete({ commit, state }, info) {
        console.log(info);

        return new Promise((resolve, reject) => {
            Delete(state.token, { id: info }).then(response => {
                const { data } = response
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                // const { } = data
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
 
    //修改货物信息
    update({ state }, info) {
    return new Promise((resolve, reject) => {
      console.log(info);
      update(state.token,info).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },
  
//货物入库

insertHouse({ state }, info) {
    return new Promise((resolved, reject) => {
        insertHouse(state.token, info).then(data => {
        resolved(data)
      })
    })
  },

  //购入
  buyHouse({ state }, info) {
    return new Promise((resolve, reject) => {
      console.log(info);
      buyHouse(state.token,info).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}

