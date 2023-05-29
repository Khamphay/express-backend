import { Router } from "express";
import { verfToken, isAdmAndEmp, isAllPermis } from "../../middleware/Auth";
import zone from "../../controllers/ZoneController";

const router = Router();

router.get("/", zone.getAllZones);
router.get("/:id", zone.getZoneByID);
router.post("/", [verfToken, isAdmAndEmp], zone.createZone);
router.put("/", [verfToken, isAdmAndEmp], zone.updateZone);
router.delete("/:id", [verfToken, isAdmAndEmp], zone.deleteZone);

export = router;
