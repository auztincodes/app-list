<template>
  <div class="loader-wrapper">
    <div class="loader">
      <Loader />
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue';
export default {
  components: { Loader },
};
</script>

<style>
.loader-wrapper {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 40px 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  background: #8b91c761;
}
.loader svg {
  height: 60px;
  width: 46px;
}
</style>
