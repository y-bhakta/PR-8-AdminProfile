import { Router } from "express";
import subcategoryctl from "../controllers/subcategoryctl.js";
import upload from "../middlewares/imgupload.js";

const router=Router();

router.get('/add-subcategory',subcategoryctl.addsubcategorypage);
router.get('/view-subcategory',subcategoryctl.viewsubcategorypage);
router.post('/add-subcategory',upload.single('image'),subcategoryctl.addsubcategory);
router.get('/subcategory/delete/:id',subcategoryctl.deletesubCategory);
router.get('/subcategory/edit/:id',subcategoryctl.editpage);
router.post('/subcategory/edit/:id',upload.single('image'),subcategoryctl.editsubcategory);

export default router;