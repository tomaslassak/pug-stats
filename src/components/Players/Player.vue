<template>
  <li class="player">
    <span>{{ `${index + 1}.`}}</span>
    <span>{{ player.etf2l_name}}</span>
    <span>{{ player.pug_name }}</span>
    <span>{{ player.elo.toFixed(2) }}</span>
    <span>{{ player.elo_change.toFixed(2)  }}</span>
    <span>{{ player.games_total }}</span>
  </li>
</template>

<script>
export default {
  name: 'Player',
  props: {
    player: Object,
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
.player {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  background-color: var(--background-primary);
  margin: 0.5rem;
  padding: 0.5rem 0;

  font-size: 1rem;
}
.player span {
  text-align: center;
}
</style>