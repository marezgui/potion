import { NextRequest } from 'next/server';
import { withApiHandler, validateRequestBody } from '../../../../lib/api/handler';
import { brewPotionSchema } from '../../../../lib/api/schemas';
import { PotionsService } from '../../../../lib/services/potions-service';

export const POST = withApiHandler(async (request: NextRequest) => {
  const validation = await validateRequestBody(request, brewPotionSchema);
  
  if (!validation.success) {
    return {
      success: false,
      error: validation.error,
    };
  }

  const result = PotionsService.brewPotion(validation.data.ingredients);
  
  return {
    success: result.success,
    data: result.success ? {
      potion: result.potion,
      recipe: result.recipe,
    } : undefined,
    message: result.message,
    ...(!result.success && { error: result.message }),
  };
});
