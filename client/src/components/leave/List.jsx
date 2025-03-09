import { Link } from 'react-router-dom'

function List() {
    return (
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Manage Leaves</h1>
          </div>
          <div className="flex justify-between items-center">
            <input type="text" placeholder="Seach.." className="px-4 py-0.5 border" />
            <Link to='/customer-dashboard/add-leave' className="px-4 py-1 bg-teal-600 rounded text-white">
              Add New Leave
          </Link>
          </div>
          <div>
            {/* <DataTable columns={columns} data={customers}/> */}
          </div>
        </div>
      )
}

export default List