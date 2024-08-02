const express = require("express");
const path = require("path");
const hbs = require("hbs");
const requests = require("requests");
const app = express();
const port = process.env.PORT || 80;

// public folder root path
const public_root_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");
let city = "Kurukshetra";

// Setting template engine
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

// Static file (Serving)
app.use(express.static(public_root_path));

// Routing
app.get("/weather", (req, res) => {
  if (req.query.location) {
    console.log(req.query.location + "---------------");
    city = req.query.location;
  } else {
    console.log("null-----------------");
  }

  requests(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9d86aab0609abd49dd5faa394c089ebc`
  )
    .on("data", (chunk) => {
      const apiData = [JSON.parse(chunk)];
      try {
        console.log(city);
        res.render("weather", {
          location: apiData[0].name,
          country: apiData[0].sys.country,
          tempval: apiData[0].main.temp,
          tempStatus: apiData[0].weather[0].main,
          tzone: apiData[0].timezone,
        });
      } catch {
        console.log("error---------");
        res.render("weather", {
          msg: "**Not on this Planet**",
        });
        city = "kurukshetra";
      }
    })
    .on("end", (err) => {
      if (err) return console.log("Connection closed due to API error");
      console.log("end---------");
    });
});

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("*", (req, res) => {
  res.render("404_error", {
    errorMsg: "OPPS!, You are on wrong track",
  });
});

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
