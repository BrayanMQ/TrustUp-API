import { Injectable } from '@nestjs/common';
import { MerchantsRepository } from '../../database/repositories/merchants.repository';
import { MerchantSummaryDto } from './dto/merchant-summary.dto';

export interface ListMerchantsResult {
    merchants: MerchantSummaryDto[];
    total: number;
    limit: number;
    offset: number;
}

@Injectable()
export class MerchantsService {
    constructor(private readonly merchantsRepository: MerchantsRepository) { }

    /**
     * Returns a paginated list of active merchants.
     */
    async listMerchants(limit: number, offset: number): Promise<ListMerchantsResult> {
        const { merchants, total } = await this.merchantsRepository.findAll({
            limit,
            offset,
            isActive: true,
        });

        const merchantSummaries: MerchantSummaryDto[] = merchants.map((m) => ({
            id: m.id,
            wallet: m.wallet,
            name: m.name,
            logo: m.logo,
            category: m.category,
            isActive: m.is_active,
        }));

        return {
            merchants: merchantSummaries,
            total,
            limit,
            offset,
        };
    }
}
