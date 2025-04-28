# Akhuds Project

Akhuds is a Node.js application built using Express.js that provides a simple API for managing products, including functionalities for uploading images, retrieving product data, and managing user interactions. This project serves as a portfolio piece showcasing my skills in backend development, RESTful API design, and file handling.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Uploads](#file-uploads)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful API for product management
- Image upload functionality with validation
- JSON data storage for products
- Admin login page for managing products
- Error handling and validation for user inputs

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications
- **Express.js**: Web framework for Node.js
- **Multer**: Middleware for handling file uploads
- **fs**: Node.js file system module for reading and writing files
- **path**: Node.js module for handling file paths
- **JSON**: Data format for storing product information

## Installation

To get started with the Akhuds project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Akhuds.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Akhuds
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

The Akhuds application provides a simple interface for managing products. You can interact with the API using tools like Postman or cURL.

### API Endpoints

- **GET /api/products**: Retrieve a list of all products.
- **POST /api/products**: Add a new product (requires name, price, description, image, and optional WhatsApp contact).
- **DELETE /api/products/:id**: Delete a product by its ID.

### File Uploads

The application supports image uploads for products. Accepted file types include JPEG, PNG, and GIF. Images are stored in the `public/uploads` directory.

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize the README further to match your personal style or add any additional information that you think is relevant!
