pipeline {
	agent any
	
	environment {
		MongoDB_URL = '';
	}
	stages {
		stage('Build & Tagging Project Pendataan Penduduk') {
			steps {
				script {
					env.VERSION = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
					sh 'docker build -t vourteen14/pendataan-penduduk:latest .'
					sh 'docker tag vourteen14/pendataan-penduduk vourteen14/pendataan-penduduk:${env.VERSION}'
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
