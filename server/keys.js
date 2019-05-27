module.exports = {
    mongoUri: process.env.MONGO_URI,
    mongoUsername: process.env.MONGO_USERNAME,
    mongoPassword: process.env.MONGO_PASSWORD,
    jwtKey: process.env.JWT_KEY,
    jwtTokenExpireTime: process.env.JWT_TOKEN_EXPIRE_TIME,
    contactService: process.env.PERSONAL_WEBSITE_CONTACT_EMAIL_SERVICE,
    contactEmail: process.env.PERSONAL_WEBSITE_CONTACT_EMAIL,
    contactPassword: process.env.PERSONAL_WEBSITE_CONTACT_PASSWORD
};