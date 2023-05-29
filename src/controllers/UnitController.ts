import { Request as req, Response as res, NextFunction as next } from "express";
import { UnitModel, Units } from "../models/UnitModel";

export = {
  getAllUnits: async (req: req, res: res, next: next) => {
    try {
      const unit = new UnitModel();
      let result = await unit.getAllData();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getUnitByID: async (req: req, res: res, next: next) => {
    try {
      const unit = new UnitModel();
      let result = await unit.getOneDataByID(parseInt(req.params.id));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  createUnit: async (req: req<{}, {}, Units>, res: res, next: next) => {
    try {
      const data = req.body;
      data.createdBy = req.user?.uid ?? "";
      const unit = new UnitModel(data);
      let result = await unit.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateUnit: async (req: req<{}, {}, Units>, res: res, next: next) => {
    try {
      const data = req.body;
      data.updatedBy = req.user?.uid ?? null;
      const Unit = new UnitModel(data);
      let result = await Unit.updateData(data.id ?? 0);
      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Unit" });
    } catch (error) {
      next(error);
    }
  },

  deleteUnit: async (req: req, res: res, next: next) => {
    try {
      const Unit = new UnitModel();
      let result = await Unit.deleteData(parseInt(req.params.id ?? 0));

      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Unit" });
    } catch (error) {
      next(error);
    }
  }
};
