import multer from "multer";
import path from "path";
import Customer from "../models/Customer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const addCustomer = async (req, res) => {
    try {
        const { name, email, gender, password, role } = req.body;
        const customerId = req.body.customerId || `CUST-${Date.now()}`;


        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User
        const newUser = new User({
            name,
            email,
            gender,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : "", // Add profile image if uploaded
        });

        const savedUser = await newUser.save();
        console.log("User created successfully:", savedUser);

        // Create a new Customer linked to the User
        const newCustomer = new Customer({
            userId: savedUser._id,
            customerId,
            gender,
        });

        console.log("Saving Customer Data:", newCustomer);

        try {
            await newCustomer.save();
            return res.status(200).json({ success: true, message: "Customer created successfully" });
        } catch (error) {
            console.error("Error saving customer:", error);
            return res.status(500).json({ success: false, error: error.message });
        }
    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).json({ success: false, error: "Server error in adding customer" });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find()
            .populate('userId', { password: 0 });
        return res.status(200).json({ success: true, customers });
    } catch (error) {
        console.error("Error fetching customers:", error); // Log the error
        return res.status(500).json({ success: false, error: "Server error while fetching customers" });
    }
};

const getCustomer = async (req, res) => {
    const {id} = req.params;
    try {
        let customer;
        customer = await Customer.findById({_id: id})
            .populate('userId', { password: 0 });
            if(!customer){
                customer = await Customer.findOne({userId: id})
                .populate("userId", {password:0})
            }
        return res.status(200).json({ success: true, customer });
    } catch (error) {
        console.error("Error fetching customers:", error); // Log the error
        return res.status(500).json({ success: false, error: "Server error while fetching customers" });
    }
};

// updata customer
const updateCustomer = async (req, res) => {
  const { id } = req.params; // Customer ID
  const { name, email, gender, role } = req.body; // Fields to update
  const image = req.file ? req.file.filename : null; // New profile image if uploaded

  try {
      // Update the User details
      const customer = await Customer.findById(id).populate("userId");
      if (!customer) {
          return res.status(404).json({ success: false, error: "Customer not found" });
      }

      const userId = customer.userId._id;

      const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
              name,
              email,
              gender,
              role,
              ...(image && { image }),
          },
          { new: true } // Return the updated document
      );

      // Update Customer details if needed
      await Customer.findByIdAndUpdate(
          id,
          {
              gender, // Update any fields in Customer if required
          },
          { new: true }
      );

      return res.status(200).json({ success: true, message: "Customer updated successfully", updatedUser });
  } catch (error) {
      console.error("Error updating customer:", error);
      return res.status(500).json({ success: false, error: "Server error while updating customer" });
  }
};



export { addCustomer, upload, getCustomers, getCustomer, updateCustomer };
