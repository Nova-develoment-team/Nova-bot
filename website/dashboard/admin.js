module.exports = (bot, app, express, db, dash) => {
const isup = require('isup')
const {
  debug,
  warn,
  error,
} = require("../../handler/events/Logger.js");
  const adminids = ["845312519001342052"]
  const config = require(`../../handler/botconfigs/config.js`);
  const moment = require('moment')
  const Discord = require('discord.js')
  const { MessageEmbed } = require('discord.js')
var id = "1044615606395211836";
var token = "hzrvsn18mlH91CZD-P-H51R7d_nBWe34PusrFgFrcJ5uOmPzoYw1ZVKr0x2pU8tQ2R9h"
var adminLogs = new Discord.WebhookClient(id, token);
/* The APP management system is a work in progress. Don't use!!! Will Actuivate anticrash NOTE: I WILL FIRE YOU IF YOU TRIGGRER IT*/
app.get('/console/admin/server/', async (req, res) => {
  
  res.redirect('/console/admin/server/apps')
})
  app.get('/console/admin/server/apps', async (req, res) => {
    var user = await dash.getUser(req.session.act)
    var apistatus = await isup('https://api.nova-bot.tk')
if (user.id == adminids) {
  res.render(__dirname+"/pages/admin/Server_management/appprev.ejs", {
    bot,
    user,
    apistatus,
    config
  })
}
  })

  app.get('/console/admin/blog/post',async (req, res) => {
    var user = await dash.getUser(req.session.act)
    var guser = await dash.getUser(req.session.act)

   if (req.session.act) {
    if (user.id == adminids) {
      res.render(__dirname+"/pages/admin/administrator/blog.ejs", {
        bot,
        user,
        config,
        title: "New link"
      })

      
      var infoembed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Admin Logs`)
      .setDescription(
        `\n
        A admin went to make a url.\n
        User: ${guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
          "dddd, MMMM Do YYYY HH:mm:ss"
        )} `
      )
      .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
    adminLogs.send({
      username: "Nova bot || Admin Logs",
      avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
      embeds: [infoembed],
    });
    } else {
      var embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Admin Logs`)
      .setDescription(
        `\n
        Failed login attempt.\n
        User: ${guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
          "dddd, MMMM Do YYYY HH:mm:ss"
        )} `
      )
      .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
    adminLogs.send({
      username: "Nova bot || Admin Logs",
      avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
      embeds: [embed],
    });
      res.redirect('/')
    
  };
} else {
  res.redirect('/login')
}
})


  app.get('/console/admin/new',async (req, res) => {
    var user = await dash.getUser(req.session.act)
    var guser = await dash.getUser(req.session.act)

   if (req.session.act) {
    if (user.id == adminids) {
      res.render(__dirname+"/pages/admin/administrator/redirect_url.ejs", {
        bot,
        user,
        config,
        title: "New link"
      })

      
      var infoembed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Admin Logs`)
      .setDescription(
        `\n
        A admin went to make a url.\n
        User: ${guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
          "dddd, MMMM Do YYYY HH:mm:ss"
        )} `
      )
      .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
    adminLogs.send({
      username: "Nova bot || Admin Logs",
      avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
      embeds: [infoembed],
    });
    } else {
      var embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Admin Logs`)
      .setDescription(
        `\n
        Failed login attempt.\n
        User: ${guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
          "dddd, MMMM Do YYYY HH:mm:ss"
        )} `
      )
      .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
    adminLogs.send({
      username: "Nova bot || Admin Logs",
      avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
      embeds: [embed],
    });
      res.redirect('/')
    
  };
} else {
  res.redirect('/login')
}
})

     app.get('/console/admin/command/edit',  async (req, res) => {
    let pathh = req.query.path
    let name = pathh.replace(/%2F/g, '/')
    pathh = pathh.replace(/%2F/g, ',')
    let code = fs.readFileSync(path.join(process.cwd(), pathh))
   let getuser = await dash.getUser(req.session.act)
        let guser = await dash.getUser(req.session.act)
    req.infodiscriminator = guser.discriminator;
   req.infoid = guser.id;
    req.infousername = guser.username; 
    req.infoavatar = guser.avatar;
  
    if(getuser.id == adminids){      
      res.render(__dirname+'/pages/admin/commandedit.ejs', {
        code: code,
        config: config,
      user: guser,
        name: name,
        req: req,
        command: command
      })
}else{
res.redirect('/')
}
    })
  
  
  
  app.post('/command/save', async (req, res) => {
    
  try {
    let name = req.body.path
   name = name.replace(/\//g, path.sep)
    let nowname = command + path.sep + req.body.name
    nowname = nowname.replace(/\//g, path.sep)
  fs.writeFileSync(process.cwd() + path.sep + name, req.body.code)
    fs.renameSync(process.cwd() + path.sep + name, process.cwd() + path.sep + nowname)
    let nowpath = nowname
  
    res.redirect( `/console/admin/command/edit?path=${nowpath.replace('./', '').replace('/','')}`)
  }
  catch (e) {

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a> <a href="/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  Failed to save command with reason: ${e}
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)
  }
  })

  
  
  app.get('/console/admin/login', login, async (req, res) => {
    let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){    res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard LOGIN</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .login-form {
  width: 300px;
  margin: 0 auto;
  font-family: Tahoma, Geneva, sans-serif;
  }
  .login-form h1 {
  text-align: center;
  color: #4d4d4d;
  font-size: 24px;
  padding: 20px 0 20px 0;
  }
  .login-form input[type="password"],
  .login-form input[type="text"] {
  width: 100%;
  padding: 15px;
  border: 1px solid #dddddd;
  margin-bottom: 15px;
  box-sizing:border-box;
  }
  .login-form input[type="submit"] {
  width: 100%;
  padding: 15px;
  background-color: #535b63;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
  }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a> <a href="/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <div class="login-form">
  <h1>Admin Login</h1>
  <form action="auth" method="POST" encType="application/x-www-form-urlencoded">
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" id="password" placeholder="Password" required>
            <input type="checkbox" onclick="show()">Show Password
  <script>
  function show() {
  var x = document.getElementById("password");
  if (x.type === "password") {
  x.type = "text";
  } else {
  x.type = "password";
  }
  }               
  </script>
    <input type="submit">
  </form>
        
  </div>
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)
}else{
res.redirect('/')}
    })
  
  

         
  
  
  
  
  app.get('/console/admin/dashboard',  async(req,res) => {
  let user = await dash.getUser(req.session.act)
  var guser = await dash.getUser(req.session.act)

    const axios = require('axios')
  if (req.session.act) {
    if(user.id == adminids){    res.render(__dirname+`/pages/admin/index.ejs`, {
      bot: bot,
      user,
      title: "Admin Dashboard",
      totalserver: bot.guilds.cache.size,
      totaluser: bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
         
      
    })
    
    var infoembed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Admin Logs`)
    .setDescription(
      `\n
      An admin went to the admin dashboard.\n
      User: ${guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
        "dddd, MMMM Do YYYY HH:mm:ss"
      )} `
    )
    .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)

  adminLogs.send({
    username: "Nova bot || Admin Logs",
    avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
    embeds: [infoembed],
  });
}else{
res.redirect('/')
}
    } else {
      
      var embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Admin Logs`)
      .setDescription(
        `\n
        Failed login attempt.\n
        User: ${guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
          "dddd, MMMM Do YYYY HH:mm:ss"
        )} `
      )
      .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
    adminLogs.send({
      username: "Nova bot || Admin Logs",
      avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
      embeds: [embed],
    });
res.redirect('/')
    }
    })
    
  app.get('/console/admin/command',  async(req,res) => {
    let text = ''
  try{       
  function *walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
  if (file.isDirectory()) {
  yield* walkSync(path.join(dir, file.name));
  } else {
  yield path.join(dir, file.name);
  }
  }
  }
  let ff = []
  for (const filePath of walkSync(command)) {
  ff.push(filePath);
  }
  
  for(const rr of ff) {
  let pathh = rr.replace(/\//g, "%2F")
  /*text += `<li><a href="/command/edit?path=${pathh}">
  <button type="button"> <img src="https://cdn.discordapp.com/emojis/837524136837251093.png" width="150" height="50"/><br>
  ${rr}</button></a></li>`*/
  text += `<label><li>
  <a href="/console/admin/command/edit?path=${pathh}"><input type="image" name="guild" src="https://cdn.discordapp.com/emojis/837524136837251093.png" width="150px" height="150px" class="rounded-circle" onerror="this.src='https://cdn.discordapp.com/emojis/837524136837251093.png'" style="margin: 70px;border: 5px solid #ff0000;"  required><br><b><p style="color:white;text-align: center;">${rr}</p></b></a></li></label>`
  }
  }
    catch(e) {
  text = "path is invalid or error occurred"
        }
           let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){
    res.render(__dirname+`/pages/admin/command.ejs`,{
      text: text
    })
}else{
res.redirect('/')}
    })
  
 
  
  app.get('/command/update', async (req, res) => {
    bot.loader?.update()
    res.redirect('/command')
    })
  
  app.get('/command/create',  async (req, res) => {
    let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){    res.send(`
  <!DOCTYPE html>
  <html>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>
  <link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
  <head>
  <title>EDIT COMMAND</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
    <a href="/console/admin/command">Command</a>   
    <a href="/console/admin/guild">Guild</a>   
    <a href="/console/admin/shell">Shell</a>    
    <a href="/console/admin/djseval">DjsEval</a>   
    <a href="/console/admin/aoieval">AoiEval</a>   
    <a href="/console/admin/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <form action='/command/create' method='post'>
        <input type="text" name="name" placeholder="Command name" value="your command name.js" required>
        <br>
       
  <textarea name="code" id="code" placeholder="your aoi.js code"></textarea>
  
  <button class="btn" type="submit">Create</button>
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  <script>
  window.onload = function () {
  var editor = CodeMirror.fromTextArea($("#code")[0], {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'monokai'
  });
  };
  </script>
  </body>
  </html>
  `)
}else{
res.redirect('/')}
    }) 
  
  



 
  app.post('/command/create',  async (req, res) => {
    try{
    let nowname = command + '/' + req.body.name
    nowname = nowname.replace(/\//g, path.sep)
  nowname = nowname.replace('./','')
    fs.writeFileSync(process.cwd() + path.sep + nowname, req.body.code)
    let nowpath = nowname.replace(/,/g, '%2F')
   
    res.redirect( `/command/edit?path=${nowpath}`)
        }
    catch (e) {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
      <a href="/console/admin/command">Command</a>   
    <a href="/console/admin/guild">Guild</a>   
    <a href="/console/admin/shell">Shell</a>    
    <a href="/console/admin/djseval">DjsEval</a>   
    <a href="/console/admin/aoieval">AoiEval</a>   
    <a href="/console/admin/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  ERROR OCCURRED: ${e}
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)
  
        }
  })

   app.get('/console/admin/guilds', async (req,res) => {
    let server = bot.guilds.cache.map(z=>z)
    let guild = ''
  for(let i = 0;i<server.length;i++){
  /*guild += `<li><a href="/console/admin/guild/info?id=${server[i].id}">
  <button type="button"> <img src="${server[i].iconURL({dynamic: true, size: 4096})}" width="150" /><br>
  ${server[i].name}</button></a></li>`*/
  guild += `<label><li>
  <a href="/console/admin/guilds/info?id=${server[i].id}"><input type="image" name="guild" value="${server[i].id}" src="${server[i].iconURL({dynamic: true, size: 4096})}" width="150px" height="150px" class="rounded-circle" onerror="this.src='https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png'" style="margin: 70px;border: 5px solid #6699cc;"  required><br><b><p style="color:blue;text-align: center;">${server[i].name}</p></b></a>
          </li></label>`
  
  }
  let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){
  res.render(__dirname+`/pages/admin/administrator/guilds.ejs`, {
    guild: guild,
    user: getuser,
    bot,
    title: "Guild Management"
  })
}else{
res.redirect('/')}
  
    })
  
  
  app.get('/console/admin/guilds/info',  async (req,res) => {
    let info = ''
    try {
  let guild = bot.guilds.cache.get(req.query.id)
  info = `Id: ${guild.id}<br>Name: ${guild.name}<br>Owner Id: ${guild.ownerId}<br>Members count: ${guild.memberCount}<br>Features: ${guild.features.join(', ')}`
        }
    catch (e) {
        info = "error occurred: " + e
        }
        let user = await dash.getUser(req.session.act)
    if(user.id == adminids){
      res.render(__dirname+'/pages/admin/administrator/guildinfo.ejs', {
        info,
        bot,
        req,
        title: "Guild info",
        user,
        gid: req.query.id
      })
}else{
res.redirect('/')}
    })
  
  
  app.get('/command/delete',  async (req, res) => {
   try {
       let pathh = req.query.path
       pathh = pathh.replace(/%2F/g, path.sep)
       fs.unlinkSync(path.join(process.cwd(), pathh))
       res.redirect('/command')
       }
   catch (e) {
     let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){
   res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
      <a href="/console/admin/command">Command</a>   
    <a href="/console/admin/guild">Guild</a>   
    <a href="/console/admin/shell">Shell</a>    
    <a href="/console/admin/djseval">DjsEval</a>   
    <a href="/console/admin/aoieval">AoiEval</a>   
    <a href="/console/admin/stats">BotStats</a>  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  ERROR OCCURRED: ${e}
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)
}else{
res.redirect('/')}
   }
  
   })
  
      
  app.get('/guild/leave',  async (req,res) => {
    try { 
        bot.guilds.cache.get(req.query.id).leave()
        res.redirect( '/guild')
        }
    catch (e) {
       let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){        res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
     <a href="/console/admin/command">Command</a>   
    <a href="/console/admin/guild">Guild</a>   
    <a href="/console/admin/shell">Shell</a>    
    <a href="/console/admin/djseval">DjsEval</a>   
    <a href="/console/admin/aoieval">AoiEval</a>   
    <a href="/console/admin/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  Failed to leave guild with reason: ${e}
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)
  
}else{
res.redirect('/')}
      }
      
    })
  
  
  
  
  
  app.get('/console/admin/shell',  async(req, res) => {
    
    let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
    <a href="/console/admin/command">Command</a>   
    <a href="/console/admin/guild">Guild</a>   
    <a href="/console/admin/shell">Shell</a>    
    <a href="/console/admin/djseval">DjsEval</a>   
    <a href="/console/admin/aoieval">AoiEval</a>   
    <a href="/console/admin/stats">BotStats</a>
    <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <div align=center>
  <form action="shellexec" method='post' autocomplete='off'>
  <input autocomplete="false" type="textarea" name="hidden" style="display:none">
  <input type='text' name='execute' placeholder='Type command to send to server' autocomplete='false' style="width:100" size="50">
  <input type='submit' value='Send!'>
  </form>
  </div>
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)}else{
  res.redirect('/')  }
  
  })
  
  app.post('/shellexec',  async(req, res) => {
  const exec = require('child_process')
  let result = '';
    try {
        result = await exec.execSync(req.body.execute).toString().replace(/\n/g, '<br>')
        }
    catch (e) {
        result = e
        }

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
  <a href="/console/admin/command">Command</a>   <a href="/console/admin/guild">Guild</a>   <a href="/console/admin/shell">Shell</a>    <a href="/console/admin/djseval">DjsEval</a>   <a href="/console/admin/aoieval">AoiEval</a>   <a href="/console/admin/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <p style="padding: 10px; border: 2px solid white;">${result}</p>
  <form action="shellexec" method='post' autocomplete='off'>
  <input autocomplete="false" type="text" name="hidden" style="display:none">
  <input type='text' placeholder='Type command to send to server' autocomplete='false' name='execute' style="width:50">
  <input type='submit' value='Send!'>
  </form>
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)
  })


  app.get('/console/admin/djseval',  async(req, res) => {
    let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){
  res.send(`
  <!DOCTYPE html>
  <html>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>
  <link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a>
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a> <a href="/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <form action="djseval" method='post' autocomplete='off'>
  <textarea name='execute' id='execute' placeholder='Your node js code here' autocomplete='false'></textarea>
  <input type='submit' value='Send!'>
  </form>
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  <script>
  window.onload = function () {
  var editor = CodeMirror.fromTextArea($("#execute")[0], {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'monokai'
  });
  };
  </script>
  </body>
  </html>
  `)
}else{
res.redirect('/')}
  })
  
  app.post('/djseval',  async(req, res) => {
  let result;
    try {
        const client = bot
        result = await eval(req.body.execute)
    
        }
    catch (e) {
        result = e
        }
  res.send(`
  <!DOCTYPE html>
  <html>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>
  <link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
      <a href="/console/admin/command">Command</a>   
    <a href="/console/admin/guild">Guild</a>  
    <a href="/console/admin/shell">Shell</a>   
    <a href="/console/admin/djseval">DjsEval</a>  
    <a href="/console/admin/aoieval">AoiEval</a>  
    <a href="/console/admin/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <p style="padding: 10px; border: 2px solid white;">${require('util').inspect(result, {depth:0}).replace(/\n/g, '<br>')}</p>
  <form action="djseval" method='post' autocomplete='off'>
  <textarea placeholder='Type command to send to server' autocomplete='false' name='execute' id='execute'>${req.body.execute}</textarea>
  <div align=center>
  <input type='submit' value='Send!' style="background-color: #4CAF50;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;">
  </div>
  </form>
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  <script>
  window.onload = function () {
  var editor = CodeMirror.fromTextArea($("#execute")[0], {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'monokai'
  });
  };
  </script>
  </body>
  </html>
  `)
  
  })
  
  
  app.get('/console/admin/aoieval',  async(req, res) => {
    let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){
  res.send(`
  <!DOCTYPE html>
  <html>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>
  <link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
      <a href="/console/admin/command">Command</a>   
    <a href="/console/admin/guild">Guild</a>  
    <a href="/console/admin/shell">Shell</a>   
    <a href="/console/admin/djseval">DjsEval</a>  
    <a href="/console/admin/aoieval">AoiEval</a>  
    <a href="/console/admin/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <form action="aoieval" method='post' autocomplete='off'>
  <textarea name='execute' id='execute' placeholder='Your aoi js code here' autocomplete='false'></textarea>
  <input type='submit' value='Send!'>
  </form>
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  <script>
  window.onload = function () {
  var editor = CodeMirror.fromTextArea($("#execute")[0], {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'monokai'
  });
  };
  </script>
  </body>
  </html>
  `)
}else{
res.redirect('/')}
  })
  
  app.post('/aoieval',  async(req, res) => {
  let result;
    try {
        const client = bot
  
  result = await client.functionManager.interpreter(
                client,
                {},
                [],
                {
                    name: "aoi Eval",
                    code: `${req.body.execute}`,
                },
                client.db,
                true,
            )
  
    result = result.code
        }
    catch (e) {
        result = e
        }
  res.send(`
  <!DOCTYPE html>
  <html>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.js"></script>
  <link rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css">
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
  <a href="/command">Command</a>
  <a href="/guild">Guild</a>
  <a href="/shell">Shell</a> 
  <a href="/djseval">DjsEval</a>
  <a href="/aoieval">AoiEval</a> <a href="/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <p style="padding: 10px; border: 2px solid white;">${require('util').inspect(result, {depth:0}).replace(/\n/g, '<br>')}</p>
  <form action="aoieval" method='post' autocomplete='off'>
  <textarea placeholder='Type command to send to server' autocomplete='false' name='execute' id='execute'>${req.body.execute}</textarea>
  <input type='submit' value='Send!'>
  </form>
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  <script>
  window.onload = function () {
  var editor = CodeMirror.fromTextArea($("#execute")[0], {
    lineNumbers: true,
    lineWrapping: true,
    mode: 'javascript',
    theme: 'monokai'
  });
  };
  </script>
  </body>
  </html>
  `)
  
  })
  
  
  app.get('/reboot',  async(req,res) => {
    let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){
  await res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  ri
  ght: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
    <a href="/console/admin/command">Command</a>   
    <a href="/console/admin/guild">Guild</a>  
    <a href="/console/admin/shell">Shell</a>   
    <a href="/console/admin/djseval">DjsEval</a>  
    <a href="/console/admin/aoieval">AoiEval</a>  
    <a href="/console/admin/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  The server/process is restarting, this dashboard should be offline for a few seconds, if your bot not coming online for a more than 2 minute, you can check it on your hosting panel
  <script>
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)
}else{
  res.redirect('/')
}
   
   process.on("exit", () => {
       
       require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached: true,
            stdio: "inherit",
        });
    });
    process.exit();
   })
  
  
  app.get('/json/stats',  async(req,res) => {
  let client = bot
  let days = Math.floor(client.uptime / 86400000);
  
  let hours = Math.floor(client.uptime / 3600000) % 24;
  
  let minutes = Math.floor(client.uptime / 60000) % 60;
  
  let seconds = Math.floor(client.uptime / 1000) % 60;
  const initial = process.cpuUsage();
  const start = Date.now();
  while (Date.now() - start > 1) ; 
  const final = process.cpuUsage(initial);
  let cpu = ((final.user + final.system) / 1000).toFixed(2);
  res.json({
  "ram": process.memoryUsage().rss / 1024 / 1024,
  "uptime": days + "d " +  hours + "h " + minutes + "m " +  seconds + "s ",
  "cpu": cpu
  
  })
  })
  
  
  app.get('/console/admin/stats',async(req,res) => {
    let getuser = await dash.getUser(req.session.act)
    if(getuser.id == adminids){
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
  body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
          background-color: #001f3f;
            color: #F5F5F5;
                }
  .topnav {
  overflow: hidden;
  background-color: #333;
  }
  .topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  }
  .topnav a:hover {
  background-color: #ddd;
  color: black;
  }
  .topnav a.active {
  background-color: #04AA6D;
  color: white;
  }
  .topnav .icon {
  display: none;
  }
  @media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
  float: right;
  display: block;
  }
  }
  @media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
  position: absolute;
  right: 0;
  top: 0;
  }
  .topnav.responsive a {
  float: none;
  display: block;
  text-align: left;
  }
  }
  </style>
  </head>
  <body>
  <div class="topnav" id="myTopnav">
  <a href="/console/admin/dashboard" class="active">dashboard</a>
  <a href="/console/admin/command">Command</a>
  <a href="/console/admin/guild">Guild</a>
  <a href="/console/admin/shell">Shell</a> 
  <a href="/console/admin/djseval">DjsEval</a>
  <a href="/console/admin/aoieval">AoiEval</a>
  <a href="/console/admin/stats">BotStats</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
  </a>
  </div>
  <div id="stats"></div>
  <script>
  function stats() {
  
  fetch('/json/stats')
  .then(result => result.json())
  .then((output) => {
    document.getElementById("stats").innerHTML = \`
  Ram usage: \${output.ram}MB<br>
  Cpu usage: \${output.cpu}%<br>
  Uptime: \${output.uptime}
    \`
  });
  }
  setInterval(stats, 1000)
  function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  </script>
  </body>
  </html>
  `)
}else{
res.redirect('/')}
  })



  app.get('/console/admin/maintence', async (req, res) => {
  var axios = require('axios')
    var user = await dash.getUser(req.session.act)
    var guser = await dash.getUser(req.session.act)

      if (req.session.act) {
        if(user.id == adminids){    
    
res.render(__dirname+"/pages/admin/administrator/maintence.ejs",{
     user,
  bot,
  title: "Maintence",
  axios,
  apikey: process.env.api,
  config
    })
    
    var infoembed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Admin Logs`)
    .setDescription(
      `\n
      A admin went to maintence page.\n
      User: ${guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
        "dddd, MMMM Do YYYY HH:mm:ss"
      )} `
    )
    .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)

  adminLogs.send({
    username: "Nova bot || Admin Logs",
    avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
    embeds: [infoembed],
  });
        }else{
          res.redirect('/')
        }
      } else {
        
      var embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Admin Logs`)
      .setDescription(
        `\n
        Failed login attempt.\n
        User: ${guser.username}#${guser.discriminator}\nTime: ${moment(new Date()).format(
          "dddd, MMMM Do YYYY HH:mm:ss"
        )} `
      )
      .setFooter(`Powered By Nova Development || ${config.website_settings.domain}`)
  
    adminLogs.send({
      username: "Nova bot || Admin Logs",
      avatarURL: `https://cdn.discordapp.com/avatars/896303947311104041/06a3057d95612a58b10c4c11d9c99559.png?size=2048`,
      embeds: [embed],
    });
      }
  })
  
  
  
  
   app.get("/login", async (req, res) => {
     if(req.session.act){
       res.redirect('/')
     }else{
   let b = await dash.generateUrl();
      res.redirect(b);
      debug('New request on /login')
     }
    })
  function islogin(req,res,next) {
    if(req.session.user==user && req.session.pass==pass){
        return next()
        }
  else {
     res.redirect('/')
     }
    }
  
  
  function login(req,res,next) {
    if(req.session.user!=user || req.session.pass!=pass){
        return next()
        }
  else {
     res.redirect('/console/admin/dashboard')
     }
    }
  
  function al(port){
  if (bot) {
  app.listen(port)
  }
  else{
  al(port)
  }
  }
  
  al()

  }