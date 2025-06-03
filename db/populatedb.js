#! /usr/bin/env node

const { Client } = require("pg");

const messages = [
    { username: "Andrew", text: "Hi there!", added: "2025-06-03 16:30:58" },
    {
        username: "Vlad",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra ex eu orci maximus iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque viverra libero metus, vitae fringilla risus consectetur sed. Sed venenatis nec mi a dignissim. Ut semper bibendum tortor, eget tincidunt purus aliquam in. Praesent vitae leo lectus. Nulla dignissim mauris eget consequat tincidunt. Nulla ut ante at lorem eleifend condimentum. Donec laoreet enim a felis dictum vehicula. Cras tempus eget ex vitae vestibulum. Praesent iaculis velit est, in sagittis dolor mollis eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas consequat metus in erat vestibulum, non scelerisque nisl elementum. Etiam efficitur, mauris vel fermentum pretium, dui enim imperdiet magna, a ultricies libero ipsum ac purus. Morbi tempor purus et nunc hendrerit, non cursus purus tincidunt. Morbi a ante sollicitudin, pulvinar turpis non, egestas nunc.",
        added: "2025-06-03 17:01:23",
    },
];

let SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT,
    text TEXT,
    added TIMESTAMP
);

INSERT INTO messages (username, text, added) VALUES 
`;

for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    SQL += `('${message.username}', '${message.text}', to_timestamp(${new Date(
        message.added
    ).getTime()} / 1000.0))`;

    if (i < messages.length - 1) SQL += `,`;
}

let name = process.argv[2];
let password = process.argv[3];

async function main() {
    console.log("seeding...");
    console.log(name, password);
    const client = new Client({
        connectionString: `postgresql://${name}:${password}@localhost:5432/messages_db`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
