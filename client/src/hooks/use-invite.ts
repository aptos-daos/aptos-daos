import { generateInviteCode } from "@/lib/invite-code";
import { useRequest } from "@/request/api/request.hook";
import InviteAPI from "@/request/invite/invite.api";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";

const useInvite = (secure: boolean = false) => {
  const { connected } = useWallet();
  const api = new InviteAPI();
  const [codes, setCodes] = useState<string[]>([]);
  const { handleRequest } = useRequest();

  // useEffect(() => {
  //   if (secure) {
  //     getInviteCodes().then((codes) => {
  //       setCodes(codes);
  //     });
  //   }
  // }, [secure]);

  const createInviteCode = async (): Promise<string> => {
    const code = generateInviteCode();
    const resp = await handleRequest<string>(() => api.addInvite(code));
    if (resp) return resp;
    return "";
  };

  const removeInviteCode = async (code: string): Promise<boolean> => {
    const success = await handleRequest<boolean>(() => api.removeInvite(code));
    return !!success;
  };

  const getInviteCodes = async (): Promise<string[]> => {
    const fetchedCodes = await handleRequest<string[]>(() => api.listInvites());
    if (fetchedCodes) {
      setCodes(fetchedCodes);
      return fetchedCodes;
    }
    return [];
  };

  const validInvite = async (code: string): Promise<boolean> => {
    const resp = await handleRequest<boolean>(() => api.validateInvite(code));
    if (resp) return true;
    return false;
  };

  return {
    createInviteCode,
    removeInviteCode,
    getInviteCodes,
    validInvite,
    codes,
  };
};

export default useInvite;
