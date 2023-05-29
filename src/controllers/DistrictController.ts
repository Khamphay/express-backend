import { Request as req, Response as res, NextFunction as next } from "express";
import { DistrictModel, Districts } from "../models/DistrictModel";

export = {
  getAllDistricts: async (req: req, res: res, next: next) => {
    try {
      const district = new DistrictModel();
      let result = await district.getAllData(
        req.body.page,
        req.body.perPage,
        req.body.totalPages
      );
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getDistrictByProID: async (req: req, res: res, next: next) => {
    try {
      const district = new DistrictModel();
      let result = await district.getDistrictByProID(
        parseInt(req.params.proId)
      );
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getDistrictByID: async (req: req, res: res, next: next) => {
    try {
      const district = new DistrictModel();
      let result = await district.getOneDataByID(parseInt(req.params.id));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  createDistrict: async (req: req<{}, {}, Districts>, res: res, next: next) => {
    try {
      const data = req.body;
      const district = new DistrictModel(data);
      let result = await district.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateDistrict: async (req: req<{}, {}, Districts>, res: res, next: next) => {
    try {
      const data = req.body;
      const district = new DistrictModel(data);
      let result = await district.updateData(data.id ?? 0);
      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found District" });
    } catch (error) {
      next(error);
    }
  },

  deleteDistrict: async (req: req, res: res, next: next) => {
    try {
      const district = new DistrictModel();
      let result = await district.deleteData(parseInt(req.params.id ?? 0));

      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found District" });
    } catch (error) {
      next(error);
    }
  }
};
