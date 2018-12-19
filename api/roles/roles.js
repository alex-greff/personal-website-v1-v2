let roles = {
    admin: {
        can: ['edit-user', 'delete-user'],
        inherits: ['editor']
    },
    editor: {
        can: ['create-project', 'edit-project', 'delete-project'],
        inherits: ['default']
    },
    default: {
        can: ['edit-self', 'delete-self']
    }
};

module.exports = roles;