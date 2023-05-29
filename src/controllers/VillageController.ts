import { Request as req, Response as res, NextFunction as next } from "express";
import { VillageModel, Villages } from "../models/VillageModel";

export = {
  getAllVillages: async (req: req, res: res, next: next) => {
    try {
      const village = new VillageModel();
      let result = await village.getAllData(req.body.page, req.body.perPage);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getVillageByDistID: async (req: req, res: res, next: next) => {
    try {
      const village = new VillageModel();
      let result = await village.getVillageByDistID(
        parseInt(req.params.distId)
      );
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getVillageByID: async (req: req, res: res, next: next) => {
    try {
      const village = new VillageModel();
      let result = await village.getOneDataByID(parseInt(req.params.id));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  createVillage: async (req: req, res: res, next: next) => {
    try {
      const data: Villages = req.body;
      data.createdBy = req.user?.uid ?? "";
      const village = new VillageModel(data);
      let result = await village.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateVillage: async (req: req, res: res, next: next) => {
    try {
      const data: Villages = req.body;
      data.updatedBy = req.user?.uid ?? "";
      const village = new VillageModel(data);
      let result = await village.updateData(data.id ?? 0);
      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Village" });
    } catch (error) {
      next(error);
    }
  },

  deleteVillage: async (req: req, res: res, next: next) => {
    try {
      const village = new VillageModel();
      let result = await village.deleteData(parseInt(req.params.id ?? 0));

      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Village" });
    } catch (error) {
      next(error);
    }
  }
};
