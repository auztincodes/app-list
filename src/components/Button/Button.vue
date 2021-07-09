<template>
  <button :type="submitType" :class="classes" class="btn-primary" v-on="$listeners">
    <slot />
  </button>
</template>

<script src="./button.js"></script>
<style lang="scss" scoped>
@import '../../assets/scss/main.scss';
.btn {
  border-radius: 4px;
  height: 38px;
  padding: 0 30px;
  font-size: 15px;
  cursor: pointer;
  &-primary {
    background: $secondary;
    color: #fff;
	&:hover{
		background-color: $accent;
	}
  }
  &-outline {
    color: $secondary;
    background: #ffffff;
    border: 1px solid $secondary;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  &-warning {
    background: $red-text;
    color: #fff;
    &:hover{
		background-color: $red-text;
	}
  }
  &[disabled] {
    color: grey;
    border: none;
    background-color: #f5f5f5;
  }
  &-large {
    padding: 0 32px;
    border-radius: 8px;
  }
  &-full {
    width: 100%;
    text-align: center;
  }
  &-modal {
    height: 40px;
    min-width: 100px;
    text-align: center;
    padding: 0 24px;
  }
}
</style>
