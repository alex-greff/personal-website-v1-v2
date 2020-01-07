module.exports = {
    devServer: {
        disableHostCheck: true,
        watchOptions: {
            poll: true
        },
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styling/main.scss";
                `,
            }
        }
    },
};