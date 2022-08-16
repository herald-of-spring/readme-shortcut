const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');

const questions = ["What is the project title?", "Enter project description.", "How can users install this project? Enclose any commands inside backticks (`)", "How should this project be used? Format any images as follows: ![imageName](imageFilePath)", "What are the contribution guidelines?", "How can users run the tests, if any?", "What is the license of this project?", "What is your GitHub username?", "What is your email address?"];
const names = ["title", "description", "installation", "usage", "contribution", "testing", "license", "username", "email"];
const defaults = [null, null, "The project can be installed by cloning this repository and running `npm init -y` then `npm i inquirer@8.2.4` to install the necessary modules.", "Open the application by `node index.js`.", "This application is open source. Everyone is free to contribute.", null, null, null, null];
const licenses = ["GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "The Unlicense"];

function writeToFile(fileName, data) {
  var res = generateMarkdown(data);
  fs.writeFile(fileName, res, err => err ? console.error(err) : console.log("Success! Open " + fileName + " to view results."));
  fs.writeFile("log.txt", `${data.installation}
${data.usage}
${data.contribution}
${data.testing}
${data.license}
${data.username}
${data.email}`, err => err ? console.error(err) : console.log("History logged in log.txt"));
}

function init() {
  let result = setup(readLogs());    //if there are any logs, default values will be drawn from those
  inquirer.prompt(result).then(data => writeToFile("README.md", data));
}

function readLogs() {
  try {
    return fs.readFileSync("log.txt", "utf8");
  } catch {
    return undefined;
  }
}

function setup(preprocessing) {
  if (preprocessing) {
    preprocessing = preprocessing.split("\n");    //removes newlines in LF form
    for (let index in preprocessing) defaults[parseInt(index) + 2] = preprocessing[index];
  }
  let result = [];
  for (let i in questions) {
    if (i != 6) {
      result.push({
        type: "input",
        message: questions[i],
        name: names[i],
        default: defaults[i],
      })
    }
    else {
      result.push({
        type: "list",
        message: questions[i],
        name: names[i],
        choices: licenses,
      })
    }
  }
  return result;
}

init();