import {
  AnyAptosWallet,
  WalletSortingOptions,
} from "@aptos-labs/wallet-adapter-react";

export interface MainWalletViewProps {
  /**
   * Indicates if Aptos Connect wallets are available
   */
  hasAptosConnectWallets: boolean;

  /**
   * List of Aptos Connect wallets
   */
  aptosConnectWallets: AnyAptosWallet[];

  /**
   * List of available wallets that can be connected
   */
  availableWallets: AnyAptosWallet[];

  /**
   * List of wallets that require installation
   */
  installableWallets: AnyAptosWallet[];

  /**
   * Callback to toggle to more wallets view
   */
  onMoreViewToggle: () => void;

  /**
   * Optional wallet sorting options
   */
  walletSortingOptions?: WalletSortingOptions;
}

// Props for MoreWalletsView component
export interface MoreWalletsViewProps {
  /**
   * List of wallets that require installation
   */
  installableWallets: AnyAptosWallet[];

  /**
   * Callback to go back to main wallet view
   */
  onBackToggle: () => void;
}

// Props for WalletRowItem component
export interface WalletRowItemProps {
  /**
   * The wallet to be displayed
   */
  wallet: AnyAptosWallet;

  /**
   * Indicates if this is an Aptos Connect wallet
   * Affects the rendering of the wallet row
   */
  isAptosConnect?: boolean;

  /**
   * Optional connect handler
   */
  onConnect?: () => void;
}
