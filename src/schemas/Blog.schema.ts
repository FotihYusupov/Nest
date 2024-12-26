import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.set('timestamps', true);
BlogSchema.set('versionKey', false);
