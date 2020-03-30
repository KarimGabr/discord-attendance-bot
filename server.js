require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const app = express();
const http = require("http").Server(app);
const port = 6000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/discord_attendance_bot", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB! BECKY LEMME SMASH!");

  http.listen(port, () => {
    console.log("Listening to Port: " + port);
  });
});

mongoose.set("useFindAndModify", false);

const attendancesRouter = require("./routes/attendances");
app.use("/attendances", attendancesRouter);

const Discord = require("discord.js");
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
const botCommands = require("./commands");
Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
bot.login(TOKEN);
bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});
