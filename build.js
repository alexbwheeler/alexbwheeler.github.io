var uncss = require('uncss')
var glob = require('glob')
var fs = require('fs')

var stylesheetLocation = '_site/css/'
var stylesheetName = 'main.css'

var jekyllUncss = function() {
  var css = fs.readFileSync(stylesheetLocation + stylesheetName, 'utf8')

  glob('_site/**/*.html', function(err, files) {
    if (err) {
      console.log(err)
    }

    uncss(
      files,
      {
        raw: css,
        ignore: ['.visible'],
        ignoreSheets: [/\/css\//],
        timeout: 1500
      },
      function(err, output) {
        if (err) {
          console.log(err)
        }

        fs.writeFileSync(
          stylesheetLocation + 'un.' + stylesheetName,
          output
        )
      }
    )
  })
}

jekyllUncss()

/*
var uncss = require('uncss');

var files   = ['my', 'array', 'of', 'HTML', 'files', 'or', 'http://urls.com'],
    options = {
        banner       : false,
        csspath      : '../public/css/',
        htmlroot     : 'public',
        ignore       : ['#added_at_runtime', /test\-[0-9]+/],
        ignoreSheets : [/fonts.googleapis/],
        inject       : function(window) { window.document.querySelector('html').classList.add('no-csscalc', 'csscalc'); },
        jsdom        : {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)',
        },
        media        : ['(min-width: 700px) handheld and (orientation: landscape)'],
        raw          : 'h1 { color: green }',
        report       : false,
        strictSSL    : true,
        stylesheets  : ['lib/bootstrap/dist/css/bootstrap.css', 'src/public/css/main.css'],
        timeout      : 1000,
        uncssrc      : '.uncssrc',
        userAgent    : 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)',
    };

uncss(files, options, function (error, output) {
    console.log(output);
});
*/