<template>
  <div>
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <input
      type="file"
      ref="file"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
      style="display:none"
    >
  </div>
</template>

<script>
export default {
  name: 'image-input',
  data: () => ({
    errorDialog: null,
    errorText: '',
    uploadFieldName: 'file',
    maxSize: 1024,
  }),
  props: {
    value: Object,
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      const { maxSize } = this.maxSize;
      const imageFile = file[0];

      if (file.length > 0) {
        const size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match('image.*')) {
          this.errorText = 'Please choose an image file';
        } else if (size > 1) {
          this.errorText = 'Your file is too big! Please select an image under 1MB';
        } else {
          const formData = new FormData();
          const imageURL = URL.createObjectURL(imageFile);
          formData.append(fieldName, imageFile);
          const reader = new FileReader();
          reader.onload = (e) => {
            this.$emit('input', { formData, imageURL, dataUrl: e.target.result });
          };
          reader.readAsDataURL(imageFile);
        }
      }
    },
  },
};
</script>
