<template>
  <ValidationProvider
    v-slot="{ errors, ariaInput, ariaMsg }"
    class="form-group"
    tag="div"
    :rules="rules"
    :name="name"
    :vid="vid"
  >
    <label :for="name" class="form-label"
      >{{ name }}
      <span v-if="rules === 'required'" class="required">*</span></label
    >
    <div class="u-relative" :style="style">
      <template v-if="type === 'textarea'">
        <textarea
          rows="6"
          :id="name"
          ref="text-area"
           :disabled="disabled"
          v-model="innerValue"
          class="form-input text-area"
          :class="{
            'form-input--error': errors && errors[0],
            'form__input--valid': hasValue,
          }"
          :style="style"
          :placeholder="placeholder"
          v-bind="ariaInput"
          v-on="$listeners"
        />
      </template>
      <template v-else>
        <input
          :id="name"
          ref="input"
          v-model="innerValue"
          class="form-input"
          :style="style"
          :disabled="disabled"
          :class="{
            'form-input--error': errors && errors[0],
            'form__input--valid': hasValue,
          }"
          :type="type"
          :placeholder="placeholder"
          v-bind="ariaInput"
          v-on="$listeners"
        />
      </template>
    </div>

    <slot :errors="errors" :ariaMsg="ariaMsg" />

    <span v-if="errors[0]" class="input-error--msg" v-bind="ariaMsg">{{
      errors[0]
    }}</span>
  </ValidationProvider>
</template>

<script src="./input.js"></script>
<style lang="scss" src="./input.scss" scoped></style>
