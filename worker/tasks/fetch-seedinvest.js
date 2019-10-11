
var fetch = require('node-fetch');
var HTMLParser = require('node-html-parser');
var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const hitchBaseUrl = 'https://www.seedinvest.com/hitch/seed';
const grazeBaseUrl = 'https://www.seedinvest.com/graze/seed';
const misoBaseUrl = 'https://www.seedinvest.com/miso/seed';

const campaigns = ['hitch', 'graze', 'miso'];

module.exports = async function fetchSeedInvest() {

    for(let i = 0; i < campaigns.length; i++){
        //fetch hitch
        console.log(campaigns[i])
        let baseUrl = `https://www.seedinvest.com/${campaigns[i]}`;
        console.log(baseUrl);
        const res = await fetch(baseUrl);
        const page = await res.text();
        var root = HTMLParser.parse(page);
        var number = root.querySelector('.primary-count').childNodes[0].rawText
        console.log(number);
        //console.log(campaigns.length);
        const success = await setAsync(campaigns[i], number);
        console.log({success});
    }


}



module.exports();


// var redis = require("redis"),
//     client = redis.createClient();
//
// const {promisify} = require('util');
// //const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);
// const baseURL = 'https://jobs.github.com/positions.json';
//
// async function fetchGithub() {
//     let resultCount = 1;
//     let pageNumber = 1;
//
//     const allJobs = [];
//
//     while (resultCount > 0) {
//         const res = await fetch(`${baseURL}?page=${pageNumber}`);
//         const jobs = await res.json();
//         allJobs.push(...jobs);
//         resultCount = jobs.length;
//         console.log('got', resultCount, ' jobs');
//         pageNumber++;
//     }
//
//     //filter algo
//     const jrJobs = allJobs.filter(job => {
//         const jobTitle = job.title.toLocaleLowerCase();
//
//         //algo logic
//         if (jobTitle.includes('senior') || jobTitle.includes('manager') || jobTitle.includes('sr') || jobTitle.includes('architect')) {
//             return false;
//         }
//
//         return true;
//
//     });
//
//     console.log('filtered down to', jrJobs.length);
//
//     console.log('got', allJobs.length, 'jobs')
//
//     const success = await setAsync('github', JSON.stringify(jrJobs));
//
//     console.log({success});
//
//
// }
//
// module.exports = fetchGithub;