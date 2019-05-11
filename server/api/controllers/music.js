const mongoose = require("mongoose");
const Artist = require("../models/artist");
const ClientID = require("../models/clientID");
const Utilities = require("../utilities");

const CLIENT_ID_SELECTED_FIELDS = "_id clientID";

exports.music_get_all = async (req, res, next) => {

};

exports.music_get_all_artists = async (req, res, next) => {

};

exports.music_get_artist = async (req, res, next) => {

};

exports.music_create_aritst = async (req, res, next) => {

};

exports.music_update_artist = async (req, res, next) => {

};

exports.music_delete_artist = async (req, res, next) => {

};

exports.music_get_client_ID = async (req, res, next) => {
    try {
        const doc = await ClientID.findOne().select(CLIENT_ID_SELECTED_FIELDS).exec();

        console.log("FROM DATABASE\n", doc);

        // Construct response
        const response = {
            clientID: doc.clientID
        };

        // Send response
        res.status(200).json(response);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.muisc_regenerate_client_ID = async (req, res, next) => {
    try {
        // -----------------------
        // --- Scrape ClientID ---
        // -----------------------

        // Scrape the public client ID from SoundCloud
        const sClientID = await Utilities.SoundCloudScraper.scrapeClientID();

        // Catch if the scraping failed
        if (!sClientID) {
            throw new Error("Unable to get client ID");
        }

        console.log("SCRAPED SOUNDCLOUD CLIENT ID:", sClientID);

        // ----------------------------
        // --- Store ClientID in DB ---
        // ----------------------------

        let sOldID;

        // Remove the existing clientID database document 
        const removed = await ClientID.findOneAndRemove().exec();

        if (removed) {
            // Store the old ID
            sOldID = removed._id;
        }

        // Create the new ClientID doc
        const clientID_doc = new ClientID({
            _id: (sOldID) ? sOldID : new mongoose.Types.ObjectId(),
            clientID: sClientID
        });

        // Save the doc to the database
        const result = await clientID_doc.save();

        console.log("OVERRODE CLIENT ID DOC\n", result);

        const url = `${Utilities.getURLBase(req)}/clientID`;

        res.status(201).json({
            message: "Regenerated client ID",
            clientID: sClientID,
            request: {
                type: "GET",
                url: url
            }
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};