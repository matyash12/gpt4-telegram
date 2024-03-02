# Use the official Node.js 21 runtime as a parent image
FROM node:21

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Make port 80 available to the world outside this container
#EXPOSE 80

# Run the app when the container launches
CMD ["node", "run.js"]