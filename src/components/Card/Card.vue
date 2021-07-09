<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.card {
  padding: 24px 30px 40px;
  border: solid 1px $border-color;
  background-color: #ffffff;
  height: 100%;
}
</style>
