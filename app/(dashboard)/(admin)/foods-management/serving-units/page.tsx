import ServingUnitCards from '@/components/cards/ServingUnitCards'
import ServingUnitForm from '@/components/forms/ServingUnitForm'


const ServingUnitsPage = () => {
    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-semibold">Serving Units</h1>
                <ServingUnitForm />
            </div>
            <ServingUnitCards />
        </>
    )
}

export default ServingUnitsPage