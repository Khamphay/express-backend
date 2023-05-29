import { Router } from "express";
import { verfToken, isAdmAndEmp, isAllPermis } from "../../middleware/Auth";
import vill from "../../controllers/VillageController";

const router = Router();

router.post("/", vill.getAllVillages);
router.get("/district/:distId", vill.getVillageByDistID);
router.get("/:id", [verfToken, isAllPermis], vill.getVillageByID);
router.post("/add", [verfToken, isAdmAndEmp], vill.createVillage);
router.put("/", [verfToken, isAdmAndEmp], vill.updateVillage);
router.delete("/:id", [verfToken, isAdmAndEmp], vill.deleteVillage);

export = router;
