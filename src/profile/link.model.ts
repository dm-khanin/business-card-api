import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => ID)
  id: number;

  @Field()
  label: string;

  @Field()
  url: string;
}
