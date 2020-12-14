<template>
  <div class="app-header">
    <UtilityNavigation />
    <MainNavigation />
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
  height: 16rem;
  
  background-image: url("../../assets/metalworks3.jpg");
  background-size: cover;
  background-color: var(--banner);
  background-blend-mode: overlay;
}
</style>
