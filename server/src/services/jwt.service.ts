import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../libs/prisma";

export class JwtService {
  private static jwtSecret: string = process.env.JWT_SECRET!;
  private static expiresIn: string = process.env.JWT_EXPIRES_IN!;

  sign(payload: any) {
    return jwt.sign({ id: payload }, JwtService.jwtSecret, {
      expiresIn: JwtService.expiresIn,
    });
  }

  async protect(req: Request, res: Response, next: NextFunction) {
    try {
      // 1) Getting token and check if it exists
      let token = "";
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({
          message: "You are not logged in. Please login to get access",
        });
      }

      // 2) Verification token
      jwt.verify(token, JwtService.jwtSecret, async (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).json({
            message: "Token is invalid. Please login again.",
          });
        }

        if ((decoded as JwtPayload).exp! * 1000 < Date.now()) {
          // 3) Check if token is already expired
          return res.status(401).json({
            message: "Token is expired. Please login again.",
          });
        }

        // 4) Check if user still exists
        const freshUser = await prisma.user.findUnique({
          where: {
            id: (decoded as JwtPayload).id,
          },
        });

        if (!freshUser) {
          return res.status(401).json({
            message: "The token belonging to this user no longer exists",
          });
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.body.user = freshUser;
        next();
      });
    } catch (error: any) {
      res.status(500).json({
        message: "JWT Failure",
        error: error.message,
      });
    }
  }
}
