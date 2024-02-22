"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core = require('@actions/core');
const github = require('@actions/github');
const { dockerCommand } = require('docker-cli-js');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const image = core.getInput('image');
            const hostDir = core.getInput('host-dir');
            const guestDir = core.getInput('guest-dir');
            const command = core.getInput('command');
            const params = core.getInput('params');
            core.info(`Host PATH: ${process.env.PATH}`);
            // pull the required machine
            yield dockerCommand(`pull ${image}`);
            core.info(`Pulled OK: ${image}`);
            // run it
            yield dockerCommand(`run ${params} -w ${guestDir} -v${hostDir}:${guestDir} ${image} ${command}`);
            core.info(`Ran OK: ${command}`);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
;
run();
