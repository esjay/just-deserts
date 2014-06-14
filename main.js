requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../desert',
        crafty: 'crafty/dist/crafty',
        lodash: 'lodash/dist/lodash'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app']);
