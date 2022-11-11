import * as anchor from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
  //   Token,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Buffer } from "buffer";

export const transferWrappedSol = async (
  user: anchor.web3.PublicKey,
  associatedTokenAccount: anchor.web3.PublicKey,
  amount: number,
  connection: anchor.web3.Connection
) => {
  const ata = associatedTokenAccount;
  let actualAmount = 0;
  //   const tx = new Transaction();
  let tx: TransactionInstruction[] = [];
  try {
    const tokenAmount = await connection.getTokenAccountBalance(ata);
    actualAmount = parseFloat(tokenAmount.value.amount);
    if (actualAmount >= amount) {
      return tx;
    }
  } catch (err) {
    // payer: PublicKey, associatedToken: PublicKey, owner: PublicKey, mint:
    tx.push(
      //   createAssociatedTokenAccountInstruction(
      //     ASSOCIATED_TOKEN_PROGRAM_ID,
      //     TOKEN_PROGRAM_ID,
      //     NATIVE_MINT,
      //     ata,
      //     user,
      //     user
      //   )
      createAssociatedTokenAccountInstruction(user, ata, user, NATIVE_MINT)
    );
  }

  tx.push(
    SystemProgram.transfer({
      fromPubkey: user,
      toPubkey: ata,
      lamports: amount - actualAmount,
    }),
    // Sync Native instruction. @solana/spl-token will release it soon. Here use the raw instruction temporally.
    new TransactionInstruction({
      keys: [
        {
          pubkey: ata,
          isSigner: false,
          isWritable: true,
        },
      ],
      data: Buffer.from(new Uint8Array([17])),
      programId: TOKEN_PROGRAM_ID,
    })
  );
  return tx;
};

export type ApiConfig = RequestInit & { path?: string };
export const _ludexChallengeApi =
  (bearerToken: string, api: string) =>
  async <T>(config: ApiConfig): Promise<T> => {
    const response = await fetch(
      `https://api.ludex.gg/${api}/${config.path || ""}`,
      {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    const data = await response.json();
    return data as T;
  };

export const poll = async <T>(
  func: () => Promise<T>,
  retryCondition: (Obj: T) => boolean,
  interval: number,
  numberOfRetry?: number
) => {
  let retry = 0;
  while (numberOfRetry === undefined || retry < numberOfRetry) {
    const result = await func();
    if (retryCondition(result)) {
      return result;
    }
    retry++;
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error("Timed out");
};
