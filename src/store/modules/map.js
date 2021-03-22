
const SET_ROUTINE = 'SET_ROUTINE'

const state = {
  routine: {
    lat: '',
    lng: '',
    polyline: []
  }
}

const mutations = {
  [SET_ROUTINE] (state, data) {
    console.log(data);
    state.routine = data
  }
}

const actions = {
  setRoutine({ commit }, data) {
    commit(SET_ROUTINE, data)
  }
}

const getters = {
  getRoutine(state) {
    return state.routine
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
