import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import customerRoutes from './routes/customer.js'
import User from "./models/User.js";
import Customer from "./models/Customer.js";

dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to MongoDB!"))
    .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(express.static('public/uploads'))
app.use('/api/customer', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));


app.get("/api/users/count-by-role", async (req, res) => {
    try {
      const customerCount = await User.countDocuments({ role: "customer" });
      const adminCount = await User.countDocuments({ role: "admin" });
  
      res.json({
        success: true,
        data: {
          customers: customerCount,
          admins: adminCount,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.get("/api/users/status", async (req, res) => {
    try {
      const workingCount = await User.countDocuments({ status: "working" });
      const leaveCount = await User.countDocuments({ status: "on leave" });
  
      console.log("Working:", workingCount, "On Leave:", leaveCount);
  
      res.json({
        success: true,
        data: {
          working: workingCount,
          leave: leaveCount,
        },
      });
    } catch (error) {
      console.error("Error in /api/users/status:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });


  // getting customer for customer panel
  app.get('/api/customer1/:id', async (req, res) => {
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
  });
  
  
  