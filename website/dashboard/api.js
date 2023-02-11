/* The api of Nova bot. 
Don't edit this, this is used for direct called from off server websites
example: "https://api.nova-bot.tk"
before editing contect ducky
*/

const { url } = require("../../handler/database/database.js");




module.exports = function(bot, port) {
  bot = bot.client;
  const path = require("path");
  const fs = require("fs");
  const config = require(`../../handler/botconfigs/config.js`);
  const  { db }  = require('../../handler/database/database.js')
  const chalk = require("chalk");
  //const config = require(`/home/runner/Nova-tests/handler/botconfigs/config.js`)
  const express = require("express");
  const app = new express();
  router = express.Router();
  const Discord = require('discord.js')
  const { MessageEmbed } = require('discord.js')
  const moment = require('moment')
  var id = "1044615606395211836";
  var token = "hzrvsn18mlH91CZD-P-H51R7d_nBWe34PusrFgFrcJ5uOmPzoYw1ZVKr0x2pU8tQ2R9h"
  var adminLogs = new Discord.WebhookClient(id, token);
  
    // -------- Database Collections -------- //
  app.use(router);
  app.use("/assets", express.static(path.join(__dirname, "assets")));

  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  const oneDay = 1000 * 60 * 60 * 24;
  const {
    debug,
    warn,
    error,
  } = require("../../handler/events/Logger.js");
  const user = 'duckey'
  const pass = 'NovaDev'
  /*   const cluster = require('cluster')
const { cpus } = require('os')
const process = require('process')
const numCPUs = cpus().length;

    if (cluster.isPrimary) {
  console.log(`${chalk.blue('[ WORKER ]')} ${chalk.grey(' :: ')} ${chalk.green(`primary ${process.pid} is running`)}`);  
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
       console.log(`${chalk.blue('[ WORKER ]')} ${chalk.grey(' :: ')} ${chalk.green(`Creating workers.`)}`);
  console.log(`${chalk.blue('[ WORKER ]')} ${chalk.grey(' :: ')} ${chalk.green(`Creating workers..`)}`);
  console.log(`${chalk.blue('[ WORKER ]')} ${chalk.grey(' :: ')} ${chalk.green(`Creating workers...`)}`);

  }

  cluster.on('exit', (worker, code, signal) => {
  console.log(`${chalk.blue('[ WORKER ]')} ${chalk.grey(' :: ')} ${chalk.red(`Worker ${worker.process.pid} died`)}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  console.log(`${chalk.blue('[ WORKER ]')} ${chalk.grey(' :: ')} ${chalk.green(`Creating workers.`)}`);
  console.log(`${chalk.blue('[ WORKER ]')} ${chalk.grey(' :: ')} ${chalk.green(`Creating workers..`)}`);
  console.log(`${chalk.blue('[ WORKER ]')} ${chalk.grey(' :: ')} ${chalk.green(`Creating workers...`)}`);

  }
  });
} else {*/
  // -------- Cookie Sessions -------- //
  const sessions = require("express-session");
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;

  app.use(
    sessions({
      secret: require('crypto').randomBytes(16).toString("hex"),
      saveUninitialized: true,
      cookie: { maxAge: thirtyDays },
      resave: true,
    })
  );

// -------- Oauth2 Code -------- //
  const plugins = require("nova.js-plugins");
  const dash = new plugins.Dash({
    clientID: config.dash_settings.id,
    clientSecret: config.dash_settings.secret,
    redirectURI: config.website_settings.domain + "/auth/callback",
    bot: bot,
  });

  /*Nova bot api*/

  // -------- Maintenence Api -------- //

  app.post('/api/admin/maintenece', async (req, res) => {
    if (req.header.Authorization != "NovaBot") {
      if (await db.get('maintence') == true) return res.json({ success: false, alert: { message: "Maintenance Is Already Enabled !", type: "error", title: "Oops!" } })
      if (!req.body.reason) return res.json({ success: false, alert: { message: "No Reason Provided!", type: "error", title: "Oops!" } })
      await db.set('maintence', true)
      await db.set('maintence_reason', req.body.reason)

      res.json({ success: true, alert: { message: "Maintenance Mode Has Been Enabled!", type: "success", title: "Success!" } })
    } else {
      res.json({ success: false, alert: { message: "Invalid auth token.", type: "error", title: "Oops!" } })
    }




  })

  app.post('/api/admin/unmaintenece', async (req, res) => {
    const bakimdata = await db.get('maintence')
    if (req.header.Authorization != "NovaBot") {

      if (bakimdata == false) return res.json({ success: false, alert: { message: "Maintenance Is Not Enabled !", type: "error", title: "Oops!" } })

      await db.set('maintence', false)
      return res.json({ success: true, alert: { message: "Maintenance Mode Has Been Disabled!", type: "success", title: "Success!" } })
    } else {
      res.json({ success: false, alert: { message: "Invalid auth token.", type: "error", title: "Oops!" } })
    }

  })

    // -------- Redirect Api -------- //

function urlid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.post('/api/admin/url/new', async (req, res) => {
  let id = urlid('8')
  if (req.header.Authorization != "NovaBot") {
    if (!req.body.url) return res.json({ success: false, alert: { message: "No Url Provided!", type: "error", title: "Oops!" } })
    await db.set('url_'+id, req.body.url)
    console.log('New link '+id)
    
      var embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Admin api Logs`)
      .setDescription(
        `\n
        Generated a shortened url!\nOriginal: ${req.body.url}\nNew: ${id}.
        Endpoint: ${req.path}\nTime: ${moment(new Date()).format(
          "dddd, MMMM Do YYYY HH:mm:ss"
        )} `
      )
      .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
    adminLogs.send({
      username: "Nova bot || Admin Api Logs",
      avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
      embeds: [embed],
    });
  return  res.json({ success: true, alert: { message: "The link has been made. Visit it here r.nova-bot.tk/"+id, type: "success", title: "Success!" } })
  } else {
    res.json({ success: false, alert: { message: "Invalid auth token.", type: "error", title: "Oops!" } })
  }
})

app.post('/api/admin/url/delete', async (req, res) => {
  if (req.header.Authorization != "NovaBot") {
    if (!req.body.id) {
      res.json({ success: false, alert: { message: "You forgot the id.", type: "error", title: "Oops!" } })

} else {
  var embed = new MessageEmbed()
  .setColor("GREEN")
  .setTitle(`Admin api Logs`)
  .setDescription(
    `\n
    Deleted a shortened url!\nDeleted id: ${id}.
    Endpoint: ${req.path}\nTime: ${moment(new Date()).format(
      "dddd, MMMM Do YYYY HH:mm:ss"
    )} `
  )
  .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)

adminLogs.send({
  username: "Nova bot || Admin Api Logs",
  avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
  embeds: [embed],
});
  let id = req.body.id
  await db.set(`url_${id}`, "ERR_URL_DEL")
  res.json({ success: true, alert: { message: "The link has been successfully deleted.", type: "success", title: "Success!" } })
};

} else {
    res.json({ success: false, alert: { message: "Invalid auth token.", type: "error", title: "Oops!" } })
  }
})

  // -------- Blog Api -------- //

  app.post('/api/admin/blog/new', async (req, res) => {
    let id = urlid('8')
 
        if (req.header.Authorization != "NovaBot") {
      if (!req.body.Url) return res.json({ success: false, alert: { message: "No Url Provided!", type: "error", title: "Oops!" } })
      if (!req.body.Desc) return res.json({ success: false, alert: { message: "No Description Provided!", type: "error", title: "Oops!" } })
      if (!req.body.Title) return res.json({ success: false, alert: { message: "No Title Provided!", type: "error", title: "Oops!" } })
      //if (!req.body.writter) return res.json({ success: false, alert: { message: "No Writter Provided!", type: "error", title: "Oops!" } })

      await db.set('blog_title_'+req.body.Url, req.body.Title)
      await db.set('blog_descript_'+req.body.Url, req.body.Desc)
      await db.set('blog_'+req.body.Url, "Url_Valid")
      await db.set('blog_writer_'+req.body.Url, await (await dash.getUser(req.session.act)).username) //req.body.writter)
      await db.set('blog_Date_'+req.body.Url, moment(new Date()).format(
      "dddd, MMMM Do YYYY"
    ))

      console.log('New link '+id)
      
        var embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`Admin api Logs`)
        .setDescription(
          `\n
          Generated a blog url!\nUrl: ${req.body.Url}\n.
          Endpoint: ${req.path}\nTime: ${moment(new Date()).format(
            "dddd, MMMM Do YYYY HH:mm:ss"
          )} `
        )
        .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
    
      adminLogs.send({
        username: "Nova bot || Admin Api Logs",
        avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
        embeds: [embed],
      });
    return  res.json({ success: true, alert: { message: "The Blog has been made. Visit it here dashboard.nova-bot.tk/"+req.body.Url, type: "success", title: "Success!" } })
    } else {
      res.json({ success: false, alert: { message: "Invalid auth token.", type: "error", title: "Oops!" } })
    }
  })
  
  app.post('/api/admin/blog/delete', async (req, res) => {
    if (req.header.Authorization != "NovaBot") {
      if (!req.body.id) {
        res.json({ success: false, alert: { message: "You forgot the url.", type: "error", title: "Oops!" } })
  
  } else {
    var embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Admin api Logs`)
    .setDescription(
      `\n
      Deleted a shortened url!\nDeleted id: ${id}.
      Endpoint: ${req.path}\nTime: ${moment(new Date()).format(
        "dddd, MMMM Do YYYY HH:mm:ss"
      )} `
    )
    .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
  adminLogs.send({
    username: "Nova bot || Admin Api Logs",
    avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
    embeds: [embed],
  });
    let id = req.body.id
    await db.set(`blog_${id}`, "Url_Deleted")
    res.json({ success: true, alert: { message: "The blog has been successfully deleted.", type: "success", title: "Success!" } })
  };
  
  } else {
      res.json({ success: false, alert: { message: "Invalid auth token.", type: "error", title: "Oops!" } })
    }
  })

  app.get("/404", (req, res) => {
    res.render(__dirname + "/pages/error/page-not-found.ejs", {
      config
    })
  })


  app.get("/maintenence", async (req, res) => {
    res.render(__dirname + "/pages/error/maintenance.ejs", {
      config,
      reason: await db.get('maintence_reason')
    })
  })

  

  require("./dash.js")(app, dash, bot, express, db);

  app.get('/*', (req, res) => {
    res.redirect('/404')
  })



  const keysList = require("./assets/keys.js").keys;

  app.listen(port);
  debug(`Webserver successfully started on ${port}`);;
}
/*
Commented out becouse of worker system
}*/


