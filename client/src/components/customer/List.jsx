import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { columns, CustomerButton } from "../../utils/CustomerHelper"
import DataTable from 'react-data-table-component'



function List() {
  const [customers, setCustomers] = useState([])
  const [cusLoading, setCusLoading] = useState(false)

  useEffect(()=>{
    const fetchCustomers = async () =>{
      setCusLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/customer',
          {
              headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
          });
          if(response.data.success){
            let sno=1;
            const data = await response.data.customers.map((cus)=>({
              _id:cus._id,
              sno: sno++,
              profileImage: <img width={40} className="rounded-full h-[40px]" src={`http://localhost:5000/${cus.userId.profileImage}`}/>,
              name:cus.userId.name,
              gender:cus.gender,
              status:cus.userId.status,
              action: (<CustomerButton Id={cus._id} />)
            }));
            setCustomers(data);
          }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }finally{
        setCusLoading(false)
      }
    }
    fetchCustomers();
  },[])
  return (
    <div className="p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Manage Customers</h1>
      </div>
      <div className="flex justify-between items-center">
        <input type="text" placeholder="Seach.." className="px-4 py-0.5 border" />
        <Link to='/admin-dashboard/add-customer' className="px-4 py-1 bg-teal-600 rounded text-white">
          Add New Customer
      </Link>
      </div>
      <div>
        <DataTable columns={columns} data={customers}/>
      </div>
    </div>
  )
}

export default List