import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value);  // client -> server
  }

  serialize(value: any): number {
    const dateValue = new Date(value);
    if (!isNaN(dateValue.getTime())) {
      return dateValue.getTime();  // server -> client
    }
    throw new Error('Invalid date value');
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
