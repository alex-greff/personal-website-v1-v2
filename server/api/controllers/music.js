const mongoose = require("mongoose");
const ArtistProfile = require("../models/artistProfile");
const ClientID = require("../models/clientID");
const Utilities = require("../utilities");

const CLIENT_ID_SELECTED_FIELDS = "_id clientID";
const UNEDITABLE_FIELDS = ["_id", "updated"];

// ------------------------
// --- Helper functions ---
// ------------------------

const filterTrackData = (i_aFilteredTracks, i_aTracks) => {
    return i_aTracks.filter(i_oTrackData => i_aFilteredTracks.includes(i_oTrackData.permalink));
};

const sanitizeTrackData = (i_oTrackDataRaw) => {
    return i_oTrackDataRaw.collection.map(i_oTrackData => {
        return {
            trackID: i_oTrackData.id,
            title: i_oTrackData.title,
            permalink: i_oTrackData.permalink,
            createdDate: i_oTrackData.created_at,
            description: i_oTrackData.description,
            artworkURL: i_oTrackData.artwork_url,
        };
    });
};

const getUserID = async (i_sUsername) => {
    const nUserID = await Utilities.SoundCloudScraper.scrapeUserID(i_sUsername);

    if (!nUserID) {
        throw "Unable to get user ID";
    }

    return nUserID;
};

const getFilteredTrackData = async (i_aTrackFiler, i_nUserID) => {
    // Grab the stored client ID
    const clientID_doc = await ClientID.findOne().select(CLIENT_ID_SELECTED_FIELDS).exec();
    const sClientID = clientID_doc.clientID;

    if (!sClientID) {
        throw "Client ID not generated";
    }

    // --- Scrape track data and santize/filter it ---

    const oTrackDataRaw = await Utilities.SoundCloudScraper.scrapeTracksList(i_nUserID, sClientID);

    if (!oTrackDataRaw) {
        throw "Unable to get track data";
    }

    const aTrackData = sanitizeTrackData(oTrackDataRaw);
    const aFilteredTrackData = filterTrackData(i_aTrackFiler, aTrackData);

    return aFilteredTrackData;
};

// ---------------------------
// --- Request controllers ---
// ---------------------------

exports.music_get_all = async (req, res, next) => {

};

exports.music_get_all_artist_profiles = async (req, res, next) => {

};

exports.music_get_artist_profile = async (req, res, next) => {

};

exports.music_create_aritst_profile = async (req, res, next) => {
    try {
        // --- Scrape user ID ---

        const artistUsername = req.body.username;

        // Get user ID
        const nUserID = await getUserID(artistUsername);

        console.log("SCRAPED USER ID:", nUserID);

        // Get filtered track data
        const aFilteredTrackData = await getFilteredTrackData(req.body.tracks, nUserID);

        console.log("FILTERED TRACK DATA\n", aFilteredTrackData);

        // --- Create and save artist profile into DB ---
        
        const artistProfile = new ArtistProfile({
            _id: new mongoose.Types.ObjectId(),
            username: artistUsername,
            userID: nUserID,
            tracks: [ ...aFilteredTrackData ]
        });

        const result = await artistProfile.save();

        const url = `${Utilities.getURLBase(req)}/artists/${result._id}`;

        console.log("CREATED ARTIST PROFILE\n", result);

        // Send response
        res.status(201).json({
            message: "Created artist profile successfully",
            "artist-profile": {
                // TODO: don't hardcode this
                _id: result._id,
                username: result.username,
                userID: result.userID,
                tracks: result.tracks,
            },
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

exports.music_update_artist_profile = async (req, res, next) => {
    const id = req.params.artistID;

    try {
        // Construct update operations object
        const updateOps = {};

        Object.entries(req.body).forEach(([field, newValue]) => {
            if (UNEDITABLE_FIELDS.includes(field)) {
                throw `Uneditable field: ${field}`;
            }

            // Add in the operation
            updateOps[field] = newValue;
        });

        updateOps["updated"] = Date.now();
        
        // Recompute userID and track data if either are changed
        if (updateOps["username"] || updateOps["tracks"]) {
            const nUserID = await getUserID(updateOps["username"]);

            updateOps["userID"] = nUserID;

            const aFilteredTrackData = await getFilteredTrackData(req.body.tracks, nUserID);

            updateOps["tracks"] = aFilteredTrackData;
        }

        const result = await ArtistProfile.updateOne({ _id: id }, { $set: updateOps }, { runValidators: true }).exec();

        if (!result || result.nModified < 1) {
            throw "Unable to update artist profile";
        }

        let url = `${Utilities.getURLBase(req)}/artists/${id}`;

        // Send response
        res.status(200).json({
            message: "Artist profile updated",
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

exports.music_delete_artist_profile = async (req, res, next) => {
    const id = req.params.artistID;

    try {
        const removed = await ArtistProfile.findOneAndRemove({ _id: id }).exec();

        if (!removed) {
            throw "Unable to remove artist profile";
        }

        console.log("REMOVED ARTIST PROFILE\n", removed);

        // Send response
        const url = Utilities.getURLBase(req);
        res.status(200).json({
            message: "Artist profile deleted",
            request: {
                type: "POST",
                url: url,
                body: {
                    username: "String",
                    tracks: "Array of String"
                }
            }
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
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
        // --- Scrape ClientID ---

        // Scrape the public client ID from SoundCloud
        const sClientID = await Utilities.SoundCloudScraper.scrapeClientID();

        // Catch if the scraping failed
        if (!sClientID) {
            throw new Error("Unable to get client ID");
        }

        console.log("SCRAPED SOUNDCLOUD CLIENT ID:", sClientID);

        // --- Store ClientID in DB ---

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