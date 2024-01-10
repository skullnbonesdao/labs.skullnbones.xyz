<script setup lang="ts">
import { useSageStore } from "stores/sageStore";
import { useWallet } from "solana-wallets-vue";
import { computed, ref } from "vue";
import { u8Array2String } from "../stores/formatString";
import JSONView from "components/elements/JSONView.vue";
import { fleet_dock, fleet_undock } from "stores/fleetInstructions";

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

  {
    name: "State",
    label: "State",
    sortable: true,
    field: (row) => Object.keys(row._state)[0],
  },
]);

function filtered_rows() {
  return useSageStore().fleet?.filter(
    (f) =>
      f.data.ownerProfile == "21jHHMfZAM7bpuMY8EtnCeQDDZrWkyTyRYrmSykTbV1b",
  );
}
</script>

<template>
  <q-page class="col q-pt-sm">
    <q-table :rows="filtered_rows()" :columns="columns" row-key="key">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width />
          <q-th auto-width />
          <q-th auto-width />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              @click="fleet_dock()"
              color="primary"
              size="sm"
              label="dock"
            />
          </q-td>
          <q-td auto-width>
            <q-btn
              @click="fleet_undock()"
              color="primary"
              size="sm"
              label="undock"
            />
          </q-td>
          <q-td auto-width>
            <q-btn color="primary" size="sm" label="mine" />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-scroll-area style="height: 500px">
              <j-s-o-n-view :json_data="props.row" />
            </q-scroll-area>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<style scoped></style>
