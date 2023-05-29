import jwt from "jsonwebtoken";
import { Request as req, Response as res, NextFunction as next } from "express";
import { TokenModel } from "./TokenModel";
import { client } from "../config/db";
import { Users } from "../models/UserInforModel";

import { Decoded } from "../types/decoded";

declare global {
  namespace Express {
    interface Request {
      user?: Decoded;
    }
  }
}

// declare function cookieParser(
//   secret?: string | string[],
//   options?: cookieParser.CookieParseOptions
// ): express.RequestHandler;

// declare namespace cookieParser {
//   interface CookieParseOptions {
//     decode?(val: string): string;
//   }

//   function JSONCookie(jsonCookie: string): object | undefined;

//   function JSONCookies<T extends { [key: string]: string }>(
//     jsonCookies: T
//   ): { [P in keyof T]: object | undefined };

//   function signedCookie(
//     cookie: string,
//     secret: string | string[]
//   ): string | false;

//   function signedCookies<T extends { [key: string]: string }>(
//     cookies: T,
//     secret: string | string[]
//   ): { [P in keyof T]?: string | false };
// }

async function getUserRole(uid: string): Promise<Users | any> {
  try {
    await client.$connect();
    const user = await client.users.findUnique({
      include: {
        roles: true
      },
      where: { uid: uid }
    });
    return user;
  } catch (error) {
    return null;
  } finally {
    await client.$disconnect();
  }
}

async function verfToken(req: req, res: res, next: next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ msg: "Invalid token!" });
    }

    const accessToken = token.split(" ")[1];
    let decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET!
    ) as TokenModel;
    if (!decoded) {
      return res.status(403).json({ msg: "Unauthorized to access!" });
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Unauthorized to access!" });
  }
}

async function isAdmin(req: req, res: res, next: next) {
  try {
    let user = await getUserRole(req.user?.uid ?? "");
    if (user && user.roles.name == "admin") {
      next();
    } else {
      throw "";
    }
  } catch (error) {
    return res.status(403).send({ msg: "Require admin roles!" });
  }
}

async function isEmp(req: req, res: res, next: next) {
  try {
    let user = await getUserRole(req.user?.uid ?? "");
    if (user && user.roles.name == "employee") {
      return next();
    } else {
      throw "";
    }
  } catch (error) {
    return res.status(403).send({ msg: "Require employee roles!" });
  }
}

async function isCust(req: req, res: res, next: next) {
  try {
    let user = await getUserRole(req.user?.uid ?? "");
    if (user && user.roles.name == "customer") {
      return next();
    } else {
      throw "";
    }
  } catch (error) {
    return res.status(403).send({ msg: "Require customer roles!" });
  }
}

async function isAdmAndEmp(req: req, res: res, next: next) {
  try {
    let user = await getUserRole(req.user?.uid ?? "");
    if (user && (user.roles.name == "admin" || user.roles.name == "employee")) {
      return next();
    } else {
      throw "";
    }
  } catch (error) {
    return res.status(403).send({ msg: "Require admin or employee roles!" });
  }
}

async function isAllPermis(req: req, res: res, next: next) {
  try {
    let user = await getUserRole(req.user?.uid ?? "");
    if (
      user &&
      (user.roles.name == "admin" ||
        user.roles.name == "employee" ||
        user.roles.name == "customer")
    ) {
      return next();
    } else {
      throw "";
    }
  } catch (error) {
    return res.status(403).send({ msg: "Require roles!" });
  }
}

export { verfToken, isAdmin, isAdmAndEmp, isEmp, isCust, isAllPermis };
