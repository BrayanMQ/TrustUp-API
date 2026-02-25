import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MerchantsService } from './merchants.service';
import { ListMerchantsQueryDto } from './dto/list-merchants-query.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Merchants')
@ApiBearerAuth()
@Controller('merchants')
export class MerchantsController {
    constructor(private readonly merchantsService: MerchantsService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'List all active merchants with pagination' })
    @ApiResponse({
        status: 200,
        description: 'Active merchants retrieved successfully.',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized — valid JWT required.' })
    async listMerchants(@Query() query: ListMerchantsQueryDto) {
        const limit = query.limit ?? 20;
        const offset = query.offset ?? 0;

        const data = await this.merchantsService.listMerchants(limit, offset);

        return {
            merchants: data.merchants,
            total: data.total,
            limit: data.limit,
            offset: data.offset,
        };
    }
}
