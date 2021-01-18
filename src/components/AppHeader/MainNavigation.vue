<template>
  <nav class="main-navigation">
    <router-link to="/" exact>players</router-link>
    <router-link to="/captains" exact>captains</router-link>
    <router-link to="/games" exact>games</router-link>
    <router-link to="/stats" exact>stats</router-link>
  </nav>
</template>

<script>
export default {
  name: "MainNavigation",
  components: {
    
  },
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>

<style scoped>
.main-navigation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.main-navigation a { 
  text-decoration: none;

  margin-right: 0.5rem;
}
.router-link-exact-active {
  font-weight: bold;
}
</style>
