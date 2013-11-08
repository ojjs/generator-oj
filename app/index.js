'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');

var OJGenerator = module.exports = function OJGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] , callback:function(){
      printHelp(this.options.type, this.options.name)
    }.bind(this)});
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(OJGenerator, yeoman.generators.Base);

OJGenerator.prototype.welcome = function welcome() {
  console.log(this.yeoman);
};

OJGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  var promptType = [{
    type: 'list',
    name: 'type',
    message: 'Do you want an Express website or a Static website?',
    choices: [
      'Express website',
      'Static website (The OJ CLI tool)'
    ]
  }];

  var promptCoffee = [{
    type: 'list',
    name: 'coffee',
    message: 'Would you like to use JavaScript or CoffeeScript?',
    choices: [
      'JavaScript',
      'CoffeeScript'
    ]
  }];

  // Default their project name
  this.options.appname = this.options.argv.remain[0] || 'Project Name';

  // Allow --js and --cs to override --coffee flag
  if (this.options.js)
    this.options.coffee = false
  if (this.options.cs)
    this.options.coffee = true

  // Prompt for Coffee if it isn't available
  var checkForCoffee = function(){
    if (this.options.coffee == null) {
      this.prompt(promptCoffee, function(coffeeResponses){
        this.options.coffee = coffeeResponses.coffee.match(/Coffee/i) !== null ? true : false;
        done();
      }.bind(this));
    } else
      done()
  }.bind(this)

  // Prompt for type if not :express, :cli, or :static
  if(this.options.name != 'express' && this.options.name != 'cli' && this.options.name != 'static')
  {
    this.prompt(promptType, function(typeResponses){
      this.options.type = typeResponses.type.match(/Express/i) !== null ? 'express' : 'cli';
      checkForCoffee()
    }.bind(this));
  } else {
    this.options.type = this.options.name == 'express' ? 'express' : this.options.name == 'static' ? 'cli' : 'cli'
    checkForCoffee()
  }
};

OJGenerator.prototype.app = function app(){
  var done = this.async();

  // Remember initial paths
  var sourceDir = this.sourceRoot();
  var destDir= this.destinationRoot();

  var typeRelativeDir = this.options.type + (this.options.coffee ? '-coffee' : '')
  var typeDir = path.join(__dirname, 'templates', typeRelativeDir)
  var commonDir = path.join(__dirname, 'templates', 'common')

  var packageSource = path.join(__dirname, 'templates', '_' + this.options.type + '_package.json')
  var readmeSource = path.join(__dirname, 'templates', '_' + this.options.type + '_README.md')
  var bowerSource = path.join(__dirname, 'templates', '_' + this.options.type + '_bower.json')

  // Copy everything in commonDir
  this.sourceRoot(commonDir)
  this.directory('.','.')

  // Copy everything in typeDir
  this.sourceRoot(typeDir)
  this.directory('.','.')

  // Restore original directory and Template
  this.sourceRoot(sourceDir)
  this.template(packageSource, 'package.json', this.options)
  this.template(readmeSource, 'README.md', this.options)
  if (this.options.type == 'plugin') {
    this.template(readmeSource, 'bower.json', this.options)
  }

  done()
};


function printHelp(type, name) {
  if (type == 'express') {
    console.log('\n\n   Congrats! An Express Server with OJ as been created!\n   ---------------------------------------------------------\n\n   Start your Express Server by running: \n\n      node app\n\n   Open your website at:\n\n      http://localhost:3000\n\n      http://localhost:3000/use-template\n\n   Or if you prefer using grunt: \n\n      grunt start\n\n      grunt open\n\n')
  } else if (type == 'cli') {
    console.log('\n\n   Congrats! A static website using OJ has been created!\n   ---------------------------------------------------------\n\n   Build your website by running:\n\n      oj website --no-modules\n\n   Minify and watch with:\n\n      oj website --no-modules --minify --watch\n\n   Or if you prefer using grunt: \n\n      grunt build\n\n      grunt open\n\n   For more help run:\n\n      oj --help\n\n')
  } else if (type == 'plugin') {
    console.log('\n\n   Congrats! An OJ plugin has been created!\n   ---------------------------------------------------------\n\n   Build your website by running:\n\n      oj .\n\n   Watch for changes and minify with: \n\n      oj . --minify --watch\n\n   For more info run:\n\n      oj --help\n\n')
  }
}