
const STATE = () => ({
  messages: [],
});

const ACTIONS = {
  listen({ commit }) {
    const messageRef = this.$fb.database.ref('message');
    messageRef.off();
    const writeState = (data) => {
      commit('pushMessage', data);
    };
    messageRef.on('child_added', writeState);
    // messageRef.limitToLast(10).on('child_added', writeState);
  },
  write(ctx, message) {
    this.$fb.database.ref('message').push({
      userID: this.state.ModuleAuth.userID,
      name: this.state.ModuleAuth.name,
      message,
    });
  },
};

const MUTATIONS = {
  pushMessage(state, data) {
    state.messages.push(data.val());
  },
};

export default {
  state: STATE,
  actions: ACTIONS,
  mutations: MUTATIONS,
};
