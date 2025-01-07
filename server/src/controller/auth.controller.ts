import { Request, Response } from "express";
import { JwtService, AptosVerificationService } from "../services";
import prisma from "../libs/prisma";

export class AuthController {
  private jwtService: JwtService;
  private aptosVerificationService: AptosVerificationService;

  constructor() {
    this.jwtService = new JwtService();
    this.aptosVerificationService = new AptosVerificationService();

    this.signin = this.signin.bind(this);
    this.requestMessage = this.requestMessage.bind(this);
  }

  async signin(req: Request, res: Response) {
    const { account, message, signature } = req.body;

    if (!account || !message || !signature) {
      return res.status(400).json({
        message: "Account, Message and Signature are required to login.",
      });
    }

    const walletAddress = await this.aptosVerificationService.verifyMessage(
      account,
      message,
      signature
    );
    if (walletAddress === "") {
      return res.status(400).json({
        message: "Message verification failed.",
      });
    }

    let user = await prisma.user.create({
      data: {
        walletAddress,
      },
    });

    const token = this.jwtService.sign(walletAddress);

    res.status(200).json({
      message: "success",
      data: {
        token,
        walletAddress: user.walletAddress,
      },
    });
  }

  requestMessage(req: Request, res: Response) {
    const { walletAddress } = req.body;
    if (!walletAddress) {
      return res.status(400).json({
        message: "Wallet address not found",
      });
    }

    const message = this.aptosVerificationService.requestMessage(walletAddress);
    if (message.message === "") {
      return res.status(400).json({
        message: "Message generation failed.",
      });
    }
    res.status(200).json({
      message: "success",
      data: message,
    });
  }
}

