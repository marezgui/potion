import { withApiHandlerGet } from '../../../../lib/api/handler';
import { PotionsService } from '@/lib/services/potions-service';

export const GET = withApiHandlerGet(async () => {
  const discoveredData = PotionsService.getDiscoveredData();
  
  return {
    success: true,
    data: discoveredData,
  };
});
