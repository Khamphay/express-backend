import { Router } from "express";
import { verfToken, isAllPermis, isAdmAndEmp } from "../../middleware/Auth";
import unit from "../../controllers/UnitController";

const router = Router();

router.get("/", [verfToken, isAllPermis], unit.getAllUnits);
router.get("/:id", [verfToken, isAllPermis], unit.getUnitByID);
router.post("/", [verfToken, isAdmAndEmp], unit.createUnit);
router.put("/", [verfToken, isAdmAndEmp], unit.updateUnit);
router.delete("/:id", [verfToken, isAdmAndEmp], unit.deleteUnit);

export = router;
