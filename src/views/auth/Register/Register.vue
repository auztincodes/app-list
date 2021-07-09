<template>
  <div class="container">
    <header class="header">
      <img src="@/assets/icons/cb-login-logo.png" alt="logo" class="logo" />
    </header>
    <main class="main">
      <div class="auth">
        <div class="auth-header">
          <h3>Create Account</h3>
          <p>Enter details to proceed</p>
        </div>
        <form @submit.prevent="submit">
          <ValidationObserver v-slot="{ invalid }">
            <div class="auth-input">
              <c-input
                type="email"
                rules="required"
                v-model="form.email"
                width="100%"
                name="Email Address"
                placeholder="yourmail@email.com"
              />
              <c-input
                type="password"
                rules="required"
                v-model="form.password"
                width="100%"
                name="Password"
                vid="password"
                placeholder="Enter Password"
              />
              <c-input
                type="password"
                rules="required|confirmed:password"
                width="100%"
                data-vv-as="password"
                name="Confirm Password"
                placeholder="Repeat Password"
              />
              <c-button
                class="submit"
                :disabled="invalid"
                size="full"
                buttonType="primary"
                submitType="submit"
              >
                <template v-if="!loading">Sign Up</template>
                <Loader v-else />
              </c-button>
              <div class="page-link mt-1 text-center">
                Already have an account?
                <router-link to="/login">Login Now</router-link>
              </div>
            </div>
          </ValidationObserver>
        </form>
      </div>
    </main>
  </div>
</template>

<script src="./register.js"></script>
<style lang="scss" scoped src="../auth.scss"></style>
