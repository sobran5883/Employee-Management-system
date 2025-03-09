import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const { id } = useParams(); // Extracting customer ID from the URL

  // Fetch the customer data when the component mounts
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customer/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCustomer((prevData) => ({
        ...prevData,
        userId: { ...prevData.userId, image: files[0] },
      }));
    } else {
      setCustomer((prevData) => ({
        ...prevData,
        userId: { ...prevData.userId, [name]: value },
      }));
    }
  };

  // Submit the form to update the customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Only include the fields you want to update
    formData.append("name", customer.userId.name); // Don't update email, gender, or role
    formData.append("password", customer.userId.password); // Assuming you are updating the password too

    // Include image if selected
    if (customer.userId.image instanceof File) {
      formData.append("image", customer.userId.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/customer/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Customer details updated successfully!");
        navigate("/admin-dashboard/customers"); // Navigate back to customers page
      }
    } catch (error) {
      console.error("Error updating customer data:", error);
      alert("Failed to update customer details.");
    }
  };

  // Loading state if customer data is not loaded
  if (!customer) {
    return <div>Loading customer details...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="">
        <h1 className="text-2xl font-bold my-10">Edit Customer Details</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              value={customer.userId.name} // Pre-fill with existing name
              required
              type="text"
              name="name"
              placeholder="Enter name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              required
              type="password"
              name="password"
              placeholder="Enter new password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="uploadImage">Upload Image</label>
            <input
              onChange={handleChange}
              type="file"
              name="image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
}

export default Edit;
