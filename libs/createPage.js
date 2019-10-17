const createComponent = require('./createComponent');

function createPage(pageName, args) {
    return createComponent(pageName, args, true);
}

module.exports = createPage;