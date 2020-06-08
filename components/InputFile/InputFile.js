import { numStr } from '~/assets/scripts/helpers';

export default {
  props: {
    name: {
      required: true,
      type: String,
    },
    value: {},
  },
  data() {
    return {
      isDrop: false,
      text: 'Перетащите файлы для загрузки',
    };
  },
  watch: {
    value(newValue) {
      if (newValue.length === 0) {
        this.$refs.input.value = null;
        this.generateText([]);
      }
    },
  },
  methods: {
    onChange({ target }) {
      const { files } = target;
      const filesArray = Array.from(files);
      this.generateText(filesArray);
      this.$emit('input', filesArray);
    },
    onDrop(e) {
      const { files } = e.dataTransfer;
      const filesArray = Array.from(files);
      this.generateText(filesArray);
      this.$emit('input', filesArray);
    },
    onDrag() {
      if (!this.isDrop) this.isDrop = true;
    },
    generateText(files) {
      let str = '';
      const { length } = files;
      if (length === 0) {
        this.text = 'Перетащите файлы для загрузки';
        return;
      }
      files.forEach((file, index) => {
        if (index === 0) str = file.name;
        else str += `, ${file.name}`;
      });
      this.text = `Добавлено ${length} ${numStr(length, ['файл', 'файла', 'файлов'])}: ${str}`;
    },
  },
  mounted() {
    if (this.value && this.value.length > 0) this.generateText(this.value);
  },
};
