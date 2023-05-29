import { Request as req, Response as res, NextFunction as next } from "express";
import { PossitionModel, Possitions } from "../models/PossitionModel";

export = {
  getAllPossitions: async (req: req, res: res, next: next) => {
    try {
      const possition = new PossitionModel();
      let result = await possition.getAllData();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getPossitionByID: async (req: req, res: res, next: next) => {
    try {
      const possition = new PossitionModel();
      let result = await possition.getOneDataByID(parseInt(req.params.id));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  createPossition: async (
    req: req<{}, {}, Possitions>,
    res: res,
    next: next
  ) => {
    try {
      const data = req.body;
      data.createdBy = req.user?.uid ?? "";
      const possition = new PossitionModel(data);
      let result = await possition.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updatePossition: async (
    req: req<{}, {}, Possitions>,
    res: res,
    next: next
  ) => {
    try {
      const data = req.body;
      data.updatedBy = req.user?.uid ?? null;
      const possition = new PossitionModel(data);
      let result = await possition.updateData(data.id ?? 0);
      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Possition" });
    } catch (error) {
      next(error);
    }
  },

  deletePossition: async (req: req, res: res, next: next) => {
    try {
      const possition = new PossitionModel();
      let result = await possition.deleteData(parseInt(req.params.id ?? 0));

      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Possition" });
    } catch (error) {
      next(error);
    }
  }
};
