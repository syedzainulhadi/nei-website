// createAdmin.js - Run this ONCE to create the admin account
// Then delete or ignore this file

const adminModel = require("./models/adminModel");

const setup = async () => {
  try {
    const id = await adminModel.createAdmin("admin", "admin123");
    console.log("✅ Admin created with ID:", id);
    console.log("Username: admin");
    console.log("Password: admin123");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

setup();