import dotenv from "dotenv";
import app from "./app";

dotenv.config();

//SERVER
app.listen(process.env.PORT || 4000, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
