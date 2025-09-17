#!/bin/bash

# ChatBot RAG - Deploy Script for Google Cloud Platform
# This script automates the deployment process to GCP

set -e

echo "🚀 Starting ChatBot RAG deployment to GCP..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ You are not authenticated with gcloud. Please run: gcloud auth login"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ No project set. Please run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "📋 Project ID: $PROJECT_ID"

# Build the application
echo "🔨 Building the application..."
npm run build

# Enable required APIs
echo "🔧 Enabling required Google Cloud APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Choose deployment method
echo "🤔 Choose deployment method:"
echo "1) Cloud Run (Recommended - Serverless)"
echo "2) App Engine (Fully managed)"
echo "3) Both"

read -p "Enter your choice (1-3): " DEPLOY_CHOICE

case $DEPLOY_CHOICE in
    1|3)
        echo "🚢 Deploying to Cloud Run..."
        
        # Build and deploy with Cloud Build
        gcloud builds submit --config cloudbuild.yaml .
        
        # Get the Cloud Run service URL
        SERVICE_URL=$(gcloud run services describe chatbot-rag --region=us-central1 --format="value(status.url)")
        echo "✅ Cloud Run deployment complete!"
        echo "🌐 Your app is available at: $SERVICE_URL"
        ;;
esac

case $DEPLOY_CHOICE in
    2|3)
        echo "🏗️ Deploying to App Engine..."
        
        # Deploy to App Engine
        gcloud app deploy app.yaml --quiet
        
        # Get the App Engine URL
        APP_URL=$(gcloud app browse --no-launch-browser)
        echo "✅ App Engine deployment complete!"
        echo "🌐 Your app is available at: $APP_URL"
        ;;
esac

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Configure your Supabase project URL in production"
echo "2. Set up your WhatsApp Business API credentials"
echo "3. Configure OpenAI API key in the settings"
echo "4. Test the authentication flow"
echo ""
echo "📚 Documentation:"
echo "- Cloud Run: https://cloud.google.com/run/docs"
echo "- App Engine: https://cloud.google.com/appengine/docs"
echo "- Supabase: https://supabase.com/docs"