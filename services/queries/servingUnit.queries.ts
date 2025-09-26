import { useQuery } from "@tanstack/react-query"
import { getServingUnit, getServingUnits } from "../servingunits.services"
import useServingUnitsStore from "@/lib/state/useServingUnitsStore"


const useServingUnits = () => {
    return useQuery({
        queryKey: ["servingUnits"],
        queryFn: getServingUnits,
    })
}

const useServingUnit = () => {
    const { selectedServingUnitId } = useServingUnitsStore();

    return useQuery({
        queryKey: ["servingUnits", {selectedServingUnitId}],
        queryFn: () => getServingUnit(selectedServingUnitId!),
        enabled: !!selectedServingUnitId,
    })
}

export {useServingUnits, useServingUnit}