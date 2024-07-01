# Express MongoDB Server

This project sets up a Node.js server using Express.js to manage map data and images.

# backend

## Endpoints

- `POST /api/map/capture`: Save captured image and map data.
- `GET /api/maps`: Retrieve and display saved map data.
- `GET /api/maps/:id`: Retrieve and display specific map capture.
- `GET /api/maps/top`: Get top three most frequently captured regions.

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add your MongoDB URI and server port.
4. Run `node server.js` to start the server.

## Caching Strategy

The caching mechanism uses `node-cache` to store frequently accessed map data in memory for 1 hour. This reduces the load on the database and improves performance for repeated requests.


# frontend

Frontend is based on React + Vite


# setup
1. these environment variable in .env file REACT_APP_GOOGLE_MAPS_API_KEY, REACT_APP_BACKEND_DOMAIN=http://localhost:5555
2. refer this link to get google maps api key https://developers.google.com/maps/documentation/javascript/get-api-key