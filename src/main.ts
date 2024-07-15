const core = require('@actions/core');
const github = require('@actions/github');
const { dockerCommand } = require('docker-cli-js');
const shellQuote = require('shell-quote');

async function run() {
   try {
      const image    : string = core.getInput('image');
      const hostDir  : string = core.getInput('host-dir');
      const guestDir : string = core.getInput('guest-dir');
      const command  : string = core.getInput('command');
      const params   : string = core.getInput('params');
      const pull_params   : string = core.getInput('pull-params');

      core.info(`Host PATH: ${process.env.PATH}`);

      // pull the required machine
      await dockerCommand(`pull ${pull_params} ${image}`);
      core.info(`Pulled OK: ${image}`);

      // Parse the command into an array of arguments
      const parsedCommand = shellQuote.parse(command);

      // Escape and quote each argument
      const escapedCommand = shellQuote.quote(parsedCommand);

      // Construct the full Docker command
      const fullCommand = [
         'run',
         ...shellQuote.parse(params),
         '-w', guestDir,
         '-v', `${hostDir}:${guestDir}`,
         image,
         '/bin/sh',
         '-c',
         escapedCommand
     ];

      // run it
      await dockerCommand(shellQuote.quote(fullCommand));
      core.info (`Ran OK: ${shellQuote.quote(fullCommand)}`);

   } catch (error: any) {
      core.setFailed(error.message);
   }
};

run();
