import mysql from "mysql2/promise";
import { generateRandomUsers } from "./mock";
import { User } from "../model/user";

// Create a pool of database connections
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "mysql",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "testdb",
    port: parseInt(process.env.MYSQL_PORT || "3306", 10),
    waitForConnections: true,
    connectionLimit: 10, // Adjust according to your needs
    queueLimit: 0, // Unlimited queued requests
});

const databaseInit = async () => {
    const users: User[] = generateRandomUsers(100);

    const initQuery = [
        `
    CREATE TABLE IF NOT EXISTS user_profile(
        id INT AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        gender ENUM('male', 'female', 'non-binary'),
        location VARCHAR(100),
        university VARCHAR(100),
        interests TEXT,
        PRIMARY KEY (id)
    );    
    `,
        `
    CREATE TABLE IF NOT EXISTS recommendation(
      id INT AUTO_INCREMENT,
      user_id INT NOT NULL,
      recommended_user_id INT NOT NULL,
      recommended_date DATE NOT NULL,
      swipe_action ENUM('like','dislike','none'),

      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES user_profile(id) ON DELETE CASCADE,
      FOREIGN KEY (recommended_user_id) REFERENCES user_profile(id) ON DELETE CASCADE
    );
    `,
    ];

    const insertQuery = `INSERT INTO user_profile (name, gender, location, university, interests) VALUES (?, ?, ?, ?, ?);`;

    try {
        //reset db
        // const [result] = await pool.query(createTableQuery);
        await pool.query(`DROP TABLE IF EXISTS recommendation;`);
        await pool.query(`DROP TABLE IF EXISTS user_profile;`);
        await Promise.all(initQuery.map((query) => pool.query(query)));
        await pool.query(`CREATE INDEX idx_user_date ON recommendation (user_id, recommended_date);`);
        for (const user of users) {
            await pool.query(insertQuery, [user.name, user.gender, user.location, user.university, user.interests]);
        }
        console.log(`Database init`);
    } catch (err) {
        console.error("Error creating table", err);
    }
};

export { pool, databaseInit };
