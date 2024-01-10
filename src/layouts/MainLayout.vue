<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div>Sage Manager</div>
        </q-toolbar-title>
        <div class="">
          <div>PlayerProfile: {{ useSageStore().playerProfile }}</div>
          <div>GameID: {{ useSageStore().game }}</div>
        </div>

        <WalletMultiButton dark />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-if="!useSageStore().is_loading" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import EssentialLink, {
  EssentialLinkProps,
} from "components/EssentialLink.vue";
import "src/css/wallet_connect.css";
import { useWallet, WalletMultiButton } from "solana-wallets-vue";
import { useGlobalStore } from "stores/gloablStore";
import { useSageStore } from "stores/sageStore";
import { useQuasar } from "quasar";
import { initWorkspace } from "boot/sage";

const essentialLinks: EssentialLinkProps[] = [
  {
    title: "Home",
    caption: "Fleet.dev",
    icon: "school",
    link: "/",
  },
  {
    title: "Starbase",
    caption: "Fleet.dev",
    icon: "school",
    link: "/starbase",
  },
  {
    title: "Cargo",
    caption: "Fleet.dev",
    icon: "school",
    link: "/cargo",
  },
  {
    title: "Fleets",
    caption: "Fleet.dev",
    icon: "school",
    link: "/fleets",
  },
  {
    title: "Permissions",

    icon: "school",
    link: "/permissions",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const $q = useQuasar();

useGlobalStore();
useWallet();
initWorkspace();

watch(
  () => useWallet()?.publicKey.value,
  async () => {
    $q.loadingBar.start();
    await useSageStore().init();
    $q.loadingBar.stop();
  },
);
</script>
