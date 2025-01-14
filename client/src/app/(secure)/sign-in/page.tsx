"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InviteAPI from "@/request/invite/invite.api";

const FundCreationCard = () => {
  const inviteAPI = new InviteAPI();
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInviteCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };

  const handleValidateInvite = async () => {
    if (!inviteCode) {
      alert("Invite code is required");
      return;
    }
    setLoading(true);
    try {
      const response = await inviteAPI.validateInvite(inviteCode);
      if (response) {
        
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Create Fund Today</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Invite code"
              className="w-full"
              value={inviteCode}
              onChange={handleInviteCodeChange}
            />
          </div>
          <Button
            className="w-full bg-green-500 hover:bg-green-600"
            onClick={handleValidateInvite}
          >
            {loading ? "Validating..." : "Validate Invite"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundCreationCard;
