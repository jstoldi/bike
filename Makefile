
SRC = $(shell find lib -name "*.js" -type f)
UGLIFY = $(shell find node_modules -name "uglifyjs" -type f)
UGLIFY_FLAGS =
BROWSERBUILD = $(shell find node_modules -name "browserbuild" -type f)
BROWSERBUILD_FLAGS =-b lib/ -g help -m help.js
REPORTER = dot

all: clean runtime.js help.min.js test docs copy-to-repo

clean:
	@rm -rf docs
	@rm -f help.js
	@rm -f help.min.js

help.js: $(SRC)
	@node support/compile $^

runtime.js: ${SRC}
	${BROWSERBUILD} ${BROWSERBUILD_FLAGS} ${SRC} > $@

help.min.js: help.js
	@$(UGLIFY) $(UGLIFY_FLAGS) $< > $@ \
		&& du help.min.js \
		&& du help.js

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER)

docs:
	@mkdir -p docs/help
	@node ./support/docs

copy-to-repo:
	@cp help.js ../../repository/behere/wrap-klass/debug/wrap-klass.debug.js
	@cp help.min.js ../../repository/behere/wrap-klass/min/wrap-klass.min.js

.PHONY: clean test docs