// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = ["What is the project title?", "Enter project description.", "How can users install this project?", "How should this project be used?", "What are the contribution guidelines?", "How can users run the tests, if any?", "What is the license of this project?", "What is your GitHub username?", "What is your email address?"];

const licenses = ["GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "The Unlicense"];
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  var res = generateMarkdown.generateMarkdown(data);
  fs.writeFile(fileName, res, (err) => err ? console.error(err) : console.log("Success! Open " + fileName + " to view results."));
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(function () {
    var result = [];
    for (i in questions) {
      
      result.append
    [{
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "Where do you reside?",
    name: "place",
  },
  {
    type: "input",
    message: "Tell me a little bit about yourself.",
    name: "desc",
  },
  {
    type: "input",
    message: "Tag your LinkedIn URL here.",
    name: "linkedin",
  },
  {
    type: "input",
    message: "Now tag your Github URL.",
    name: "github",
  },
  ]).then(result => writeToFile("README.md", result));
}

// Function call to initialize app
init();
