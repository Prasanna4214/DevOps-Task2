pipeline {
  agent any
  environment {
    REGISTRY = "yourdockerhubusername/devops-task2-sample"
    IMAGE_TAG = "${env.BUILD_NUMBER ?: env.GIT_COMMIT ?: 'local'}"
  }
  stages {
    stage("Checkout") { steps { checkout scm } }
    stage("Install & Test") {
      steps {
        sh "echo \"No dependencies to install\""
        sh "node test/sample-test.js"
      }
    }
    stage("Build Docker Image") { steps { sh "docker build -t ${REGISTRY}:${IMAGE_TAG} ." } }
    stage("Push Image") {
      steps {
        echo "Add docker push here using Jenkins credentials (dockerhub-creds)"
      }
    }
  }
  post { success { echo "Pipeline succeeded" } failure { echo "Pipeline failed" } }
}
