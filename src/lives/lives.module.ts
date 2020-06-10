import { Module } from '@nestjs/common';
import { LivesController } from './lives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Live } from './live.model';
import { LivesSubscriber } from './subscriber/livesSubscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Live])],
  controllers: [LivesController],
  providers: [LivesSubscriber],
})
export class LivesModule {}
