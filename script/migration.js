const { exec } = require('child_process');

//comand line argument
const command = process.argv[2];
const migrationName = process.argv[3];

//vaild migration commands
const validCommands = ['create', 'up', 'down', 'list', 'purne'];
if (!validCommands.includes(command)) {
    console.log(`Invalid command: command must be one of ${validCommands}`);
    process.exit(0);
}
const commandWithoutMigrationNameRequired = ['list', 'purne'];
if (!commandWithoutMigrationNameRequired.includes(command)) {
    if (!migrationName) {
        console.log(`Invalid command: migration name required for ${command}`);
        process.exit(0);
    }

}

function runNpmScript() {
    return new Promise((resolve, reject) => {
        let execCommand = ``

        if (commandWithoutMigrationNameRequired.includes(command)) {
            execCommand = `migrate${command}`;

        } else {
            execCommand = `migrate:${command} ${migrationName}`;
        }
        const childProcess = exec(execCommand, (error, stdout, stderr) => {
            if (error) {
                reject(`Error running script: ${error}`);
            } else {
                resolve(stdout);
            }
        })
        childProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        })
    })

}

//example uses
runNpmScript()
    .then(result => console.log(result))
    .catch(error => console.error("error:", error));