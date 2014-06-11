var childProcess   = require('child_process'),
    functions;

functions = {
    publish: function() {
        child = childProcess.exec('/publish-it.sh',
            function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        child.on('exit', function (code) {
            console.log('Child process exited with exit code '+code);
            var msg = {
                type: 'success', // this can be 'error', 'success', 'warn' and 'info'
                message: 'Website has been published.', // A string. Should fit in one line.
                status: 'persistent', // or 'passive'
                id: 'websitepublished' // A unique ID
            };
            api.notifications.add(msg);
        });
    }
};

module.exports = functions;
