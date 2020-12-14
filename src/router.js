import { createWebHistory, createRouter } from "vue-router";

import PlayerList from "./components/Players/PlayersList.vue";
import CaptainList from "./components/Captains/CaptainsList.vue";
import GamesList from "./components/Games/GamesList.vue";
import StatsList from "./components/Stats/StatsList.vue";

const routes = [
  { path: "/", component: PlayerList },
  { path: "/captains", component: CaptainList },
  { path: "/games", component: GamesList },
  { path: "/stats", component: StatsList },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
