<script setup lang="ts">
import { useQuasar } from "quasar";
import { onMounted } from "vue";
import { useSageStore } from "stores/sageStore";
import { useGlobalStore } from "stores/gloablStore";

useQuasar().dark.set(true);
</script>

<template>
  <router-view />
</template>
