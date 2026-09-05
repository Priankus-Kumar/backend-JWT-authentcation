const app = require("./src/app");
require("dotenv").config();

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running of port ${port}`);
});
