import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  startDate: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'Empty for the current position',
  })
  endDate: Date | null;

  @Field(() => [String])
  achievements: string[];
}
