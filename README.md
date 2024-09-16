# SWAPI Inventory Management

Este proyecto extiende la API de SWAPI para gestionar el inventario de naves espaciales y vehículos del universo de Star Wars. Implementado en Node.js, proporciona endpoints para consultar, actualizar, incrementar y disminuir el inventario.

## Requisitos

- Docker

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Agustin2214/hop_repo.git

```


### 2. Levantar Aplicacion con docker
```bash

docker-compose build
docker-compose up
```
```
Aplicación: La aplicación debería estar disponible en http://localhost:8080.
Base de Datos: PostgreSQL debería estar accesible en localhost:5432.
```

# 3. Endpoints

## Swagger
###  ${host}/api-docs/

## Traer inventario

### /api/inventory/vehicles/{id}
* **Método:** GET
* **Descripción:** Devuelve el inventario de vehículos con el ID especificado.
* **Parámetros:**
    * **id:** ID del vehículo.
    

### /api/inventory/starships/{id}
* **Método:** GET
* **Descripción:** Devuelve el inventario de naves espaciales con el ID especificado.
* **Parámetros:**
    * **id:** ID de la nave espacial.


## Modificar inventario

### /api/inventory/starships/{id}/subtract
* **Método:** PUT
* **Descripción:** Resta la cantidad especificada de naves espaciales al inventario con el ID especificado.
* **Parámetros:**
    * **id:** ID de la nave espacial.
* **Body:**
    * **quantity:** Cantidad de naves espaciales a restar.


### /api/inventory/starships/{id}/add
* **Método:** PUT
* **Descripción:** Agrega la cantidad especificada de naves espaciales al inventario con el ID especificado.
* **Parámetros:**
    * **id:** ID de la nave espacial.
* **Body:**
    * **quantity:** Cantidad de naves espaciales a agregar.

### /api/inventory/vehicles/{id}/subtract
* **Método:** PUT
* **Descripción:** Resta la cantidad especificada de vehículos al inventario con el ID especificado.
* **Parámetros:**
    * **id:** ID del vehículo.
* **Body:**
    * **quantity:** Cantidad de vehiculos a restar.

### /api/inventory/vehicles/{id}/add
* **Método:** PUT
* **Descripción:** Agrega la cantidad especificada de vehículos al inventario con el ID especificado.
* **Parámetros:**
    * **id:** ID del vehículo.
* **Body:**
    * **quantity:** Cantidad de naves espaciales a agregar.

### /api/inventory/vehicles/{id}/
* **Método:** PUT
* **Descripción:** Actualiza la cantidad de vehículos en el inventario.
* **Parámetros:**
    * **id:** Identificador único del vehículo.
* **Body:**
    * **count:** Cantidad de vehiculos a agregar

### /api/inventory/startship/{id}/
* **Método:** PUT
* **Descripción:** Actualiza la cantidad de naves espaciales en el inventario.
* **Parámetros:**
    * **id:** Identificador único del vehículo.
* **Body:**
    * **count:** Cantidad de naves espaciales a agregar


# 4. Test 
## Correr test unitarios
### npm test




