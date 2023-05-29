import { Request as req, Response as res, NextFunction as next } from "express";
import { Zones, ZonesModel } from "../models/ZoneModel";

export = {
  getAllZones: async (req: req, res: res, next: next) => {
    try {
      const Zone = new ZonesModel();
      let result = await Zone.getAllData();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getZoneByID: async (req: req, res: res, next: next) => {
    try {
      const Zone = new ZonesModel();
      let result = await Zone.getOneDataByID(parseInt(req.params.id));
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  createZone: async (req: req, res: res, next: next) => {
    try {
      const data: Zones = req.body;
      data.createdBy = req.user?.uid;
      const Zone = new ZonesModel(data);
      let result = await Zone.createData();
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateZone: async (req: req, res: res, next: next) => {
    try {
      const data: Zones = req.body;
      data.updatedBy = req.user?.uid;
      const Zone = new ZonesModel(data);
      let result = await Zone.updateData(data.id ?? 0);
      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Zone" });
    } catch (error) {
      next(error);
    }
  },

  deleteZone: async (req: req, res: res, next: next) => {
    try {
      const Zone = new ZonesModel();
      let result = await Zone.deleteData(parseInt(req.params.id ?? 0));

      return result !== null
        ? res.json(result)
        : res.status(400).json({ msg: "Not found Zone" });
    } catch (error) {
      next(error);
    }
  }
};
