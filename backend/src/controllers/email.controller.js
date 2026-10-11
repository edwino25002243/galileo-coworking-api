const { emailQueue } = require('../queues/email.queue');

const enviarCorreoLento = async (req, res) => {
    try {
        const { destinatario, asunto } = req.body;

        const job = await emailQueue.add('simulacionCorreo', {
            destinatario: destinatario || 'usuario@galileo.edu',
            asunto: asunto || 'Bienvenido a Galileo Coworking'
        });

        res.status(202).json({
            mensaje: 'Trabajo de correo encolado exitosamente',
            jobId: job.id
        });
    } catch (error) {
        console.error('Error al encolar el trabajo:', error);
        res.status(500).json({ error: 'Hubo un problema al encolar la tarea' });
    }
};

module.exports = { enviarCorreoLento };