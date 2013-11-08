# generator-oj

A [Yeoman](http://yeoman.io) generator that helps create [OJ](http://ojjs.org) projects.

### What is Yeoman?

Yeoman is a fancy tool that helps create project scaffolding, in this case for OJ projects.

### What is OJ?

[OJ](http://ojjs.org) helps you make websites with objects. See the documentation here: [ojjs.org](http://ojjs.org)

### Install oj

```
npm install -g oj
```

### Install Yeoman

```
npm install -g yo
```

### Install the OJ generator

```
npm install -g generator-oj
```

### Run the generator where you want your OJ project

```
yo oj
```

### Project Options

Build Express Webserver with OJ

```
yo oj:express
```

Build Static Website using the OJ CLI

```
yo oj:static
```

Note: The OJ generator will ask you which project you want if you don't specify.

### Language Options


Use CoffeeScript

```
oj yo --coffee
```

Use JavaScript

```
oj yo --js
```

Note: The OJ generator will ask you which language you want if you don't specify.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
