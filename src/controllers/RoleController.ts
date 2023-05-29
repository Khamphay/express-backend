import { Request as req, Response as res, NextFunction as next } from "express";
import { RoleModel, Roles } from "../models/RoleModel";

export = {
  getAllRoles: async (req: req, res: res, next: next) => {
    try {
      const role = new RoleModel();
      let result = await role.getAllData();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getRoleByID: async (req: req, res: res, next: next) => {
    try {
      const role = new RoleModel();
      let result = await role.getOneDataByID(parseInt(req.params.id));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  createRole: async (req: req<{}, {}, Roles>, res: res, next: next) => {
    try {
      const data = req.body;
      const role = new RoleModel(data);
      let result = await role.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateRole: async (req: req<{}, {}, Roles>, res: res, next: next) => {
    try {
      const data = req.body;
      const role = new RoleModel(data);
      let result = await role.updateData(data.id ?? 0);
      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Role" });
    } catch (error) {
      next(error);
    }
  }
};
