const STATE = () => ({
  userID: '',
});

const ACTIONS = {
  async login(ctx, { email, password }) {
    try {
      await this.$fb.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      if (e.code) throw new Error(e.code);
      console.log(e);
    }
  },
  async register({ dispatch, state }, { email, password, name }) {
    try {
      await this.$fb.auth.createUserWithEmailAndPassword(email, password);
      await dispatch('getUid');
      if (state.userID) {
        await this.$fb.database.ref(`/users/${state.userID}/info`).set({
          name,
        });
      }
    } catch (e) {
      if (e.code) throw new Error(e.code);
      console.log(e);
    }
  },
  async getUid({ commit }) {
    const user = this.$fb.auth.currentUser;
    commit('setId', user ? user.uid : '');
  },
};

const MUTATIONS = {
  setId(state_, id) {
    const state = state_;
    state.userID = id;
  },
};

const GETTERS = {
  isLogged(state) {
    return state.userID !== '';
  },
};

export default {
  state: STATE,
  actions: ACTIONS,
  mutations: MUTATIONS,
  getters: GETTERS,
};
