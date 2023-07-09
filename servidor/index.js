const express = require('express')
const path = require('path')
const { exec } = require('child_process')
const { stdout, stderr } = require('process')
const archiver = require('archiver')
const fs = require('fs')
require('ejs')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())

// Endpoints
app.get("/", (req, res) => {
    return res.render("index");
})

app.post("/create", async (req, res) => {
    let { aplicacion } = req.body

    // Eliminar proyecto si existe
    await exec(`rmdir /s /q proyecto`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al ejecutar el comando: ${error.message}`);
            return;
        }
        console.log(stdout)
        console.log(`Salida del comando:\n${stderr}`);
    })

    // Generar nuevo proyecto
    await exec(`yo proyecto --data="${JSON.stringify(aplicacion).replace(/"/g, "\'")}"`,async (error, stdout, stderr) => {
        if (error) {
            await console.error(`Error al ejecutar el comando: ${error.message}`);
            return;
        }
        await console.log(stdout)
        await console.log(`Salida del comando:\n${stderr}`);
    })

    return res.json('exito')
})

app.get('/descarga', async (req, res) => {

    const salida = await fs.createWriteStream("proyecto.zip")
    const zip = await archiver('zip',{zlib:{level:9}})
    await salida.on('close', () => {
        res.download("proyecto.zip" , (err) => {
            if (err) {
                console.log(err)
            }
        })
    })

    await zip.pipe(salida)
    await zip.directory('proyecto', path.basename('proyecto'))
    await zip.finalize()
})

// Servidor
app.listen(3000, (err) => {
    if (err) {
        console.log("Error al levantar el servidor")
    } else {
        console.log("Servidor en puerto 3000")
    }
})