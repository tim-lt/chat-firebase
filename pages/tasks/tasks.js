import BaseTask from '~/components/BaseTask/BaseTask.vue';
import BaseButton from '~/components/BaseButton/BaseButton.vue';
import BasePopup from '~/components/BasePopup/BasePopup.vue';

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
  },
  data() {
    return {
      addTask: false,
    };
  },
};
