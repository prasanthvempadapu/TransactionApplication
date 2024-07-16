import express from 'express';
import connectDb from './db/database.js';
import transactions from './models/transactions.js'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

app.get("/transactions", async (req,res) => {
    try{
        const transaction = await transactions.find();
        res.send(transaction);
    }
    catch(error){
        res.status(500).send(error);
    }
});

app.get("/transactions/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        const transaction = await transactions.findById(id);
        res.send(transaction);
    }catch(error){
        res.status(500).send(error);
    }
});

app.post("/transactions/add", async (req,res)=>{
    try{
        const transaction = transactions(req.body);
        await transaction.save();
        res.send('new transaction added')
    }catch(error){
        res.status(500).send(error);
    }
});

app.put("/transactions/update/:id", async (req,res)=>{
    const {id} = req.params;
    const transaction = req.body;
    try{
        const response = await transactions.findByIdAndUpdate(id,transaction);
        if(!transaction){
            res.status(404).send('transaction not found');
        }
        res.send('transaction updated');
    }catch(error){
        res.status(500).send(error);
    }
});

app.delete("/transactions/delete/:id", async (req,res) => {
    const {id} = req.params;
    try{
        const transaction = await transactions.findByIdAndDelete(id);
        if(!transaction){
            res.status(404).send('transaction not found');
        }
        res.send('transaction deleted');
    }catch(error){
        res.status(500).send(error);
    }
});

app.listen(3000,async ()=>{
    await connectDb();
    console.log('server is running on port : 3000');
});