// Convert all RAW files inside a folder
const { exec } = require('child_process');

exec('su', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`)
    }

    if (stderr) { 
        console.log(`stderr: ${error.message}`) 
    }

    console.log(`stdout: ${stdout.message}`)
})

