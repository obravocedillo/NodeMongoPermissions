require("dotenv-flow").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const startMongoose = require("./services/mongoose");

const permissionsRouter = require("./routes/permissions");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

/**
 *
 * @desc initialized all needed services
 */
const initializeConnections = async () => {
  try {
    await startMongoose();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

initializeConnections().then(() => {
  app.get("/", (_req, res) => {
    res.status(200).send('Working');
  })

  app.use(permissionsRouter)
});

module.exports = app;
