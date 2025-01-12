"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  useWallet,
  WalletSortingOptions,
  groupAndSortWallets,
  isAptosConnectWallet,
  isInstallRequired,
  truncateAddress,
  APTOS_CONNECT_ACCOUNT_URL,
  WalletItem,
} from "@aptos-labs/wallet-adapter-react";
import {
  ArrowRight,
  ChevronLeft,
  Copy,
  Link,
  LogOut,
  User,
} from "lucide-react";
import { useWalletStore } from "@/store/wallet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  MainWalletViewProps,
  MoreWalletsViewProps,
  WalletRowItemProps,
} from "./wallet.d";
import { useToast } from "@/hooks/use-toast";
import UserAPI from "@/request/auth/user.api";

interface Props extends WalletSortingOptions {
  secure?: boolean;
}

export function WalletSelector({
  secure = false,
  ...walletSortingOptions
}: Props) {
  const prevConnectedRef = useRef<boolean | null>(null);
  const prevAddressRef = useRef<string | null | undefined>(null);
  const { account, connected, disconnect, wallet, signMessage } = useWallet();
  const userApi = new UserAPI();

  const { toast } = useToast();

  useEffect(() => {
    const handleLogin = async () => {
      if (
        secure &&
        connected &&
        account?.address &&
        (prevConnectedRef.current !== connected ||
          prevAddressRef.current !== account.address)
      ) {
        try {
          // Request a message to sign
          const { message, nonce } = await userApi.requestMessage(
            account?.address
          );

          // Ask the user to sign the message
          const response = await signMessage({ message, nonce });

          if (response?.fullMessage && response?.signature) {
            // Call the login API after a successful signature
            await userApi.login(
              account.address,
              response.fullMessage,
              response.signature as string
            );
          } else {
            console.error("Failed to retrieve full message or signature.");
          }
        } catch (error) {
          console.error("Error during login process:", error);
        }
      }

      prevConnectedRef.current = connected;
      prevAddressRef.current = account?.address;
    };

    handleLogin();
  }, [secure, connected, account, signMessage]);

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Failed to copy wallet address to clipboard.",
        variant: "destructive",
      });
    }
  }, [account?.address]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return connected ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-lg">
          {account?.ansName || truncateAddress(account?.address) || "Unknown"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={copyAddress} className="gap-2">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>
        {wallet && isAptosConnectWallet(wallet) && (
          <DropdownMenuItem asChild>
            <a
              href={APTOS_CONNECT_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2"
            >
              <User className="h-4 w-4" /> Account
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={disconnect} className="gap-2">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <ConnectWalletDialog {...walletSortingOptions} />
  );
}

function ConnectWalletDialog({
  ...walletSortingOptions
}: WalletSortingOptions) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [moreView, setMoreView] = useState(false);
  const { wallets = [] } = useWallet();

  // Utility function to filter wallets
  const filteredWallets = wallets.filter((wallet) =>
    ["Petra", "Martian","Continue with Google"].includes(wallet.name)
  );

  const { aptosConnectWallets, availableWallets, installableWallets } =
    groupAndSortWallets(filteredWallets, walletSortingOptions);

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  const onDialogChange = (val: boolean) => {
    setIsDialogOpen(val);
    if (!val) setMoreView(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
      <DialogTrigger asChild>
        <Button className="rounded-lg w-full">Connect a Wallet</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-auto w-[360px] p-6">
        <DialogTitle hidden></DialogTitle>
        {!moreView ? (
          <MainWalletView
            hasAptosConnectWallets={hasAptosConnectWallets}
            aptosConnectWallets={aptosConnectWallets}
            availableWallets={availableWallets}
            installableWallets={installableWallets}
            onMoreViewToggle={() => setMoreView(true)}
          />
        ) : (
          <MoreWalletsView
            installableWallets={installableWallets}
            onBackToggle={() => setMoreView(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function MainWalletView({
  hasAptosConnectWallets,
  aptosConnectWallets,
  availableWallets,
  installableWallets,
  onMoreViewToggle,
}: MainWalletViewProps) {
  return (
    <>
      <DialogHeader className="pt-2">
        {/* <div className="flex justify-center">
          <WalletLogo />
        </div> */}
        <DialogTitle className="flex flex-col text-center leading-snug font-semibold mt-4">
          Connect to DAOs
        </DialogTitle>
      </DialogHeader>

      {hasAptosConnectWallets && (
        <div className="flex flex-col gap-2">
          {aptosConnectWallets.map((wallet) => (
            <WalletRowItem key={wallet.name} wallet={wallet} isAptosConnect />
          ))}
          <div className="flex items-center gap-3 pt-[52px]">
            <div className="h-px w-full bg-grey" /> Or{" "}
            <div className="h-px w-full bg-grey" />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-4">
        {availableWallets.map((wallet) => (
          <WalletRowItem key={wallet.name} wallet={wallet} />
        ))}

        {!!installableWallets.length && (
          <Button
            size="sm"
            variant="link"
            className="gap-2 text-blue font-medium text-sm"
            onClick={onMoreViewToggle}
          >
            More wallets
          </Button>
        )}
      </div>
    </>
  );
}

function MoreWalletsView({
  installableWallets,
  onBackToggle,
}: MoreWalletsViewProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          More Wallets
        </DialogTitle>
      </DialogHeader>

      {installableWallets.map((wallet) => (
        <WalletRowItem key={wallet.name} wallet={wallet} />
      ))}

      <Button
        size="sm"
        variant="link"
        className="gap-1 text-blue font-medium flex justify-start"
        onClick={onBackToggle}
      >
        <ChevronLeft className="w-4 h-4" /> Go Back
      </Button>
    </>
  );
}

function WalletRowItem({ wallet, isAptosConnect = false }: WalletRowItemProps) {
  return (
    <WalletItem wallet={wallet}>
      {isInstallRequired(wallet) ? (
        <Button
          size="lg"
          variant="secondary"
          className="w-full flex justify-between p-3 h-14"
        >
          <div className="flex items-center">
            <WalletItem.Icon className="h-8 w-8 mr-3" />
            <WalletItem.Name className="font-medium text-primary" />
          </div>
          <WalletItem.InstallLink>
            <div className="w-[26px] h-[26px] rounded-full bg-blue place-content-center">
              <Link className="w-4 mx-auto h-4 text-foreground" />
            </div>
          </WalletItem.InstallLink>
        </Button>
      ) : (
        <WalletItem.ConnectButton asChild>
          <Button
            size="lg"
            variant="secondary"
            className={`w-full flex ${
              isAptosConnect ? "justify-between" : "justify-start"
            } p-3 h-14`}
          >
            <div className="flex items-center">
              <WalletItem.Icon className="h-8 w-8 mr-3" />
              <WalletItem.Name className="font-medium text-primary" />
            </div>
            {isAptosConnect && (
              <div className="w-[26px] h-[26px] rounded-full place-content-center">
                <ArrowRight className="w-5 mx-auto h-5 text-foreground" />
              </div>
            )}
          </Button>
        </WalletItem.ConnectButton>
      )}
    </WalletItem>
  );
}
