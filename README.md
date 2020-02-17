![GitHub](https://img.shields.io/github/license/neverbot/safari-hunter)
![GitHub package.json version](https://img.shields.io/github/package-json/v/neverbot/safari-hunter)

# safari-hunter
A SafariBooksOnline downloader that generates .epub books for reading offline. 

This project was forked from the original [SafariBooks-Downloader](https://github.com/nicohaenggi/SafariBooks-Downloader), created by [Nico Haenggi](http://www.nicohaenggi.com/), currently not maintained.

**_Obviously_** you need to have a paid membership to be able to read and access the books, **this is not a tool to get free books**. It's just to give you the option to read the books you already has access to, but in an offline way.

## Use Guide

### How To Install

Install Node.js. For more information about how to install it on your environment, see [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/). To verify your installation, run:

```bash
node -v
```

If a version is returned, you did successfully install Node.js. 

**Important**: This project has been updated to use ES6 standard modules, instead of traditional CommonJS Modules used in node. To be able to use that feature, you need to execute node using the flag `--experimental-modules` (_already specified in the index.js main file_). Double check your node version is at least v12. It's recommended to use the [Node version manager](https://github.com/nvm-sh/nvm) (`nvm`) to manage different node installations.

Next up, make sure npm is properly installed. To verify, run:

```bash
npm -v
```

If the command returns a version number, you're all set. Next, we'll clone the repository.

```bash
git clone https://github.com/neverbot/safari-hunter.git
cd safari-hunter
```

Install all the dependencies with npm.

```bash
npm install
```
Congratulations! You've successfully installed `safari-hunter`.
If you desire to do so, you can install the tool globally on your machine. To do so, run:

```bash
npm install -g
```

To verify the installation, please run:

```bash
safari-hunter --version
```

If the command returns a version number, you have successfully installed the tool globally.

### How To Update
1. Stop the downloader if it's running. (use control + c to stop it)
2. Run `git pull`  
    This will update the generator to the latest master branch
3. Reinstall dependencies with `npm install` or `npm install -g`  
    using `npm install -g` will install the generator globally
4. Run `safari-hunter --version`  
    After you are done following it this will print out the current version of the generator.

### How To Run

The tool provides the following six options. The options **--bookid, --username, --password and --output** are required. However, if the username and password options are provided once, **they will be cached** and are no longer required to run the CLI.

### Options

* **-h, --help**
    * displays usage information
* **-v, --version**
    * displays version number
* **-b, --bookid <bookid>**
    * the book id of the SafariBooksOnline ePub to be generated
    you can find the book id by having a look at the URL while reading the book
    e.g. `https://learning.oreilly.com/library/view/clean-code/9780136083238/` whereas the id will be `9780136083238`
* **-l, --link <link>**
    * the link to the SafariBooksOnline ePub to be generated,
    you can find the link by having a look at the URL while reading the book
* **-u, --username <username>**
    * username of the SafariBooksOnline user - must have a **paid/trial membership**, otherwise will not be able to access the books
* **-p, --password <password>**
    * password of the SafariBooksOnline user
* **-o, --output <output>**
    * output path the epub file should be saved to. *On some systems, the path may require to contains no whitespaces*.
* **-d, --debug**
    * enable debug mode for *request* package.

### Example

An example showing how a SafariBooksOnline with id **9780136083238** is downloaded and converted into a ePub file **testbook.epub**.
```bash
safari-hunter -b 9780136083238 -u yourUser -p yourPassword -o /Users/yourUser/Desktop/testbook.epub
```

An example showing how a SafariBooksOnline with id **9780136083238** is downloaded and converted into a ePub file **testdebugbook.epub**.
```bash
safari-hunter -d -b 9780136083238 -u yourUser -p yourPassword -o /Users/yourUser/Desktop/testbook.epub
```
Tip: If your password contains a hyphen (`-`), a whitespace or some other character that does not allow you to use the command, your can use single quotes: `-p 'yourPassword'`.

## Features
- [x] generating ePub with cover image, authors and publisher
- [x] custom stylesheets will be imported (only one currently)
- [ ] support for several different stylesheets in one book
- [ ] directly generating .mobi files

## Support
If you discover a bug in the generator, please [search the issue tracker](https://github.com/nicohaenggi/SafariBooks-Downloader/issues?q=is%3Aissue+sort%3Aupdated-desc) first. If it hasn't been reported, please [create a new issue](https://github.com/nicohaenggi/SafariBooks-Downloader/issues/new).

### [Feature Requests](https://github.com/nicohaenggi/SafariBooks-Downloader/labels/Feature%20Request)
If you have a great idea to improve the generator, please [search the feature tracker](https://github.com/nicohaenggi/SafariBooks-Downloader/labels/Feature%20Request) first to ensure someone else hasn't already come up with the same great idea. If it hasn't been requested, please [create a new request](https://github.com/nicohaenggi/SafariBooks-Downloader/issues/new). While you're there vote on other feature requests to let the me know what is most important to you.

### [Pull Requests](https://github.com/nicohaenggi/SafariBooks-Downloader/pulls)
If you'd like to make your own changes ensure your Pull Request is made against the  `develop` branch.


## Credits
- [Nico Haenggi](http://www.nicohaenggi.com): conception & development
- [cyrilis](https://github.com/cyrilis): a big thanks to cyrillis for his epub-gen package which I relied upon heavily while integrating my own epub generator
- [neverbot](https://github.com/neverbot): new features and changes since fork.

## Copyright
- Copyright (c) 2017 Nico Haenggi
- Copyright (c) 2019 neverbot, for the new additions (if such thing is applicable)

## License
Released under the [MIT License](https://github.com/neverbot/safari-hunter/blob/master/LICENSE)
