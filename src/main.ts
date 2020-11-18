const core = require('@actions/core');
const github = require('@actions/github');
const { dockerCommand } = require('docker-cli-js');
 
async function run() {
   try {
      const image    : string = core.getInput('image');
      const hostDir  : string = core.getInput('host-dir');
      const guestDir : string = core.getInput('guest-dir');
      const command  : string = core.getInput('command');
      const params   : string = core.getInput('params');

      core.info(`Host PATH: ${process.env.PATH}`);
    
      // pull the required machine
      await dockerCommand(`pull ${image}`);
      core.info(`Pulled OK: ${image}`);

      // run it
      await dockerCommand(`run ${params} -w ${guestDir} -v${hostDir}:${guestDir} ${image} ${command}`);
      core.info (`Ran OK: ${command}`);

   } catch (error) {
      core.setFailed(error.message);
   }
};

run();
