
const { Database } = require("quickmongo");
const config = require('../botconfigs/config.js')
const db = new Database(config.db_settings.db_uri);
const chalk = require('chalk');
const database = 'MongoDB';

const online = chalk.green;
const error = chalk.red;
const info = chalk.blue;
const warning = chalk.yellow;
const lcsep = chalk.yellow;
const databaseSeperator = chalk.yellow

//mongodb database. DO NOT CHANGE!!!! it works
db.on("ready", () => {
console.log(databaseSeperator("───────────────────────── [ Database ] ─────────────────────────"))
console.log(online(`${database} Gateway: Connecting.`))
console.log(online(`${database} Gateway: Connecting..`))
console.log(online(`${database} Gateway: Connecting...`))
console.log(online(`${database} Gateway: Connected`))
console.log(info(`${database} Gateway: Getting Ready, loading database value...`))
console.log(databaseSeperator("────────────────────────────────────────────────────────────────"))

});

// ------------ Collection ------------ //
//const blog_data = new db.table('blog-data')
//const url_data = new db.table('url-data')
//const bot_data = new db.table('bot-data')

db.connect();


module.exports = {
    db,
   /* bot_data,
    blog_data,
    url_data*/
};