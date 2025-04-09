const mysql = require('mysql2');

// Configura la conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_pec',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

class ReservaRepository {

    // Verifica si ya hay una reserva con esa fecha y hora
    async findByFechaYHora(fecha, hora) {
        const [rows] = await promisePool.query(
            'SELECT * FROM reserva WHERE Fecha_Reserva = ? AND Hora_Reserva = ?',
            [fecha, hora]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    // Crea una nueva reserva
    async createReserva(reserva) {
        const { Fecha_Reserva, Hora_Reserva, Numero_personas, id_usuario } = reserva;
        try {
            const [result] = await promisePool.query(
                `INSERT INTO reserva (Fecha_Reserva, Hora_Reserva, Numero_personas, id_usuario)
                 VALUES (?, ?, ?, ?)`,
                [Fecha_Reserva, Hora_Reserva, Numero_personas, id_usuario]
            );
            return { id_reserva: result.insertId, ...reserva };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new ReservaRepository();
