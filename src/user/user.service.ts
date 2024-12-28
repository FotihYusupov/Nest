import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async getMe(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException("User not found");
    const token = await this.jwtService.signAsync({ id: user._id });
    return {
      message: "Successfully fetched current user",
      data: {
        token,
        user,
      }
    };
  }

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    user.role = "admin";
    const token = await this.jwtService.signAsync({ id: user._id, role: user.role });
    await user.save();
    return {
      message: "Successfully created user",
      data: { token, user },
    }
  }

  async login(login: string, password: string) {
    const user = await this.userModel.findOne({ login, password });
    if (!user) throw new NotFoundException("User not found");
    const token = await this.jwtService.signAsync({ id: user._id, role: user.role });
    return {
      message: "Successfully logged in",
      data: { token, user },
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!user) throw new NotFoundException("User not found");
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
