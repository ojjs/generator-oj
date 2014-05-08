'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');

var OJGenerator = module.exports = function OJGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] , callback:function(){
      printUsage()
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
    message: 'Do you want to make a Static or Express website?',
    choices: [
      'Static website (using OJ commandline)',
      'Express website (using OJ middleware)'
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

  done()
};

// Print readme up to "Frequently Asked Questions"
function printUsage(){

  var lines = fs.readFileSync(path.resolve(process.cwd(), 'README.md'), 'utf8')
  // Print only up to FAQ
  var faqStart = lines.indexOf('Frequently Asked Questions')
  // If not found then print all of it
  if(faqStart == -1)
    faqStart == undefined
  console.log("\n\n" + lines.slice(0,faqStart))
}
