import express,{Request, Response} from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import connectDB  from "./config/db.js";
import authenticate from "./middlewares/authenticate.js";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/trendtrove';

// connecting to database
connectDB(url);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRouter);


app.get("/welcome", authenticate, (req: Request, res: Response) =>{
    res.send("<h1>Welcome to TrendTrove</h1>")
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}  `);
});