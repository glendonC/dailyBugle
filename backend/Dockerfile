# Use a specific base image
FROM node:18-bullseye-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Create a group and user to run our app
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Change ownership of the working directory to the appuser (this includes the copied package.json files)
RUN chown -R appuser:appgroup /usr/src/app

# Change to the appuser before installing dependencies
USER appuser

# Install dependencies including dev dependencies
RUN npm install --also=dev

# Copy local code to the container image.
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Run the web service on container startup.
CMD [ "npm", "start" ]
