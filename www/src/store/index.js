import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let api = axios.create({
  baseURL: 'mykeepr.herokuapp.com/api',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'mykeepr.herokuapp.com/',
  timeout: 2000,
  withCredentials: true
})


// REGISTER ALL DATA HERE
let state = {
  user: {},
  vaults: {},
  myKeeps: [],
  keeps: [],
  vaultKeeps: [],
  activeKeep: {},
  searchResults: {},
  error: {}
}

let handleError = (err) => {
  state.error = err
}

export default new Vuex.Store({
  state,
  mutations: {
    setUser(state, user) {
      state.user = user
      router.push('/')
    },
    setLogin(state, user) {
      state.user = user
      router.push('/dashboard')
    },
    setLogout(state, user) {
      state.user = user
      state.vaults = {}
      router.push('/')
    },
    setVaults(state, vaults) {
      Vue.set(state, "vaults", vaults)
    },
    setKeeps(state, keeps) {
      state.myKeeps = keeps
    },
    setAllKeeps(state, keeps) {
      state.keeps = keeps
    },
    setCreateVaults(state, vault) {
      state.vaults.push(vault)
    },
    setCreateKeeps(state, keep) {
      state.myKeeps.push(keep)
      if (keep.public == true) {
        state.keeps = keep
      }
    },
    setVaultKeeps(state, keeps) {
      state.vaultKeeps = keeps
    },
    setActiveKeep(state, keep) {
      state.activeKeep = keep
    },
    setSearchKeeps(state, search) {
      Vue.set(state, "searchResults", search)
    }
  },
  actions: {
    register({ commit, dispatch }, user) {
      auth.post('register', user)
        .then(res => {
          if (res.data.error) {
            return handleError(res.data.error)
          }
          commit('setLogin', res.data.data)
        })
        .catch(handleError)
    },
    login({ commit, dispatch }, user) {
      auth.post('login', user)
        .then(res => {
          commit('setLogin', res.data.data)
        }).catch(handleError)
    },
    getAuth({ commit, dispatch }) {
      auth('authenticate')
        .then(res => {
          commit('setUser', res.data.data)
        }).catch(err => {
          router.push('/')
        })
    },
    logout({ commit, dispatch }, user) {
      auth.delete('logout', user)
        .then(res => {
          commit('setLogout', res.data.data)
        }).catch(handleError)
    },
    getvaults({ commit, dispatch }, user) {
      api('user/' + user._id + '/vaults')
        .then(res => {
          commit('setVaults', res.data.data)
        }).catch(handleError)
    },
    getAllKeeps({ commit, dispatch }) {
      api('keeps')
        .then(res => {
          commit('setAllKeeps', res.data.data)
        }).catch(handleError)
    },
    getUserKeeps({ commit, dispatch }, user) {
      api('user/' + user._id + '/keeps')
        .then(res => {
          commit('setKeeps', res.data.data)
        }).catch(handleError)
    },
    createVault({ commit, dispatch }, vault) {
      api.post('vaults', vault)
        .then(res => {
          commit('setCreateVaults', res.data.data)
        }).catch(handleError)
    },
    getvaultkeeps({ commit, dispatch }, id) {
      api('vaults/' + id + '/keeps')
        .then(res => {
          commit('setVaultKeeps', res.data.data)
        }).catch(handleError)
    },
    createKeep({ commit, dispatch }, keep) {
      api.post('keeps', keep)
        .then(res => {
          commit('setCreateKeeps', res.data.data)
        }).catch(handleError)
    },
    activeKeep({ commit, dispatch }, keep) {
      commit('setActiveKeep', keep)
    },
    addVaultToKeep({ commit, dispatch }, data) {
      api.put('addvaulttokeep/' + data.keep._id, data)
        .then(res => {
          commit('setActiveKeep', res.data.data)
        }).catch(handleError)
    },
    increaseViewCount({ commit, dispatch }, keep) {
      api.put('addviews/' + keep._id, keep)
        .then(res => {
          commit('setActiveKeep', res.data.data)
        }).catch(handleError)
    },
    deleteKeep({ commit, dispatch }, keep) {
      api.delete('keeps/' + keep._id)
        .then(res => {
          commit('setVaultKeeps', res.data.data)
        }).catch(handleError)
    },
    deleteVault({ commit, dispatch }, vault) {
      api.delete('vaults/' + vault._id)
        .then(res => {
          router.push('/dashboard')
        }).catch(handleError)
    },
    searchKeeps({ commit, dispatch }, tag) {
      api('searchkeeps/' + tag)
        .then(res => {
          commit('setSearchKeeps', res.data.data)
        }).catch(handleError)
    }
  }

})

