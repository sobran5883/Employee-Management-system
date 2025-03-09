import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addCustomer, upload, getCustomers, getCustomer, updateCustomer } from "../controllers/customerController.js";
import { getLast7DaysLogins } from "../controllers/authController.js";
import User from "../models/User.js";
const router = express.Router();

// POST endpoint to add a customer
router.get("/", authMiddleware, getCustomers);
router.post("/add", authMiddleware, upload.single("image"), addCustomer);
router.get("/:id", authMiddleware, getCustomer);

// route for updating customer
router.put("/:id", upload.single("image"), updateCustomer);

router.get("/api", getLast7DaysLogins)


// Update user status
router.post("/update-status", async (req, res) => {
    const { userId, status } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      user.status = status;
      await user.save();
  
      res.json({ success: true, message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });


  router.get("/last7days", authMiddleware, async (req, res) => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 2);
  
      // Aggregate loginHistory for the last 7 days
      const data = await User.aggregate([
        { $unwind: "$loginHistory" }, // Flatten loginHistory array
        {
          $match: {
            "loginHistory.date": { $gte: sevenDaysAgo }, // Filter for last 7 days
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$loginHistory.date" },
            },
            count: { $sum: "$loginHistory.count" },
          },
        },
        { $sort: { _id: 1 } }, // Sort by date ascending
      ]);
  
      // Map data to desired format
      const result = data.map((item) => ({
        date: item._id,
        count: item.count,
      }));
  
      res.json({ success: true, data: result });
    } catch (error) {
      console.error("Error fetching last 7 days login activity:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
  
  


export default router;
