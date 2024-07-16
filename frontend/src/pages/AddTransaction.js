import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddTransaction = ()=>{
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");
    const [amount,setAmount] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const formData = {
            "description" : description,
            "type" : type,
            "amount" : amount,
            "date" : new Date()

        }
        try{
            const response = await axios.post('http://localhost:3000/transactions/add',formData);
            console.log(response.data);
            navigate("/");

        }catch(error){
            navigate('/error');
        }
    }

    return(
        <div className='m-5 d-flex justify-content-center'>
            <div style={{width:"40%"}}>
            <h1 className="text-center">Add Transaction</h1>
            <form onSubmit={handleSubmit} className='m-5'>
                <div className='m-4'>
                    <label style={{marginRight:"20px"}}> Description</label>
                    <input required value={description} onChange={(event)=>setDescription(event.target.value)} className='form-control' type='text'/>
                </div>
                <div className='m-4'>
                    <label> Type </label> <br/>
                    <select required className='form-control' name='type' value={type} onChange={(event)=>setType(event.target.value)}>
                        <option value="" disabled>Select</option>
                        <option value='revenue'>Revenue</option>
                        <option value='expenditure'>Expenditure</option>
                    </select>
                </div>
                <div className='m-4'>
                    <label> Amount </label>
                    <input required value={amount} onChange={(event)=>setAmount(event.target.value)} className='form-control' type='number'/>
                </div>
                <button style={{marginRight: "20px", marginLeft:"23px"}} type='submit' className='btn btn-primary'>Save</button>
                <button onClick={()=>navigate("/")} className='btn btn-danger'>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default AddTransaction;