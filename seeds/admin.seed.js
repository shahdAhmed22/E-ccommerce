// seeds/admin.seed.js
import dotenv  from "dotenv"
dotenv.config();
import bcrypt from "bcrypt"
import { Connection_db } from "../DB/connection.js"
import User from "../DB/user.model.js"

async function seedAdmin() {
 Connection_db();
  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    return console.log("Admin already exists. No need to seed.");
  }

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    +process.env.SALT_ROUNDS
  );

 const admin = await User.create({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
  });

  console.log("🚀 Admin created successfully", admin);
  process.exit(0);
}

seedAdmin();