import BaseTask from '~/components/BaseTask/BaseTask.vue';
import BaseButton from '~/components/BaseButton/BaseButton.vue';

export default {
  head() {
    return {
      title: 'Tasks',
    };
  },
  components: {
    BaseTask,
    BaseButton,
  },
};
