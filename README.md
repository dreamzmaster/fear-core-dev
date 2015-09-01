# FEAR Core Tasks

This repo contains all core `gulp` tasks which can be configured and used in any FEAR projects alltogether or individually.

The Core tasks in this repo are provided in a factory function format for developer convenience, so you can use the functionality but can give any name to the task you create and configure it as much as the Core Task API makes it possible (see examples below).

## Available Core tasks

To use any of the provided Core gulp tasks, please install the module first:

```
$ npm install --save-dev git+ssh://git@github.com:DigitalInnovation/fear-core-tasks.git
```

**PLEASE NOTE** the above command requires `npm` version `2.7.1` or above, see this [issue](https://github.com/npm/npm/issues/7121).

In `gulpfile.js` pull in `fear-core-tasks`

```
var fearCoreTasks = require('fear-core-tasks');
```

## Javascript linting

This is done by using [ESLint](http://eslint.org) and a default [FEAR Core ESLint config](https://github.com/DigitalInnovation/fear-core-eslint-config).

In your `gulpfile` register a new task by passing the glob array to the core `lintJavascript` method:

```
gulp.task('lint-javascript', fearCoreTasks.lintJavascript(['*.js']) );
```

also, create an `.eslintrc` file in your project's root to extend the Core ESLint config:

```
// .eslintrc
{
    "extends": "fear-core/node-config"
}
```

for a browser specific project:

```
// .eslintrc
{
    "extends": "fear-core/browser-config"
}
```

## Running unit tests

We're running unit tests via [Karma](http://karma-runner.github.io/) test runner. There's a preconfigured `karma.conf.js` using `mocha` as the testing framework and `chai` as the assertion library.

Both `mocha` and `chai` is pulled in as a plugin to Karma, so the only thing you have to do is to start writing your unit tests:

```
'use strict';

describe('a component under test', function () {

    it('should be unit tested', function() {
        expect(true).to.be.true;
    });

});
```

The default Karma config uses [PhantomJS 1.9.x](http://phantomjs.org/) as the default targeted browser.
