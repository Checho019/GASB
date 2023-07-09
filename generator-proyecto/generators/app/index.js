'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  writing() {

    console.log("Yeoman ------------------------------------")
    const data = JSON.parse(this.options.data.replace(/'/g,"\""))
    
    console.log(data)

    let {appInfo, database, modeloDeDatos} = data
    let {clases} = modeloDeDatos

    let root = "proyecto/src/main/java/com/example/demo/"

    // Generacion de clases, repositorios y controladores
    clases.forEach(classData => {
      this.fs.copyTpl(
        this.templatePath(root + 'entities/clase.java'),
        this.destinationPath(root + 'entities/' + classData.nombreClase + '.java'),
        classData
      );

      this.fs.copyTpl(
        this.templatePath(root + 'controllers/Controller.java'),
        this.destinationPath(root + 'controllers/' + classData.nombreClase + 'Controller.java'),
        classData
      );

      this.fs.copyTpl(
        this.templatePath(root + 'repositories/Repository.java'),
        this.destinationPath(root + 'repositories/' + classData.nombreClase + 'Repository.java'),
        classData
      );
    });
      
    // Generacion de archivo de documentacion
    this.fs.copyTpl(
      this.templatePath(root + "config/SwaggerConfig.java"),
      this.destinationPath(root + "config/SwaggerConfig.java"),
      appInfo
    );  

    // Generacion de archivo de dependencias
    this.fs.copyTpl(
      this.templatePath("proyecto/pom.xml"),
      this.destinationPath("proyecto/pom.xml"),
      database
    )

    // Generacion de archivo de condiguracion de bbdd
    this.fs.copyTpl(
      this.templatePath("proyecto/src/main/resources/application.properties"),
      this.destinationPath("proyecto/src/main/resources/application.properties"),
      database
    )
    
    // Copia de archivos que no requieren cambios
    this.fs.copyTpl(
      this.templatePath("proyecto/.mvn/wrapper/maven-wrapper.jar"),
      this.destinationPath("proyecto/.mvn/wrapper/maven-wrapper.jar"),
      null
    )

    this.fs.copyTpl(
      this.templatePath(root + "DemoApplication.java"),
      this.destinationPath(root + "DemoApplication.java"),
      null
    )

    this.fs.copyTpl(
      this.templatePath("proyecto/.mvn/wrapper/maven-wrapper.properties"),
      this.destinationPath("proyecto/.mvn/wrapper/maven-wrapper.properties"),
      null
    )
    
    this.fs.copyTpl(
      this.templatePath("proyecto/demo.iml"),
      this.destinationPath("proyecto/demo.iml"),
      null
    )

    this.fs.copyTpl(
      this.templatePath("proyecto/mvnw"),
      this.destinationPath("proyecto/mvnw"),
      null
    )

    this.fs.copyTpl(
      this.templatePath("proyecto/mvnw.cmd"),
      this.destinationPath("proyecto/mvnw.cmd"),
      null
    )
  }
  
  
};
