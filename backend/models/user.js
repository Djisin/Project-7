const user = {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    timeCreated: { type: Date, required: true }
}

module.exports = user;