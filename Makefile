apiPath=apps/api
webPath=apps/web
deleteImagesAfter=72h

ci: 
	yarn --frozen-lockfile

i:
	yarn

dev: 
	yarn dev

build: 
	yarn build

prod/build: 
	docker image prune -a --force --filter "until=${deleteImagesAfter}"
	docker build -t web . -f ${webPath}/Dockerfile
	docker build -t api . -f ${apiPath}Dockerfile

clean:
	@find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
