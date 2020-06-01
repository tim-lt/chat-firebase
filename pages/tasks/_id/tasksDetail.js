import { getStatus, MONTH, numStr } from '~/assets/scripts/helpers';

import BaseInput from '~/components/BaseInput/BaseInput.vue';
import BaseButton from '~/components/BaseButton/BaseButton.vue';
import InputFile from '~/components/InputFile/InputFile.vue';

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
      files: [],
    };
  },
  components: {
    BaseInput,
    InputFile,
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
    async addComment() {
      try {
        const date = Date.now();
        let files = [];
        if (this.files.length > 0) {
          await this.$store.dispatch('ModuleTask/addFile', { date, files: this.files });
          files = this.getFileNames(date);
        }
        this.$store.dispatch('ModuleTask/addComment', {
          comment: this.comment,
          user: this.$store.state.ModuleAuth.userID,
          id: this.$route.params.id,
          files,
        });
        this.comment = '';
        this.files = [];
      } catch (e) {
        console.error(e);
      }
    },
    getFileNames(date) {
      const files = [];
      this.files.forEach((file) => {
        files.push(`${date}/${file.name}`);
      });
      return files;
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
    async downloadFile(file) {
      try {
        const ref = this.$fb.storage.ref(file);
        const response = await ref.getDownloadURL();
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          const blob = xhr.response;
          const url = URL.createObjectURL(blob);
          const { link } = this.$refs;
          link.href = url;
          link.download = `${file.split('/')[1]}`;
          link.click();
        };
        xhr.open('GET', response);
        xhr.send();
      } catch (e) {
        console.log(e);
      }
    },
    getWord(count) {
      return `${numStr(count, ['Прикрепленный файл', 'Прикрепленные файлы', 'Прикрепленные файлы'])}:`;
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
