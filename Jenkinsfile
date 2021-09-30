pipeline {
	agent any
	
	environment {
		MongoDB_URL = 'mongodb+srv://anggasuriana:Ex9ZeI9aRyF7CDi9@cluster0.o7wse.mongodb.net/Penduduk?retryWrites=true&w=majority'
	}
	stages {
		stage('Build Project Pendataan Penduduk') {
			steps {
				script{
					VERSION = sh(returnStdout: true, script: 'cat version').trim()
					sh 'echo $(VERSION)'
					sh 'docker build -t $(VERSION) .'
				}
	    		}
	  	}
	  
		stage('Testing Unit & Automate Code Analyze Pendataan Penduduk') {
			steps {
				nodejs(nodeJSInstallationName: 'NodeJS') {
					sh 'npm install'
					withSonarQubeEnv('SonarQube') {
						sh 'export DB_HOST=${MongoDB_URL}'
						sh 'npm install --save-dev mocha chai http-status chai-http'
						sh 'npm run test'
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
