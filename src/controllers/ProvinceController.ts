import { Request as req, Response as res, NextFunction as next } from "express";
import { ProvinceModel, Provinces } from "../models/ProvinceModel";

export = {
  getAllProvinces: async (req: req, res: res, next: next) => {
    try {
      const province = new ProvinceModel();
      let result = await province.getAllData();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getProvinceByID: async (req: req, res: res, next: next) => {
    try {
      const province = new ProvinceModel();
      let result = await province.getOneDataByID(parseInt(req.params.id));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  createProvince: async (req: req<{}, {}, Provinces>, res: res, next: next) => {
    try {
      const data = req.body;
      const province = new ProvinceModel(data);
      let result = await province.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateProvince: async (req: req<{}, {}, Provinces>, res: res, next: next) => {
    try {
      const data = req.body;
      const province = new ProvinceModel(data);
      let result = await province.updateData(data.id ?? 0);
      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Province" });
    } catch (error) {
      next(error);
    }
  },

  deleteProvince: async (req: req, res: res, next: next) => {
    try {
      const province = new ProvinceModel();
      let result = await province.deleteData(parseInt(req.params.id ?? 0));

      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Province" });
    } catch (error) {
      next(error);
    }
  }
};
