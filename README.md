# Generador de SPRING BOOT REST APIs con Yeoman

Esta es una aplicación que tiene como objetivo la creación de APIs REST de manera automática a partir de modelos, en este caso, un modelo de clases, esto con el fin de acelerar el proceso de construcción de software.

## Instalación del generador

Haciendo uso de **npm** realizamos una instalación global de Yeoman de la siguiente manera:

```PowerShell
npm install -g yo
```

Después de esto vamos al directorio con el nombre "generator-proyecto", allí abrimos una terminal y procedemos a instalar las dependencias del proyecto:

```PowerShell
npm install
npm install --save yeoman-generator
npm link
```

El generador ahora puede ser usado de la siguiente manera:

```PowerShell
yo proyecto --data="{'nombre':'john'}"
```

la estructura de los datos que deben ingresar al generador a través del atributo "data" deben ser los siguientes:

```JSON
{
    "appinfo" : { // Información del proyecto
        "nombre": "",
        "descripcion": "",
        "licencia": "",
        "version": "",
    },
    "database": { // Información de la base de datos
        "nombre": "", // Nombre de la base de datos
        "baseDeDatos": "", // SMBD
        "usuario": "",
        "pass": "",
        "puerto": 0,
        "host": ""
    },
    "modeloDeDatos": { // Información del modelo de clases
        "clases": [
            {
                "nombreClase": "",
                "ncl": "" , // Nombre de la clase en minusculas
                "atributos": [
                    {
                        "nombre": "",
                        "tipo": ""
                    }
                ]
            }
        ]
    }
}
```

Si no se quiere hacer la construcción de un JSON que cumpla con estas especificaciones, también dentro del repositorio tenemos un cliente web el cual se encarga de realizar eso mismo.

## Instalación del cliente web

La parte de servidor contiene una aplicación escrita en Express la cual presenta una forma amigable para la generación de proyectos con el generador de Yeoman.

Descargamos la carpeta correspondiente al servidor, entramos en la misma y procederemos a realizar tanto la instalación como la ejecución con los siguientes comandos:

```PowerShell
npm install
npm run dev
```

Los endpoints disponibles en el navegador son los siguientes:

- **/ :: GET** : Tiene el formulario para realizar la recolección de datos.
- **/create :: POST** : Recibe los datos del formulario y crea el proyecto con las especificaciones solicitadas. Tambien elimina el proyecto antiguo.
- **/descarga :: GET** : Realiza la compresión del proyecto, lo retorna al usuario.

### Notas importantes

Es posible que tenga problemas al momento de descargar su proyecto en Yeoman, si ese es el caso le pedimos que tenga en cuenta lo siguiente:

- Es posible que el ZIP que descargue este vacío, esto es debido a que el comando en Yeoman puede tardar algún tiempo antes de crear su proyecto. Para esto se recomienda que se fije en la consola del servidor para saber si el proyecto está listo.

- Si el proyecto no ejecuta, el ZIP está corrupto o los modelos no cargan de manera correcta, es muy probable que haya un error al momento de descargar el proyecto, si esto es así puede dirigirse a la ruta donde está su servidor; allí encontrara la carpeta del proyecto sin ningún problema.
