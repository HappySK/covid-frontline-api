const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const SuperAdmin = require("./routes/superadminroutes");
const Admin = require("./routes/adminroutes");
const Resource = require("./routes/resourceroutes");
const City = require("./routes/cityroutes");
const Country = require("./routes/countryroutes");

app.use("/public", express.static("public"));

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(express.static(__dirname + "/public/"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/superadmin", SuperAdmin);
app.use("/admin", Admin);
app.use("/resource", Resource);
app.use("/city", City);
app.use("/country", Country);
app.use("/superadminauth", require("./routes/superadmin.js"));
app.use("/privacypolicy", require("./routes/privacypolicyroutes.js"));
app.use("/termsofservices", require("./routes/termsofserviceroutes.js"));
const CONNECTION_URL =
  "mongodb+srv://kalyani:sushma1997@cluster0.9rilk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5050;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
