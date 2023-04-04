import pg from "../utils/pg";
import bcrypt from 'bcrypt'

export default class User {
	id: number;
	username: string;
	password: string;

	constructor(row: User) {
		this.id = row.id;
		this.username = row.username;
		this.password = row.password;
	}

	static async signUp(username: string, password: string) {
		const { rows } = await pg.query<User>(`
		INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *
		`, [username, bcrypt.hashSync(password, 8)]);

		if (!rows[0]) throw new Error('unable to create user, try a new username');
		return new User(rows[0]);
	}

	static async signIn(username: string, password: string) {
		const { rows } = await pg.query<User>(`
			SELECT * FROM users WHERE username = $1
			`, [username])

		const user = rows[0]
		if (!user || bcrypt.compareSync(password, user.password)) {
			// if no user, or incorrect password, return no found message as to not allude that a given username exists
			throw new Error('user not found')
		};

		return new User(user)
	}
}