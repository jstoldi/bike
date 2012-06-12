
SRC = $(shell find lib -name "*.js" -type f)
UGLIFY = $(shell find node_modules -name "uglifyjs" -type f)
UGLIFY_FLAGS =
BROWSERBUILD = $(shell find node_modules -name "browserbuild" -type f)
BROWSERBUILD_FLAGS =-b lib/ -g klass -m klass.js
REPORTER = dot

all: clean runtime.js klass.min.js test docs copy-to-repo

clean:
	@rm -rf docs
	@rm -f klass.js
	@rm -f klass.min.js

klass.js: $(SRC)
	@node support/compile $^

runtime.js: ${SRC}
	${BROWSERBUILD} ${BROWSERBUILD_FLAGS} ${SRC} > $@

klass.min.js: klass.js
	@$(UGLIFY) $(UGLIFY_FLAGS) $< > $@ \
		&& du klass.min.js \
		&& du klass.js

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER)

docs:
	@mkdir -p docs/klass
	@node ./support/docs

copy-to-repo:
	@cp klass.js ../../repository/behere/wrap-klass/debug/wrap-klass.debug.js
	@cp klass.min.js ../../repository/behere/wrap-klass/min/wrap-klass.min.js

.PHONY: clean test docs