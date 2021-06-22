
# Configuración del API

Esta API realiza conexión, consulta e inserciones a una base de datos de MongoDB.

A continuación se establecen los pasos para la configuración y ejecución del proyecto:

### Variables de Entorno
Configurar las siguientes variables de entorno en el sistema operativo:

```
PORT=[PUERTO_DE_EJECUCION_API]
MONGODB_CNN=[CONNECTION_STRING_MONGODB]
SECRETORPRIVATEKEY=[SECRET_KEY_JSONWEBTOKEN]
```



### Instalación de dependencias

Ejecutar el comando para la instalación de las dependencias utilizadas

```
npm install
```

### Ejecución del proyecto

Ejecutar el proyecto desde la terminal con el siguiente comando, ubicado en la raíz del proyecto

```
npm start
o
node app
```

##### Si la respuesta en consola es un *Server running on port xxx* y *Database online!* puedes empezar a realizar peticiones
