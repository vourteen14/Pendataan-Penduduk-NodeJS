pipeline {
	agent any
	stages {
		stage('Testing Project') {
			steps {
				nodejs(nodeJSInstallationName: 'NodeJS') {
					sh 'npm install'
					withSonarQubeEnv('SonarQube') {
						sh 'npm install --save-dev mocha chai nyc'
						sh 'npm run test'
						sh 'npm run coverage-icov'
						sh 'npm install sonar-scanner'
						sh 'npm run sonar'
					}
				}
			}
		}
		stage('Deploy Project') {
			steps {
				echo 'Deploying....'
			}
		}
    	}
}
