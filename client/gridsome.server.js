// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const nestedProperty = require("nested-property");
const path = require("path");
const { imageType } = require("gridsome/lib/graphql/types/image");

// Source: https://github.com/gridsome/gridsome/issues/292#issuecomment-483347365
function injectImageField(nodePath) {
    return {
        type: imageType.type,
        args: imageType.args,
        async resolve(node, args, context, info) {
            endpointVal = nestedProperty.get(node, nodePath);

            async function _addImageAsset(_filePath) {
                const value = path.join(__dirname, _filePath);

                let result = {};
                try {
                    result = await context.assets.add(value, args);
                } catch(err) {
                    return null;
                }

                if (result.isUrl) {
                    return result.src;
                }

                return {
                    type: result.type,
                    mimeType: result.mimeType,
                    src: result.src,
                    size: result.size,
                    sizes: result.sizes,
                    srcset: result.srcset,
                    dataUri: result.dataUri
                }; 
            }

            // Array case
            if (Array.isArray(endpointVal)) {
                const imageDataList = [];

                for (const filePath of endpointVal) {
                    const imageData = await _addImageAsset(filePath);

                    if (!imageData) {
                        console.warn(`An image import failed at '${filePath}', skipping`);
                        continue;
                    }

                    imageDataList.push(imageData);
                }

                return imageDataList;
            }

            // String case (probably)
            const imageData = await _addImageAsset(endpointVal);
            return imageData;
        }
    }
}

module.exports = function (api) {
    api.loadSource((store) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
        store.addSchemaResolvers({
            GeneralData: {
                profileImage: injectImageField("profileImage")
            },
            ProjectData: {
                thumbnailImage: injectImageField("thumbnailImage"),
                galleryImages: injectImageField("galleryImages")
            }
        });
    });

    api.createPages(({ createPage }) => {
        // Use the Pages API here: https://gridsome.org/docs/pages-api/
    });
}
