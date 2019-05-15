const express = require("express");
const router = express.Router();
const permit = require("../middleware/permission");

const MusicController = require("../controllers/music");


// ----------------
// --- Requests ---
// ----------------

// [domain]/api/music : GET
router.get("/", MusicController.music_get_all);

// [domain]/api/music/artists : GET
router.get("/artists", MusicController.music_get_all_artist_profiles);

// [domain]/api/music/artists : POST
router.post("/artists", permit(false, "create-artist"), MusicController.music_create_aritst_profile);

// [domain]/api/music/artists/:artistID : GET
router.get("/artists/:artistID", MusicController.music_get_artist_profile);

// [domain]/api/music/artists/:artistID : PATCH
router.patch("/artists/:artistID", permit(false, "edit-artist"), MusicController.music_update_artist_profile);

// [domain]/api/music/artists/:artistID : DELETE
router.delete("/artists/:artistID", permit(false, "delete-artist"), MusicController.music_delete_artist_profile);

// [domain]/api/music/clientID : GET
router.get("/clientID", permit(false, "view-client-ID"), MusicController.music_get_client_ID);

// [domain]/api/music/clientID : PATCH
router.patch("/clientID", permit(false, "regenerate-client-ID"), MusicController.muisc_regenerate_client_ID);


module.exports = router;