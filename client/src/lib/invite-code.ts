import RandExp from "randexp";

export const generateInviteCode = (): string => {
  const parts = Array(5).fill(null).map(() => 
    new RandExp(/[A-Z0-9]{4}/).gen()
  );
  return parts.join('-');
};
