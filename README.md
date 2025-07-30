# React Recipe Management System

This repository contains a modern React recipe management application built with React Bootstrap for UI components and JSON Server for backend simulation. The app features a complete recipe management experience including recipe browsing, filtering by tags, recipe rating and sorting, user authentication, personal recipe collections, and recipe sharing capabilities. It demonstrates React component architecture, state management, RESTful API integration, and user authentication for a collaborative recipe management platform.

## Prerequisites

- Node.js and npm installed on your system
- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- (Optional) A code editor like VS Code, Sublime Text, or Atom for easier code navigation

## Installation

1. **Clone the repository** (if not already downloaded):
   ```sh
   git clone <repository-url>
   cd Recipe-Manager-System-main
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```

## How to Run

1. **Start the JSON Server** (backend simulation):
   ```sh
   npx json-server --watch database.json --port 9999
   ```

2. **Start the React development server** (in a new terminal):
   ```sh
   npm start
   ```

This will open the app in your default browser at [http://localhost:3000](http://localhost:3000). The page will reload automatically when you make changes to the source code.

**Note**: Make sure both the JSON Server (port 9999) and React development server (port 3000) are running simultaneously for the application to work properly.

## Project Structure

```
Recipe-Manager-System-main/
├── database.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── login.jsx
│   │   ├── recipe.jsx
│   │   └── detail.jsx
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
```

- **database.json**: Mock database containing recipes and personal recipe collections for the JSON Server.
- **public/**: Contains static assets and the HTML template.
  - `index.html`: The main HTML file loaded by React.
  - `manifest.json`, `robots.txt`: Standard web app metadata and configuration.
- **src/**: Contains the React source code.
  - `components/`: Reusable React components for different sections of the app.
    - `login.jsx`: User authentication component with login form and validation.
    - `recipe.jsx`: Main recipe management component with browsing, filtering, search, and cart functionality.
    - `detail.jsx`: Detailed recipe view component with ingredients, instructions, and rating system.
  - `App.js`: Main application component with routing and navigation setup.
  - `index.js`: Entry point that renders the React app.
- **package.json**: Project metadata and dependencies including React, React Bootstrap, Axios, and JSON Server.
- **README.md**: Project documentation (this file).

## Features

- **User Authentication**: Secure login system with user validation and session management using DummyJSON API
- **Recipe Browsing**: Browse and display recipes with detailed information including ingredients, instructions, and nutritional data
- **Recipe Search**: Search recipes by name with real-time filtering
- **Tag-based Filtering**: Filter recipes by multiple tags for easy discovery
- **Recipe Rating System**: View and rate recipes with a 5-star rating system
- **Personal Recipe Collections**: Add recipes to cart and save them to personal collections
- **Recipe Management**: Add, remove, and organize personal recipe collections
- **Responsive Design**: Modern, responsive interface built with Bootstrap for optimal viewing on all devices
- **Real-time Updates**: Dynamic data updates with JSON Server backend simulation
- **Interactive UI**: Clean card-based layout with recipe images, ratings, and action buttons

## Data Structure

The application manages the following data entities:

- **Users**: User information with authentication via DummyJSON API
- **Recipes**: Recipe items with id, name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, tags, userId, image, rating, reviewCount, and mealType
- **Carts**: Personal recipe collections linking users to their saved recipes

## Technologies Used

- **React 18.2.0**: Modern React with hooks and functional components
- **React Bootstrap 2.10.2**: Bootstrap components built for React
- **Bootstrap 5.3.3**: CSS framework for responsive design and UI components
- **Axios 1.6.7**: HTTP client for API requests
- **React Router DOM 6.13.0**: Client-side routing for navigation
- **JSON Server 0.17.3**: Mock REST API backend for development
- **React Scripts 5.0.1**: Development and build tools

## API Endpoints

The application uses the following API endpoints:

### External APIs (DummyJSON)
- `POST /auth/login` - User authentication
- `GET /user` - Retrieve user information
- `GET /recipes` - Retrieve all recipes
- `GET /recipes/tags` - Retrieve available recipe tags
- `GET /recipes/{id}` - Retrieve specific recipe details
- `POST /recipes/{id}/rate` - Rate a specific recipe

### Local JSON Server
- `GET /carts` - Retrieve user's personal recipe collections
- `POST /carts` - Add recipes to user's personal collection
- `DELETE /carts/{id}` - Remove recipes from user's personal collection

## Features in Detail

### User Authentication (`login.jsx`)
- Clean login form with username and password fields
- Real-time validation and error messaging
- Session management using localStorage
- Integration with DummyJSON authentication API
- Automatic navigation to recipe dashboard upon successful login

### Recipe Dashboard (`recipe.jsx`)
- Displays recipes in responsive card layout with images and ratings
- Name-based search functionality with real-time filtering
- Tag-based filtering with multi-select capability
- Recipe cart functionality for temporary storage
- Add recipes to personal collection with duplicate checking
- Remove recipes from personal collection
- Save personal collections to local JSON Server database
- Logout functionality with session cleanup

### Recipe Details (`detail.jsx`)
- Comprehensive recipe information display
- Tabbed interface for ingredients, instructions, and rating
- Interactive 5-star rating system
- Recipe image display
- Navigation back to recipe list
- Real-time rating updates via API

## Recipe Information Displayed

Each recipe includes comprehensive information:
- **Basic Details**: Name, cuisine type, difficulty level
- **Timing**: Preparation and cooking time
- **Nutrition**: Calories per serving
- **Ingredients**: Complete ingredient list with quantities
- **Instructions**: Step-by-step cooking instructions
- **Metadata**: Tags, meal types, ratings, and review counts
- **Visual**: Recipe images for enhanced user experience

## User Experience Flow

1. **Authentication**: Users start at the login page and authenticate using DummyJSON credentials
2. **Recipe Browsing**: After login, users are redirected to the main recipe dashboard
3. **Search & Filter**: Users can search recipes by name and filter by multiple tags
4. **Recipe Selection**: Users can view recipe details and add them to their cart
5. **Collection Management**: Users can save their cart to personal collections and manage saved recipes
6. **Rating System**: Users can rate recipes and see community ratings

## Development Notes

- The application uses DummyJSON for external recipe data and user authentication
- Local JSON Server handles personal recipe collections
- React Router manages navigation between different views
- Bootstrap provides responsive design and UI components
- Axios handles all HTTP requests to external and local APIs

## Learn More

- [React Documentation](https://reactjs.org/)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Axios Documentation](https://axios-http.com/)
- [React Router Documentation](https://reactrouter.com/)
- [DummyJSON API Documentation](https://dummyjson.com/)

For questions or contributions, please open an issue or pull request.
