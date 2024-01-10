import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Fleet, SAGE_IDL, SageIDLProgram } from "@staratlas/sage";
import {
  PROFILE_FACTION_PROGRAM_ID,
  SAGE_KEYS,
  SAGE_PROGRAM_ID,
} from "stores/constants";
import { Program } from "@project-serum/anchor";
import { useGlobalStore } from "stores/gloablStore";
import { ProfileFactionAccount } from "@staratlas/profile-faction";
import { useAnchorWallet, useWallet } from "solana-wallets-vue";
import { useSageStore } from "stores/sageStore";
import { useWorkspace } from "boot/sage";
import { StarbasePlayer } from "@staratlas/sage/src";

export function fleet_undock(fleet: PublicKey, starbase: PublicKey) {
  Fleet.loadingBayToIdle(
    useSageStore().programSage,
    useAnchorWallet().value,
    useSageStore().playerProfile,
    ProfileFactionAccount.findAddress(
      PROFILE_FACTION_PROGRAM_ID,
      useSageStore().playerProfile,
    )[0],
    fleet,
    starbase,
    StarbasePlayer.findAddress(
      useSageStore().programSage,
      starbase,
      useSageStore().playerProfile,
      0,
    )[0],
    useSageStore().game,
    useSageStore().gameState,
    SAGE_KEYS.SAGE_MANAGER,
  );

  return 0;
}

export function fleet_dock() {
  console.log("dock");
  return 0;
}

export function fleet_mint() {
  return 0;
}
