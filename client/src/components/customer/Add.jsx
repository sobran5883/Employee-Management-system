import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Add() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})

    const handleChange=(e)=>{
        const {name, value, files} = e.target;
        if(name=="image"){
            setFormData((prevData)=>({...prevData, [name] : files[0]}))
        }else{
            setFormData((prevData)=>({...prevData, [name] : value}))
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key, formData[key])
        })
        try {
            const response = await axios.post('http://localhost:5000/api/customer/add',formDataObj,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if(response.data.success){
                navigate("/admin-dashboard/customers")
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error);
            }
        }
    }

  return (
    <div className="w-full flex flex-col items-center justify-center">
        <div className="">
            <h1 className="text-2xl font-bold my-10">Add Customer Details</h1>
        </div>
        <form onSubmit={handleSubmit} action="" className="flex flex-col items-center justify-center">
            <div className='grid gird-cols-1 md:grid-cols-2 gap-4'>
               <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} required type="text" name='name' placeholder='Enter name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
               </div>
               <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} required type="text" name='email' placeholder='Enter email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
               </div>
               <div>
                    <label htmlFor="gender">Gender</label>
                    <select onChange={handleChange} required name="gender" id="gender" className='mt-1 p-2 block w-full border border-gray-300 rounded-md'>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
               </div>
               <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} required type="password" name='password' placeholder='Generate password' className='mt-1 p-2 block w-full border border-gray-300 rounded-l-md'/>
               </div>
               <div>
                    <label htmlFor="role">Role</label>
                    <select onChange={handleChange} required name="role" id="role" className='mt-1 p-2 block w-full border border-gray-300 rounded-md'>
                        <option value="">Select Gender</option>
                        <option value="admin">Admin</option>
                        <option value="customer">customer</option>
                    </select>
               </div>
               <div>
                    <label htmlFor="uploadImage">Upload Image</label>
                    <input onChange={handleChange} type="file" name='image' placeholder='Upload Image' accept='image/*' className='mt-1 p-2 block w-full border border-gray-300 rounded-l-md'/>
               </div>
            </div>
            <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md'>
                Add Customer
            </button>
        </form>
    </div>
  )
}

export default Add