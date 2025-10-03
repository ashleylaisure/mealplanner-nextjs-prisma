'use client'
import useServingUnitsStore from '@/lib/state/useServingUnitsStore';
import { useServingUnits } from '@/services/actions/servingUnit.queries';
import NoItemsFound from '../NoItemsFound';
import ServingUnitSkeleton from './ServingUnitSkeleton';
import { Button } from '../ui/button';
import { Edit, Trash } from 'lucide-react';
import { useDeleteServingUnit } from '@/services/actions/servingunits.mutations';
import { alert } from '@/lib/state/GlobalStore';

const ServingUnitCards = () => {

  const { updateSelectedServingUnitId, updateServingUnitDialogOpen } = useServingUnitsStore();

  const servingUnitsQuery = useServingUnits();
  const deleteServingUnitMutation = useDeleteServingUnit();

  if (servingUnitsQuery.data?.length === 0) {
    return (
      <NoItemsFound 
        heading="No Serving Units found" 
        subheading="Try adding a new serving Unit" 
        onClick={() => updateServingUnitDialogOpen(true)} 
      />
    )
  }


  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      {servingUnitsQuery.isLoading ? (
        <ServingUnitSkeleton />
      ) : (
        <>
          {servingUnitsQuery.data?.map((item) => (
            <div className="flex flex-col justify-between gap-3 rounded-lg border p-6" key={item.id}>
              <p className="truncate">{item.name}</p>
              <div className="flex gap-1">
                <Button
                  className="size-6"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    updateSelectedServingUnitId(item.id)
                    updateServingUnitDialogOpen(true)
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  className="size-6"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    alert({
                      title: "Delete Serving Unit",
                      description: `Are you sure you want to delete the serving unit "${item.name}"? This action cannot be undone.`,
                      confirmLabel: "Delete",
                      cancelLabel: "Cancel",
                      onConfirm: () => {deleteServingUnitMutation.mutate(item.id)}
                    })
                  }}
                >
                  <Trash />
                </Button>
              </div>

            </div>
          ))}
        </>
      )}

    </div>
  )
}

export default ServingUnitCards