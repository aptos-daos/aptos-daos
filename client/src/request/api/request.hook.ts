import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { APIError } from "./APIRequest";
import { useToast } from "@/hooks/use-toast";

export const useRequest = () => {
  const { account } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRequest = async <T>(
    requestFn: () => Promise<T>,
    message?: string,
    checkAuth = true,
    recursionIndex = 0,
    onSuccess?: () => void
  ) => {
    if (checkAuth && (!account || !account.address)) {
      toast({
        title: "Error Connecting Wallet",
        description: "Please connect your wallet to perform this action.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      const result: T = await requestFn();
      if (message && !message.toLocaleLowerCase().includes("error")) {
        toast({
          title: "Success",
          description: message,
        });
      }
      if (onSuccess) onSuccess();
      return result;
    } catch (error) {
      if (recursionIndex > 0) {
        return await handleRequest(
          requestFn,
          message,
          true,
          recursionIndex - 1
        );
      } else if (error instanceof APIError) {
        toast({
          title: "Something went wrong",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: message ?? "An unexpected error occurred",
          variant: "destructive",
        });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return {
    isLoading,
    setLoading,
    handleRequest,
  };
};
