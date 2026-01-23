.PHONY: help start build clean local dev prod install

# Default target
help:
	@echo "Model Health Documentation - Environment Management"
	@echo ""
	@echo "Available commands:"
	@echo "  make install             - Install dependencies"
	@echo "  make local               - Start with local backend (auto-detects IP, port 8000)"
	@echo "  make local BACKEND_PORT=<n>  - Start with custom backend port"
	@echo "  make local IP=<ip>       - Start with specific IP"
	@echo "  make localhost           - Start with localhost backend (port 8000)"
	@echo "  make localhost BACKEND_PORT=<n> - Start with localhost and custom port"
	@echo "  make dev                 - Start with dev.modelhealth.io backend"
	@echo "  make prod                - Start with api.modelhealth.io backend (dev mode)"
	@echo "  make build-dev           - Build for dev.modelhealth.io"
	@echo "  make build-prod          - Build for api.modelhealth.io"
	@echo ""
	@echo "Examples:"
	@echo "  make local                           # Auto-detect IP, port 8000"
	@echo "  make local BACKEND_PORT=8080         # Auto-detect IP, custom port"
	@echo "  make local IP=192.168.1.100          # Specific IP, port 8000"
	@echo "  make local IP=192.168.1.100 BACKEND_PORT=8080"
	@echo ""
	@echo "Note: BACKEND_PORT = Django backend port (default: 8000)"
	@echo "      Docusaurus runs on port 3000"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Start with local backend (auto-detects IP if not provided)
local:
	@BACKEND_PORT_NUM=$(if $(BACKEND_PORT),$(BACKEND_PORT),8000); \
	if [ -z "$(IP)" ]; then \
		echo "Detecting local IP address..."; \
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
		echo "Django backend: http://$$LOCAL_IP:$$BACKEND_PORT_NUM"; \
		echo "Starting Docusaurus on port 3000..."; \
		DOCUSAURUS_API_URL=http://$$LOCAL_IP:$$BACKEND_PORT_NUM npm start; \
	else \
		echo "Django backend: http://$(IP):$$BACKEND_PORT_NUM"; \
		echo "Starting Docusaurus on port 3000..."; \
		DOCUSAURUS_API_URL=http://$(IP):$$BACKEND_PORT_NUM npm start; \
	fi

# Start with localhost backend
localhost:
	@BACKEND_PORT_NUM=$(if $(BACKEND_PORT),$(BACKEND_PORT),8000); \
	echo "Django backend: http://localhost:$$BACKEND_PORT_NUM"; \
	echo "Starting Docusaurus on port 3000..."; \
	DOCUSAURUS_API_URL=http://localhost:$$BACKEND_PORT_NUM npm start

# Start with dev backend
dev:
	@echo "Using dev.modelhealth.io backend"
	@echo "Starting Docusaurus on port 3000..."
	npm start

# Start with prod backend in dev mode (for testing)
prod:
	@echo "Using api.modelhealth.io backend"
	@echo "Starting Docusaurus on port 3000..."
	DOCUSAURUS_API_URL=https://api.modelhealth.io npm start

# Build for dev deployment
build-dev:
	@echo "Building for dev.modelhealth.io..."
	BUILD_ENV=dev npm run build
	@echo "Build complete! Deploy the build/ directory to dev server."

# Build for production deployment
build-prod:
	@echo "Building for api.modelhealth.io..."
	BUILD_ENV=prod npm run build
	@echo "Build complete! Deploy the build/ directory to production server."

# Start without environment management
start:
	npm start

# Build without environment management
build:
	npm run build
