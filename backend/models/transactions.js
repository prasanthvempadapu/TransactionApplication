import mongoose, { mongo, Schema } from "mongoose";

const transactions = new Schema({
    description : {
        type:'string'
    },
    type : {
        type:'string'
    },
    amount : {
        type : 'number'
    },
    date : {
        type : 'date'
    }

})

export default mongoose.model('transaction', transactions);