pipeline {
    agent any

    environment {
        IMAGE_NAME = 'playwright-test'
        CI = 'true'
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                    echo "Building the Docker image..."
                    docker build -t "$IMAGE_NAME" .
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "Running Playwright tests..."
                    mkdir -p "$WORKSPACE/playwright-report" "$WORKSPACE/test-results"
                    docker run --rm \
                      -e CI="$CI" \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      "$IMAGE_NAME" \
                      npx playwright test
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true
        }
    }
}
