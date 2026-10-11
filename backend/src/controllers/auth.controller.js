const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, personalId, dateOfBirth, roleName } = req.body;

        const existingUser = await prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
        }

        const roleToAssign = roleName || 'Cliente';
        const role = await prisma.role.findUnique({ where: { name: roleToAssign } });
        
        if (!role) {
            return res.status(400).json({ success: false, message: 'Rol inválido' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.usuario.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                personalId,
                dateOfBirth: new Date(dateOfBirth),
                roleId: role.id
            }
        });

        res.status(201).json({ 
            success: true, 
            message: 'Usuario registrado exitosamente',
            data: { id: newUser.id, email: newUser.email, role: role.name }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.usuario.findUnique({
            where: { email },
            include: { role: true }
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        const payload = {
            userId: user.id,
            role: user.role.name
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            success: true,
            message: 'Login exitoso',
            token,
            user: { id: user.id, email: user.email, role: user.role.name }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { register, login };