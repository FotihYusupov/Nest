import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getAll() {
    const users = await this.userModel.find();
    return {
      message: "Successfully fetched all users",
      data: users,
    };
  }

  async getMe (id: string) {
    const user = await this.userModel.findById(id);
    if(!user) throw new NotFoundException("User not found");
    const token = await this.jwtService.signAsync({ id: user._id });
    return {
      message: "Successfully fetched current user",
      data: {
        token,
        ...user.toJSON(),
      }
    };
  }

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    const token = await this.jwtService.signAsync({ id: user._id });
    await user.save();
    return {
      message: "Successfully created user",
      data: { token, ...user.toJSON() },
    } 
  }

  async login(login: string, password: string) {
    const user = await this.userModel.findOne({ login, password });
    if(!user) throw new NotFoundException("User not found");
    const token = await this.jwtService.signAsync({ id: user._id });
    return {
      message: "Successfully logged in",
      data: { token, ...user.toJSON() },
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if(!user) throw new NotFoundException("User not found");
    return {
      message: "Successfully updated user",
      data: user,
    };
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete({ _id: id });
    return {
      message: "Successfully deleted user",
    };
  }
}
