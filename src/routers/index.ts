import { Request, Response, NextFunction, Router } from "express";
import v1 from "./v1/index";
const router = Router();
router.use("/v1", v1);
router.get("/express", (req: Request, res: Response, next: NextFunction) => {
  res.json({ api: "express-ts", version: "1.0.0" });
});

export = router;
