<template>
  <div>
    <header>
      <ul class="nav nav-expand bg-white mb-4 topbar shadow">
        <li class="nav-item ml-3">
          <a class="nav-link active" href="#">TKS Office Ball</a>
        </li>
        <li class="nav-item"></li>
        <li class="nav-item" href="#" @click.prevent="login" v-if="!user">Login</li>
        <li class="nav-item" href="#" @click.prevent="logout" v-else>Logout</li>
      </ul>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      user: null
    };
  },
  async created() {
    await this.refreshUser();
  },
  watch: {
    $route: 'onRouteChange'
  },
  methods: {
    login() {
      this.$auth.loginRedirect();
    },
    async onRouteChange() {
      // every time a route is changed refresh the user details
      await this.refreshUser();
    },
    async refreshUser() {
      // get new user details and store it to user object
      this.user = await this.$auth.getUser();
    },
    async logout() {
      await this.$auth.logout();
      await this.refreshUser();
      this.$router.push('/');
    }
  }
};
</script>

<style>
</style>
