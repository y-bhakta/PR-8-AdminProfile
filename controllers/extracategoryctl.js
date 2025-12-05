import Category from "../models/categorymodel.js";
import extraCategory from "../models/extracategorymodel.js";
import fs from "fs";
import subCategory from "../models/subcategorymodel.js";

const extracategoryctl={
    async addextracategorypage(req,res){
        let categorys=await Category.find({});
        let subcategorys=await subCategory.find({});
        return res.render('./pages/add-extracategory.ejs',{categorys,subcategorys});
    },
    async viewextracategorypage(req,res){
        try {
            // populate both `category` and `subcategory` in a single query
            let extracategorys = await extraCategory.find({})
                .populate({ path: 'category', select: 'name image' })
                .populate({ path: 'subcategory', select: 'name image' });
            return res.render('./pages/view-extracategory.ejs',{
                extracategorys
            });
        } catch (error) {
            console.log(error);            
            return res.render('./pages/view-extracategory.ejs',{
                extracategorys:[]
            });
        }
    },
    async addextracategory(req,res){
        try {
            req.body.image=req.file.path;
            await extraCategory.create(req.body);
            return res.redirect('/view-extracategory');
        } catch (error) {
            console.log(error);
            return res.redirect('/add-extracategory');
        }
    },
    async deleteextraCategory(req,res){
        try {
            const {id}=req.params;
            let data=await extraCategory.findByIdAndDelete(id);
            fs.unlinkSync(data.image);
            return res.redirect('/view-extracategory');
        } catch (error) {
            console.log(error);
            return res.redirect('/view-extracategory');            
        }
    },
    async editpage(req,res){
        try {
            const {id}=req.params;
            let data=await extraCategory.findById(id);
            return res.render('./pages/edit-extracategory.ejs',{
                data
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/view-extracategory');
        }
    },
    async editextracategory(req,res){
        try {
            const {id}=req.params;
            if(req.file){
                req.body.image=req.file.path;
            }
            let data=await extraCategory.findByIdAndUpdate(id,req.body);
            if(req.file){
                fs.unlinkSync(data.image);
            }
            return res.redirect('/view-extracategory');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || "/");
        }
    }
}

export default extracategoryctl;