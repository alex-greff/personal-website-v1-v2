// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path');

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styling/global.scss'),
            ],
        });
}

module.exports = {
    siteName: 'Personal Website',
    siteDescription: "The personal website of Alexander Greff, a computer science student specializing in software engineering at the University of Toronto: Scarborough (UTSC)",
    plugins: [
        // Load general info
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'content/general.md',
                typeName: 'GeneralData',
                remark: {
                    // remark options
                }
            }
        },
        // Load project items
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'content/projects/**/info.md',
                typeName: 'ProjectData',
                remark: {
                    // remark options
                }
            }
        },
        // Load experience items
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'content/experience/**/info.md',
                typeName: 'ExperienceData',
                remark: {
                    // remark options
                }
            }
        }
    ],
    chainWebpack (config) {
        // Load variables for all vue-files
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    
        // Append scss style resources to each type
        types.forEach(type => {
            addStyleResource(config.module.rule('scss').oneOf(type));
        });
    }    
};
