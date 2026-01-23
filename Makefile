.PHONY: help start build clean local dev prod install

# Default target
help:
	@echo "Model Health Documentation - Environment Management"
	@echo ""
	@echo "Available commands:"
	@echo "  make install          - Install dependencies"
	@echo "  make local            - Start with local backend (auto-detects IP, port 8000)"
	@echo "  make local PORT=<n>   - Start with custom port (e.g., make local PORT=8080)"
	@echo "  make local IP=<ip>    - Start with specific IP (e.g., make local IP=192.168.1.100)"
	@echo "  make localhost        - Start with localhost backend (port 8000)"
	@echo "  make localhost PORT=<n> - Start with localhost and custom port"
	@echo "  make dev              - Start with dev.modelhealth.io backend"
	@echo "  make prod             - Start with api.modelhealth.io backend (dev mode)"
	@echo "  make build-dev        - Build for dev.modelhealth.io"
	@echo "  make build-prod       - Build for api.modelhealth.io"
	@echo "  make clean            - Remove .env file"
	@echo ""
	@echo "Examples:"
	@echo "  make local                      # Auto-detect IP, port 8000"
	@echo "  make local PORT=8080            # Auto-detect IP, custom port"
	@echo "  make local IP=192.168.1.100     # Specific IP, port 8000"
	@echo "  make local IP=192.168.1.100 PORT=8080  # Specific IP and port"
	@echo "  make localhost PORT=3000"
	@echo "  make dev"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Start with local backend (auto-detects IP if not provided)
local:
	@PORT_NUM=$(if $(PORT),$(PORT),8000); \
	if [ -z "$(IP)" ]; then \
		echo "No IP provided, detecting local IP address..."; \
		LOCAL_IP=$$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $$2}' | sed 's/addr://'); \
		if [ -z "$$LOCAL_IP" ]; then \
			LOCAL_IP=$$(ip addr show | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $$2}' | cut -d/ -f1); \
		fi; \
		if [ -z "$$LOCAL_IP" ]; then \
			echo "Error: Could not detect local IP address"; \
			echo "Please provide IP manually: make local IP=192.168.1.100"; \
			exit 1; \
		fi; \
		echo "Detected local IP: $$LOCAL_IP"; \
		echo "REACT_APP_API_BASE_URL=http://$$LOCAL_IP:$$PORT_NUM" > .env; \
		echo "Starting Docusaurus with local backend at http://$$LOCAL_IP:$$PORT_NUM..."; \
		npm start; \
	else \
		echo "REACT_APP_API_BASE_URL=http://$(IP):$$PORT_NUM" > .env; \
		echo "Starting Docusaurus with local backend at http://$(IP):$$PORT_NUM..."; \
		npm start; \
	fi

# Start with localhost backend
localhost:
	@PORT_NUM=$(if $(PORT),$(PORT),8000); \
	echo "REACT_APP_API_BASE_URL=http://localhost:$$PORT_NUM" > .env; \
	echo "Starting Docusaurus with localhost backend at port $$PORT_NUM..."; \
	npm start

# Start with dev backend
dev:
	@rm -f .env
	@echo "Starting Docusaurus with dev.modelhealth.io backend..."
	npm start

# Start with prod backend in dev mode (for testing)
prod:
	@echo "REACT_APP_API_BASE_URL=https://api.modelhealth.io" > .env
	@echo "Starting Docusaurus with api.modelhealth.io backend..."
	npm start

# Build for dev deployment
build-dev:
	@rm -f .env
	@echo "Building for dev.modelhealth.io..."
	npm run build
	@echo "Build complete! Deploy the build/ directory to dev server."

# Build for production deployment
build-prod:
	@rm -f .env
	@echo "Building for api.modelhealth.io..."
	NODE_ENV=production npm run build
	@echo "Build complete! Deploy the build/ directory to production server."

# Clean up
clean:
	@rm -f .env
	@echo "Removed .env file"

# Start without environment management (uses npm defaults)
start:
	npm start

# Build without environment management
build:
	npm run build
