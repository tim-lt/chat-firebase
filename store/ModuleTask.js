
const STATE = () => ({
  tasks: [],
});

const ACTIONS = {
  listenTask({ commit }) {
    const taskRef = this.$fb.database.ref('tasks');
    taskRef.off();
    const writeState = (data) => {
      commit('pushTask', data);
    };
    taskRef.on('child_added', writeState);
  },
  addTask(
    ctx,
    {
      title,
      desc,
      responsible,
      assessment,
      creator,
    },
  ) {
    this.$fb.database.ref('tasks').push({
      title,
      desc,
      responsible,
      assessment,
      creator,
      date: Date.now(),
    });
  },
};

const MUTATIONS = {
  pushTask(state, data) {
    state.tasks.push({
      ...data.val(),
      id: data.key,
      timeSpent: 0,
    });
  },
};

export default {
  state: STATE,
  actions: ACTIONS,
  mutations: MUTATIONS,
};
