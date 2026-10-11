const prisma = require('../config/db');

const getRoles = async (req, res) => {
    try {
        const roles = await prisma.role.findMany();
        res.json({ success: true, data: roles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getRoles };