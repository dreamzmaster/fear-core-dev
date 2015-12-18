# FEAR Core Tasks

[website](http://digitalinnovation.github.io/fear-core-tasks)
[documentation](http://digitalinnovation.github.io/fear-core-tasks/docs/)

This repo contains all core `gulp` tasks which can be configured and used in any FEAR projects alltogether or individually.

The Core tasks in this repo are provided in a factory function format for developer convenience, so you can use the functionality but can give any name to the task you create and configure it as much as the Core Task API makes it possible (see examples below).

## Installation

To use any of the provided Core gulp tasks, please install the module first:

```
$ npm install --save-dev git+ssh://git@github.com:DigitalInnovation/fear-core-tasks.git
```

**PLEASE NOTE** the above command requires `npm` version `2.7.1` or above, see this [issue](https://github.com/npm/npm/issues/7121).

### Post install script

When `npm` installs the this core module, it will run the included `postinstall` script which copies default config files to the application / project's root folder, unless they exist.

```
$ npm install
FEAR Core tasks: skipped copying default karma.conf.js
File already exists in project root
```

This can help scaffolding a new project and also keeping our standards.

The copied default files are:

- `.editorconfig`
- `.eslintrc`
- `.eslintignore`
- `.gitignore`

Take a look the `node_modules/fear-core-tasks/defaults` folder for more details.

### Usage in gulptask.js

In `gulpfile.js` pull in `fear-core-tasks`

```
var fearCoreTasks = require('fear-core-tasks');
```

## How to create a new core task

All core tasks are based on various Gulp plugins and Gulp itself. The basic idea is to create factory functions which can generate Gulp tasks.

These Gulp task "instances" can be also configured via the factory function's arguments e.g. `src` in the following example.

```
'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

module.exports = function taskFactory (src) {
    return function task () {
        return gulp.src(src)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError());
    };
};
```

which can be then exposed via the package's `index.js`

```
'use strict';

module.exports = {
    lintJavascript: require('./path/to/task/module'),
};
```

and used in your `gulpfile.js` multiple times for different sources:

```
var core = require('fear-core-tasks');

gulp.task('lint-app', core.lintJavascript('app/**/*.js'));
gulp.task('lint-specs', core.lintJavascript('test/specs/**/*.js'));
```

## Available Core tasks

### Javascript linting

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

### Filtering Javascript linting results

The gulp task e.g. the `lint-javascript` above, can take two arguments `--rule` and `--keyword` from the command line, which will eventually filter the results and show only the related errors. The two can be used separately or combined:

```
$ gulp lint-javascript --rule strict
$ gulp lint-javascript --keyword "blaaa"
$ gulp lint-javascript --rule no-unused-vars --keyword "firstVariable|secondVariable"
```

### Javascript linting report

This core task gives you an overview of linting errors/warnings by rule having issues.

```
[12:29:51] Starting 'lint-report'...
[12:29:51] linting errors 1 warnings 0 rule no-unused-vars
[12:29:51] linting errors 3 warnings 0 rule no-console
[12:29:51] total linting errors 4 warnings 0
[12:29:51] Finished 'lint-report' after 205 ms
```

This can help you to prioritise which linting issues should be fixed first or to decide which rules to turn off.

In your `gulpfile` register a new task similar to the `lint` task, but use the core `lintReport` method:

```
gulp.task('lint-report', fearCoreTasks.lintReport(['*.js']) );
```

The `lint-report` task uses the exact same rules which the `lint` task does, giving you a summary on all rules which have errors or warnings, aggregating the number of issues.

### Watch: running tasks on file change

The `watch` core task can be used to watch certain files and run the necessary tasks on file change e.g. lint or test.

In your `gulpfile` register a new task using the core `watch` method:

```
gulp.task('watch', fearCoreTasks.watch(['*.js'], ['lint', 'test']));
```

The `watch` task accepts a glob of files and an array of tasks to run on file changes, e.g. on each Javascript file change it will run the `lint` and then the `test` task in *sequence* using the `run-sequence` gulp plugin.

There's also an option to add more watches at once, listening to changes of different files and run the appropriate tasks:

```
gulp.task('watch', function () {
    fearCoreTasks.watch(['*.js'], ['lint', 'test']);
    fearCoreTasks.watch(['*.scss'], ['compile-sass']);
});
```

Also, there's an optional 3rd parameter to run a specific `gulp` processing first on changed files:

```
function runThisFirstOnChanged (files) {
    return gulp.src(files).pipe(lint());
}

gulp.task('watch', fearCoreTasks.watch(['*.js'], ['test', 'build'], runThisFirstOnChanged));
```

In the above example, we run linting (only) on the changed files, then the defined tasks will run. If there's a linting error, the rest of the tasks will not run.

### Watching and linting Javascript files

A core task is provided to watch a set of files and run linting on each saved file. This helps you to focus on a single file's linting issues.

In your `gulpfile` register a new task using the core `watchAndLintOnChange` method:

```
gulp.task('watch-and-lint', fearCoreTasks.watchAndLintOnChange(['*.js']));
```

When there's a linting error in the file recently saved, you'll see it in the console:

```
[10:04:41] linting error
/path/to/file/.js
  35:60  error  Missing semicolon  semi

✖ 1 problem (1 error, 0 warnings)
```

After resolving the linting issue, when you save the file you'll see the success message:

```
[10:05:41] linting OK /path/to/file/.js
```

### Watching and linting SCSS files

Any `.scss` file can be watched and linted on change via [gulp-scss-lint](https://github.com/juanfran/gulp-scss-lint).

In your `gulpfile` register a new task by passing the `scss-lint` options and the glob array to the core `lintSassOnChange` method:

```
gulp.task('lint-scss', function () {
    var options = { config: '.my-rules.yml' };
    var lintSassOnChange = fearCoreTasks.lintSassOnChange(options);
    fearCoreTasks.watch(['sass/**/*.scss'], ['compile'], lintSassOnChange );
});
```

The above task will watch all `.scss` files under the `sass/` folder and run linting on the changed file(s), finally compile SASS to CSS via the `compile` task.

### Running unit tests

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

#### Targeted browsers

The default Karma config uses [PhantomJS 1.9.x](http://phantomjs.org/) as the default targeted browser to run the test suite on your local dev machine and get feedback quickly.

You can run the test suite in other browsers as well, also in parallel:

```
// karma.config.js
'use strict';

module.exports = function (config) {
    config.set({

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS', 'Chrome', 'Safari']

    });
};
```

but you have to install the appropriate launcher e.g.

```
$ npm install --save-dev karma-safari-launcher
```

#### Running unit test once

To run your unit test suite via Karma, register a new task in your `gulpfile` and pass an object referring to a `karma.conf.js` file, also override any Karma config options in there:

```
gulp.task('run-unit-tests-once', fearCoreTasks.startKarmaServer({
    configFile: __dirname + '/karma.conf.js',
    files: [ 'test/**/*.spec.js' ],
    singleRun: true
}));
```

#### Continuously running unit tests

When you're practicing TDD, it's important to continuously run your unit test suite on every file change. To achieve that, we start a Karma server with the following gulp task:

```
gulp.task('start-karma-server', fearCoreTasks.startKarmaServer({
    configFile: __dirname + '/karma.conf.js',
    files: [ 'test/**/*.spec.js' ]
}));
```

The above example starts a Karma server which is waiting for another task to trigger the running of the test suite.

In order to trigger Karma to run the test suite, use the following example in your `gulpfile.js`:

```
gulp.task('run-unit-tests', fearCoreTasks.startKarmaRunner({
    configFile: __dirname + '/karma.conf.js'
}));
```

Running also `gulp watch` in a separate terminal window, will look for file changes and run the unit test suite each time you save a file.

#### Using your own Karma config

To use your own Karma config amend the path to which the `configFile` property points to:

```
// e.g. karma.conf.js in your project's root
gulp.task('start-karma', fearCoreTasks.startKarmaRunner({
    configFile: __dirname + '/karma-custom.conf.js'
}));
```

or amend the existing (default) `karma.conf.js` under your project's root folder.
