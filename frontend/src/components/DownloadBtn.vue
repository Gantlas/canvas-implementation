<template>
  <div>
    <button
      class="inactive"
      :class="{ active: isActive }"
      @click="downloadFile"
    >
      Download output.txt
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    isActive: Boolean,
  },
  methods: {
    downloadFile: async () => {
      const response = await axios.get("http://localhost:3001/download/", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "output.txt");
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>

<style scoped>
.inactive {
  width: 100%;
  padding: 10px 20px;
  border: 2px solid gray;
  border-radius: 5px;
  outline: none;
  pointer-events: none;
  user-select: none;
  background-color: rgb(170, 170, 170);
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
}

.active {
  width: 100%;
  padding: 10px 20px;
  border: 2px solid #0b8;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  pointer-events: all;
  background-color: #0b8;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
}

.downloadInput {
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}

.active:hover {
  border-color: rgb(0, 109, 80);
  opacity: 0.8;
}
</style>