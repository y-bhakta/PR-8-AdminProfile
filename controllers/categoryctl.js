import Category from "../models/categorymodel.js";
import fs from "fs";
import subCategory from "../models/subcategorymodel.js";
import extraCategory from "../models/extracategorymodel.js";

const categoryctl={
    addcategorypage(req,res){
        return res.render('./pages/add-category.ejs');
    },
    async viewcategorypage(req,res){
        try {
            let categorys=await Category.find({});
            let subcategorys=await subCategory.find({});       
            return res.render('./pages/view-category.ejs',{
                categorys,subcategorys
            });
        } catch (error) {
            console.log(error);            
            return res.render('./pages/view-category.ejs',{
                categorys:[]
            });
        }
    },
    async addcategory(req,res){
        try {
            req.body.image=req.file.path;
            await Category.create(req.body);
            return res.redirect('/view-category');
        } catch (error) {
            console.log(error);
            return res.redirect('/add-category');
        }
    },
    async deleteCategory(req,res){
        try {
            const {id}=req.params;
            let data=await Category.findByIdAndDelete(id);
            fs.unlinkSync(data.image);
            return res.redirect('/view-category');
        } catch (error) {
            console.log(error);
            return res.redirect('/view-category');            
        }
    },
    async editpage(req,res){
        try {
            const {id}=req.params;
            let data=await Category.findById(id);
            return res.render('./pages/edit-category.ejs',{
                data
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/view-category');
        }
    },
    async editcategory(req,res){
        try {
            const {id}=req.params;
            if(req.file){
                req.body.image=req.file.path;
            }
            let data=await Category.findByIdAndUpdate(id,req.body);
            if(req.file){
                fs.unlinkSync(data.image);
            }
            return res.redirect('/view-category');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || "/");
        }
    }
}

export default categoryctl;