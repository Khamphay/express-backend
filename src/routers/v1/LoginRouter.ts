import { Router } from "express";
import login from "../../middleware/UserLogin";

const router = Router();

router.post("/", login.userSignIn);
router.post("/refToken", login.refreshSignInToken);

export = router;
