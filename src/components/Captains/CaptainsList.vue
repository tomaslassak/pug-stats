<template>
  <div class="captains-list">
    <div class="captains-list-legend-wrapper noselect">
      <span>position</span>
      <span 
        class="captains-list-legend" 
        :class="{ 'is-active': isActive('etf2l_name') }" 
        @click="orderBy(captain_array, 'etf2l_name', 'string')"
      >etf2l name</span>
      <span 
        class="captains-list-legend" 
        :class="{ 'is-active': isActive('pug_name') }" 
        @click="orderBy(captain_array, 'pug_name', 'string')"
      >pug name</span>
      <span 
        class="captains-list-legend" 
        :class="{ 'is-active': isActive('elo') }" 
        @click="orderBy(captain_array, 'elo', 'float')"
      >elo</span>
      <span 
        class="captains-list-legend" 
        :class="{ 'is-active': isActive('elo_change') }" 
        @click="orderBy(captain_array, 'elo_change', 'float')"
      >elo change</span>
      <span 
        class="captains-list-legend" 
        :class="{ 'is-active': isActive('games_total') }" 
        @click="orderBy(captain_array, 'games_total', 'float')"
      >games</span>
    </div>

    <ul class="captain-list-items">
      <Captain
        v-for="(captain, index) in captain_array"
        :key="captain.steamID3"
        :captain="captain"
        :index="index"
      >
      </Captain>
    </ul>
  </div>
</template>

<script>
import Captain from "./Captain.vue";

export default {
  name: "CaptainsList",
  components: {
    Captain,
  },
  data() {
    return {
      captain_array: [],
      active_key: "elo",
    };
  },
  created() {
    this.fetchCaptains();
  },
  methods: {
    fetchCaptains: async function () {
      const res = await fetch(`${process.env.VUE_APP_API_PATH}/api/captains`);
      const docs = await res.json();
      this.captain_array = docs;
    },
    orderBy: function (list, key, type) {
      if (this.active_key === key) {
        this.captain_array.reverse();
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
.captains-list {
  display: flex;
  flex-direction: column;

  padding: 1rem;
}
.captains-list-legend-wrapper {
  padding: 1rem 0;

  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.captains-list-legend {
  text-align: center;
  cursor: pointer;
}

.is-active {
  font-weight: bold;
}
</style>
