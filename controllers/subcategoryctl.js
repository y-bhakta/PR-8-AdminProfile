import Category from "../models/categorymodel.js";
import subCategory from "../models/subcategorymodel.js";
import extraCategory from "../models/extracategorymodel.js"
import fs from "fs";

const subcategoryctl={
    async addsubcategorypage(req,res){
        let categorys= await Category.find({});        
        return res.render('./pages/add-subcategory.ejs',{categorys});
    },
    async viewsubcategorypage(req,res){
        try {
            let subcategorys=await subCategory.find({}).populate('category');  
            let extracategorys=await extraCategory.find({});         
            return res.render('./pages/view-subcategory.ejs',{
                subcategorys,extracategorys
            });
        } catch (error) {
            console.log(error);            
            return res.render('./pages/view-subcategory.ejs',{
                subcategorys:[]
            });
        }
    },
    async addsubcategory(req,res){
        try {
            req.body.image=req.file.path;
            await subCategory.create(req.body);
            return res.redirect('/view-subcategory');
        } catch (error) {
            console.log(error);
            return res.redirect('/add-subcategory');
        }
    },
    async deletesubCategory(req,res){
        try {
            const {id}=req.params;
            let data=await subCategory.findByIdAndDelete(id);
            fs.unlinkSync(data.image);
            return res.redirect('/view-subcategory');
        } catch (error) {
            console.log(error);
            return res.redirect('/view-subcategory');            
        }
    },
    async editpage(req,res){
        try {
            const {id}=req.params;
            let data=await subCategory.findById(id);
            return res.render('./pages/edit-subcategory.ejs',{
                data
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/view-subcategory');
        }
    },
    async editsubcategory(req,res){
        try {
            const {id}=req.params;
            if(req.file){
                req.body.image=req.file.path;
            }
            let data=await subCategory.findByIdAndUpdate(id,req.body);
            if(req.file){
                fs.unlinkSync(data.image);
            }
            return res.redirect('/view-subcategory');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || "/");
        }
    }
}

export default subcategoryctl;