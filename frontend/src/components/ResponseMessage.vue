<template>
  <p class="message failure" :class="{ success: isSuccess }">{{ message }}</p>
</template>

<script>
export default {
  props: {
    isSuccess: Boolean,
    message: String,
  },
};
</script>

<style scoped>
.message {
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
}

.failure {
  color: red;
}

.success {
  color: #0b8;
}
</style>