apiPath=apps/api
webPath=apps/web
deleteImagesAfter=72h

ci: 
	yarn --frozen-lockfile

i:
	yarn

dev:
	yarn dev

lint:
	yarn eslint ${apiPath}
	yarn eslint ${webPath}

typecheck:
	yarn typecheck

build: 
	yarn build

build-api:
	yarn build -- --filter=@opensourcer/api 

build-web:
	yarn build -- --filter=@opensourcer/web

prod/build: 
	docker image prune -a --force --filter "until=${deleteImagesAfter}"
	docker build -t web . -f ${webPath}/Dockerfile
	docker build -t api . -f ${apiPath}Dockerfile

clean:
	@find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

kill-ports: 
	npx --yes kill-port 3000 3333