#!/usr/bin/env node
const createComponent = require('./libs/createComponent');
const createModule = require('./libs/createModule');
const createPage = require('./libs/createPage');
const createSFC = require('./libs/createSFC');
const createService = require('./libs/createsService');
const createModel = require('./libs/createModel');
const gitRebase = require('./libs/git-rebase');
const getModulePaths = require('./libs/getModulePaths');
const { removeFiles } = require('./libs/files');

const [,, command, entity, name, ...args] = process.argv;

switch (command) {
    case 'create':
    case 'c':
        switch (entity) {
            case 'component':
            case 'c':
                createComponent(name, args);
                break;
            case 'page':
            case 'p':
                createPage(name, args);
                break;
            case 'module':
            case 'm':
                createModule(name, args);
                break;
            case 'sfc':
                createSFC(name, args);
                break;
            case 'service':
            case 's':
                createService(name);
                break;
            case 'model':
                createModel(name);
                break;
        }
        break;
    case 'remove':
        switch(entity) {
            case 'files':
                removeFiles([ name, ...args]);
                break;
        }
        break;
    case 'get':
        switch(entity) {
            case 'modules':
                getModulePaths([ name, ...args]);
                break;
        }
        break;
    case 'git-rebase':
        gitRebase();
        break;
}
