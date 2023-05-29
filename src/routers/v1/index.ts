import { Router } from "express";
import register from "./RegisRouter";
import login from "./LoginRouter";
import user from "./UserInforRouter";
import unit from "./UnitRouter";
import possition from "./PossitionRouter";
import province from "./ProvinceRouter";
import district from "./DistrictRouter";
import village from "./VillageRouter";
import role from "./RoleRouter";
import zone from "./ZoneRouter";

const router = Router();

router.use("/register", register);
router.use("/login", login);
router.use("/users", user);
router.use("/units", unit);
router.use("/possitions", possition);
router.use("/provinces", province);
router.use("/districts", district);
router.use("/villages", village);
router.use("/roles", role);
router.use("/zones", zone);

export = router;
