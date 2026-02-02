import { Router } from "express";
import categoryctl from "../controllers/categoryctl.js";
import upload from "../middlewares/imgupload.js";

const router=Router();

router.get('/add-category',categoryctl.addcategorypage);
router.get('/view-category',categoryctl.viewcategorypage);
router.post('/add-category',upload.single('image'),categoryctl.addcategory);
router.get('/category/delete/:id',categoryctl.deleteCategory);
router.get('/category/edit/:id',categoryctl.editpage);
router.post('/category/edit/:id',upload.single('image'),categoryctl.editcategory);

export default router;