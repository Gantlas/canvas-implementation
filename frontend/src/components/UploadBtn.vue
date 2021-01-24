<template>
  <div>
    <label class="upload-btn" @click="clearInput">
      <span>Upload input file</span>
      <input
        type="file"
        class="uploadInput"
        ref="input"
        @input="readFile"
        accept=".txt"
      />
    </label>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    clearInput() {
      this.$refs.input.value = null;
    },

    readFile(e) {
      let file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          let response = await axios.post("http://localhost:3001", {
            text: e.target.result,
          });

          this.$emit("set-res-params", response.data, true);
        } catch (err) {
          this.$emit("set-res-params", err.response.data.message, false);
        }
      };

      reader.readAsText(file);
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
}

.upload-btn {
  width: 100%;
  padding: 10px 20px;
  border: 2px solid #0b8;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #0b8;
}

.uploadInput {
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}

.upload-btn:hover {
  border-color: rgb(0, 109, 80);
  opacity: 0.8;
}
</style>