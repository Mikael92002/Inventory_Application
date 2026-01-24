const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS inventory;

CREATE TABLE IF NOT EXISTS inventory(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category VARCHAR(20) NOT NULL,
item VARCHAR(100),
price DECIMAL(7,2),
imageURL VARCHAR(255),
quantity SMALLINT,
CONSTRAINT unique_item UNIQUE(category, item)
);

INSERT INTO inventory(category, item, price, imageURL, quantity)
VALUES
('Clothes', NULL, NULL, NULL, NULL),
('Games', NULL, NULL, NULL, NULL),
('Games', 'Red Dead Redemption 2', 79.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9aWi973YDg9sm9j4v6Yg4q1hYsFKmr0vAfA&s', 1),
('Clothes', 'Jammies', 35.99, 'https://cdni.llbean.net/is/image/wim/510853_51692_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/510853_51692_41', 2),
('Games', 'Burnout: Paradise', 79.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk-ktoqjiKOpmnlfVzUONoIOZrhnjr3HTdvfpRDnc1RQK3wKMqDXW6JOGcg2ghJswHAYEu&s=10', 1)`;

async function main() {
  console.log("seeding...");
  const clientConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        connectionString: `postgresql://${process.env.USER}:${process.env.PW}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`,
      };
  const client = new Client(clientConfig);
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
