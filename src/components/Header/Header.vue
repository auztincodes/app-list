<template>
  <header>
    <div class="container">
      <nav class="navbar">
        <div class="nav-item logo">
          <img src="@/assets/icons/cb-nav-logo.png" alt="logo" />
        </div>
        <div class="nav__menu__right">
          <div class="user__menu__wrapper">
            <v-toggle-dropdown class="user__dropdown__menu">
              <template #dropdown-wrapper>
                <img
                  class="mr-1"
                  src="@/assets/icons/user-icon.svg"
                  svg-inline
                />
                <img src="@/assets/icons/carret-down.svg" svg-inline />
              </template>
              <template #dropdown-items>
                <li class="dropdown__item" @click="logoutUser">Logout</li>
              </template>
            </v-toggle-dropdown>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import VToggleDropdown from '@/components/ToggleDropdown';
import { mapActions } from 'vuex';

export default {
  name: 'searchResultHeader',
  components: {
    VToggleDropdown,
  },
  methods: {
    ...mapActions({
      LogOut: 'auth/LogOut',
    }),
    async logoutUser() {
      try {
        await this.LogOut();
        this.$router.push('/login');
        return true;
      } catch (error) {
        return error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
header {
  background: #1e0a45;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-item {
  &.logo {
    display: flex;
    align-items: center;
    width: 145px;
    &-text {
      line-height: 1.25;
      letter-spacing: -0.57px;
      font-size: 24px;
    }
  }
}
.nav__menu__right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search__icon__wrapper {
    margin-right: 25px;
    cursor: pointer;
  }
  .user__menu__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 5px;
    .user__dropdown__menu {
      .dropdown__list-wrapper {
        top: 100%;
      }
    }
  }
}
</style>
