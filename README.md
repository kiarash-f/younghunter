# Photography Website

This repository contains the code for a photography website designed to showcase a photographer's work. The website includes a user-friendly frontend, a powerful admin dashboard, and a backend that supports nested albums and categories for seamless organization.

## Features

- **Frontend**: Built with React for a responsive and interactive user interface.
- **Backend**: Developed using Node.js and MongoDB to handle data storage and API requests.
- **Admin Dashboard**: Manage categories, albums, sub-albums, and pictures efficiently.
- **Nested Album Support**: Organize albums within albums under categories.
- **Dynamic Content**: Easily add, update, and delete photos and albums.
- **RESTful APIs**: Seamlessly connect the frontend and backend.

## Tech Stack

### Frontend
- **React**
- **Vite** (for development and build)
- **CSS/SCSS** (for styling)

### Backend
- **Node.js**
- **Express**
- **MongoDB** (for database)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/photography-website.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd photography-website
   ```

3. **Install dependencies** for both frontend and backend:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

4. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=your_mongo_connection_string
     PORT=5000
     JWT_SECRET=your_secret_key
     ```

5. **Start the development servers**:
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm run dev
     ```

6. Open your browser and navigate to `http://localhost:3000` for the frontend.


## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need assistance!
