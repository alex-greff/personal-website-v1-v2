module.exports = {
    devServer: {
        disableHostCheck: true
    },
    css: {
        loaderOptions: {
        sass: {
            data: `
                @import "@/styling/main.scss";
            `
            }
        }
    }
};