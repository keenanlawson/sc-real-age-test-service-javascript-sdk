var gulp = require('gulp-help')(require('gulp'));
var webpack = require('webpack');
var clientConfig = require('../../webpack.config.dev');

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            console.log('Error', err);
        }
        else {
            console.log(stats.toString());
        }

        if(done) {
            done();
        }
    }
}

gulp.task('frontend-watch', 'Watch frontend development files', function() {
    webpack(clientConfig).watch(100, onBuild());
});
