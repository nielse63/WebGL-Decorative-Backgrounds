
export FORCE_COLOR = true

.PHONY: build clean clean-deps publish screenshots minify-images serve

eslint := node_modules/.bin/eslint
webpack := node_modules/.bin/webpack
lerna := node_modules/.bin/lerna
pm2 := node_modules/.bin/pm2
imagemin := node_modules/.bin/imagemin
release-it := node_modules/.bin/release-it

build:
	make clean
	$(eslint) src/ packages/ *.js --fix --cache
	NODE_ENV=production $(webpack) --mode=production
	make minify-images

clean:
	rm -f *.log
	rm -rf dist

clean-deps:
	$(lerna) clean --yes
	rm -rf node_modules

publish:
	make build
	$(lerna) publish --force-publish=* --exact --skip-temp-tag
	yarn upgrade --scope @nielse63 --latest
	$(release-it)

screenshots:
	make build
	yarn serve
	node scripts/get-screenshots.js
	yarn unserve

minify-images:
	$(imagemin) src/images/* --out-dir=dist/images
	$(imagemin) src/images/screenshots/* --out-dir=dist/images/screenshots

serve:
	yarn unserve -s
	make build
	$(pm2) serve dist 8080
