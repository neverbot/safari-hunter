#!/usr/bin/env node --experimental-modules

// Application Bootup
// boots up the application

// Initialise CLI
// imports the Command Line Interface (CLI) in order to make the application work
import { main } from './lib/cli/index.js';

main();

// Closing Application
// make sure the manager gets stopped
process.on('SIGINT', function() {
  process.exit();
});
