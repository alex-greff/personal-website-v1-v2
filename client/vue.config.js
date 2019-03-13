module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            "/api/*": {
                target: "http://localhost:3000",
                secure: false
            },
            "/uploads/*": {
                target: "http://localhost:3000",
                secure: false
            }
        }
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