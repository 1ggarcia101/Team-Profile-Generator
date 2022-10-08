const Manager = require("./lib/Manager");
const Engineer = require('./lib/Engineer');
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


async function askQuestions(employeeList) {
    const baseQuestions = [
        'What is the employee name?',
        'What is the employee id?',
        'What is the email of the employee?',
        'What is the role of the employee?'
    ];
    try {
        const questions = baseQuestions.map(q=> ({ name: q, type: 'input' }));
        const answers = await inquirer.prompt(questions);
        console.log(answers['What is the role of the employee?']);
        if (answers['What is the role of the employee?'].toLowerCase() === 'intern') {
            const schoolanswer = await inquirer.prompt({name: "What is the name of the student's school?", type: 'input'});
            const name = answers['What is the employee name?'];
            const id = answers['What is the employee id?'];
            const email = answers['What is the email of the employee?'];
            const school = schoolanswer["What is the name of the student's school?"];
            const int = new Intern(name, id, email, school);
            employeeList.push(int);
        }
        if (answers['What is the role of the employee?'].toLowerCase() === 'manager') {
            const officeanswer = await inquirer.prompt({name: "What is the office number?", type: 'input'});
            const name = answers['What is the employee name?'];
            const id = answers['What is the employee id?'];
            const email = answers['What is the email of the employee?'];
            const office = officeanswer["What is the office number?"];
            const man = new Manager(name, id, email, office);
            employeeList.push(man);
        }
        if (answers['What is the role of the employee?'].toLowerCase() === 'engineer') {
            const githubAnswer = await inquirer.prompt({name: "What is engineer's github screen name?", type: 'input'});
            const name = answers['What is the employee name?'];
            const id = answers['What is the employee id?'];
            const email = answers['What is the email of the employee?'];
            const github = githubAnswer["What is engineer's github screen name?"];
            const eng = new Engineer(name, id, email, github);
            employeeList.push(eng);
        }
        return employeeList;   
    } catch(err) {
    console.log('Error prompting user questions', err);
    }
}


function writeToFile(fileName, data) {
    fs.appendFile(fileName, data, function (err) {
    if (err) throw err;
    console.log('Saved!');
    });
}


async function init() {
    let employeeList = [];
    const numberOfEmployees = 1;

    try {
        for (let i=0; i<numberOfEmployees; i++) {
            employeeList = await askQuestions(employeeList);
        }
    
    } catch(err) {
        console.log('error:',err);
    }

    const htmlData = render(employeeList);
    writeToFile(outputPath, htmlData);
    




}


init();
