apiPath=apps/api
webPath=apps/web

clean:
	@find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +