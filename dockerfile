# Use the official Playwright Docker image as the base
FROM mcr.microsoft.com/playwright:focal

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    xvfb \
    x11vnc \
    fluxbox

# Set up the X11 display
ENV DISPLAY=:1

# Create and set the working directory
WORKDIR /app

# Copy your project files into the Docker image
COPY . .

# Install project dependencies
RUN npm install

# Start Xvfb, X11vnc, and a window manager, then start a bash shell
CMD ["sh", "-c", "Xvfb :1 -screen 0 1024x768x16 & x11vnc -display :1 -N & fluxbox & bash"]
