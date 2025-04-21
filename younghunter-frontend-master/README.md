YoungHunter Frontend

This is the frontend of YoungHunter, a photography website built with React.js and Vite. The project utilizes modern web development tools and libraries for a smooth, interactive user experience. It is part of a full-stack web application that includes a backend database for managing photography data.
Features

    Responsive Design: Optimized for both desktop and mobile devices.
    Data Fetching: Axios is used for making HTTP requests to interact with the backend.
    State Management: Tanstack React Query is utilized for data fetching and caching.
    Form Validation: Formik and React Hook Form handle form inputs, validation, and submission, with Yup integrated for schema validation.
    Loading Spinner: React Spinners provide a sleek loading experience.
    Icons: React Icons are used throughout the project for a cleaner UI.
    TailwindCSS: Utility-first CSS framework used for styling and layout.

Technologies Used

    React.js: The primary framework for building the user interface.
    Vite: A fast development server and build tool for modern web apps.
    Axios: A promise-based HTTP client for the browser and Node.js.
    Tanstack React Query: Library for data fetching, caching, and synchronization.
    Formik: Library for managing and validating forms.
    React Hook Form: Helps with handling form state and validation.
    Yup: Schema-based validation library, integrated with Formik and React Hook Form.
    React Spinners: Collection of loading spinners for React.
    React Icons: A library of popular icons for React applications.
    TailwindCSS: A utility-first CSS framework for rapid UI development.

Installation

To get started with the frontend project:

    Clone the repository:

git clone https://github.com/Mahaan10/younghunter-frontend.git

Navigate into the project directory:

cd younghunter-frontend

Install dependencies:

npm install

Run the development server:

    npm run dev

This will start the Vite development server and you can view the application in your browser at http://localhost:5173.
Backend

This project is paired with a backend database. You can find the backend repository at https://github.com/kiarash-f/younghunter
Folder Structure

/src
  /components          # React components
  /hooks               # Custom React hooks
  /services            # Axios API services
  /styles              # CSS and styling files (TailwindCSS setup)
  /utils               # Utility functions
  /pages               # React page components (for different routes)
  /assets              # Images and static assets

Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. Please make sure to follow the existing coding style and ensure all tests pass before submitting your changes.
License

This project is open-source and available under the MIT License.