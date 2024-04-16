const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");

//for charts
const fs = require("fs");
const QuickChart = require("quickchart-js");

//for email
let secret = require("./configuration/secret");
let email = require("./controllers/email");

const laboratoryInfo = require("./models/laboratory");
const SafetyMeasure = require("./models/safetyMeasure");

const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const methodOverride = require("method-override");
const localStrategy = require("passport-local");
const User = require("./models/user");
//const InstitutionalInfo = require("./models/Institutional_Info");

const Sfr = require("./models/sfr");
const facultyInfo = require("./models/faculty_Info");
const { name } = require("ejs");

const routeUser = require("./route/user");
const routeInsitutionalInfo = require("./route/institutionalInfo");
const routesfrInfo = require("./route/sfr");
const routefqInfo = require("./route/fq");
//const { fqinfo } = require("./controllers/fq");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(methodOverride("_method"));

const sessionConfig = {
  name: "session",
  secret: "thissholudbesecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 100 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect("mongodb://localhost:27017/btech-project", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR");
    console.log(err);
  });

app.use("/", routeUser);
app.use("/", routeInsitutionalInfo);
app.use("/", routesfrInfo);
app.use("/", routefqInfo);

app.get("/", (req, res) => {
  res.render("user/home");
});

//charts

app.get("/facultyCharts", async (req, res) => {
  const fq = await facultyInfo.find({ owner: req.user._id });
  const sfr = await Sfr.find({ owner: req.user._id });

  if (!sfr[0] || !fq[0]) {
    return res.render("charts/chartsError");
  } else {
    //bar chart
    const barChart = new QuickChart();
    barChart
      .setConfig({
        type: "bar",
        data: {
          labels: ["UG1", "UG2", "UG3", "PG1", "PG2"],
          datasets: [
            {
              label: "No. of Students",
              data: [sfr[0].u1, sfr[0].u2, sfr[0].u3, sfr[0].p1, sfr[0].p2],
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Students Distribution",
          },
        },
      })
      .setWidth(400)
      .setHeight(300)
      .setBackgroundColor("white");

    const url1 = barChart.getUrl();

    const totalStudentsCAY =
      sfr[0].u1 + sfr[0].u2 + sfr[0].u3 + sfr[0].p1 + sfr[0].p2;
    // pie chart
    const pieChart = new QuickChart();
    pieChart
      .setConfig({
        type: "pie",
        data: {
          labels: ["Total Students", "Total Faculty"],
          datasets: [{ data: [totalStudentsCAY, sfr[0].totalFacultyCAY] }],
        },
        options: {
          title: {
            display: true,
            text: "Students-Faculty Ratio (CAY)",
          },
        },
      })
      .setWidth(400)
      .setHeight(300)
      .setBackgroundColor("white");

    const url2 = pieChart.getUrl();

    //line chart
    const lineChart = new QuickChart();
    lineChart
      .setConfig({
        type: "line",
        data: {
          labels: ["CAY", "CAYm1", "CAYm2"],
          datasets: [
            {
              label: "Ph.D Faculty",
              data: [fq[0].phdCAY, fq[0].phdCAYm1, fq[0].phdCAYm2],
              fill: false,
            },
            {
              label: "M.Tech. Faculty",
              data: [fq[0].mtechCAY, fq[0].mtechCAYm1, fq[0].mtechCAYm2],
              fill: false,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Faculty Qualification",
          },
        },
      })
      .setWidth(400)
      .setHeight(300)
      .setBackgroundColor("white");

    const url3 = lineChart.getUrl();

    //horizontal bar
    const horizontalBarChart = new QuickChart();
    horizontalBarChart
      .setConfig({
        type: "horizontalBar",
        data: {
          labels: ["CAY", "CAYm1", "CAYm2"],
          datasets: [
            {
              label: "Regular Faculty",
              data: [fq[0].regularCAY, fq[0].regularCAYm1, fq[0].regularCAYm2],
            },
            {
              label: "Contractual Faculty",
              data: [
                fq[0].contractualCAY,
                fq[0].contractualCAYm1,
                fq[0].contractualCAYm2,
              ],
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Regular/Contractual Faculty Distribution",
          },
        },
      })
      .setWidth(400)
      .setHeight(300)
      .setBackgroundColor("white");

    const url4 = horizontalBarChart.getUrl();

    // pie chart
    const radialGauge = new QuickChart();
    radialGauge
      .setConfig({
        type: "radialGauge",
        data: {
          datasets: [
            {
              data: [
                Math.round((fq[0].percentRetained + Number.EPSILON) * 100) /
                  100,
              ],
              backgroundColor: "green",
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Percent Faculty Retained",
          },
        },
      })
      .setWidth(192)
      .setHeight(210)
      .setBackgroundColor("white");

    const url5 = radialGauge.getUrl();

    res.render("charts/facultyCharts", {
      url1: url1,
      url2: url2,
      url3: url3,
      url4: url4,
      url5: url5,
      sfr: sfr[0],
      fq: fq[0],
    });
  }
});

// let booked = 0;

app.get("/labvisit", async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.bookedVisit === 1) {
    return res.render("email/booked");
  } else {
    res.render("email/bookVisit");
  }
});

app.post("/labvisit", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, { bookedVisit: 1 });

  email([user.email]);
  res.redirect("/labvisit");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.get("/labform", async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(req.user._id).populate("lab");
  res.render("lab", { user });
});

app.post("/labform", async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(req.user._id);
  const LaboratoryInfo = new laboratoryInfo(req.body);
  await LaboratoryInfo.save();
  //const LabOwnerSchema = new labOwnerSchema({ owner: id });
  user.lab.push(LaboratoryInfo);
  await user.save();
  // console.log(user);
  res.redirect("/labform");
});

app.get("/safetyform", async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(req.user._id).populate("safetyMeasures");
  res.render("safetyMeasures", { user });
});

app.post("/safetyform", async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(req.user._id);
  const safetyMeasure = new SafetyMeasure(req.body);
  await safetyMeasure.save();

  user.safetyMeasures.push(safetyMeasure);
  //const LabOwnerSchema = await labOwnerSchema.findOneAndUpdate({owner : id });
  await user.save();
  //const User = await user.findById(req.user._id);
  res.redirect("/safetyform");
});
