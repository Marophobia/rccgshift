"use client"
import TeamCard from '@/app/executives/components/card'
import React from 'react'

type Props = {}

const JudgesList = (props: Props) => {

    return (
        <>
            <style jsx>{`.grid:before, .grid:after {display: none !important;}`}</style>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' style={{ display: 'grid' }}>
                <TeamCard image='tosin.jpg' name='Min. Tosin Bee' position='Int&apos;l Gospel minister | Director, Beezle Nation Record' />
                <TeamCard image='lekun.jpg' name='Pst Bamigboye Lekan' position='Aviation expert, public speaker & Gospel min' />
                <TeamCard image='chioma.jpg' name='Chioma G. Ifemeludike ' position='Movie Director & Producer, CEO CGI production' />
                <TeamCard image='paul.jpg' name='Min. Paul Nams' position='Gospel minister, CEO Paul Nams & De Unveilers' />
            </div>

            <h4 className='borderr'>INT&apos;L SHIFT ANCHOR</h4>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' style={{ display: 'grid' }}>
                <TeamCard image='michael.jpg' name='Michael Adeniyan' position='Educational Consultant, CEO Sophia-Brooks Academy' />
            </div>
        </>
    )
}

export default JudgesList