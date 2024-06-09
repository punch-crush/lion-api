import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
	private readonly users = [
		{
			_id: 1,
			email: 'john',
			password: 'changeme',
		},
		{
			_id: 2,
			email: 'maria',
			password: 'guess',
		},
	];

	async findOne(email: string): Promise<User | undefined> {
		return this.users.find(user => user.email === email);
	}
}
