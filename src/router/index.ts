import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShipsStacked from "../views/ShipsStacked.vue";
import MarketView from "../views/MarketView.vue";
import NFTBurnerView from "../views/NFTBurnerView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/shipsstacked",
    name: "score",
    component: ShipsStacked,
  },
  {
    path: "/market",
    name: "market",
    component: MarketView,
  },
  {
    path: "/burner",
    name: "burner",
    component: NFTBurnerView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
