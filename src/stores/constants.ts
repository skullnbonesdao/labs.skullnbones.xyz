import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

export const SAGE_PROGRAM_ID = new PublicKey(
  "SAGEqqFewepDHH6hMDcmWy7yjHPpyKLDnRXKb3Ki8e6",
);
export const PLAYER_PROGRAM_ID = new PublicKey(
  "pprofELXjL5Kck7Jn5hCpwAL82DpTkSYBENzahVtbc9",
);
export const PROFILE_FACTION_PROGRAM_ID = new PublicKey(
  "pFACSRuobDmvfMKq1bAzwj27t6d2GJhSCHb1VcfnRmq",
);
export const CARGO_PROGRAM_ID = new PublicKey(
  "CargoM2ocdkk3ubsu5j6ocKNJ5eQivsX1MHFrS3iQwH1",
);

export const GAME_ID = new PublicKey(
  "GameYNgVLn9kd8BQcbHm8jNMqJHWhcZ1YTNy6Pn3FXo5",
);

export enum SAGE_KEYS {
  CARGO_MANAGER = 1,
  SAGE_MANAGER = 2,
  FLEET_MANAGER = 3,
  REMOVE_ESCROW = 4,
  MANAGE_SHIP = 5,
  MANAGE_CARGO = 6,
}

export const SPACE_STATIONS = {
  MUD_CSS: [new BN(0), new BN(-39)],
};
