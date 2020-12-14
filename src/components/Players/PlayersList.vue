<template>
  <div class="players-list">
    <div class="players-list-legend-wrapper noselect">
      <span>position</span>
      <span 
        class="players-list-legend" 
        :class="{ 'is-active': isActive('etf2l_name') }" 
        @click="orderBy(player_array, 'etf2l_name', 'string')"
      >etf2l name</span>
      <span 
        class="players-list-legend" 
        :class="{ 'is-active': isActive('pug_name') }" 
        @click="orderBy(player_array, 'pug_name', 'string')"
      >pug name</span>
      <span 
        class="players-list-legend" 
        :class="{ 'is-active': isActive('elo') }" 
        @click="orderBy(player_array, 'elo', 'float')"
      >elo</span>
      <span 
        class="players-list-legend" 
        :class="{ 'is-active': isActive('elo_change') }" 
        @click="orderBy(player_array, 'elo_change', 'float')"
      >elo change</span>
      <span 
        class="players-list-legend" 
        :class="{ 'is-active': isActive('games_total') }" 
        @click="orderBy(player_array, 'games_total', 'float')"
      >games</span>
    </div>

    <ul class="player-list-items">
      <Player
        v-for="(player, index) in player_array"
        :key="player.steamID3"
        :player="player"
        :index="index"
      >
      </Player>
    </ul>
  </div>
</template>

<script>
import Player from "./Player.vue";

export default {
  name: "PlayersList",
  components: {
    Player,
  },
  data() {
    return {
      player_array: [],
      active_key: "elo",
    };
  },
  created() {
    this.fetchLogs();
  },
  methods: {
    fetchLogs: async function () {
      const res = await fetch(`${process.env.VUE_APP_API_PATH}/api/players`);
      const docs = await res.json();
      this.player_array = docs;
    },
    orderBy: function (list, key, type) {
      if (this.active_key === key) {
        this.player_array.reverse();
      }
      else {
        this.active_key = key;
        
        if (type === "float") {
          list.sort((a, b) => {
            return parseFloat(a[key]) <= parseFloat(b[key]) ? 1 : -1;
          });
        }

        if (type === "string") {
          list.sort((a, b) => {
            if (a[key] === undefined) a[key] = " ";
            if (b[key] === undefined) b[key] = " ";
            return a[key].toLowerCase() <= b[key].toLowerCase() ? 1 : -1;
          });
        }
      }
    },
    isActive: function(key) {
      return this.active_key === key;
    }
  },
  computed: {
    
  }
};
</script>

<style scoped>
.players-list {
  display: flex;
  flex-direction: column;

  padding: 1rem;
}
.players-list-legend-wrapper {
  padding: 1rem 0;

  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.players-list-legend {
  text-align: center;
  cursor: pointer;
}

.is-active {
  font-weight: bold;
}
</style>
