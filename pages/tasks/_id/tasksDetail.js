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
      comment: '',
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
    comments() {
      return this.$store.state.ModuleTask.comment;
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
    },
    addComment() {
      this.$store.dispatch('ModuleTask/addComment', {
        comment: this.comment,
        user: this.$store.state.ModuleAuth.userID,
        id: this.$route.params.id,
      });
      this.comment = '';
    },
    parseNum(num) {
      if (num < 10) return `0${num}`;
      return num;
    },
    parseDate(date_) {
      const date = new Date(date_);
      return `${date.getDate()} ${MONTH[date.getMonth()].toLowerCase()}, ${this.parseNum(date.getHours())}:${this.parseNum(date.getMinutes())}:${this.parseNum(date.getSeconds())}`;
    },
    deleteTime(id, index) {
      this.$store.dispatch('ModuleTask/deleteTime', {
        taskId: this.$route.params.id,
        id,
        index,
      });
    },
    deleteComment(id, index) {
      this.$store.dispatch('ModuleTask/deleteComment', {
        taskId: this.$route.params.id,
        id,
        index,
      });
    },
  },
  mounted() {
    this.$store.dispatch('ModuleTask/listenTime', this.$route.params.id);
    this.$store.dispatch('ModuleTask/listenComment', this.$route.params.id);
  },
  beforeDestroy() {
    this.$store.dispatch('ModuleTask/unListenTime', this.$route.params.id);
    this.$store.dispatch('ModuleTask/unListenComment', this.$route.params.id);
  },
};
