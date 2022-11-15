import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './ether.module-definition';
import { EtherService } from './ether.service';
import { LoggerModule } from '../common/logger/logger.module';

@Module({
    imports: [LoggerModule],
    providers: [EtherService],
    exports: [EtherService],
})
export class EtherModule extends ConfigurableModuleClass { }
