import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  last_name: string;

  @Prop()
  email: string;

  @Prop({
    unique: true,
  })
  login: string;

  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop()
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('timestamps', true);
UserSchema.set('versionKey', false)
