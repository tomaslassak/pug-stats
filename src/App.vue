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
  --red: #fc5d7ecc;
  --blue: #4691ffcc;

  background: var(--gradient-1), var(--gradient-2);
  background-attachment: fixed;
  
  transition: all 0.25s ease-in-out;
}

.light-theme {
  --primary: #f8f8f8;
  --secondary: #e8e8e8;
  --text: #080808;
  --banner: #ffffff88;

  --gradient-1: linear-gradient(120deg, #fc5d7ecc, #00000000 50%);
  --gradient-2: linear-gradient(-120deg, #4691ffcc, #00000000 50%);
  background-color: white;

}
  
.dark-theme {  
  --secondary: #080808;
  --primary: #181818;
  --text: #e8e8e8;
  --banner: #00000066;

  --gradient-1: linear-gradient(0deg, #000000ff, #00000000);
  --gradient-2: linear-gradient(90deg, #fc5c7d88, #000, #3493e688);
  background-color: black;
}
</style>

<style scoped>
.app-container {
  max-width: 960px;
  background-color: var(--secondary);

  margin: 0 auto;

  /* outline: 5px solid rgba(0, 0, 0, 0.2); */
}
</style>
