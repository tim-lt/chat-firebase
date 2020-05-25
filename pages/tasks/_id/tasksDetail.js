import { getStatus, MONTH } from '~/assets/scripts/helpers';

import BaseInput from '~/components/BaseInput/BaseInput.vue';
import BaseButton from '~/components/BaseButton/BaseButton.vue';

export default {
  head() {
    return {
      title: this.task.title || 'Tasks-detail',
    };
  },
  data() {
    return {
      time: '',
      timeText: '',
    };
  },
  components: {
    BaseInput,
    BaseButton,
  },
  computed: {
    task() {
      return this.$store.getters['ModuleTask/getTask'](this.$route.params.id);
    },
    statusParse() {
      return getStatus(this.task.status);
    },
    times() {
      return this.$store.state.ModuleTask.time;
    },
  },
  methods: {
    addTime() {
      this.$store.dispatch('ModuleTask/addTime', {
        time: this.time,
        user: this.$store.state.ModuleAuth.userID,
        id: this.$route.params.id,
        text: this.timeText,
      });
      this.time = '';
      this.timeText = '';
      setTimeout(() => this.task, 2000);
    },
    parseDate(date_) {
      const date = new Date(date_);
      return `${date.getDate()} ${MONTH[date.getMonth()].toLowerCase()}`;
    },
    deleteTime(id, index) {
      this.$store.dispatch('ModuleTask/deleteTime', {
        taskId: this.$route.params.id,
        id,
        index,
      });
    },
  },
  mounted() {
    this.$store.dispatch('ModuleTask/listenTime', this.$route.params.id);
  },
  beforeDestroy() {
    this.$store.dispatch('ModuleTask/unListenTime', this.$route.params.id);
  },
};
