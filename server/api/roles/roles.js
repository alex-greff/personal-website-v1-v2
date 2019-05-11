let roles = {
    admin: {
        can: ['edit-user', 'delete-user'],
        inherits: ['editor', 'artist', 'manager']
    },
    editor: {
        can: ['create-project', 'edit-project', 'delete-project', 
            'create-experience', 'edit-experience', 'delete-experience',
            'edit-about'],
        inherits: ['default']
    },
    artist: {
        can: ['create-theme', 'edit-theme', 'delete-theme'],
        inherits: ['default']
    },
    manager: {
        can: ['create-artist', 'edit-artist', 'delete-artist', 'view-client-ID', 'regenerate-client-ID'],
        inherits: ['default']
    },
    default: {
        can: ['edit-self', 'delete-self']
    }
};

module.exports = roles;