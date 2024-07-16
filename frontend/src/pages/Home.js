import React, {useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {format} from 'date-fns';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loading from '../component/Loading.js'

const Home = ()=>{
    const [transactions,setTransactions] = useState([]);
    const [dataRecieved,setDataRecieved] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
       
        const getAllTransactions = async ()=>{
            try{
                const response  = await axios.get("http://localhost:3000/transactions");
                console.log('test',response.data);
                setTransactions(response.data);
                setDataRecieved(true);
            }catch(error){
                console.error(error.response);
                navigate('/error');
            }
        
        };
        getAllTransactions(); 
          
    },[navigate]);
    let n = 0;
    let balance = 0;
    let balanceTransactions=[];
    transactions.map((e)=>{
        if(e.type==="revenue"){
            balance = balance+e.amount;
        }else{
            balance=balance-e.amount;
        }
        balanceTransactions.push({
           _id:e._id,
            description:e.description,
            amount:e.amount,
            type:e.type,
            date:e.date,
            balance:balance
        })
        return true;
    })
    const sortedTransactions = balanceTransactions.sort((a,b)=> new Date(b.date) - new Date(a.date));
    return(
        dataRecieved ?
        <div className="m-5">
        <h1 className="text-center">Office Transactions</h1>
        <button onClick={()=>navigate('/AddTransaction')} className="btn btn-primary">Add Transaction</button>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>S No</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Revenue</th>
                    <th>Expenditure</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                {sortedTransactions.map((item)=>{
                    return(
                    <tr key={item._id}>
                        <td>{n=n+1}</td>
                        <td>{format(item.date,'dd-MM-yyyy')}</td>
                        <td>{item.description}</td>
                        {item.type==="revenue"?<td>{item.amount}</td>:<td></td>}
                        {item.type==="expenditure"?<td>{item.amount}</td>:<td></td>}
                        <td>{item.balance}</td>
                        <td>
                        <button style={{marginRight: "20px"}} className="btn btn-danger" onClick={()=>navigate(`/delete/${item._id}`)}>Delete</button>
                        
                        <button className="btn btn-secondary" onClick={()=>navigate(`/update/${item._id}`)}>Edit</button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
       :
       <Loading/>
    )
}

export default Home;