import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { Express } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import Next from 'next';

async function bootstrap() {
  const next = Next({ dev: true, dir: 'src' });
  await next.prepare();
  const app = await NestFactory.create(AppModule);
  const adapterHost = app.get(HttpAdapterHost);
  const httpServer: Express = adapterHost.httpAdapter.getInstance();
  httpServer.use(async (req, res, nextFn) => {
    if (req.url.startsWith('/api')) return nextFn(); // Let Nest handle API
    const handle = next.getRequestHandler();
    await handle(req, res);
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
