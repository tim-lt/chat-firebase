const STATE = () => ({
  userID: '',
  name: '',
});

const ACTIONS = {
  async login({ dispatch, commit }, { email, password }) {
    try {
      await this.$fb.auth.signInWithEmailAndPassword(email, password);
      const userId = await dispatch('getUid');
      const name = await this.$fb.database.ref(`/users/${userId}/info`).once('value');
      commit('setId', {
        id: userId,
        name: name.val().name,
      });
    } catch (e) {
      if (e.code) throw new Error(e.code);
      console.log(e);
    }
  },
  async register({ dispatch, commit }, { email, password, name }) {
    try {
      await this.$fb.auth.createUserWithEmailAndPassword(email, password);
      const userId = await dispatch('getUid');
      commit('setId', {
        id: userId,
        name,
      });
      if (userId) {
        await this.$fb.database.ref(`/users/${userId}/info`).set({
          name,
        });
      }
    } catch (e) {
      if (e.code) throw new Error(e.code);
      console.log(e);
    }
  },
  async getUid() {
    const user = this.$fb.auth.currentUser;
    return user ? user.uid : '';
  },
  async logout({ commit }) {
    try {
      await this.$fb.auth.signOut();
      commit('setId');
    } catch (e) {
      console.log(e);
    }
  },
};

const MUTATIONS = {
  setId(state_, { id, name }) {
    const state = state_;
    state.userID = id || '';
    state.name = name || '';
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
