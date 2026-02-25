import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase.client';

export interface MerchantRecord {
    id: string;
    wallet: string;
    name: string;
    logo: string;
    category: string;
    is_active: boolean;
}

export interface FindAllMerchantsOptions {
    limit: number;
    offset: number;
    isActive: boolean;
}

export interface FindAllMerchantsResult {
    merchants: MerchantRecord[];
    total: number;
}

/**
 * Encapsulates all Supabase queries for the `merchants` table.
 */
@Injectable()
export class MerchantsRepository {
    constructor(private readonly supabaseService: SupabaseService) { }

    /**
     * Returns a paginated list of merchants filtered by is_active status.
     * Also returns the total count of matching records for pagination metadata.
     */
    async findAll({ limit, offset, isActive }: FindAllMerchantsOptions): Promise<FindAllMerchantsResult> {
        const { data, error, count } = await this.supabaseService
            .getClient()
            .from('merchants')
            .select('id, wallet, name, logo, category, is_active', { count: 'exact' })
            .eq('is_active', isActive)
            .range(offset, offset + limit - 1);

        if (error) {
            throw new InternalServerErrorException({
                code: 'DATABASE_QUERY_ERROR',
                message: error.message,
            });
        }

        return {
            merchants: (data as MerchantRecord[]) ?? [],
            total: count ?? 0,
        };
    }
}
