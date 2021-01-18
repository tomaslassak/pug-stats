<template>
  <div class="app-header">
    <MainNavigation />
    <UtilityNavigation />
  </div>
</template>

<script>
import UtilityNavigation from "./UtilityNavigation.vue";
import MainNavigation from "./MainNavigation.vue";


export default {
  name: "AppHeader",
  components: {
    UtilityNavigation,
    MainNavigation
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
.app-header {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;

  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1rem 1rem 1rem;

  background: var(--background-nav-main);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
</style>
