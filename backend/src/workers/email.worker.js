const { Worker } = require('bullmq');
const { redisConnection } = require('../queues/email.queue');

const emailWorker = new Worker('EmailQueue', async (job) => {
    console.log(`\n⏳ [WORKER] Iniciando procesamiento del Job ID: ${job.id}`);
    console.log(`   📧 Enviando correo a: ${job.data.destinatario}`);
    console.log(`   📝 Asunto: ${job.data.asunto}`);

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log(`✅ [WORKER] Job ID: ${job.id} completado con éxito. Correo enviado.`);
    
    return { status: 'enviado_correctamente' };
}, { 
    connection: redisConnection,
    settings: {
        backoffStrategies: {}
    }
});

emailWorker.on('completed', (job) => {
    console.log(`🎉 Trabajo ${job.id} finalizado sin errores.`);
});

emailWorker.on('failed', (job, err) => {
    console.error(`❌ El trabajo ${job.id} falló con el error: ${err.message}. Intentando de nuevo...`);
});

module.exports = { emailWorker };