import { Router } from "express";
import register from "../../middleware/Register";

const router = Router();

router.post("/exsyst/admin", register.adminRegister);
router.post("/", register.userRegister);

export = router;
