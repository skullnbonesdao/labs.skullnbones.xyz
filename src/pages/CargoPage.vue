<script setup lang="ts">
import { useSageStore } from "stores/sageStore";
import { useWallet } from "solana-wallets-vue";
import { computed, ref } from "vue";
import { u8Array2String } from "../stores/formatString";

const columns = ref([
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    sortable: true,
    field: (row) => row.data.fleetLabel,
    format: (val) => `${u8Array2String(val)}`,
  },
  {
    name: "key",
    required: true,
    label: "Key",
    align: "left",
    field: (row) => row.data.fleetShips.toString(),
    sortable: true,
  },
  { name: "gameId", label: "Game ID", field: "_data.gameId", sortable: true },
  {
    name: "ownerProfile",
    label: "Owner Profile",
    sortable: true,
  },
  {
    name: "State",
    label: "State",
    sortable: true,
    field: (row) => row.data.fleetShips.toString(),
  },
  // Add more column definitions as required
]);

function filtered_rows() {
  return useSageStore().fleet?.filter(
    (f) =>
      f.data.ownerProfile == "21jHHMfZAM7bpuMY8EtnCeQDDZrWkyTyRYrmSykTbV1b",
  );
}
</script>

<template>
  <q-page class="row items-center justify-evenly">
    Fleet:
    {{ filtered_rows() }}

    <q-table
      title="Fleet Data"
      :rows="filtered_rows()"
      :columns="columns"
      row-key="_key"
    >
    </q-table>
  </q-page>
</template>

<style scoped></style>
