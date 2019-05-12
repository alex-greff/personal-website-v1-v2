const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const queryString = require("query-string");

// A list of some meta properties that should contain the user ID information
const USER_ID_SEARCH_META_PROPERTIES = ["twitter:app:url:googleplay", "twitter:app:url:iphone", "twitter:app:url:ipad", "al:ios:url", "al:android:url"];

exports.scrapeClientID = async (i_sURL = "https://soundcloud.com/") => {
    let sClientID = undefined;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", interceptedRequest => {
        // Only attempt to get the client ID if it hasnt been found already (since they use it in multiple requests)
        if (!sClientID || interceptedRequest.resourceType() === "xhr") {
            // Get and parse the request URL
            const sXHR_URL = interceptedRequest.url()
            const oParsedURL = queryString.parseUrl(sXHR_URL);

            // Grab and store the client ID
            sClientID = oParsedURL.query["client_id"];
        }

        interceptedRequest.continue();
    });
    await page.goto(i_sURL);
    await browser.close();

    return sClientID;
};

exports.scrapeUserID = async (i_sUsername) => {
    let nUserID = undefined;

    const sUserURL = `https://soundcloud.com/${i_sUsername}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(sUserURL);

    // Scrape the HTML page
    const sSoundCloudHTML = await page.evaluate(() => document.documentElement.outerHTML);

    // Parse the html
    const $ = cheerio.load(sSoundCloudHTML);

    USER_ID_SEARCH_META_PROPERTIES.some((i_sMetaProp) => {
        // Grab the meta tag from the html
        const metaTagEl = $(`meta[property="${i_sMetaProp}"]`);
        const sMetaTagContent = metaTagEl.attr('content');

        try {
            // Parse/save the user ID and stop the array iteration
            const sUserID = sMetaTagContent.substring(sMetaTagContent.lastIndexOf(":") + 1);
            nUserID = parseInt(sUserID);
            return true;
        } catch(err) {
            return false;
        }
    });

    await browser.close();
    
    return nUserID;
};

exports.scrapeTracksList = async (i_nUserID, i_sClientID, i_nLimit = 100) => {
    // const sTracksReqURL = `https://api-v2.soundcloud.com/users/${i_nUserID}/tracks?client_id=${i_sClientID}&limit=${i_nLimit}`;
    const sTracksReqURL = `https://api-v2.soundcloud.com/users/${i_nUserID}/tracks?representation=&client_id=${i_sClientID}&limit=${i_nLimit}&offset=0&linked_partitioning=1&app_version=1557485597&app_locale=en`;

    const result = await axios.get(sTracksReqURL);
    return result.data;
};