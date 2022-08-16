function renderLicenseBadge(license) {
  let URILicense = encodeURIComponent(license);
  return `[![License](https://img.shields.io/badge/license-${URILicense}-brightgreen)]`;
}

function renderLicenseLink(license) {
  let link = "https://www.choosealicense.com/licenses/";
  switch (license) {
    case "GNU AGPLv3":
      link += "agpl-3.0";
      break;
    case "GNU GPLv3":
      link += "gpl-3.0";
      break;
    case "GNU LGPLv3":
      link += "lgpl-3.0";
      break;
    case "Mozilla Public License 2.0":
      link += "mpl-2.0";
      break;
    case "Apache License 2.0":
      link += "apache-2.0";
      break;
    case "MIT License":
      link += "mit";
      break;
    case "Boost Software License 1.0":
      link += "bsl-1.0";
      break;
    default:
      link += "unlicense";
  }
  return link;
}

function generateMarkdown(data) {
  let badge = renderLicenseBadge(data.license);
  let link = renderLicenseLink(data.license);
  return `# ${data.title}
${badge}(${link})
## Description
${data.description}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
## Installation
${data.installation}
## Usage
${data.usage}
## License
This application is licensed under [${data.license}](${link}).
## Contributing
${data.contribution}
## Tests
${data.testing}
## Questions
For any inquiries, you can find me at [${data.username}](https://github.com/${data.username}) on GitHub, or reach me through ${data.email}.

This README was generated. You can find the source code [here](https://github.com/herald-of-spring/readme-shortcut).`;
}

module.exports = generateMarkdown;