const ReservaRepository = require('../repositories/reservaRepository');

class ReservaService {
    async crearReserva(reservaData) {
        const { Fecha_Reserva, Hora_Reserva } = reservaData;

        // Verificar si ya existe una reserva con esa fecha y hora
        const reservaExistente = await ReservaRepository.findByFechaYHora(Fecha_Reserva, Hora_Reserva);
        if (reservaExistente) {
            throw new Error('Ya existe una reserva para esa fecha y hora.');
        }

        // Si no hay conflicto, crear la reserva
        return ReservaRepository.createReserva(reservaData);
    }
}

module.exports = new ReservaService();
