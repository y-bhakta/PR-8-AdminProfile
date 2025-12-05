import mongoose from "mongoose";

const extraCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'CategoryTbl',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'subCategoryTbl',
        required: true
    }
}, {
    timestamps: true
});

const extraCategory = mongoose.model("extraCategoryTbl", extraCategorySchema);

export default extraCategory;