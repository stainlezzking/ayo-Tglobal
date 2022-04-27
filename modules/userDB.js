const mongoose = require("mongoose")
// for some reason node v17 needs 127.0.0.1 in the connection instead of localhost
mongoose.connect("mongodb://127.0.0.1:27017/temenosG",
function(req,res){
    console.log("DB connected successfully")
})

// transactions are for withdrawal, deposit & loan
const transaction = mongoose.Schema({
    // i added the email and Id incase a user decides to change their email
    user : String,
    email : String,
    title : String,
    amount : Number,
    imageurl : String,
    means : {type : String, default : "USDT"},
    status : {type : String, default : "pending"},
    confirmed : {type : Boolean, default : false}, 
}, {timestamps : true})

// this is for normal investments by users
const shortInvestment = mongoose.Schema({
    user : String,
    email : String,
    title : String,
    roi : Number,
    duration : Number,
    expiry : Number,
    amount : Number,
    paid : {type : Boolean, default : false},
    profit : Number
})
// this is for cyclesinvs.
const cyclesInvestment = mongoose.Schema({
    // pay_day => pay/day
    pay_day :Number,
    accumulatedSum : Number,
    amount_inv : Number,
    days2run : Number,
    cycle : Number,
    min_cycle_b4_with : Number,
    days_cycle : Number,
    active : Boolean
})

const userSchema = mongoose.Schema({
    email : {type : String,  required : [true, "make sure all inputs are filled"],},
    password :{type : String,required : [true, "make sure all inputs are filled"],},
    firstName :{type : String,required : [true, "make sure all inputs are filled"],},
    lastName : {type : String,required : [true, "make sure all inputs are filled"]},
    fundingBallance : {type : Number, default : 0},
    shortBallance : {type : Number, default : 0},
    cyclesBallance : {type : Number, default : 0},
    client : {type : Boolean, default : false},
    cyclesInvestments : [cyclesInvestment], 
    referrals : [String],
    walletAddress : String,
    lastLoggedIn : Date,
}, {
    minimize : false,
    timestamps : true,
})

require("./adminDB")

USER = mongoose.model("user", userSchema)
TRANSACTION = mongoose.model("transactions", transaction)
SHORTINVS = mongoose.model("shortInvestments", shortInvestment)

module.exports.USER = USER
module.exports.TRANSACTION = TRANSACTION
module.exports.SHORTINVS = SHORTINVS