import { randomBytes } from "crypto";
import {
  Aptos,
  Ed25519PrivateKey,
  Ed25519PublicKey,
  Ed25519Signature,
} from "@aptos-labs/ts-sdk";
import { AptosAccount, AptosClient } from "aptos";

export const aptos = new Aptos();

export const client = new AptosClient(
  "https://fullnode.testnet.aptoslabs.com/v1"
);

const privateKey = new Ed25519PrivateKey(
  process.env.ADMIN_PRIVATE_KEY as string
);
export const ADMIN_ACCOUNT = new AptosAccount(privateKey.toUint8Array());
//Switch between testnet and mainnet
export const GRAPHQL_ENDPOINT = "https://api.testnet.aptoslabs.com/v1/graphql";
export class AptosVerificationService {
  requestMessage(address: string): any {
    try {
      const nonce = randomBytes(16).toString("base64");
      const issuedAt = new Date().toISOString();
      const message = `wgmi.launchpad wants you to sign in with your Aptos account:
${address}

Please confirm

URI: https://wgmi.launchpad/
Version: 1
Network: testnet
Nonce: ${nonce}
Issued At: ${issuedAt}
Resources: ["https://docs.moralis.io/"]`;

      return { message, nonce };
    } catch (error) {
      console.error(error);
      return { message: "", nonce: "" };
    }
  }
  async verifyMessage(
    account: any,
    message: string,
    signature: string
  ): Promise<string> {
    try {
      const pubKey = new Ed25519PublicKey(account.publicKey);
      const signatureObj = new Ed25519Signature(signature);
      const encodedMessage = new TextEncoder().encode(message);

      const verified = pubKey.verifySignature({
        message: encodedMessage,
        signature: signatureObj,
      });
      return verified ? account.address : "";
    } catch (error) {
      console.error(error);
      return "";
    }
  }
}
