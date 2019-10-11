var CronJob = require('cron').CronJob;

const fetchSeedinvest= require('./tasks/fetch-seedinvest.js');
new CronJob('0 */4 * * *', fetchSeedinvest, null, true, 'America/Los_Angeles');
