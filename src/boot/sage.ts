import SolanaWallets from "solana-wallets-vue";

// You can either import the default styles or create your own.
import "src/css/wallet_connect.css";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { boot } from "quasar/wrappers";

import { computed } from "vue";
import { useAnchorWallet } from "solana-wallets-vue";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { SAGE_IDL } from "@staratlas/sage";
import { SAGE_PROGRAM_ID } from "stores/constants";

const preflightCommitment = "processed";
const commitment = "confirmed";

let workspace = null;
export const useWorkspace = () => workspace;

export function initWorkspace() {
  const wallet = useAnchorWallet();
  const connection = new Connection(clusterApiUrl("devnet"), commitment);
  const provider = computed(
    () =>
      new AnchorProvider(connection, wallet.value, {
        preflightCommitment,
        commitment,
      }),
  );
  const program = computed(
    () => new Program(SAGE_IDL, SAGE_PROGRAM_ID, provider.value),
  );

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
}
