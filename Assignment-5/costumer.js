const mongoose = require('mongoose');
const cust=new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    paswword:String,
});
const customer=mongoose.model('customer',cust,'Customer');
module.exports=customer;