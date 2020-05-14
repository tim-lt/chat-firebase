export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    responsible: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      default: 0,
    },
    timeSpent: {
      type: Number,
      default: 0,
    },
  },
};
