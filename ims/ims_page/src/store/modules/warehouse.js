import { getWareInfo, selectAll, insertWare, deleteWare ,updateWare,getUser } from '@/api/warehouse'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    w_id: '',
    w_aid: '',
    w_content: '',
    w_remarks: '',
    w_snumber: '',
  }
}

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //设置仓库Id
  SET_ID: (state, w_id) => {
    state.w_id = w_id
  },
  //设置管理员Id
  SET_AID: (state, w_aid) => {
    state.w_aid = w_aid
  },
  //设置
  SET_CONTENT: (state, w_content) => {
    state.w_content = w_content
  },
  SET_REMARKS: (state, w_remarks) => {
    state.w_remarks = w_remarks
  },
  SET_LASTNUMBER: (state, w_snumber) => {
    state.w_snumber = w_snumber
  }
}

const actions = {
  //查询一条具体信息
  getWareInfo({ commit, state }, w_id) {
    return new Promise((resolve, reject) => {
      getWareInfo(state.token, { id: w_id }).then(response => {
        const { data } = response
        if (!data) {
          reject('数据请求失败！')
        }
        const { w_id, w_aid, w_content, w_remarks, w_snumber } = data

        commit('SET_ID', w_id)
        commit('SET_AID', w_aid)
        commit('SET_CONTENT', w_content)
        commit('SET_REMARKS', w_remarks)
        commit('SET_LASTNUMBER', w_snumber)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //查询全部仓库信息
  selectAll({ commit, state }, callback) {
    return new Promise((resolved, reject) => {
      selectAll(state.token).then(data => {
        callback(data);
      })
    })
  },
  //添加仓库信息
  insertWare({ state }, info) {
    return new Promise((resolved, reject) => {
      insertWare(state.token, info).then(data => {
        resolved(data)
      })
    })
  },
  //删除仓库信息
  deleteWare({ state }, w_id) {
    return new Promise((resolve, reject) => {
      deleteWare(state.token,{ id: w_id }).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },
  //修改仓库信息
  updateWare({ state }, info) {
    return new Promise((resolve, reject) => {
      console.log(info);
      
      updateWare(state.token,info).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUser({ commit, state }, callback) {
    return new Promise((resolved, reject) => {
      getUser(state.token).then(data => {
        callback(data);
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
