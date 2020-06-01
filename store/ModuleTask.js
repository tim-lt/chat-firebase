
const STATE = () => ({
  tasks: [],
  time: [],
  comment: [],
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
  listenTime({ commit, dispatch }, id) {
    const taskRef = this.$fb.database.ref(`tasks/${id}/time`);
    dispatch('unListenTime', id);
    const writeState = (data) => {
      commit('pushTime', data);
    };
    taskRef.on('child_added', writeState);
  },
  listenComment({ commit, dispatch }, id) {
    const taskRef = this.$fb.database.ref(`tasks/${id}/comment`);
    dispatch('unListenComment', id);
    const writeState = (data) => {
      commit('pushComment', data);
    };
    taskRef.on('child_added', writeState);
  },
  unListenTime({ commit }, id) {
    const taskRef = this.$fb.database.ref(`tasks/${id}/time`);
    taskRef.off();
    commit('clearTime');
  },
  unListenComment({ commit }, id) {
    const taskRef = this.$fb.database.ref(`tasks/${id}/comment`);
    taskRef.off();
    commit('clearComment');
  },
  addTask(
    ctx,
    {
      title,
      desc,
      responsible,
      assessment,
      creator,
      files,
    },
  ) {
    this.$fb.database.ref('tasks').push({
      title,
      desc,
      responsible,
      assessment,
      creator,
      date: Date.now(),
      status: 'work',
      files,
    });
  },
  addTime(ctx, {
    time,
    user,
    id,
    text,
  }) {
    this.$fb.database.ref(`tasks/${id}/time`).push({
      time,
      userID: user,
      text,
      date: Date.now(),
    });
  },
  addComment(ctx, {
    comment,
    user,
    id,
    files,
  }) {
    this.$fb.database.ref(`tasks/${id}/comment`).push({
      comment,
      userID: user,
      date: Date.now(),
      files,
    });
  },
  deleteTime({ commit }, { taskId, id, index }) {
    this.$fb.database.ref(`tasks/${taskId}/time/${id}`).remove();
    commit('deleteTime', index);
  },
  deleteComment({ commit }, { taskId, id, index }) {
    this.$fb.database.ref(`tasks/${taskId}/comment/${id}`).remove();
    commit('deleteComment', index);
  },
  async addFile(ctx, { date, files }) {
    const reqests = [];
    files.forEach((file) => {
      const storageRef = this.$fb.storage.ref(`${date}/${file.name}`);
      reqests.push(storageRef.put(file));
    });
    await Promise.all(reqests);
  },
};

const MUTATIONS = {
  pushTask(state, data) {
    state.tasks.push({
      ...data.val(),
      id: data.key,
    });
  },
  pushTime(state, data) {
    state.time.push({
      ...data.val(),
      id: data.key,
    });
  },
  pushComment(state, data) {
    state.comment.push({
      ...data.val(),
      id: data.key,
    });
  },
  clearTime(state_) {
    const state = state_;
    state.time = [];
  },
  clearComment(state_) {
    const state = state_;
    state.comment = [];
  },
  deleteTime(state, index) {
    state.time.splice(index, 1);
  },
  deleteComment(state, index) {
    state.comment.splice(index, 1);
  },
};

const GETTERS = {
  getTask: state => (id) => { // eslint-disable-line
    for (let i = 0; i < state.tasks.length; i += 1) {
      if (state.tasks[i].id === id) return state.tasks[i];
    }
  },
};

export default {
  state: STATE,
  actions: ACTIONS,
  mutations: MUTATIONS,
  getters: GETTERS,
};
