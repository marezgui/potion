'use client';

import { RefreshCwIcon, AlertCircleIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const InventoryLoading = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <RefreshCwIcon className="animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading magical ingredients...
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-3">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-16 mx-auto" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

type InventoryErrorProps = {
  error: string;
  onRetry?: () => void;
};

export const InventoryError = ({ error, onRetry }: InventoryErrorProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircleIcon className="text-red-500" />
      <div className="flex-1">
        <p className="font-medium text-red-800">Failed to load inventory</p>
        <p className="text-sm text-red-600">{error}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="ml-auto"
        >
          Retry
        </Button>
      )}
    </div>
  );
};

export const InventoryEmpty = () => {
  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">🫙</div>
      <p className="text-muted-foreground">
        Your magical inventory is empty. Start exploring to find ingredients!
      </p>
    </div>
  );
};
