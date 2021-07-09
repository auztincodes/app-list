<template>
  <div class="container">
    <header class="header">
      <img src="@/assets/icons/cb-login-logo.png" alt="logo" class="logo" />
    </header>
    <main class="main">
      <div class="auth">
        <div class="auth-header">
          <h3>Login</h3>
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
                placeholder="Enter Password"
              />
              <div class="page-link">
                <router-link to="/forgot-password"
                  >Forgot Password?</router-link
                >
              </div>
              <c-button
                class="submit"
                :disabled="invalid"
                size="full"
                submitType="submit"
                buttonType="primary"
              >
                <template v-if="!loading">Login</template>
                <Loader v-else />
              </c-button>
              <div class="page-link mt-1 text-center">
                   Don't have an account?
                <router-link to="/register"
                  >Register Now</router-link
                >
              </div>
            </div>
          </ValidationObserver>
        </form>
      </div>
    </main>
  </div>
</template>

<script src="./login.js"></script>
<style lang="scss" scoped src="../auth.scss"></style>
