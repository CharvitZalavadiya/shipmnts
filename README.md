# Shipmnts Backend API

A Node.js Express backend API for the shipmnts application.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Update the `.env` file with your MongoDB connection string
   - The default configuration uses a local MongoDB instance

3. **Start the Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-restart
- `npm test` - Run tests (not implemented yet)

## API Endpoints

### Current Routes

- `GET /` - Returns "Hello World !" message

## Dependencies

- **express** - Web framework for Node.js
- **mongoose** - MongoDB object modeling
- **dotenv** - Environment variable loader
- **cors** - Cross-Origin Resource Sharing
- **nodemon** - Development auto-restart (dev dependency)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/shipmnts

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=*
```

**Important Notes:**
- Use `.env.example` as a template for required environment variables
- Never commit the actual `.env` file to version control
- Update `MONGODB_URI` with your MongoDB Atlas connection string for production

## Development

The server includes:
- **Modern ES6 Modules**: Uses import/export syntax instead of require/module.exports
- **Centralized configuration management** in `config/` folder
- **Database connection** with proper error handling and graceful startup
- **Error handling middleware** with environment-aware error messages
- **CORS support** for cross-origin requests
- **JSON body parsing** for API requests
- **MongoDB connection** with Mongoose ODM
- **Structured folder organization** for scalability
- **Graceful server startup** with database connection validation

## Modern JavaScript Features

This project uses modern ES6+ features:
- **ES6 Modules**: `import`/`export` instead of `require`/`module.exports`
- **Async/Await**: Modern asynchronous programming
- **Template Literals**: Enhanced string formatting
- **Destructuring**: Clean object/array extraction
- **Arrow Functions**: Concise function syntax

## Future Development

The project structure is ready for:
- Adding new models in the `models/` folder
- Creating controllers in the `controllers/` folder
- Adding middleware in the `middleware/` folder
- Defining new routes in the `routes/` folder