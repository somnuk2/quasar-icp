import { createStore } from "vuex";

export default createStore({
  state: {
    authenticate: false,
    member_id: "",
    name: "",
    status: "",
  },
  mutations: {
    setMyAuthenticate(state, authenticate) {
      state.authenticate = authenticate;
    },
    setMyMember_id(state, member_id) {
      state.member_id = member_id;
    },
    setMyName(state, name) {
      state.name = name;
    },
    setMyStatus(state, status) {
      state.status = status;
    },
  },
  getters: {
    myAuthenticate: (state) => state.authenticate,
    myMember_id: (state) => state.member_id,
    myName: (state) => state.name,
    myStatus: (state) => state.status,
  },
  actions: {},
  modules: {},
});
