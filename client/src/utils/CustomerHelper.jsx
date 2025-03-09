import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "S No",
        selector:(row)=>row.sno,
        width:"70px"
    },
    {
        name: "Image",
        selector:(row)=>row.profileImage,
        width:"100px"
    },
    {
        name: "Name",
        selector:(row)=>row.name,
        sortable: true,
        width:"150px"
    },
    {
        name: "Status",
        selector:(row)=>row.status,
        width:"100px"
    },
    {
        name: "Gender",
        selector:(row)=>row.gender,
        width:"100px"
    },
    {
        name: "Action",
        selector:(row)=>row.action,
        width:"250px",
        center: "true"
    },

]

export const CustomerButton = ({Id}) =>{
    const navigate = useNavigate();
    return(
        <div className="flex space-x-6">
            <button onClick={()=>navigate(`/admin-dashboard/customers/${Id}`)} className="px-3 py-1 bg-blue-600 text-white">
                View
            </button>
            <button onClick={()=>navigate(`/admin-dashboard/customers/edit/${Id}`)} className="px-3 py-1 bg-red-600 text-white">
                Edit
            </button>
            <button onClick={()=>navigate(`/admin-dashboard/view`)} className="px-3 py-1 bg-teal-600 text-white">
                Leave
            </button>
        </div>
    )
}