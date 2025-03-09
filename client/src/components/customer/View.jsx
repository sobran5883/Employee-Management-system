import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customer/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setCustomer(response.data.customer);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchCustomer();
  }, [id]);

  // Loading or customer not found state
  if (!customer) {
    return <div>Loading or Customer not found..</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-8 text-center">Customer Details</h1>
      <div className='flex gap-2 flex-col md:flex-row items-start justify-evenly'>
        <div>
            <img
              className="rounded-md border w-72 h-72"
              src={`http://localhost:5000/${customer.userId.profileImage}`}
              alt="Customer"
            />
        </div>
        <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="flex space-x-3">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">{customer.userId.name}</p>
          </div>
        </div>
        <div>
          <div className="flex space-x-3">
            <p className="text-lg font-bold">Email:</p>
            <p className="font-medium">{customer.userId.email}</p>
          </div>
        </div>
        <div>
          <div className="flex space-x-3">
            <p className="text-lg font-bold">Customer ID:</p>
            <p className="font-medium">{customer.customerId}</p>
          </div>
        </div>
        <div>
          <div className="flex space-x-3">
            <p className="text-lg font-bold">Gender:</p>
            <p className="font-medium">{customer.gender}</p>
          </div>
        </div>
        <div>
          <div className="flex space-x-3">
            <p className="text-lg font-bold">Total vistis:</p>
            <p className="font-medium">{customer.userId.loginCount}</p>
          </div>
        </div>
        <div>
          <div className="flex space-x-3">
              <p className="text-lg font-bold">Todays visits:</p>
              <p className="font-medium">
                {customer.userId.loginHistory
                  .filter(entry => new Date(entry.date).toDateString() === new Date().toDateString())
                  .reduce((total, entry) => total + entry.count, 0)}
              </p>
            </div>
          </div>
        <div>
          <div className="flex space-x-3 mb-3">
            <p className="text-lg font-bold">Status:</p>
            <p className={`${customer.userId.status ==="on leave" ? "text-red-700" : "text-green-700"} text-xl font-bold`}>{customer.userId.status}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default View;
