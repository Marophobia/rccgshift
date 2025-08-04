"use client"
import TeamCard from '@/app/executives/components/card'
import { IOfficials, OfficialType } from '@/app/types/officials'
import React, { useState } from 'react'

    type Props = {
        coordinators: IOfficials[]
    }   

const CoordinatorsList = (props: Props) => {
    const {coordinators} = props
    const [position, setPosition] = useState<string>("")

    //determine the type of coordinator
    // const coordinatorType = coordinators.type
    
    // if (coordinatorType === OfficialType.provincial_shift_coordinator) {
    //     setPosition(`PROVINCIAL SHIFT COORDINATOR, Province ${coordinators.official_sessions[0].province}`)
    // } else if (coordinatorType === OfficialType.assistant_regional_shift_coordinator) {
    //     setPosition(`ASSISTANT REGIONAL SHIFT COORDINATOR, Region ${coordinators.official_sessions[0].region}`)
    // } else if (coordinatorType === OfficialType.regional_shift_coordinator) {
    //     setPosition(`REGIONAL SHIFT COORDINATOR, Region ${coordinators.official_sessions[0].region}`)
    // }

    return (
        <>
            <style jsx>{`.grid:before, .grid:after {display: none !important;}`}</style>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' style={{ display: 'grid' }}>
                {coordinators.map((coordinator: IOfficials) => (
                    //determine the position of the coordinator
                    <TeamCard key={coordinator.id} image={`https://images.rccgshift.org/${coordinator.image}`} 
                    name={`${coordinator.name}`} position={`${coordinator.type === OfficialType.provincial_shift_coordinator ? `PROVINCIAL SHIFT COORDINATOR, Province ${coordinator.official_sessions[0].province}` : coordinator.type === OfficialType.assistant_regional_shift_coordinator ? `ASSISTANT REGIONAL SHIFT COORDINATOR, Region ${coordinator.official_sessions[0].region}` : `REGIONAL SHIFT COORDINATOR, Region ${coordinator.official_sessions[0].region}`}`} />                   
                ))}
            </div>
        </>
    )
}       

export default CoordinatorsList