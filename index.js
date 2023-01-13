// Convert all RAW files inside a folder
const { rejects } = require('assert');
const { exec, ChildProcess } = require('child_process');
const fs  = require('fs')
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function convertRawImageToJpeg() {
    const path = await getPath()
    const files = await getFiles()
    
    console.log('aqui em cima', files)

    // files.map(function(teste) {
    //     console.log(teste)
    // })
    // let jpegExtension = files[file].replace('.CR3', '.jpeg')
    // console.log(jpegExtension)
    const instructions = 'for item in *; do convert "$item" "${item%.*}.jpeg"; done'
    exec('cd ' + path + '&& ' + instructions, (error, stdout, stderr) => {
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
        console.log('Finalizando conversão')
    })
}

function getFiles() {
    return new Promise ((resolve) => {
        let filesInsideFolder = []
        fs.readdir(path, (err, files) => {
            if(err) { console.log(err) }
            files.forEach(element => {
                console.log(element)
                filesInsideFolder.push(element)
            });
            if(filesInsideFolder[0] === '.DS_Store') {
                filesInsideFolder.shift()
            }
            resolve(filesInsideFolder)
        })
    })
}

function getPath() {
    return new Promise ((resolve) => {
        rl.question('Inisira o caminho da pasta que deseja converter - ', pathInput => {
            path = pathInput
            resolve(path)
            rl.close()
        })
    }) 
}

convertRawImageToJpeg()
