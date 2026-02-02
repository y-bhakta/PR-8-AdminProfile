import Category from "../models/categorymodel.js";
import extraCategory from "../models/extracategorymodel.js";
import Products from "../models/productmodel.js";
import subCategory from "../models/subcategorymodel.js";
import fs from "fs";
import db from '../configs/db.js';

const productctl={
    async addproductpage(req,res){
        try {
            let categorys=await Category.find({});
            let subcategorys=await subCategory.find({});
            let extracategorys=await extraCategory.find({});
            return res.render('./pages/add-product.ejs',{categorys,subcategorys,extracategorys});
        } catch (error) {
            console.log(error);
            return res.render('./pages/add-product.ejs',{
                categorys:[],
                subcategorys:[],
                extracategorys:[]
            });
        }
    },
    async viewproductpage(req,res){
        try {
            let product=await Products.find({})
                .populate({path: 'category', model: 'CategoryTbl'})
                .populate({path: 'subcategory', model: 'subCategoryTbl'})
                .populate({path: 'extracategory', model: 'extraCategoryTbl'});
            console.log('Populated products:', product.slice(0, 2)); // Log first 2 for debugging
            return res.render('./pages/view-product.ejs',{product});
        } catch (error) {
            console.log(error);
            return res.render('./pages/view-product.ejs',{
                product:[]
            });
        }
    },
    async addproduct(req,res){
        try {
            req.body.image=req.file.path;
            await Products.create(req.body);
            return res.redirect('/view-product');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async deleteproduct(req,res){
        try {
            const {id}=req.params;
            let product = await Products.findByIdAndDelete(id);
            fs.unlinkSync(product.image);
            return res.redirect('/view-product');
        } catch (error) {
            console.log(error);
            return res.redirect('/view-product');
        }
    },
    async editproductpage(req,res){
        try {
            const {id}=req.params;
            let data=await Products.findById(id);
            let categorys=await Category.find({});
            let subcategorys=await subCategory.find({});
            let extracategorys=await extraCategory.find({});
            return res.render('./pages/edit-product.ejs',{data,categorys,subcategorys,extracategorys});
        } catch (error) {
            console.log(error);
            return res.redirect('./view-product');
        }   
    },
    async editproduct(req,res){
        try {
            const {id}=req.params;
            if(req.file){
                req.body.image=req.file.path;
            }
            let product=await Products.findByIdAndUpdate(id,req.body);
            if(req.file){
                fs.unlinkSync(product.image);
            }
            return res.redirect('/view-product');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async productdetailspage(req,res){
        try {
            const {id}=req.params;
            let oneproduct=await Products.findById(id).populate('category').populate('subcategory').populate('extracategory');
            let products=await Products.find({}).populate('category').populate('subcategory').populate('extracategory');
            return res.render('./pages/product-details.ejs',{
                oneproduct,products
            }) ;
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referre') || '/');
        }
    }
}

export default productctl;