Congrats! An Express server using OJ has been created!
====================================================================

How Your Express Server is Organized
---------------------------------------------------------------------

      README.md                 Read this for help and frequest questions
      package.json              The npm and oj modules you depend on

      app/                      The Express app with OJ
      ├── index.js              Passes through to index.coffee
      ├── index.coffee          Creates an Express server with OJ middleware
      │
      └── views                 Express views go here
      │  ├── index.ojc          Your homepage, using OJ (.oj is just JavaScript)
      │  └── use-template.ojc   A second page to demonstrate using a template
      │  └── _templatePage.ojc  The template used by `use-template.ojc`
      │
      ├── modules               Special OJ directory that builds module bundles
      │   └── all.ojc           This module bundle will become `modules/all.js`
      │
      └── public                Express static files go here (images, libs, etc)
         └── modules            This is where module bundles get built to
             └── all.js         This was built from `modules/all.ojc`

How to Start Your Express Server
--------------------------------------------------------------------

    node app

Frequently Asked Questions
---------------------------------------------------------------------

## How to I create a page?

Create a page by placing a `.ojc` file inside your `app/views` folder.
Then add a route inside of `app/index.coffee` file to point to it.

## How do I use coffee-script?

Coffee-script is built right in to OJ. All you need to do is
use `.ojc` files instead of `.oj` files.

## How do I create a template?

Templates are just functions in OJ. Take a look at how `_templatePage`
is used by the `use-template` view.

## What is the `app/modules` directory for?

The `app/modules` directory is specially interpreted by OJ to turn
`.oj` files into `.js` module bundles. By bundling libraries like jquery,
backbone, even oj plugins, the site will load faster.
