pipeline {
    //??
    agent {
        docker {
            image 'node:12.18.9-alpine'
            image 'timbru31/node-chrome'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /etc/passwd:/etc/passwd -v /home/ay-svc-lcsis/:/home/ay-svc-lcsis/'
        }
    }
    //??
    environment {
        DOCKER_CONFIG = '/home/ay-svc-lcsis/.docker'
        GROUP_APP = 'multiple-domain-swagger-backend'
    }
    stages {
        stage('Initialize') {
            steps {
                sh 'npm --version'
            }
        }
        stage('Prepare variable for build') {
            steps {
                sh 'rm -rf node_modules'
            }
        }
        stage('Build Image from Release'){
            when {
                allOf {
                branch 'master'
                changelog '(?i)(?<= |^)bz-build(?= |$)'
                }
            }
            steps {
                sh "docker --config ${DOCKER_CONFIG} build -t 10.100.60.222:8083/infrastructure/api_multiple_domain_swagger . "
                sh "docker --config ${DOCKER_CONFIG} push 10.100.60.222:8083/infrastructure/api_multiple_domain_swagger "
            }
        }
        stage('Kubernetes deploy to environment UAT') {
            when { 
                allOf {
                branch 'master'
                changelog '(?i)(?<= |^)bz-deploy-uat(?= |$)'
                }
            }
            steps {
                withKubeConfig([credentialsId: 'kube-uat-config']) {
                    sh """
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Namespace
metadata:
    name: ${GROUP_APP}-uat
EOF
                    """
                    sh "kubectl apply -f ./kubernetes/uat -n ${GROUP_APP}-uat"
                }
            }
       }
       stage('Kubernetes deploy to environment Dev') {
            when {
                allOf {
                branch 'develop'
                changelog '(?i)(?<= |^)bz-deploy-dev(?= |$)'
                }
            }
            steps {
                withKubeConfig([credentialsId: 'kube-dev-config']) {
                    sh """
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Namespace
metadata:
    name: ${GROUP_APP}-dev
EOF
                    """
                    sh "kubectl apply -f ./kubernetes/dev -n ${GROUP_APP}-dev"
                }
            }
        }
    }
}
