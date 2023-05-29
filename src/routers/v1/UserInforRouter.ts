import { Router } from "express";
import {
  isAdmin,
  isAllPermis,
  isAdmAndEmp,
  verfToken
} from "../../middleware/Auth";
import user from "../../controllers/UserInforController";

const router = Router();

router.post("/", [verfToken, isAdmin], user.getAllUserInfors);
router.get("/infor", [verfToken, isAllPermis], user.getUserInfor);
router.post("/byid", [verfToken, isAllPermis], user.getUserInforByID);
router.post("/user", [verfToken, isAllPermis], user.createUserInfor);
router.put("/", [verfToken, isAllPermis], user.updateUserInfor);
router.delete("/", [verfToken, isAdmAndEmp], user.deleteUserInfor);

export = router;
