import { defineStore } from "pinia";
import { Connection, PublicKey } from "@solana/web3.js";
import { Cargo, Fleet, GameState, SAGE_IDL } from "@staratlas/sage";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import {
  PLAYER_PROGRAM_ID,
  PROFILE_FACTION_PROGRAM_ID,
  SAGE_PROGRAM_ID,
} from "stores/constants";
import { useGlobalStore } from "stores/gloablStore";
import { readAllFromRPC } from "@staratlas/data-source";
import { StarbasePlayer } from "@staratlas/sage/src";
import { Sage } from "@staratlas/sage/dist/src/idl/sage";
import {
  PLAYER_PROFILE_IDL,
  PlayerProfile,
} from "@staratlas/player-profile/src";
import { PlayerProfileProgram } from "@staratlas/player-profile";
import {
  PROFILE_FACTION_IDL,
  ProfileFactionAccount,
} from "@staratlas/profile-faction";
import { useAnchorWallet, useWallet } from "solana-wallets-vue";

export const useSageStore = defineStore("sageStore", {
  state: () => ({
    is_loading: true,
    playerProfile: {} as PublicKey,
    game: new PublicKey("GameYNgVLn9kd8BQcbHm8jNMqJHWhcZ1YTNy6Pn3FXo5"),
    gameState: {} as PublicKey,
    fleet: [] as Fleet[],
    provider: {} as any,
  }),
  getters: {
    programSage(): Program<Sage> {
      return new Program(SAGE_IDL, SAGE_PROGRAM_ID, this.provider);
    },
    programProfile() {
      return new Program(
        PLAYER_PROFILE_IDL,
        PLAYER_PROGRAM_ID,
        useGlobalStore().get_provider,
      );
    },
    programFaction() {
      return new Program(
        PROFILE_FACTION_IDL,
        PROFILE_FACTION_PROGRAM_ID,
        this.provider,
      );
    },
  },

  // getters: {
  //   starbasePlayerKey(state, starbase) {
  //     return StarbasePlayer.findAddress(
  //       state.programSAGE,
  //       starbase,
  //       _sagePlayerProfileKey,
  //       starbaseSeqId,
  //     )[0];
  //   },
  // },
  actions: {
    async init() {
      console.log(useWallet().publicKey.value?.toString());

      const pubkey = useWallet().publicKey.value;

      this.is_loading = true;

      this.playerProfile = new PublicKey(
        (
          await useGlobalStore().connection.getProgramAccounts(
            PLAYER_PROGRAM_ID,
            {
              filters: [
                {
                  memcmp: {
                    offset: 30,
                    bytes: pubkey!.toString(),
                  },
                },
              ],
            },
          )
        )[0].pubkey,
      );

      this.fleet = [];

      this.fleet = (
        await readAllFromRPC(
          useGlobalStore().connection as Connection,
          this.programSage,
          Fleet,
        )
      ).map((fleet) => fleet.type === "ok" && fleet.data) as Fleet[];

      this.is_loading = false;
    },
  },
});
