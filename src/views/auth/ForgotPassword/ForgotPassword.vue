<template>
  <div class="container">
    <header class="header">
      <img src="@/assets/icons/cb-login-logo.png" alt="logo" class="logo" />
    </header>
    <main class="main">
      <div class="auth">
        <div class="auth-header">
          <h3>Forgot Password</h3>
          <p>Enter your email to reset password</p>
        </div>
        <form @submit.prevent="submit">
          <ValidationObserver v-slot="{ invalid }">
            <div class="auth-input">
              <c-input
                type="email"
                rules="required"
                v-model="email"
                width="100%"
                name="Email Address"
                placeholder="yourmail@email.com"
              />
             
              <div class="page-link">
                <router-link to="/login"
                  >Back to login</router-link
                >
              </div>
              <c-button
                class="submit"
                :disabled="invalid"
                size="full"
                submitType="submit"
                buttonType="primary"
              >
                <template v-if="!loading">Recover Password</template>
                <Loader v-else />
              </c-button>
            </div>
          </ValidationObserver>
        </form>
      </div>
    </main>
  </div>
</template>

<script src="./forgot-password.js"></script>
<style lang="scss" scoped src="../auth.scss"></style>
