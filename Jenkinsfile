pipeline {
	agent any
	stages {
		stage('Testing Project') {
			environment {
				sonar.projectKey = "vourteen14_Pendataan-Penduduk-NodeJS"
				sonar.organization = "vourteen14"
			}
			steps {
				nodejs(nodeJSInstallationName: 'NodeJS') {
					sh 'npm install'
					withSonarQubeEnv('SonarQube') {
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
