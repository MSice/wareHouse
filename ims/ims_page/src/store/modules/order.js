import { insertOrder, selectAll, deleteOrder, updateOrder, selectCheckAll, checkOrder, getReturnInfo, returnGoods, barterGoods, selectCheckAll1 } from '@/api/order'
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
  //查询全部订单信息
  selectAll({ commit, state }, callback) {
    return new Promise((resolved, reject) => {
      selectAll(state.token).then(data => {
        callback(data);
      })
    })
  },
  //查询全部未审核信息
  selectCheckAll({ commit, state }, callback) {
    return new Promise((resolved, reject) => {
      selectCheckAll(state.token).then(data => {
        callback(data);
      })
    })
  },
  //查询全部审核信息
  selectCheckAll1({ commit, state }, callback) {
    return new Promise((resolved, reject) => {
      selectCheckAll1(state.token).then(data => {
        callback(data);
      })
    })
  },
  //添加订单信息
  insertOrder({ state }, info) {
    return new Promise((resolved, reject) => {
      insertOrder(state.token, info).then(data => {
        resolved(data)
      })
    })
  },
  //删除订单信息
  deleteOrder({ state }, o_id) {
    return new Promise((resolve, reject) => {
      deleteOrder(state.token, { id: o_id }).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

  //订单审查
  checkOrder({ state }, info) {
    return new Promise((resolve, reject) => {
      console.log(info);
      console.log(111111);

      checkOrder(state.token, { id: info }).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

  //修改订单信息
  updateOrder({ state }, info) {
    return new Promise((resolve, reject) => {
      console.log(info);
      updateOrder(state.token, info).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取退换货单

  getReturnInfo({ commit, state }, callback) {
    return new Promise((resolved, reject) => {
      getReturnInfo(state.token).then(data => {
        callback(data);
      })
    })
  },

  //退货

  returnGoods({ state }, info) {
    return new Promise((resolve, reject) => {
      returnGoods(state.token, info).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },


  //换货
  barterGoods({ state }, info) {
    return new Promise((resolve, reject) => {
      barterGoods(state.token, info).then(data => {
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
