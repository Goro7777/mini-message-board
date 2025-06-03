const pool = require("./pool");

async function getMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
    // const { rows } = await pool.query(
    //     "SELECT * FROM usernames WHERE LOWER(username) LIKE $1",
    //     ["%" + search.toLowerCase() + "%"]
    // );
    // return rows;
}

// async function deleteUsernames() {
//     await pool.query("DELETE FROM usernames");
// }

// async function insertUsername(username) {
//     await pool.query("INSERT INTO usernames (username) VALUES ($1)", [
//         username,
//     ]);
// }

module.exports = {
    getMessages,
    // insertUsername,
    // deleteUsernames,
};
