<template>
  <span class="theme-switcher" v-on:click="switchTheme()">switch theme</span>
</template>

<script>
export default {
  name: "ThemeSwitcher",
  components: {
    
  },
  data() {
    return {
      theme: localStorage.getItem("theme") || "light-theme"
    }
  },
  created() {
    document.body.classList.add(this.theme);
  },
  methods: {
    switchTheme() {
      if (this.theme === "light-theme") {
        document.body.classList.remove(this.theme);
        this.theme = "dark-theme";
        document.body.classList.add(this.theme);
        localStorage.setItem("theme", "dark-theme");
      }
      else {
        document.body.classList.remove(this.theme);
        this.theme = "light-theme";
        document.body.classList.add(this.theme);
        localStorage.setItem("theme", "light-theme");
      }
    }
  }
}
</script>

<style scoped>
.theme-switcher {
  cursor: pointer;
  font-weight: bold;
}
</style>
