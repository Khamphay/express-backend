import { Router } from "express";
import { verfToken, isAdmAndEmp } from "../../middleware/Auth";
import role from "../../controllers/RoleController";

const router = Router();

router.get("/", role.getAllRoles);
router.get("/:id", role.getRoleByID);
router.post("/", role.createRole);
router.put("/", [verfToken, isAdmAndEmp], role.updateRole);

export = router;
