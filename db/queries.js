const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query(
        "SELECT * FROM messages ORDER BY added DESC"
    );
    return rows;
}

async function getMessage(id) {
    const { rows } = await pool.query(
        `SELECT * FROM messages WHERE id = ${id}`
    );
    return rows[0];
}

async function addMessage(message) {
    await pool.query(
        "INSERT INTO messages (username, text, added) VALUES ($1, $2, to_timestamp($3))",
        [message.username, message.text, message.added / 1000]
    );
}

async function deleteMessage(id) {
    await pool.query(`DELETE FROM messages WHERE id = ${id}`);
}

async function editMessage(message) {
    await pool.query(
        `UPDATE messages 
        SET username = $1, text = $2, added = to_timestamp($3) 
        WHERE id = ${message.id}`,
        [message.username, message.text, message.added / 1000]
    );
}

module.exports = {
    getAllMessages,
    getMessage,
    addMessage,
    deleteMessage,
    editMessage,
};
