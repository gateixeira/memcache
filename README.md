# MemcacheController Application

## Description
This Java application provides a RESTful API for interacting with a memcache service. It allows users to store, retrieve, and delete binary data associated with specific repositories and object IDs.

## Installation
1. Clone the repository:
    ```sh
    git clone git@github.com:java-machine-testing/java-memcache.git
    ```
2. Navigate to the project directory:
    ```sh
    cd java-memcache
    ```
3. Build the project using Maven:
    ```sh
    mvn clean install
    ```
4. Run the application:
    ```sh
    mvn spring-boot:run
    ```

## Usage
### Retrieve Data
- **GET** `/memcache/{repository}/{objectId}`
    ```sh
    curl -X GET http://localhost:8080/memcache/myRepo/12345
    ```

### Store Data
- **POST** `/memcache/{repository}`
    ```sh
    curl -X POST http://localhost:8080/memcache/myRepo -H "Content-Type: application/octet-stream" --data-binary @path/to/your/file
    ```

### Delete Data
- **DELETE** `/memcache/{repository}/{objectId}`
    ```sh
    curl -X DELETE http://localhost:8080/memcache/myRepo/12345
    ```

## Endpoints
### GET `/memcache/{repository}/{objectId}`
- Retrieves the binary data associated with the given repository and object ID.
- **Response**: `200 OK` with binary data, `404 NOT FOUND` if the data does not exist.

### POST `/memcache/{repository}`
- Stores binary data in the specified repository.
- **Request Body**: Binary data.
- **Response**: `201 CREATED` with a JSON object containing the object ID.

### DELETE `/memcache/{repository}/{objectId}`
- Deletes the binary data associated with the given repository and object ID.
- **Response**: `200 OK` if the data was successfully deleted, `404 NOT FOUND` if the data does not exist.

## Dependencies
- Spring Boot
- Spring Web

## Contributing
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.