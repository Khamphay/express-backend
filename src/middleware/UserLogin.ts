import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request as req, Response as res, NextFunction as next } from "express";
import { client } from "../config/db";
import { TokenModel } from "./TokenModel";

const exp = "1d";

export = {
  userSignIn: async (req: req, res: res, next: next) => {
    try {
      await client.$connect();

      const { userName, password } = req.body;
      let user = await client.users.findUnique({
        include: { roles: true },
        where: { userName: userName }
      });

      if (!user) {
        throw "Username Invalid!";
      }

      var isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        throw "Password Invalid!";
      }
      let payload: TokenModel = {
        user: {
          uid: user.uid,
          userName: user.userName,
          roleId: user.roleId
        }
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: exp
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        // sameSite: "None",
        // source: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET!, {
        expiresIn: "3d"
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // sameSite: "None",
        // source: true,
        maxAge: 72 * 60 * 60 * 1000
      });

      await client.users.update({
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          expired: exp
        },
        where: {
          uid: user.uid
        }
      });

      return res.json({
        mag: "ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ",
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } catch (error) {
      next(error);
    } finally {
      await client.$disconnect();
    }
  },

  refreshSignInToken: async (req: req, res: res, next: next) => {
    try {
      const refreshToken = req.cookies["refreshToken"];
      console.log(refreshToken);
      if (refreshToken == null) {
        return res.status(403).json({ msg: "Refresh Token is required!" });
      }

      let payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET!
      ) as TokenModel;

      if (payload) {
        const newToken = jwt.sign(payload, process.env.JWT_SECRET!);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          //   sameSite: "None",
          //   source: true,
          maxAge: 24 * 60 * 60 * 1000
        });

        await client.users.update({
          data: {
            accessToken: newToken,
            expired: exp
          },
          where: {
            uid: payload.user.uid
          }
        });

        return res.json({
          mag: "Refresh token successfully",
          accessToken: newToken,
          refreshToken: refreshToken
        });
      } else {
        return res.status(403).json({ msg: "Unauthorized access!" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
