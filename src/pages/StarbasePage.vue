<template>
  <q-page class="col q-pt-sm">
    <q-table :rows="starbase_data" :columns="columns" row-key="key">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
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
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-scroll-area style="height: 320px">
              <j-s-o-n-view :json_data="props.row" />
            </q-scroll-area>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import * as s from "@staratlas/sage";
import {
  GAME_ID,
  PLAYER_PROGRAM_ID,
  SAGE_PROGRAM_ID,
  SPACE_STATIONS,
} from "stores/constants";
import { onMounted } from "vue";
import { BN } from "@coral-xyz/anchor";
import { Fleet, SAGE_IDL, SageProgram, Starbase } from "@staratlas/sage";
import { Program } from "@project-serum/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { useGlobalStore } from "stores/gloablStore";
import { DecodedAccountData } from "@staratlas/data-source";
import { ref } from "vue";
import {
  PLAYER_PROFILE_IDL,
  PlayerProfile,
} from "@staratlas/player-profile/src";

import { readAllFromRPC } from "@staratlas/data-source";
import {
  factionType2String,
  getJoinedElements,
  u8Array2String,
} from "stores/formatString";
import JSONView from "components/elements/JSONView.vue";

const starbase = ref<any>();
const starbase_data = ref<DecodedAccountData<Starbase>[]>();
const profile = ref<any>();
const fleet = ref<any>();

useGlobalStore();

const columns = ref([
  {
    name: "name",
    align: "left",
    label: "Name",
    field: (row) => u8Array2String(row.data._data.name),
    sortable: true,
  },
  {
    name: "key",
    required: true,
    label: "Key",
    align: "left",
    field: (row) => row.key.toString(),
    sortable: true,
  },

  {
    name: "ownerProfile",
    label: "Sector",
    field: (row) => row.data._data.sector.toString(),
    sortable: true,
  },

  {
    name: "faction",
    label: "Faction",
    field: (row) => factionType2String(row.data._data.faction),
    sortable: true,
  },
]);

onMounted(async () => {
  const program = new Program(
    SAGE_IDL,
    SAGE_PROGRAM_ID,
    useGlobalStore().connection as Connection,
  );

  // starbase.value = await s.Starbase.findAddress(
  //   program,
  //   GAME_ID,
  //   SPACE_STATIONS.MUD_CSS as [BN, BN],
  // );

  starbase_data.value = await readAllFromRPC(
    useGlobalStore().connection as Connection,
    program,
    Starbase,
  );
});
</script>
