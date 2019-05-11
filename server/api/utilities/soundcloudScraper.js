const puppeteer = require("puppeteer");
const queryString = require("query-string");

exports.scrapeClientID = async (i_sURL = "https://soundcloud.com/") => {
    let sClientID = undefined;

    const broswer = await puppeteer.launch();
    const page = await broswer.newPage();
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
    await broswer.close();

    return sClientID;
};