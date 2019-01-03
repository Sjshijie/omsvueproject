import api from '../../api/api.js';

const state = {
  resource: [],
  params: {}
};

const getters = {
  // getResource (state) {
  //   return state.resource
  // }
  getResource: state => state.resource
};

const actions = {
  // fetchResource ({ commit, state }) {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:8080/src/api/resource.json',
  //     responseType: 'json',
  //     data: {
  //       firstName: '123',
  //       lastName: ''
  //     }
  //   })
  //   .then((res) => {
  //     commit ('updateResource',res.data.data)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
  getResource ({commit}, id) {
    api.getBaseResource(id)
      .then(res => {
         // commit( updateResource, res);
    });
  }
};

const mutations = {
  updateResource (state, payload) {
    state.resource = payload;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
