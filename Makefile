REPORTER = dot

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER)

docs:
	@rm -rf docs
	@mkdir -p docs
	@node ./bin/docs

.PHONY: docs test