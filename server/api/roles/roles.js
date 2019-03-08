let roles = {
    admin: {
        can: ['edit-user', 'delete-user'],
        inherits: ['editor', 'artist']
    },
    editor: {
        can: ['create-project', 'edit-project', 'delete-project'],
        inherits: ['default']
    },
    artist: {
        can: ['create-theme', 'edit-theme', 'delete-theme'],
        inherits: ['default']
    },
    default: {
        can: ['edit-self', 'delete-self']
    }
};

module.exports = roles;