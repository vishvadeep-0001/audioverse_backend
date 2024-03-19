import app from "./app.js";
import { connectDB } from "./config/Database.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`We are running at port ${process.env.PORT}`);
});
