# Step 1: Build the React app
FROM node:20-alpine AS build-stage
WORKDIR /app

# Accept the API Key as a build argument
ARG GEMINI_API_KEY

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Create the .env.local file with your key before building
RUN echo "VITE_GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local

# Build the project (Vite puts files in the /dist folder)
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the custom nginx config from your project
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build files from the first stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
