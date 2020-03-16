// Command Line Interface
// sets up the Command Line Interface

import program from 'commander';
import { log } from '../logger/index.js';
import { Safari } from '../safari/index.js';
import { Ebook as EbookWriter } from '../ebook-writer/index.js';
import debug from 'debug';
import fs from 'fs';

// __dirname with --experimental-modules in node 12
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Commander Initialization
// specifying CLI options and version
export function main() {
  program
    .version(
      '2.0.0',
      '-v, --version',
      'output the current safari-hunter version'
    )
    .option(
      '-l, --link <link>',
      'the url of the SafariBooksOnline ePub to be generated'
    )
    .option(
      '-b, --bookid <bookid>',
      'the book id of the SafariBooksOnline ePub to be generated'
    )
    .option(
      '-u, --username <username>',
      'username of the SafariBooksOnline user - must have a **paid/trial membership**, otherwise will not be able to access the books'
    )
    .option(
      '-p, --password <password>',
      'password of the SafariBooksOnline user'
    )
    .option(
      '-o, --output <output>',
      'output path the epub file should be saved to'
    )
    .option('-d, --debug', 'activate request debugging')
    .parse(process.argv);

  var username, password;

  // see whether .credentials already exists
  if (fs.existsSync(__dirname + '/.credentials')) {
    const content = fs.readFileSync(__dirname + '/.credentials', 'utf-8');
    const credentials = JSON.parse(content.toString());

    username = credentials.username;
    password = credentials.password;
    debug('there is an existing user cached with username: ' + username);
  }

  // overwrite username and password if specified
  if (program.username) {
    username = program.username;
  }
  if (program.password) {
    password = program.password;
  }

  if (program.link) {
    const linkRegex = /(?:https:\/\/learning.oreilly.com\/library\/view\/[^\/]*)\/([0-9]*)/;
    program.bookid = linkRegex.exec(program.link)[1];
  }

  // Validate Input
  if (!program.bookid) {
    return log(
      "error: option '-b' or '-l' missing. please consider '--help' for more information."
    );
  }
  if (!username) {
    return log(
      "error: option '-u' missing. please consider '--help' for more information."
    );
  }
  if (!password) {
    return log(
      "error: option '-p' missing. please consider '--help' for more information."
    );
  }
  if (!program.output) {
    return log(
      "error: option '-o' missing. please consider '--help' for more information."
    );
  }

  // Starting CLI
  log(`starting application...`);

  // writing credentials to file
  let json = JSON.stringify({ username: username, password: password });
  fs.writeFile(__dirname + '/.credentials', json, (err) => {
    if (err) {
      debug(
        `an error occurred trying to write the username and pass to the cache file`
      );
      throw err;
    }
    debug(`the username and password were successfully cached`);
  });

  // Authorize User
  var safariClient = new Safari(program.debug);
  safariClient
    .fetchBookById(program.bookid, username, password)
    .then((bookJSON) => {
      // console.log(bookJSON);
      var ebook = new EbookWriter(bookJSON);
      return ebook.save(program.output);
    })
    .then(() => {
      // finished saving
      debug('the epub was successfully saved');
      log('epub successfully saved. exiting...');
    })
    .catch((err) => {
      log(err);
    });
}
