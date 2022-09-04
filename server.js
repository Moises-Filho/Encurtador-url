const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UrlEncurtada = require("./models/urlEncurtada");

mongoose.connect("mongodb://localhost/url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public')) // coloca estilo

app.set("view engine", "ejs");
// aparece a pagina na web
app.get("/", async (req, res) => {
  const urlEncurtadas = await UrlEncurtada.find();
  res.render("index", { urlEncurtadas: urlEncurtadas });
});

app.post("/encurtarUrl", async (req, res) => {
  await UrlEncurtada.create({ completa: req.body.urlCompleta });
  res.redirect("/");
});

app.get("/:urlEncurtada", async (req, res) => {
  const urlEncurtada = await UrlEncurtada.findOne({
    encurtada: req.params.urlEncurtada,
  });
  if (urlEncurtada == null) return res.sendStatus(404);

  urlEncurtada.clicks++;
  urlEncurtada.save();

  res.redirect(urlEncurtada.completa);
});
app.listen(process.env.PORT || 5000);
