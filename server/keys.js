module.exports = {
    mongoUri: process.env.MONGO_URI,
    mongoUsername: process.env.MONGO_USERNAME,
    mongoPassword: process.env.MONGO_PASSWORD,
    jwtKey: process.env.JWT_KEY,
    jwtTokenExpireTime: process.env.JWT_TOKEN_EXPIRE_TIME,
    contactService: process.env.PERSONAL_WEBSITE_CONTACT_EMAIL_SERVICE,
    contactEmail: process.env.PERSONAL_WEBSITE_CONTACT_EMAIL,
    contactPassword: process.env.PERSONAL_WEBSITE_CONTACT_PASSWORD,
    driveClientEmail: process.env.PERSONAL_WEBSITE_DRIVE_CLIENT_EMAIL,
    drivePrivateKey: process.env.PERSONAL_WEBSITE_DRIVE_PRIVATE_KEY,
    driveRootFolderID: process.env.PERSONAL_WEBSITE_DRIVE_ROOT_FOLDER_ID,
};