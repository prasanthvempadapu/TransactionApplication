import express from 'express';
import connectDb from './db/database.js';
import transactionSchema from './models/transactionSchema.js'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

app.get("/getTransactions", async (req,res) => {
    try{
        const transactions = await transactionSchema.find();
        res.send(transactions);
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.get("/getTransactionById/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        const transaction = await transactionSchema.findById(id);
        res.send(transaction);
    }catch(error){
        res.status(400).send(error);
    }
});

app.post("/addTransaction", async (req,res)=>{
    try{
        const transaction = transactionSchema(req.body);
        await transaction.save();
        res.send('new transaction added')
    }catch(error){
        res.status(500).send(error);
    }
});

app.put("/updateTransaction/:id", async (req,res)=>{
    const {id} = req.params;
    const transaction = req.body;
    try{
        const response = await transactionSchema.findByIdAndUpdate(id,transaction);
        if(!transaction){
            res.status(404).send('transaction not found');
        }
        res.send('transaction updated');
    }catch(error){
        res.status(400).send(error);
    }
});

app.delete("/deleteTransaction/:id", async (req,res) => {
    const {id} = req.params;
    try{
        const transaction = await transactionSchema.findByIdAndDelete(id);
        if(!transaction){
            res.status(404).send('transaction not found');
        }
        res.send('transaction deleted');
    }catch(error){
        res.status(400).send(error);
    }
});

app.listen(3000,async ()=>{
    await connectDb();
    console.log('server is running on port : 3000');
});