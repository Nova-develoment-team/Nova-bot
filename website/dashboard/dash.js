const path = require("path");
const fs = require("fs");
const dateTime = require("node-datetime");
const dt = dateTime.create();
const formatted = dt.format("Y-m-d H:M:S");
const config = require(`../../handler/botconfigs/config.js`);
const {
  debug,
  warn,
  error,
} = require("../../handler/events/Logger.js");
const ejs = require('ejs')
const db = require('../../handler/database/database.js')
const command = "./Commands/Plugins"
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')


module.exports = function(app, dash, bot, express) {
  app.set('view engine', 'ejs');

  function format(seconds) {
    function pad(s) {
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }





  function requestid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

    function UAC(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-+*&';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function PG(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuv1234567890_-+=[]{}/?<>,()*&^%$#!`~'
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

   


  var isup = require('is-up')
const axios = require('axios')
  const { db } = require('../../handler/database/database.js');

    // -------- Database Collections -------- //
    /*var db = new db.table('blog-data')
    var url_data = new db.table('url-data')
    var db = new db.table('bot-data') */
  app.get('/status', async (req, res) => {

    var apidat = await axios.get('https://api.nova-bot.tk/api/srvinfo').then((response) => {
      return response.data.ping;
    })
  
    
    var uptimerstatus = await isup('https://up.nova-bot.tk')
    var apistatus = await isup('https://api.nova-bot.tk')
    var cdnstatus = await isup('https://cdn.nova-bot.tk')
    var proxystatus = await isup('https://proxy.nova-bot.tk')
    var assetstatus = await isup('https://assets.nova-bot.tk')
    let b = dash.generateUrl();
req.log = require('../../handler/events/Logger.js')
    if (req.session.act) {
      let user = await dash.getUser(req.session.act)
      res.render(__dirname + '/pages/default/status.ejs', {
        uptimerstatus,
        apistatus,
        cdnstatus,
        proxystatus,
        assetstatus,
        config,
        user,
        res,
        req,
        bot,
        apidat
      })
    } else {
      res.render(__dirname + '/pages/default/status.ejs', {
        uptimerstatus,
        apistatus,
        cdnstatus,
        proxystatus,
        assetstatus,
        config,
        url: b,
        req,
        res,
        bot,
        apidat
      })

    }
  })

  app.get('/requestid', async (req, res) => {
    debug(`New user! redirect: ${req.query.redirect_uri} requestid: ${requestid('8')}`)
    res.redirect(req.query.redirect_uri)
  })

  app.disable('x-powered-by');
  const path = require('path')
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
  app.use(express.static(path.join(__dirname + '/assets')))



  app.get("/auth/callback", async (req, res) => {
    let code = req.query.code;
    let ac = await dash.getAccessToken(code);
    req.session.act = ac;
    let guser = await dash.getUser(req.session.act)
    req.infodiscriminator = guser.discriminator;
    req.infoid = guser.id;
    req.infousername = guser.username;
    req.infoavatar = guser.avatar;


    var AsciiTable = require('ascii-table')
    var table = new AsciiTable('New user login')
    table
      .setHeading('Username', 'discriminator', 'session')
      .addRow(req.infousername, req.infodiscriminator, req.session.act)

    console.log(table.toString())

    res.redirect(`/requestid?redirect_uri=/console&rqid=${requestid}`);
    if (config.debug.iplogging == true) {
      fs.readFile(
        config.bot_settings.path + "logs/website/DashboardIpLogs.txt",
        "utf8",
        (err, data) => {
          var abc = fs.createWriteStream(
            config.bot_settings.path + `logs/website/DashboardIpLogs.txt`
          );
          abc.write(`${data} \n`);
          abc.write(`${formatted} || ${req.connection.remoteAddress} ||\n `);
          abc.write(
            "< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > \n"
          );
          abc.end();

        }
      );
    
  
      console.log(
        `User login || type: callback || IP: ${req.connection.remoteAddress} || Added to list of known ips`
      );
const moment = require('moment')
var id = "1044615606395211836";
var token = "hzrvsn18mlH91CZD-P-H51R7d_nBWe34PusrFgFrcJ5uOmPzoYw1ZVKr0x2pU8tQ2R9h"
      const loginLogs = new Discord.WebhookClient(id, token);
      const login = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Login Logs`)
      .setDescription(
        `\nUser: ${await guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
          "dddd, MMMM Do YYYY HH:mm:ss"
        )} `
      )
      .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
    loginLogs.send({
      username: "Nova bot || Login Logs",
      avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
      embeds: [login],
    });
   
    }
  });




  app.get("/", async (req, res) => {
    let b = dash.generateUrl();

    if (await db.get('maintence') == false) {
      if (req.session.act) {
         var user = await dash.getUser(req.session.act)
       res.render(__dirname + '/pages/default/index.ejs', {
          url: b,
          config: config,
          req,
          res,
         user,
         bot,
  
       })
      }else{
      res.render(__dirname + '/pages/default/index.ejs', {
          url: b,
          config: config,
          req,
          res,
        bot,
      
        })
    }

      
  } else {
      res.redirect('/maintenence')
    }
    if (config.debug.iplogging == true) {
      fs.readFile(
        config.bot_settings.path + "logs/website/DashboardIpLogs.txt",
        "utf8",
        (err, data) => {
          var abc = fs.createWriteStream(
            config.bot_settings.path + `logs/website/DashboardIpLogs.txt`
          );
          abc.write(`${data} \n`);
          abc.write(`${formatted} || ${req.connection.remoteAddress} ||\n `);
          abc.write(
            "< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > \n"
          );
          abc.end();

        }
      );
      debug(
        `User connected to website || type: main page || IP: ${req.connection.remoteAddress} || Added to list of known ips`
      );
    }

  });

app.get("/blog", async (req, res) => {
  res.redirect('/blog/Using-blogs')
})

app.get("/blog/:id", async (req, res) => {
  if (await db.get('blog_'+req.params.id) == "Url_Deleted") {
    res.redirect('/')
  }
    var title = await db.get('blog_title_'+req.params.id)
  var desc = await db.get('blog_descript_'+req.params.id)
  var date = await db.get('blog_Date_'+req.params.id)
  var author = await db.get('blog_writer_'+req.params.id)
if (req.session.act) {
  
  res.render(__dirname+"/pages/default/blog.ejs", {
    bot,
    user: await dash.getUser(req.session.act),
title,
desc,
date,
author,
config,
req,
res
  })
} else {

  res.render(__dirname+"/pages/default/blog.ejs", {
  
title,
desc,
date,
author,
config,
req,
res,
bot
  })
}
})

  app.get("/console", async (req, res) => {

    if (config.debug.iplogging == true) {
      fs.readFile(
        config.bot_settings.path + "logs/website/DashboardIpLogs.txt",
        "utf8",
        (err, data) => {
          var abc = fs.createWriteStream(
            config.bot_settings.path + `logs/website/DashboardIpLogs.txt`
          );
          abc.write(`${data} \n`);
          abc.write(`${formatted} || ${req.connection.remoteAddress} ||\n `);
          abc.write(
            "< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > \n"
          );
          abc.end();

        }
      );
      debug(
        `User connected to website || type: management console  || IP: ${req.connection.remoteAddress} || Added to list of known ips`
      );
    }
    let b = dash.generateUrl();
    if (await db.get('maintence') == false) {

      if (req.session.act) {
        const content = fs.readFileSync(__dirname + "/pages/console/dash.ejs");
        const file = content.toString();
        let guser = await dash.getUser(req.session.act)
        req.infodiscriminator = guser.discriminator;
        req.infoid = guser.id;
        req.infousername = guser.username;
        req.infoavatar = guser.avatar;
        res.render(__dirname + '/pages/console/dash.ejs', {
          user: guser,
          config: config,
          bot,
          req,
          res
        })
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/maintenence')
    }
  });


  app.get("/devlogin", async (req, res) => {
    let code = req.query.code;
    let ac = await dash.getAccessToken(code);
    req.session.act = ac;
    res.redirect("/");
    if (config.debug.iplogging == true) {
      fs.readFile(
        config.bot_settings.path + "logs/website/DashboardIpLogs.txt",
        "utf8",
        (err, data) => {
          var abc = fs.createWriteStream(
            config.bot_settings.path + `logs/website/DashboardIpLogs.txt`
          );
          abc.write(`${data} \n`);
          abc.write(`${formatted} || ${req.connection.remoteAddress} ||\n `);
          abc.write(
            "< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > \n"
          );
          abc.end();

        }
      );
      debug(
        `User login || type: callback || IP: ${req.connection.remoteAddress} || Added to list of known ips`
      );
    }
  });

  app.get("/auth/logout", async (req, res) => {

    if (config.debug.iplogging == true) {
      fs.readFile(
        config.bot_settings.path + "logs/website/DashboardIpLogs.txt",
        "utf8",
        (err, data) => {
          var abc = fs.createWriteStream(
            config.bot_settings.path + `logs/website/DashboardIpLogs.txt`
          );
          abc.write(`${data} \n`);
          abc.write(`${formatted} || ${req.connection.remoteAddress} ||\n `);
          abc.write(
            "< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > \n"
          );
          abc.end();

        }
      );
      debug(
        `User logout || type: logout || IP: ${req.connection.remoteAddress} || Added to list of known ips`
      );
    }

    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } // cannot access session here
      else {
        console.log("Logged Out");
      }
    });
    res.redirect("/");
  });

  app.get("/console/select", async (req, res) => {

    if (config.debug.iplogging == true) {
      fs.readFile(
        config.bot_settings.path + "logs/website/DashboardIpLogs.txt",
        "utf8",
        (err, data) => {
          var abc = fs.createWriteStream(
            config.bot_settings.path + `logs/website/DashboardIpLogs.txt`
          );
          abc.write(`${data} \n`);
          abc.write(`${formatted} || ${req.connection.remoteAddress} ||\n `);
          abc.write(
            "< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > \n"
          );
          abc.end();

        }
      );
      debug(
        `Server selection || type: selection || IP: ${req.connection.remoteAddress} || Added to list of known ips`
      );
    }
    if (await db.get('maintence') == false) {

      if (req.session.act) {
        let b = await dash.getCommonAdminGuilds(req.session.act);
        let d = await dash.getGuilds(req.session.act);
        let c = await dash.getAdminGuilds(req.session.act);
        for (let [i, guild] of Object.entries(d)) {
          var aa;
          var bb;
          if (c.includes(guild.id) == true && b.includes(guild.id) == true) {
            aa =
              aa +
              `<li>
                            <a href="/console/dashboard/${guild.id}/"><input type="image" name="${guild.name}" value="${guild.id}" src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png" width="100px" height="100px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'"
                            style="margin: 70px;border: 5px solid #555;border: 5px solid;border-color:#1A2634;border-radius: 50%"  required>
                            <br>
                            <b><p style="color:white;text-align: center;">${guild.name}</p></b></a>
                          </li>`;
          } else if (c.includes(guild.id) == true) {
            bb =
              bb +
              `                            <a href="/invite-bot/${guild.id}"><input type="image" name="${guild.name}" value="${guild.id}" src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png" width="100px" height="100px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'"
                            style="margin: 70px;border: 5px solid #555;border: 5px solid;border-color:#1A2634;border-radius: 50%
                            "  required>
                            <br>
                            <b><p style="color:white;text-align: center;">${guild.name}</p></b></a>
                          `;
          }
        }
        const selection = fs.readFileSync(__dirname + "/pages/console/serverselection.ejs");
        const selectfile = selection.toString();
        let guser = await dash.getUser(req.session.act)

        req.infodiscriminator = guser.discriminator;
        req.infoid = guser.id;
        req.infousername = guser.username;
        req.infoavatar = guser.avatar;
        res.render(__dirname + '/pages/console/serverselection.ejs', {
          user: guser,
          config: config,
          ats: bb.replace("undefined", ""),
          manage: aa.replace("undefined", ""),
          bot,
          res,
          req
        })
        if (db.get('website.maintence') == true) {
          res.redirect('/maintenence')
        }
      } else {
        let b = dash.generateUrl();
        return res.redirect('/login');
      }
    } else {
      res.redirect('/maintenence')
    }

  });

  app.get("/invite-bot/:id", function(request, response) {
    response.redirect(
      `https://discord.com/oauth2/authorize?response_type=code&client_id=${bot.user.id}&scope=bot+applications.commands&guild_id=${request.params.id}&disable_guild_select=true&prompt=consent&permissions=8`
    );
  });
  app.get('/console/dashboard/:id', async (req, res) => {
    if (config.debug.iplogging == true) {
      fs.readFile(
        config.bot_settings.path + "logs/website/DashboardIpLogs.txt",
        "utf8",
        (err, data) => {
          var abc = fs.createWriteStream(
            config.bot_settings.path + `logs/website/DashboardIpLogs.txt`
          );
          abc.write(`${data} \n`);
          abc.write(`${formatted} || ${req.connection.remoteAddress} ||\n `);
          abc.write(
            "< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > \n"
          );
          abc.end();

        }
      );
      debug(
        `User server dashboard || type: dashboard || IP: ${req.connection.remoteAddress} || Added to list of known ips`
      );
    }
    var guild = bot.guilds.cache.get(req.params.id)

    const user = await dash.getUser(req.session.act)
    if (await db.get('maintence') == false) {
      if (req.session.act) {
        res.render(__dirname + '/pages/console/Dashboard/dashboard.ejs', {
          req,
          res,
          bot,
          user,
          totalchannels: guild.channelCount,
          totalmembers: guild.memberCount,
          title: "Management",
config
        })
      } else {

      }
    } else {
      res.redirect('/maintence')
    }
  });

app.get('/console/dashboard/:id/Moderation', async (req, res)  => {
  res.redirect(`/console/dashboard/${req.params.id}/Moderation/overview`)
})

  app.get('/console/dashboard/:id/Moderation/overview', async (req, res) => {
    if (config.debug.iplogging == true) {
      fs.readFile(
        config.bot_settings.path + "logs/website/DashboardIpLogs.txt",
        "utf8",
        (err, data) => {
          var abc = fs.createWriteStream(
            config.bot_settings.path + `logs/website/DashboardIpLogs.txt`
          );
          abc.write(`${data} \n`);
          abc.write(`${formatted} || ${req.connection.remoteAddress} ||\n `);
          abc.write(
            "< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > \n"
          );
          abc.end();

        }
      );
      debug(
        `User server dashboard || type: dashboard || IP: ${req.connection.remoteAddress} || Added to list of known ips`
      );
    }
    var guild = bot.guilds.cache.get(req.params.id)

    const user = await dash.getUser(req.session.act)
    var botdatabase = await bot.db;
    console.log(await bot.db.get('main', 'AntiCap_895560577055883265'))
    if (await db.get('maintence') == false) {
      if (req.session.act) {
        res.render(__dirname + '/pages/console/Dashboard/Plugins/Moderation.ejs', {
          req,
          res,
          bot,
          db: botdatabase, 
          user,
          title: "Management",
config
        })
      } else {

      }
    } else {
      res.redirect('/maintence')
    }
  });

  require('./admin.js')(bot, app, express, db, dash);
}





