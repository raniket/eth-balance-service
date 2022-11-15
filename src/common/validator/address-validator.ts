import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class AddressValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
        value = value.split(',');
    }
    value.forEach(address => {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            throw new BadRequestException('Invalid address');
        }
    });
    if (value.length === 0) {
        throw new BadRequestException('No addresses provided');
    }
    if (value.length > 100) {
        throw new BadRequestException('Too many addresses');
    }
    return value;
  }
}