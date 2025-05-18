<template>
    <div>
      <button id="upload_widget" class="upload-button" type="button">Upload Image</button>
      <div v-if="imageUrl">
        <p>Uploaded Image:</p>
        <img :src="imageUrl" id="uploadedimage" width="300" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageUrl: '',
        widget: null,
      };
    },
    mounted() {
      const cloudName = 'dnv7wr17q'; // Cloudinary cloud name
      const uploadPreset = 'ecom-products'; // Cloudinary unsigned upload preset
  
      this.widget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Upload successful: ', result.info);
            this.imageUrl = result.info.secure_url;
            this.$emit('image-uploaded', this.imageUrl);
          }
        }
      );
      const button = document.getElementById('upload_widget');
      if (button) {
        button.addEventListener('click', () => this.widget.open(), false);
      }
    },
  };
  </script>
  
  <style scoped>
  .upload-button {
    padding: 10px 20px;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  .upload-button:hover {
    background-color: #4338ca;
  }
  </style>
  