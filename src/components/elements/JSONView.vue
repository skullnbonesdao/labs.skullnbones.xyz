<script setup lang="ts">
import JsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";
import "src/css/json-viewer.scss";

const props = defineProps(["json_data"]);
</script>

<template>
  <json-viewer
    theme="my-awesome-json-theme"
    :value="json_data"
    :expand-depth="5"
    copyable
  ></json-viewer>
</template>

<style></style>
