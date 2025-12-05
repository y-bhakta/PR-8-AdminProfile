import { Router } from "express";
import extracategoryctl from "../controllers/extracategoryctl.js";
import upload from "../middlewares/imgupload.js";

const router=Router();

router.get('/add-extracategory',extracategoryctl.addextracategorypage);
router.get('/view-extracategory',extracategoryctl.viewextracategorypage);
router.post('/add-extracategory',upload,extracategoryctl.addextracategory);
router.get('/extracategory/delete/:id',extracategoryctl.deleteextraCategory);
router.get('/extracategory/edit/:id',extracategoryctl.editpage);
router.post('/extracategory/edit/:id',upload,extracategoryctl.editextracategory);

export default router;