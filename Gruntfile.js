var secret = require("./secret.json");

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        "shell": {
            install: {
                options: {
                    stderr: true
                },
                command: [
                    'adb install -r ./build/android.apk',
                    'adb logcat CordovaLog:* GCMBaseIntentService:* GCMBroadcastReceiver:*   PluginManager:* *:S'

                ].join('&&')
            }
        },
        "phonegap-build": {
            buildApk: {
                options: {
                    archive: "build/app.zip",
                    "appId": secret.appid,
                    "user": {
                        "token": secret.token
                    },
                    pollRate : 4,
                    download: {
                        // ios: 'build/ios.ipa',
                        android: 'build/android.apk'
                    }
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'build/app.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['**/*'],
                        dest: '.'
                    }
                ]
            }
        },
        clean : ["build/*"]
    });

    grunt.registerTask('default', ['clean', 'compress:main','phonegap-build:buildApk']);
    grunt.registerTask('install', ['shell:install']);
};