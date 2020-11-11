import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS setup
  const whitelist = ['']; // TODO: create your new whitelist
  app.enableCors({
    origin: function(origin, callback) {
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origin blocked by CORS Policy'));
      }
    },
  });

  app.use(compression());
  app.use(helmet());

  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('TODO')
    .setDescription('The TODO API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
