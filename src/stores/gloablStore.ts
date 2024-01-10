import { defineStore } from "pinia";
import { Connection } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import { useWallet } from "solana-wallets-vue";

import * as anchor from "@coral-xyz/anchor";
export const RPC_NETWORKS = [
  {
    name: "alchemy1",
    url: import.meta.env.VITE_RPC_ALCHEMY_1,
  },
  {
    name: "alchemy2",
    url: import.meta.env.VITE_RPC_ALCHEMY_2,
  },
  {
    name: "alchemy3",
    url: import.meta.env.VITE_RPC_ALCHEMY_3,
  },
];

export const useGlobalStore = defineStore("globalStore", {
  state: () => ({
    connection: new Connection(RPC_NETWORKS[1].url),
  }),
  getters: {
    get_provider(): anchor.AnchorProvider {
      const opts: anchor.web3.ConfirmOptions = {
        preflightCommitment: "processed",
      };

      return new anchor.AnchorProvider(
        useGlobalStore().connection as Connection,
        useWallet().wallet as anchor.Wallet,
        opts,
      );
    },
  },
  actions: {},
});
