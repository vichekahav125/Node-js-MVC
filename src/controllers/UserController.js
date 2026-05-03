import { BaseController } from './BaseController.js';
import { User } from '../models/User.js';

export class UserController extends BaseController {
    async getAllUsers(req, res) {
        try {
            const users = await User.getAll();
            await this.success(res, 'Users successfuly', users);
        } catch (error) {
            console.error(error);
            await this.error(res, 'Server Error', 500);
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.getById(req.params.id);
            if (!user) return await this.error(res, 'User not found', 404);
            await this.success(res, 'User successfully', user);
        } catch (error) {
            console.error(error);
            await this.error(res, 'Server Error', 500);
        }
    }

    async createUser(req, res) {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                return await this.error(res, 'name and email are required', 400);
            }
            const user = await User.create(name, email);
            await this.success(res, 'User created successfully', user, 201);
        } catch (error) {
            console.error(error);
            await this.error(res, 'Server Error', 500);
        }
    }

    async updateUser(req, res) {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                return await this.error(res, 'name and email are required', 400);
            }
            const user = await User.update(req.params.id, name, email);
            if (!user) return await this.error(res, 'User not found', 404);
            await this.success(res, 'User updated successfully', user);
        } catch (error) {
            console.error(error);
            await this.error(res, 'Server Error', 500);
        }
    }

    async deleteUser(req, res) {
        try {
            const deleted = await User.delete(req.params.id);
            if (!deleted) return await this.error(res, 'User not found', 404);
            await this.success(res, 'User deleted successfully', { message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            await this.error(res, 'Server Error', 500);
        }
    }
}
