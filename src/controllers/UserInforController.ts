import { Request as req, Response as res, NextFunction as next } from "express";
import { UserInfor, UserInforModel, Users } from "../models/UserInforModel";

export = {
  getAllUserInfors: async (req: req, res: res, next: next) => {
    try {
      const user = new UserInforModel();
      let result = await user.getAllData();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getUserInfor: async (req: req, res: res, next: next) => {
    try {
      const user = new UserInforModel();
      let result = await user.getOneDataByID(req.user?.uid ?? "");
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getUserInforByID: async (req: req, res: res, next: next) => {
    try {
      const user = new UserInforModel();
      let result = await user.getOneDataByID(req.params.uid);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  createUserInfor: async (req: req, res: res, next: next) => {
    try {
      const data: UserInfor = req.body;
      data.createdBy = req.user?.uid ?? "";
      const User = new UserInforModel(data);
      let result = await User.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateUserInfor: async (req: req, res: res, next: next) => {
    try {
      const data: UserInfor = req.body;
      data.updatedBy = req.user?.uid ?? "";
      const user = new UserInforModel(data);
      let result = await user.updateData(data.uid ?? "");
      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found User" });
    } catch (error) {
      next(error);
    }
  },

  deleteUserInfor: async (req: req, res: res, next: next) => {
    try {
      const user = new UserInforModel();
      let result = await user.deleteData(req.params.uid);

      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found User" });
    } catch (error) {
      next(error);
    }
  }
};
