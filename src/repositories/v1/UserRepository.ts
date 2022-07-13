import { IUser } from "../../interfaces/v1/IUser";
import User from "../../model/v1/User";

export default class UserRepository {
    public async createUser(name: string, email: string, password?: string, photo?: string, document?: string, gender?: string, phone?: string, zipcode?: string, street?: string, city?: string, country?: string, state?: string, addressNumber?: number): Promise<IUser> {
        const user = await User.create({ name, email, password, photo, document, gender, phone, zipcode, street, city, country, state, addressNumber })
        await user.save();
        return user;
    }

    public async getUsers(): Promise<IUser[]> {
        const users = await User.find({})
        return users
    }

    public async findUser(id: string): Promise<IUser | null> {
        const user = await User.findById(id)
        return user
    }
    public async put(id: string, data: IUser): Promise<IUser | null> {
        const user = await User.findByIdAndUpdate(id, data)
        return user
    }
    public async destroy(id: string): Promise<IUser | null> {
        const user = await User.findByIdAndDelete(id)
        return user
    }
    public async verifyEmail(email: string): Promise<boolean>{
        const user = await User.findOne({email})
        if(user) {
            return true
        } else {
            return false
        }
    }
}