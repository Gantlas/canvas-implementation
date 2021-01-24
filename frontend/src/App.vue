<template>
  <div id="app">
    <h1 class="app-header">Canvas implementation</h1>
    <FIleLoad />
  </div>
</template>

<script>
import FIleLoad from "@/components/FIleLoad";
export default {
  name: "App",
  components: {
    FIleLoad,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-header {
  position: relative;
  margin-bottom: 130px;
  padding: 20px 0 20px;
  border-radius: 0 0 20% 20%;
  text-align: center;
  color: #fff;
  background-color: #0b8;
}

.app-header::after {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 400px;
  z-index: -1;
  content: "";
  background-image: url("./assets/wave.svg");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
