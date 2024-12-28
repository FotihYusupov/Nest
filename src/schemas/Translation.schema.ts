import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TranslationDocument = HydratedDocument<Translation>;

@Schema()
export class Translation {
  @Prop({ required: true })
  message: string;

  @Prop()
  uz?: string;

  @Prop()
  ru?: string;

  @Prop()
  en?: string;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);

TranslationSchema.set('versionKey', false);
