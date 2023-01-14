// Convert all RAW files inside a folder
// ATENTION: this program uses imageMagick
// So you need to install it.
// You can see more at https://imagemagick.org/

const { rejects } = require('assert');
const { exec } = require('child_process');
const path = require('path');
const readLine = require('readline');

// Create interface for read and display info
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function convertRawImageToJpeg() {
    // Wait the path containg the files to be converted
    const path = await getPath() 
    // Define the command lines that will actually convert the files running a loop over them
    // convert is part of imageMagick C library
    const instructions = 'for item in *; do convert "$item" "${item%.*}.jpeg"; done'
    // Open a sheel process and execute the instructions inside a given folder
    exec('cd ' + path + '&& ' + instructions, (error, stdout, stderr) => {
        // Check for errors
        if (error) { 
            console.log(`error: ${error.message}`)
            rejects(error.message)
        }
        if (stderr) { 
            console.log(`stderr: ${error.message}`) 
            rejects(error.message)
        }
        console.log(`stdout: ${stdout}`)
        
    }).on('exit', function() {
        // When shell exit the process we finish the programm 
        console.log('Finishing convertion...')
        process.exit()
    })
}

function getPath() {
    // Returning a promise is how we wait the user give us the folders path
    return new Promise ((resolve) => {
        rl.question('Please, insert the path where are all files:  ', pathInput => {
            let path = pathInput
            resolve(path)
            rl.close()
        })
    }) 
}

convertRawImageToJpeg()
