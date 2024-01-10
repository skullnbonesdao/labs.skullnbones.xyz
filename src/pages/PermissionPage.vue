<template>
  <q-page class="row">
    <div class="col">
      <q-table
        flat
        bordered
        grid
        title="Permissions"
        :rows="profile?.profileKeys"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card flat bordered>
              <q-card-section class="text-center">
                {{ props.row.key }}
              </q-card-section>

              <q-separator />

              <q-card-section class="text-center"> Permissions </q-card-section>
              <q-separator />

              <q-card-section class="flex flex-center">
                <div class="col">
                  <div
                    :key="k"
                    v-for="k in Object.keys(permissions[0])"
                    class="row"
                  >
                    <div class="col">{{ k }}</div>

                    <q-badge
                      :color="
                        SagePermissions.fromPermissions(props.row.permissions)[
                          k
                        ]
                          ? 'green'
                          : 'red'
                      "
                      :label="
                        SagePermissions.fromPermissions(props.row.permissions)[
                          k
                        ].toString()
                      "
                    >
                    </q-badge>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
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
import {
  Fleet,
  SAGE_IDL,
  SagePermissions,
  SageProgram,
  Starbase,
} from "@staratlas/sage";
import { Program } from "@project-serum/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { useGlobalStore } from "stores/gloablStore";
import { useSageStore } from "stores/sageStore";
import { ref } from "vue";
import {
  PLAYER_PROFILE_IDL,
  PlayerProfile,
} from "@staratlas/player-profile/src";

import { getProfileKey, PlayerName } from "@staratlas/player-profile";

import { readAllFromRPC, readFromRPCOrError } from "@staratlas/data-source";
import { decodeDataPlayerProfile } from "stores/decode_playerProfile";

const profile = ref<PlayerProfile>();

const permissions = ref<SagePermissions[]>([]);

useGlobalStore();

onMounted(async () => {
  profile.value = await readFromRPCOrError(
    useGlobalStore().connection,
    useSageStore().programProfile,
    useSageStore().playerProfile,
    PlayerProfile,
    "confirmed",
  );

  // name.value = await readFromRPCOrError(
  //   useGlobalStore().connection,
  //   useSageStore().programProfile,
  //   useSageStore().playerProfile,
  //   PlayerName,
  //   "confirmed",
  // );

  console.log(profile);

  permissions.value.push(
    SagePermissions.fromPermissions(profile.value?.profileKeys[0].permissions),
  );
  console.log(permissions);

  Object.entries(permissions.value[0]).forEach((p) =>
    columns.value.push({
      name: p[0],
      required: true,
      label: p[0],
      align: "left",
      field: (row) => row[p[0]],
      format: (val) => `${val}`,
      sortable: true,
    }),
  );

  // const decodedProfile = decodeDataPlayerProfile(
  //   await useGlobalStore().connection.getAccountInfo(profile.value?.key),
  //   useSageStore().programProfile,
  // );
  //
  // console.log(decodedProfile);

  // starbase_data.value = (
  //   await readAllFromRPC(
  //     useGlobalStore().connection as Connection,
  //     program,
  //     Starbase,
  //   )
  // ).map((fleet) => fleet.type === "ok" && fleet.data) as Starbase[];
});

const columns = ref([
  {
    name: "key",
    required: true,
    label: "Key",
    align: "left",
    field: (row) => row.key,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "expireTime",
    required: true,
    label: "Expire time",
    align: "left",
    field: (row) => row.expireTime,
    format: (val) => `${val}`,
    sortable: true,
  },
]);
</script>
