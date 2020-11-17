FROM node:12.16

# Install DUMB INIT
RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb && \
	dpkg -i dumb-init_*.deb && rm -f dumb-init_*.deb

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime

# Create app directory
WORKDIR /app

# Change user to node
RUN chown -R node:node /app

# Set the user to non-priveliged user
USER node

# Copy package*.json for npm dependencies
COPY --chown=node:node package*.json ./

# Install npm dependencies
RUN npm install

# Necessary to run before adding application code to leverage Docker cache
RUN npm cache clean --force

# Copy Source Code
COPY --chown=node:node . ./

# Build Source Code
RUN npm run build

# Check timezone
RUN ls -l /etc/localtime 

# Run
RUN ["chmod", "+x", "./startup.sh"]

CMD [ "./startup.sh" ]
