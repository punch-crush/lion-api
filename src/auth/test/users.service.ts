import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
	private readonly users = [
		{
			_id: 1,
			username: 'username1',
			accountname: 'useraccount1',
			email: 'john@gmail.comma',
			password: 'changeme',
			image: '',
		},
		{
			_id: 2,
			username: 'username2',
			accountname: 'useraccount2',
			email: 'maria@gmail.comma',
			password: 'guess',
			image: '111.png',
		},
	];

	async findOne(email: string): Promise<User | undefined> {
		return this.users.find(user => user.email === email);
	}
}
