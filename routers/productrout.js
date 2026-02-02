import { Router } from "express";
import productctl from "../controllers/productsctl.js";
import upload from "../middlewares/imgupload.js";

const router = Router();

router.get('/add-product',productctl.addproductpage);
router.post('/add-product',upload.single('image'),productctl.addproduct);
router.get('/view-product',productctl.viewproductpage);
router.get('/delete-product/:id',productctl.deleteproduct);
router.get('/edit-product/:id',productctl.editproductpage);
router.post('/edit-product/:id',upload.single('image'),productctl.editproduct);

router.get('/product-details/:id',productctl.productdetailspage);

export default router;