import Category from "../models/categorymodel.js";

const categoryctl={
    addcategorypage(req,res){
        return res.render('./pages/add-category.ejs');
    },
    async viewcategorypage(req,res){
        try {
            let categorys=await Category.find({});
            return res.render('./pages/view-category.ejs',{
                categorys
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
            
        }
    }
}

export default categoryctl;