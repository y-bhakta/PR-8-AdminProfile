import mongoose from "mongoose";

const subCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'CategoryTbl',
        required:true
    }
},{
    timestamps:true
});

const subCategory=mongoose.model("subCategoryTbl",subCategorySchema);

export default subCategory;