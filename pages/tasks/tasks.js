import BaseTask from '~/components/BaseTask/BaseTask.vue';
import BaseButton from '~/components/BaseButton/BaseButton.vue';
import BasePopup from '~/components/BasePopup/BasePopup.vue';
import AddTask from '~/components/AddTask/AddTask.vue';
import { MONTH } from '~/assets/scripts/helpers';

export default {
  head() {
    return {
      title: 'Tasks',
    };
  },
  components: {
    BaseTask,
    BaseButton,
    BasePopup,
    AddTask,
  },
  computed: {
    tasks() {
      return this.$store.state.ModuleTask.tasks;
    },
  },
  data() {
    return {
      addTask: false,
    };
  },
  methods: {
    parseDate(date_) {
      const date = new Date(date_);
      return `${date.getDate()} ${MONTH[date.getMonth()].toLowerCase()}`;
    },
    getTimeSpent(times) {
      console.log(times);
      if (!times) return 0;
      let count = 0;
      Object.keys(times).forEach((key) => {
        count += times[key].time;
      });
      return count;
    },
  },
  mounted() {
    if (this.$store.state.ModuleTask.tasks.length === 0) this.$store.dispatch('ModuleTask/listenTask');
  },
};
