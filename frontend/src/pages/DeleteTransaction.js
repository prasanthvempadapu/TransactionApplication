import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const DeleteTransaction = ()=>{
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

    const deleteTransaction = async ()=>{
        try{
            const response = await axios.delete(`http://localhost:3000/deleteTransaction/${id}`);
            console.log(response.data);
            navigate("/");
        }catch(error){
            throw new Error(error.message);
        }
    }
    return(
        <div className="m-5 d-flex justify-content-center">
        <div >
            <h1 className="text-center">Delete Transaction</h1>
            <div className="m-5">
            <p style={{fontSize:"20px"}}>Description : <span style={{fontWeight:"bold"}}>{transaction.description}</span></p>
            <p style={{fontSize:"20px"}}>Transaction Type : <span style={{fontWeight:"bold"}}>{transaction.type}</span></p>
            <p style={{fontSize:"20px"}}>Amount : <span style={{fontWeight:"bold"}}>{transaction.amount}</span></p>
            <button style={{marginRight: "20px"}} onClick={deleteTransaction} className="btn btn-danger">Delete</button>
            <button onClick={()=>navigate("/")} className="btn btn-secondary">Cancel</button>
            </div>
        </div>
        </div>
    )
}

export default DeleteTransaction;