import {
  isPhoneNumber,
  matches,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export class PropertyClass {
  optional? = true;
  match? = /^\+[1-9]\d{1,14}$/;
}

export function isPhoneNumberValid(
  property?: PropertyClass,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          /*console.log('value ', isNaN(value), value);
          console.log('relatedPropertyName', relatedPropertyName);
          console.log('relatedValue', relatedValue);*/
          if (value !== null && value !== '')
            if (
              typeof value === 'string' &&
              isPhoneNumber(value) &&
              matches(value, relatedPropertyName.match)
            )
              return true;
            else return false;
          else if (relatedPropertyName.optional) return true;
          else return false;
        },
      },
    });
  };
}
