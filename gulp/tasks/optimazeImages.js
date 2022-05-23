import squoosh from "gulp-libsquoosh";

export const optimazeImages = () => {
  return app.gulp
    .src("src/images/**/*.{png,jpg}")
    .pipe(squoosh())
    .pipe(app.gulp.dest("build/images"));
};
