import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection, EntityTarget, In } from 'typeorm';

export function IdExists<T>(
  entity: EntityTarget<T>,
  name: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IdExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, name],
      validator: IdExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'IdExists', async: true })
@Injectable()
export class IdExistsRule<T> implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async validate(value: number[], args: ValidationArguments) {
    try {
      const [entity, name] = args.constraints;
      const repository = this.connection.getRepository<T>(entity);
      const result = await repository.find({ where: { id: In(value) } });
      if (value.length !== result.length) return false;
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args);
    return `You have any wrong ${args.constraints[1]}, please check and try again`;
  }
}
