<template>
  <q-page class="full-width full-height q-pa-sm">
    <v-stage id="app" :config="stageConfig">
      <v-layer>
        <!-- Draw the grid here -->
      </v-layer>
    </v-stage>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Konva from "konva";

const stageConfig = {
  width: 500, // Set the desired width
  height: 500, // Set the desired height
};

const stage = ref(null);
const layer = ref(null);

onMounted(() => {
  stage.value = new Konva.Stage({
    container: "app", // Use the ID of your container div
    ...stageConfig,
  });

  layer.value = new Konva.Layer();
  stage.value.add(layer.value);

  // Create the grid
  const gridSize = 10; // Adjust this value to control grid spacing
  const halfGridSize = gridSize / 2;

  for (let x = -50; x <= 50; x += gridSize) {
    for (let y = -50; y <= 50; y += gridSize) {
      const rect = new Konva.Rect({
        x: x + halfGridSize,
        y: y + halfGridSize,
        width: gridSize,
        height: gridSize,
        stroke: "white", // Grid line color
        strokeWidth: 1, // Grid line width
      });
      layer.value.add(rect);
    }
  }

  stage.value.draw();
});
</script>
