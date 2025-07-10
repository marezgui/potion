import { NextRequest } from 'next/server';
import { withApiHandler, withApiHandlerGet, validateRequestBody } from '../../../lib/api/handler';
import { inventoryUpdateSchema } from '../../../lib/api/schemas';
import { InventoryService } from '../../../lib/services/inventory-service';

export const GET = withApiHandlerGet(async () => {
  const inventory = InventoryService.getInventory();
  
  return {
    success: true,
    data: inventory,
  };
});

export const POST = withApiHandler(async (request: NextRequest) => {
  const validation = await validateRequestBody(request, inventoryUpdateSchema);
  
  if (!validation.success) {
    return {
      success: false,
      error: validation.error,
    };
  }

  const result = InventoryService.handleInventoryAction(validation.data);
  
  return {
    success: true,
    data: result.inventory,
    message: result.message,
  };
});
