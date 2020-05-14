const STATE = () => ({
  userID: '',
  name: '',
  users: [],
});

const ACTIONS = {
  async login({ dispatch }, { email, password }) {
    try {
      await this.$fb.auth.signInWithEmailAndPassword(email, password);
      await dispatch('getUsers');
    } catch (e) {
      if (e.code) throw new Error(e.code);
      console.log(e);
    }
  },
  async register({ dispatch }, { email, password, name }) {
    try {
      await this.$fb.auth.createUserWithEmailAndPassword(email, password);
      const userId = await dispatch('getUid');
      if (userId) {
        await this.$fb.database.ref(`/users/${userId}/info`).set({
          name,
        });
      }
      await dispatch('getUsers');
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
  async getUsers({ commit, dispatch }) {
    try {
      const users = await this.$fb.database.ref('/users/').once('value');
      const userId = await dispatch('getUid');
      commit('setUsers', users.val());
      commit('setId', userId);
    } catch (e) {
      console.error(e);
    }
  },
};

const MUTATIONS = {
  setId(state_, id) {
    const state = state_;
    state.userID = id || '';
    if (!id) {
      state.name = '';
      return;
    }
    Object.keys(state.users).forEach((key) => {
      if (key === id) state.name = state.users[key].info.name;
    });
  },
  setUsers(state_, users) {
    const state = state_;
    state.users = users;
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
