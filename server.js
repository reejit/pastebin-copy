const fs = require('fs'); // Loads the "fs" npm.
const config = require("./config.json") // Loads the database

const express = require("express");
const app = express();

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
  configSave();
});

app.get("/createtoken", async function(req, res) {
  if (req.query.token) {
    let token = decodeURIComponent(req.query.token)
    if (decodeURIComponent(config["token"]).split(",").includes(token)) {
      if (decodeURIComponent(config["admintoken"]).split(",").includes(token)) {
        if (req.query.newtoken) {
          if (decodeURIComponent(config["token"]).split(",").includes(req.query.newtoken)) {
            res.send(`{\n  status: "already exists"\n}`)
          } else {
            configSet("token", decodeURIComponent(config["token"]) + "," + decodeURIComponent(req.query.newtoken))
            res.send(`{\n  status: "success"\n}`)
          }
        } else {
          res.send(`{\n  status: "undefined newtoken"\n}`)
        }
      } else {
        res.send(`{\n  status: "no permission"\n}`)
      }
    } else {
      res.send(`{\n  status: "invalid token"\n}`)
    }
  } else {
    res.send(`{\n  status: "undefined token"\n}`)
  }
  return
});

app.get("/createfile", async function(req, res) {
  if (req.query.token) {
    let token = decodeURIComponent(req.query.token)
    if (decodeURIComponent(config["token"]).split(",").includes(token)) {
      if (req.query.pasteid) {
        if (req.query.message) {
          configSet("pastes-" + token + "/" + decodeURIComponent(req.query.pasteid), decodeURIComponent(req.query.message))
          res.send(`{\n  status: "success"\n}`)
        } else {
          res.send(`{\n  status: "undefined message\n}`)
        }
      } else {
        res.send(`{\n  status: "undefined pasteid"\n}`)
      }
    } else {
      res.send(`{\n  status: "invalid token"\n}`)
    }
  } else {
    res.send(`{\n  status: "undefined token"\n}`)
  }
  return
});

app.get("/deletefile", async function(req, res) {
  if (req.query.token) {
    let token = decodeURIComponent(req.query.token)
    if (decodeURIComponent(config["token"]).split(",").includes(token)) {
      if (req.query.pasteid) {
        if (config["pastes-" + token + "/" + decodeURIComponent(req.query.pasteid)]) {
          configSet("pastes-" + token + "/" + decodeURIComponent(req.query.pasteid), "")
          res.send(`{\n  status: "success"\n}`)
        } else {
          res.send(`{\n  status: "invalid pasteid"\n}`)
        }
      } else {
        res.send(`{\n  status: "undefined pasteid"\n}`)
      }
    } else {
      res.send(`{\n  status: "invalid token"\n}`)
    }
  } else {
    res.send(`{\n  status: "undefined token"\n}`)
  }
  return
});

app.get("/pastes/*", async function(req, res) {
  if (config["pastes-" + req.originalUrl.slice(8)]) {
    res.send(decodeURIComponent(config["pastes-" + req.originalUrl.slice(8)]))
  } else {
    res.send("")
  }
  return
});

app.get("/pastes", async function(req, res) {
  res.send("")
  return
});

app.get("*", async function(req, res) {
  res.send(`{\n  status: "invalid page"\n}`)
  return
});

async function configSet(name, response) {
  //let config = require("./config.json");
  try {
    if (config[name] === undefined) {
    } else {
      await delete config[name];
    }
    if (response.toString() === "") {
    } else {
      config[name.toString()] = encodeURIComponent(response.toString());
    }
  } catch(err) {
  }
}

function configSave() {
  fs.writeFile("config.json", JSON.stringify(config, null, 2), function(err) {
  if (err) throw err;
  });
  setTimeout(() => {
    configSave();
  }, 2000);
}
