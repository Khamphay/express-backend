import { Router } from "express";
import { verfToken, isAdmAndEmp } from "../../middleware/Auth";
import prov from "../../controllers/ProvinceController";

const router = Router();

router.get("/", prov.getAllProvinces);
router.get("/:id", prov.getProvinceByID);
router.post("/", [verfToken, isAdmAndEmp], prov.createProvince);
router.put("/", [verfToken, isAdmAndEmp], prov.updateProvince);
// router.delete("/:id", [verfToken, isAdmAndEmp], prov.deleteProvince);

export = router;
