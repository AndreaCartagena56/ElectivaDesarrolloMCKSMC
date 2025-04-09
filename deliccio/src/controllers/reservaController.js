const path = require('path');
const ReservaService = require('../services/reservaService'); 

class ReservaController {
    // Renderizar la página de reservas
    getWinePage(req, res) {
        res.sendFile(path.join(__dirname, '../public/views/wine.html'));
    }

    // Guardar una reserva en la base de datos
    async registrarReserva(req, res) {
        try {
            const reservaData = req.body;

            // Aquí deberías obtener el id del usuario, por ejemplo, si está en la sesión:
            const id_usuario = req.session.userId; // Esto depende de cómo manejas la sesión/autenticación
            reservaData.id_usuario = id_usuario;

            const reserva = await ReservaService.crearReserva(reservaData);
            res.status(201).json(reserva);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ReservaController();
