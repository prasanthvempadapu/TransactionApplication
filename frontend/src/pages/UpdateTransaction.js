import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateTransaction = ()=>{
    const navigate = useNavigate();
    const {id} = useParams();
    const[transaction,setTransaction] = useState({});
    useEffect(()=>{
        const getTransaction = async ()=>{
            try{
                const response = await axios.get(`http://localhost:3000/getTransactionById/${id}`)
                setTransaction(response.data);
            }catch(error){
                throw new Error(error);
            }
        }
        getTransaction();
    },[id]);

    const handleSubmit = async (event)=>{
        try{
            event.preventDefault();
            const response = await axios.put(`http://localhost:3000/updateTransaction/${id}`,transaction);
            console.log(response.data);
            navigate("/");
            
        }catch(error){
            throw new Error(error.message);
        }
    }
    const handleChange =(event)=>{
        const {name,value} = event.target;
        setTransaction({...transaction,[name]:value});
    }
    return(
        <div className='m-5 d-flex justify-content-center'>
        <div style={{width:"40%"}}>
            <h1 className="text-center">Update Transaction</h1>
            <form onSubmit={handleSubmit} className='m-5'>
                <div className='m-4'>
                    <label> Description</label>
                    <input name='description' value={transaction.description || ''} onChange={handleChange} className='form-control' type='text'/>
                </div>
                <div className='m-4'>
                    <label> Type </label>
                    <select className="form-control" name='type' value={transaction.type || ''} onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        <option value='revenue'>Revenue</option>
                        <option value='expenditure'>Expenditure</option>
                    </select>
                </div>
                <div className='m-4'>
                    <label> Amount </label>
                    <input name='amount' value={transaction.amount || ''} onChange={handleChange} className='form-control' type='number'/>
                </div>
                <button style={{marginRight: "20px", marginLeft:"23px"}} type='submit' className='btn btn-primary'>Update</button>
                <button onClick={()=>navigate("/")} className='btn btn-danger'>Cancel</button>
            </form>
        </div>
        </div>
    )
}

export default UpdateTransaction;