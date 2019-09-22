<template>
  <ul class="nav nav-expand bg-white mb-4 topbar shadow">
    <li class="nav-item ml-3">
      <a class="nav-link active" href="#">TKS Office Ball</a>
    </li>
    <li class="nav-item"></li>
    <li class="nav-item" href="#" @click.prevent="login" v-if="!user">Login</li>
    <li class="nav-item" href="#" @click.prevent="logout" v-else>Logout</li>
  </ul>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      user: null
    };
  },
  methods: {
    login() {},
    async logout() {}
  }
};
</script>

<style scoped>
</style>
