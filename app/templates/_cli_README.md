Congrats! A static website using OJ has been created!
---------------------------------------------------------------------

Build your website by running:

    oj website

Rebuild automatically as you develop:

    oj website --watch

Minify before deploying with:

    oj website --minify

FAQ
---------------------------------------------------------------------

## How to I create a page?

Create a page by placing a `.oj` file inside your `website` folder
and running `oj website` to build the static website.

## Can I use coffee-script?

Yes, coffee-script is built right in. OJ will compile and handle
coffee-script automatically, all you need to do is `.ojc` files instead
of `.oj` ones.

## What is the `modules` directory for?

The `website/modules/` directory is where you tell OJ what modules
to bundle together. All npm modules referenced are bundled together
in a way similar to "browserify". Then when the page loads browsers
can cache the module bundle and load the page faster.







