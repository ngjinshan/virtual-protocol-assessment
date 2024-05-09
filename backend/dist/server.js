"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const connectionConfig = {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "testdb",
    port: parseInt(process.env.MYSQL_PORT || "3306", 10),
};
let connection;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            connection = yield promise_1.default.createConnection(connectionConfig);
            console.log("Connected to MySQL db");
        } catch (err) {
            console.error("Error", err);
        }
    });
}
connectToDatabase();
// Example route
app.get("/", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        if (connection) {
            const [rows] = yield connection.query("SELECT NOW() AS now");
            res.json({ message: "Node.js TypeScript + MySQL", time: rows });
        } else {
            res.status(500).send("No MySQL connection.");
        }
    }),
);
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map
