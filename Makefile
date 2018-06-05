
export FORCE_COLOR = true

.PHONY: build clean publish bootstrap

eslint := node_modules/.bin/eslint
webpack := node_modules/.bin/webpack
lerna := node_modules/.bin/lerna

build: clean
	$(eslint) src/ packages/ *.js --fix --cache
	NODE_ENV=production $(webpack) --mode=production

clean:
	rm -f *.log
	rm -rf dist

publish:
	make build
	$(lerna) publish --force-publish=* --exact --skip-temp-tag
	yarn upgrade --scope @nielse63 --latest

bootstrap: clean
	yarn
	$(lerna) bootstrap
