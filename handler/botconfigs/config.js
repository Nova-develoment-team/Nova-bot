require("dotenv").config();

module.exports = {
  Bot: {
    token:
      process.env.token,
    prefix: ["$GetServerVar[prefix]", "<@$clientID>"],
      intents: "all",
    sharding: true,
      shardAmount: "10"
  },

  webhooks: {
    url: process.env.hook
  },

  bot_settings: {
  ownerid: process.env.oid,
    path: ""
  },
  events: {
    antiCrash: true,
    autoUpdate: false,
  },

  respondOnEdit: {
    commands: true,
  },
  debug: {
    iplogging: true,
    interpreter: true,
  },

  suppressAllErrors: {
    errorMessage: [
      "",
      "$log[[ERROR] :: $username had a error in $servername | ERROR ID: $randomString[$random[4;10]]]{newEmbed:{title:Ah oh!}{description:There was a error | ERROR ID: $randomString[$random[4;10]]}{color:fcbfcb}}",
    ],
  },

  lava_settings: {
    node_1: process.env.lavalink_host /*The lavalink host, Should not add https:// or http:// */,
    Host_password: process.env.lavalink_password /* The lavalinkd host password */,
  },

  website_settings: {
    title: process.env.title,
    domain: process.env.website_domain
  },

  dash_settings: {
    id: process.env.bid,
    secret: process.env.bot_secret
  },
  
  db_settings: {
    db_uri: process.env.db_uri,
  }
};

