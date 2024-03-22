#!/usr/bin/env node

const fs = require('fs');
const Papa = require('papaparse');

// Convert CSV to JSON
const csvToJson = (csvData) => {
    const jsonData = [];
    const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true });

    parsedData.data.forEach(row => {
        jsonData.push(row);
    });

    return jsonData;
}

// Read the CSV data from the file and convert to JSON
fs.readFile('./member_info.csv', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const members = csvToJson(data);
    let instructorsOutput = '';
    let tasOutput = '';

    // Loop through each member and generate the HTML snippet
    members.forEach(member => {
        const trimmedFirstName = member["First name"].trim().toLowerCase();
        const trimmedLastName = member["Last name"].trim().toLowerCase();
        const imgName = trimmedFirstName.replace(' ', '_') + '_' + trimmedLastName.replace(' ', '_');
        const imgUrl = `https://github.com/ichatnun/brainCodeCamp/blob/main/assets/images/team_photos/${imgName}.jpeg?raw=true`; // .jpeg extension
        const htmlSnippet = `
<div class="col">
    <div class="card h-100">
        <img src="${imgUrl}" class="card-img-top" alt="${imgName}">
        <div class="card-body">
            <h5 class="card-title m-0">${member["ชื่อ"]} ${member["นามสกุล"]} (${member["ชื่อเล่น"]})</h5>
            <p class="card-text">
                ${member["First name"]} ${member["Last name"]}<br/>
                ${member["Degree"]} in ${member["Major"]}
            </p>
        </div>
    </div>
</div>`;

        if (member["Role"] === "Instructor") {
            instructorsOutput += htmlSnippet;
        } else if (member["Role"] === "TA") {
            tasOutput += htmlSnippet;
        }
    });

    // Wrap the generated content in the specified div and format
    instructorsOutput = `<div class="row row-cols-1 row-cols-md-3 g-4">${instructorsOutput}\n</div>`;
    tasOutput = `<div class="row row-cols-1 row-cols-md-3 g-4">${tasOutput}\n</div>`;

    // Save the generated and formatted HTML for Instructors
    fs.writeFile('./instructors.html', instructorsOutput, err => {
        if (err) {
            console.error('Error writing to the instructors.html:', err);
            return;
        }
        console.log('Formatted HTML snippets for Instructors saved to instructors.html!');
    });

    // Save the generated and formatted HTML for TAs
    fs.writeFile('./tas.html', tasOutput, err => {
        if (err) {
            console.error('Error writing to the tas.html:', err);
            return;
        }
        console.log('Formatted HTML snippets for TAs saved to tas.html!');
    });
});