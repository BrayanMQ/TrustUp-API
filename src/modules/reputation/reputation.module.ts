import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReputationService } from './reputation.service';
import { ReputationController } from './reputation.controller';
import { getRedisConfig } from '../../config/redis.config';
import { SupabaseService } from '../../database/supabase.client';

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getRedisConfig,
        }),
    ],
    providers: [ReputationService, SupabaseService],
    controllers: [ReputationController],
    exports: [ReputationService],
})
export class ReputationModule { }
