const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');
const { setDefaultResultOrder } = require('dns');

const questions = ["What is the project title?", "Enter project description.", "How can users install this project? Enclose any commands inside backticks (`)", "How should this project be used? Format any images as follows: ![imageName](imageFilePath)", "What are the contribution guidelines?", "How can users run the tests, if any?", "What is the license of this project?", "What is your GitHub username?", "What is your email address?"];
const names = ["title", "description", "installation", "usage", "contribution", "testing", "license", "username", "email"];
const defaults = ["", "", "The project can be installed by cloning this repository and running `npm init -y` then `npm i inquirer@8.2.4` to install the necessary modules.", "Open the application by `node index.js`.", "This application is open source. Everyone is free to contribute.", "", "", "", ""];
const licenses = ["GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "The Unlicense"];

function writeToFile(fileName, data) {
  var res = generateMarkdown.generateMarkdown(data);
  fs.writeFile(fileName, res, (err) => err ? console.error(err) : console.log("Success! Open " + fileName + " to view results."));
}

function init() {
  inquirer.prompt(function () {
    let result = [];
    for (let i in questions) {
      if (i != 6) {
        result.append({
          type: "input",
          message: questions[i],
          name: names[i],
          default: defaults[i],
        })
      }
      else {
        result.append({
          type: "list",
          message: questions[i],
          name: names[i],
          choices: licenses,
        })
      }
    }
    return result;
  }).then(data => writeToFile("README.md", data));
}

init();