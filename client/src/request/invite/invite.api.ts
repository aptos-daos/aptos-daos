import APIRequest from "../api/APIRequest";

type ValidateInviteResponse = {
  success: boolean;
  message: string;
};

export default class InviteAPI extends APIRequest {
  constructor() {
    super();
  }

//   async getInvite(code: string) {
//     if (!code) {
//       throw new Error("Invite code is required");
//     }

//     const config = {
//       url: `/invite/${code}`,
//       method: "GET",
//     };

//     try {
//       const response = await this.request<InviteResponse>(config);
      
//       if (!response) {
//         throw new Error("No response from server when fetching invite");
//       }

//       return response;
//     } catch (error) {
//       console.error("Failed to fetch invite:", error);
//       throw error;
//     }
//   }

  async validateInvite(code: string) {
    if (!code) {
      throw new Error("Invite code is required");
    }

    const config = {
      url: "/invite/validate",
      method: "POST",
      data: { code },
    };

    try {
      const response = await this.request<ValidateInviteResponse>(config);

      if (!response) {
        throw new Error("No response from server when validating invite");
      }

      return response;
    } catch (error) {
      console.error("Failed to validate invite:", error);
      throw error;
    }
  }
}