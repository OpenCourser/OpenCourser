apiPath=apps/api
webPath=apps/web
deleteImagesAfter=72h

ci: 
	yarn --frozen-lockfile

i:
	yarn

dev: kill-ports dev-all

dev-all:
	yarn dev

lint:
	yarn eslint ${apiPath}
	yarn eslint ${webPath}

build: build-api build-web

build-api:
	cd ${apiPath} && yarn build

build-web:
	cd ${webPath} && yarn build

prod/build: 
	docker image prune -a --force --filter "until=${deleteImagesAfter}"
	docker build -t web . -f ${webPath}/Dockerfile
	docker build -t api . -f ${apiPath}Dockerfile

clean:
	@find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

kill-ports: 
	npx --yes kill-port 3000 3333