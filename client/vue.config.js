// var pathToBourbon = require('node-bourbon').includePaths;

module.exports = {
    devServer: {
        disableHostCheck: true,
        watchOptions: {
            poll: true
        },
        // Some stuff that isn't needed at the moment
        // public: '0.0.0.0:8080'
        // host: '0.0.0.0',
        // port: 8080,
        // proxy: {
        //     "/api/*": {
        //         target: "http://localhost:5000",
        //         secure: false
        //     },
        //     "/uploads/*": {
        //         target: "http://localhost:5000",
        //         secure: false
        //     }
        // }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styling/main.scss";
                    @import "./node_modules/bourbon/app/assets/stylesheets/_bourbon.scss"; // TODO: this is whack... fix later maybe
                `,
                // includePaths: [pathToBourbon]
            }
        }
    },
};