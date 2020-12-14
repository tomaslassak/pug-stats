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
  position: relative;
  top: 5rem;
  
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
.main-navigation a { 
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;

  padding: 1rem 0;
}
</style>
