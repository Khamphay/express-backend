import { Request as req, Response as res, NextFunction as next } from "express";
import { UserInfor, UserInforModel, Users } from "../models/UserInforModel";
import { client } from "../config/db";
import { hasPass } from "../config/func";

export = {
  adminRegister: async (req: req, res: res, next: next) => {
    try {
      await client.$connect();
      const hasAdmin = await client.users.count({
        where: { roleId: req.body.roleId, isDelete: false }
      });
      if (hasAdmin > 0) {
        return res.json({ msg: "Admin has already!" });
      }

      next();
    } catch (error) {
      return res.status(400).json(error);
    } finally {
      await client.$disconnect();
    }

    try {
      const data: UserInfor = req.body;
      let us: Users = {
        roleId: req.body.roleId,
        userName: req.body.userName,
        password: hasPass(req.body.password),
        createdBy: ""
      };
      data.users = us;
      data.createdBy = "";
      const user = new UserInforModel(data);
      let result = await user.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  userRegister: async (req: req, res: res, next: next) => {
    try {
      const data: UserInfor = req.body;
      let us: Users = {
        roleId: req.body.roleId,
        userName: req.body.userName,
        password: hasPass(req.body.password),
        createdBy: ""
      };
      data.users = us;
      data.createdBy = "";
      const user = new UserInforModel(data);
      let result = await user.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
};
