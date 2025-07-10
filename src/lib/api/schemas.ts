import { z } from 'zod';

export const ingredientIdSchema = z.string().min(1, 'Ingredient ID cannot be empty');
export const deltaSchema = z.number().int('Delta must be an integer');

export const inventoryActionSchema = z.enum(['reset', 'recharge', 'update']);

export const inventoryUpdateSchema = z.object({
  action: inventoryActionSchema,
  ingredientId: ingredientIdSchema.optional(),
  delta: deltaSchema.optional()
}).refine((data) => {
  if (data.action === 'update') {
    return data.ingredientId !== undefined && data.delta !== undefined;
  }
  return true;
}, {
  message: 'ingredientId and delta are required when action is "update"',
  path: ['ingredientId']
});

export const ingredientsArraySchema = z
  .array(z.string().min(1, 'Ingredient ID cannot be empty'))
  .length(3, 'Exactly 3 ingredients are required')
  .refine((ingredients) => {
    const unique = new Set(ingredients);
    return unique.size === ingredients.length;
  }, {
    message: 'Duplicate ingredients are not allowed'
  });

export const brewPotionSchema = z.object({
  ingredients: ingredientsArraySchema
});

export type InventoryUpdateRequest = z.infer<typeof inventoryUpdateSchema>;
export type BrewPotionRequest = z.infer<typeof brewPotionSchema>; 