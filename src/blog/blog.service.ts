import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/Schemas/Blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<Blog>
  ) {}
  async findAll() {
    const blogs = await this.blogModel.find().populate('author');
    return {
      message: "Successfully fetched all blogs",
      data: blogs
    }
  }

  async findOne(id: number) {
    const findBlog = await this.blogModel.findById(id);
    if(!findBlog) throw new NotFoundException("Blog not found");
    return {
      message: "Successfully fetched blog",
      data: findBlog
    }
  }

  async create(createBlogDto: CreateBlogDto) {
    const newBlog = new this.blogModel(createBlogDto);
    await newBlog.save();
    return {
      message: "Successfully created blog",
      data: newBlog
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true });
    if(!updatedBlog) throw new NotFoundException("Blog not found");
    return {
      message: "Successfully updated blog",
      data: updatedBlog
    }
  }

  async remove(id: number) {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id);
    if(!deletedBlog) throw new NotFoundException("Blog not found");
    return {
      message: "Successfully deleted blog",
      data: deletedBlog
    }
  }
}
