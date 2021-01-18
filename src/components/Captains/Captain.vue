<template>
  <li class="captain">
    <span>{{ `${index + 1}.`}}</span>
    <span>{{ captain.etf2l_name}}</span>
    <span>{{ captain.pug_name }}</span>
    <span>{{ captain.cap_elo.toFixed(2) }}</span>
    <span>{{ captain.cap_elo_change.toFixed(2)  }}</span>
    <span>{{ captain.cap_games_total }}</span>
  </li>
</template>

<script>
export default {
  name: 'Captain',
  props: {
    captain: Object,
    index: Number
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
.captain {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  background-color: var(--background-primary);
  margin: 0.5rem;
  padding: 0.5rem 0;

  font-size: 1rem;
}
.captain span {
  text-align: center;
}
</style>