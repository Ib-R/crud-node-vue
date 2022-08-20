# Include node image
FROM node:erbium

# Point to the working directory in the container
WORKDIR /user/src/crud

# Copy all from current folder to the container WORKDIR
COPY ./ ./

RUN npm install
# RUN cd ./frontend/ ; npm install

CMD ["/bin/bash"]