Congrats! A static website using OJ has been created!
====================================================================

How Your Website is Organized
---------------------------------------------------------------------
    website/
      ├── index.ojc          Your homepage, using OJ (.ojc is just CoffeeScript)
      │
      └── use-template.ojc   A second page to demonstrate using a template
      ├── _templatePage.ojc  The template used by `use-template.oj`
      │
      └── modules/           Special directory that builds module bundles
          └── all.ojc        This module bundle will become `modules/all.js`

How to build your website with OJ
--------------------------------------------------------------------

Build your website by running:

    oj website

Rebuild automatically as you develop:

    oj website --watch

Minify before deploying with:

    oj website --minify

Frequently Asked Questions
---------------------------------------------------------------------

## How to I create a page?

Create a page by placing a `.ojc` file inside your `website` folder
and running `oj website` to build the static website. You can put
the `.ojc`. file anywhere you want and OJ will recursively find
and build it.

## How do I use coffee-script?

Coffee-script is built right in to OJ. All you need to do is
use `.ojc` files instead of `.oj` files.

## How do I make templates?

OJ is fully compatible with Node's `require` syntax. Just `require`
files as you would. Anything prefixed with `_` or `oj` will not
be built into pages. Everything else will be come a `.html` page.

## What is the `website/modules` directory for?

The `modules` directory is specially interpreted by OJ to turn
`.ojc` files into `.js` module bundles (instead of `.html` pages).
This also improves browser caching and makes site creation faster.
