<template>
  <div class="app-container">
    <AppHeader />

    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader/AppHeader.vue";

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
      
    }
  }
}
</script>

<style>
/* global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: 'Barlow', sans-serif;
  line-height: 1.6;

  color: var(--text);
}

*.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

body {
    background: linear-gradient(90deg, #ff93a9, #74ccff);
    background-size: 200% 200%;

    -webkit-animation: AnimatedGradientBackground 10s ease infinite;
    -moz-animation: AnimatedGradientBackground 10s ease infinite;
    -o-animation: AnimatedGradientBackground 10s ease infinite;
    animation: AnimatedGradientBackground 10s ease infinite;
}

@-webkit-keyframes AnimatedGradientBackground {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimatedGradientBackground {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-o-keyframes AnimatedGradientBackground {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimatedGradientBackground {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

.light-theme {
  --text: #080808;
  --background-primary:  rgba(255, 255, 255, 0.2);
  --background-glass: linear-gradient(138deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  --background-nav-main: linear-gradient(93deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9) 100%);
  --background-nav-sub: linear-gradient(93deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8) 100%);
}
  
.dark-theme {  
  --text: #e8e8e8;
  --background-primary: rgba(255, 255, 255, 0.05);
  --background-glass: linear-gradient(138deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7));
  --background-nav-main: linear-gradient(93deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3) 100%);
  --background-nav-sub: linear-gradient(93deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2) 100%);
}
</style>

<style scoped>
.app-container {
  max-width: 960px;
  margin: 0 auto;

  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-left: solid 1px rgba(255, 255, 255, 0.5);
  border-right: solid 1px rgba(255, 255, 255, 0.5);
  background-image: var(--background-glass);
}
</style>
