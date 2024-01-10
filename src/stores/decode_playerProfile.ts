import { KeyedAccountInfo } from "@solana/web3.js";
import {
  PlayerProfile,
  PlayerProfileIDLProgram,
} from "@staratlas/player-profile/src";
import {
  decodeAccountWithRemaining,
  DecodedAccountData,
} from "@staratlas/data-source";
import {
  PROFILE_KEY_MIN_DATA_SIZE,
  ProfileKey,
} from "@staratlas/player-profile/src/playerProfile";

export function decodeDataPlayerProfile(
  account: KeyedAccountInfo,
  program: PlayerProfileIDLProgram,
): DecodedAccountData<PlayerProfile> {
  return decodeAccountWithRemaining(
    account,
    program,
    PlayerProfile,
    (remainingData, data) => {
      const remainingDataLength = remainingData.readUint16LE();
      remainingData = remainingData.subarray(2);
      return Array(remainingDataLength)
        .fill(0)
        .map((_, index) =>
          program.coder.types.decode<ProfileKey>(
            "ProfileKey",
            remainingData
              .subarray(PROFILE_KEY_MIN_DATA_SIZE * index)
              .subarray(0, PROFILE_KEY_MIN_DATA_SIZE),
          ),
        );
    },
  );
}
