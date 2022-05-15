# README #

metaforest-admin in React JS

## Requirements
* git
* nvm version 0.39.0
* npm version 7.22.0
* node version 14.17.6
* aws cli
## Installation
### install nvm
* $ brew install nvm
* $ nvm -v
### install node and npm 
* $ nvm install [node version]
* $ nvm use [node version]
## Clone repository
* git clone git@github.com:woojoung/metaforest-admin.git
## Build and Run
* $ cd ~/metaforest-admin
* $ npm install
* $ cp ./src/Base/ConfigLocalhost.ts ./src/Base/Config.ts
* $ cp ./public/tools/cfg.localhost.js ./public/tools/cfg.js
* $ npx run build
* $ npm start
## Deployment
* install aws cli on mac refers to https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/install-cliv2-mac.html
* set aws configuration settings refers to https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
### install aws cli
* $ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
* $ sudo installer -pkg AWSCLIV2.pkg -target /
* $ which aws
* $ aws --version
### set and view configuration settings
* $ aws configure --profile mfdeployer
* AWS Access Key ID [None]: 
* AWS Secret Access Key [None]: 
* Default region name [None]: ap-northeast-2
