import { ConfigurableModuleBuilder } from '@nestjs/common';
import { EtherModuleOptions } from './ether-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<EtherModuleOptions>().build();
