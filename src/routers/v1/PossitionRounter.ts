import { Router } from "express";
import { isAllPermis, verfToken, isAdmAndEmp } from "../../middleware/Auth";
import poss from "../../controllers/PossitionController";

const router = Router();

router.get("/", [verfToken, isAllPermis], poss.getAllPossitions);
router.get("/:id", [verfToken, isAllPermis], poss.getPossitionByID);
router.post("/", [verfToken, isAdmAndEmp], poss.createPossition);
router.put("/", [verfToken, isAdmAndEmp], poss.updatePossition);
router.delete("/:id", [verfToken, isAdmAndEmp], poss.deletePossition);

export = router;
