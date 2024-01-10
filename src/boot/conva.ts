import Vue from "vue";
import VueKonva from "vue-konva";

import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  // something to do

  app.use(VueKonva);

  console.log("[booted] Conva");
});
