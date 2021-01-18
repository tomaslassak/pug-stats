<template>
  <nav class="utility-navigation">
    <ThemeSwitcher />
    <BrowserExtension />
    <!-- <SteamLogin /> -->
  </nav>
</template>

<script>
import ThemeSwitcher from "./ThemeSwitcher.vue";
import BrowserExtension from "./BrowserExtension.vue";
// import SteamLogin from "./SteamLogin.vue";

export default {
  name: "UtilityNavigation",
  components: {
    ThemeSwitcher,
    BrowserExtension,
    // SteamLogin
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
.utility-navigation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.utility-navigation span {
  margin-left: 0.5rem;
}
</style>
