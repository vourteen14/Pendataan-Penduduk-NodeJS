pipeline {
	agent any
	
	environment {
		MongoDB_URL = 'mongodb+srv://anggasuriana:Ex9ZeI9aRyF7CDi9@cluster0.o7wse.mongodb.net/Penduduk?retryWrites=true&w=majority'
	}
	stages {
		stage('Build & Tagging Project Pendataan Penduduk') {
			steps {
					sh 'docker build -t vourteen14/pendataan-penduduk:latest .'
					sh 'docker tag vourteen14/pendataan-penduduk vourteen14/pendataan-penduduk:1.0.0'
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
