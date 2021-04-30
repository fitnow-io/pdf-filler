import { ConfigFactory, registerAs } from '@nestjs/config';
import * as env from 'env-var';
import {
  WinstonModuleOptions,
  utilities as winstonUtilities,
} from 'nest-winston';
import * as winston from 'winston';

enum ConfigTypes {
  Console = 'console',
  StackDriver = 'stackdriver',
}

const getFormat = () => {
  const type = env
    .get('LOGGING')
    .default(ConfigTypes.StackDriver)
    .asEnum([ConfigTypes.Console, ConfigTypes.StackDriver]);

  let format = winston.format.combine(winston.format.json());

  switch (type) {
    case ConfigTypes.Console:
      format = winston.format.combine(
        winstonUtilities.format.nestLike(
          env.get('APP_NAME').default('PDF Filler').asString(),
        ),
        winston.format.timestamp(),
        winston.format.colorize(),
      );
      break;
  }
  return format;
};

export type LoggingConfigType = WinstonModuleOptions;

export const logging = registerAs<ConfigFactory<LoggingConfigType>>(
  'logging',
  () => ({
    transports: [
      new winston.transports.Console({
        format: getFormat(),
      }),
    ],
  }),
);

export const LOGGING_CONFIG_KEY = logging.KEY;
