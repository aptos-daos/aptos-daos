import { randomBytes } from "crypto";
import {
  Aptos,
  Ed25519PrivateKey,
  Ed25519PublicKey,
  Ed25519Signature,
} from "@aptos-labs/ts-sdk";
import { AptosAccount } from "aptos";

const NETWORK = "testnet";
const API_VERSION = "1";
const URI = "https://arupbasak.xyz/";
const RESOURCES = ["https://docs.moralis.io/"];

const getHex = (str: string): string =>
  str.startsWith("0x") ? str : `0x${str}`;
const generateNonce = (): string => randomBytes(16).toString("base64");

export const aptos = new Aptos();

const initializeAdminAccount = (): AptosAccount => {
  const privateKeyStr = process.env.ADMIN_PRIVATE_KEY;
  if (!privateKeyStr) {
    throw new Error("Admin private key not found in environment variables");
  }

  const privateKey = new Ed25519PrivateKey(privateKeyStr);
  return new AptosAccount(privateKey.toUint8Array());
};

export const ADMIN_ACCOUNT = initializeAdminAccount();

export class AptosVerificationService {
  private static createMessage(
    address: string,
    nonce: string,
    issuedAt: string
  ): string {
    return `wgmi.launchpad wants you to sign in with your Aptos account:
    ${address}
    Please confirm
    URI: ${URI}
    Version: ${API_VERSION}
    Network: ${NETWORK}
    Nonce: ${nonce}
    Issued At: ${issuedAt}
    Resources: ${JSON.stringify(RESOURCES)}`;
  }

  public requestMessage(address: string): { message: string; nonce: string } {
    try {
      if (!address) {
        throw new Error("Address is required");
      }

      const nonce = generateNonce();
      const issuedAt = new Date().toISOString();
      const message = AptosVerificationService.createMessage(
        address,
        nonce,
        issuedAt
      );

      return { message, nonce };
    } catch (error) {
      console.error("Error in requestMessage:", error);
      throw error; // Better to throw than return empty strings
    }
  }

  public verifySignature(
    message: string,
    signature: string,
    publicKey: string
  ): boolean {
    try {
      if (!message || !signature || !publicKey) {
        throw new Error("Message, signature, and public key are required");
      }

      const ed25519PublicKey = new Ed25519PublicKey(
        ADMIN_ACCOUNT.pubKey().toShortString()
      );
      const ed25519Signature = new Ed25519Signature(getHex(signature));
      const encodedMessage = new TextEncoder().encode(message);

      return ed25519PublicKey.verifySignature({
        message: encodedMessage,
        signature: ed25519Signature,
      });
    } catch (error) {
      console.error("Error in verifySignature:", error);
      return false;
    }
  }
}
