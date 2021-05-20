const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UseSchema = new Schema({
    nome:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:false,
    },
    codeAccess:{
        type:String,
        required:true,
    },
    primeOne:{
        type: Boolean
    },
    primeTwo:{
        type: Boolean
    },
    primeTree:{
        type: Boolean
    }
},{
    timestamps: true,
});

UseSchema.pre('save', async function(next){
    const hashPass = await bcrypt.hash(this.password, 10);
    this.password = hashPass;
    next();
})

module.exports = model('User', UseSchema);