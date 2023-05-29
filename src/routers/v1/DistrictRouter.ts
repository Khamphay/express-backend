import { Router } from "express";
import { verfToken, isAdmAndEmp, isAllPermis } from "../../middleware/Auth";
import dist from "../../controllers/DistrictController";

const router = Router();

router.post("/", dist.getAllDistricts);
router.get("/province/:proId", dist.getDistrictByProID);
router.get("/:id", [verfToken, isAllPermis], dist.getDistrictByID);
router.post("/add", [verfToken, isAdmAndEmp], dist.createDistrict);
router.put("/", [verfToken, isAdmAndEmp], dist.updateDistrict);
// router.delete("/", [verfToken, isAdmAndEmp], dist.deleteDistrict);

export = router;
