import { Router } from "express";
import categoryctl from "../controllers/categoryctl.js";
import upload from "../middlewares/imgupload.js";

const router=Router();

router.get('/add-category',categoryctl.addcategorypage);
router.get('/view-category',categoryctl.viewcategorypage);
router.post('/add-category',upload,categoryctl.addcategory);

export default router;