#!/bin/sh

echo ''
echo 'git pull 하는 중..'
git pull

git status

echo ''
echo 'git push 를 하셨나요? (YES): '
read ANSWER1

if [ "$ANSWER1" != 'YES' ]; then
    echo 'Please git push first.'
    exit 1
fi

NAME=$(whoami)
DATE=$(date '+%Y%m%d_%H%M%S_%Z')

cp -f ./src/Base/ConfigProduction.ts ./src/Base/Config.ts
npm run build

cp -rf ./public/css ./dist
cp -rf ./public/test.html ./dist

mv -f ./dist/tools/cfg.production.js ./dist/tools/cfg.js

echo admin_mf_production_$DATE\_$NAME > ./dist/website_version.txt
cp -rf ./dist ../admin_mf_production_$DATE

cp -f ./src/Base/ConfigLocalhost.ts ./src/Base/Config.ts

aws s3 sync ../admin_mf_production_$DATE s3://adminmetaforest --delete

git tag admin_mf_production_$DATE\_$NAME
git push origin admin_mf_production_$DATE\_$NAME

echo admin_mf_production_$DATE\_$NAME
