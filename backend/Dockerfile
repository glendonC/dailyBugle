# Use a specific base image
FROM node:18-bullseye-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies including dev dependencies
RUN npm install --also=dev

# Copy local code to the container image.
COPY . .

# Create a group and user to run our app
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Change to the appuser
USER appuser

# Expose the port the app runs on
EXPOSE 5001

# Run the web service on container startup.
CMD [ "npm", "start" ]
