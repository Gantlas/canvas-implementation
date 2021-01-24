<template>
  <section class="file-load">
    <h2>Upload your input file to get the output</h2>
    <div class="wrapper">
      <UploadBtn @set-res-params="setResParams" />
      <DownloadBtn :isActive="isActive" />
    </div>
    <ResponseMessage :message="message" :isSuccess="isSuccess" />
  </section>
</template>

<script>
import UploadBtn from "@/components/UploadBtn";
import DownloadBtn from "@/components/DownloadBtn";
import ResponseMessage from "@/components/ResponseMessage";
export default {
  data() {
    return {
      isActive: false,
      message: "",
      isSuccess: false,
    };
  },
  methods: {
    setResParams(message, isSuccess) {
      this.message = message;
      this.isSuccess = isSuccess;
      this.isActive = isSuccess;
    },
  },
  components: {
    UploadBtn,
    DownloadBtn,
    ResponseMessage,
  },
};
</script>

<style scoped>
.file-load {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.file-load h2 {
  margin-bottom: 20px;
}

.file-load .wrapper {
  display: flex;
  justify-content: space-between;
  width: 25%;
}
</style>