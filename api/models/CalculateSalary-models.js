const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CalSalarySchema = new Schema({

        EmpID: {
            type : String,
            required:true
            

        } ,
        Month: {
            type : String,
            required:true

        } ,
        Name :{
            type :String,
            required:true
        },

        BasicSalary :{
            type : Number,
            required:true

        },
        FixedAllowance :{
            type : Number,
            required:true

        },
       
        OtRate :{
            type : Number,
            required:true

        }, 
        OtHours :{
            type : Number,
            required:true

        },
        SalaryAdvanced  :{
            type : Number,
            required:true

        },
        Deductions :{
            type : Number,
            required:true

        },
        GrossSalary:{
            type :Number,
            required:true

        },
      
        EPF: {
            type:Number,
            required:true
        },
        NetSalary: {
            type : Number,
            required:true
        }



})

module.exports = mongoose.model("CalculateSalary", CalSalarySchema);