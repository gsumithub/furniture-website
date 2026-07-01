const mongoose = require('mongoose');

const materialSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Fill The material"],
            minLength:[2,"Please Fill min two char..."],
            match: [/^[a-zA-Z0-9 \-&(),.]{2,60}$/, "Name can only contain letters, numbers, spaces, hyphens and be 2-60 characters"],
        },
        order:{
             type:Number,
            required:true,
        },
        status:{
            type:Boolean,
            default:true
        },
         created_at: {
            type: Date,
            default: Date.now()
        },
         updated_at: {
            type: Date,
            default: Date.now()
        },
         deleted_at: {
            type: Date,
            default: null
        },
    }
)

let materialModel=mongoose.model("material",materialSchema)

module.exports=materialModel