import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// ROUTE IMPORTS
import dashboardRoute from "./routes/dashboard.route";
import productRoute from "./routes/product.route";
import userRoute from "./routes/user.route";
import expenseRoute from "./routes/expense.route";
// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("common"));

// ROUTES
app.use("/dashboard", dashboardRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/expenses", expenseRoute);

// SERVER
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
