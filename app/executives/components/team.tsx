"use client"
import React from 'react'
import Link from 'next/link'
import TeamCard from './card'

type Props = {}

const Team = (props: Props) => {
    return (
        <>
            <style jsx>{`.grid:before, .grid:after {display: none !important;}`}</style>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' style={{ display: 'grid' }}>
                <TeamCard image='GO.jpg' name='Pst E.A Adeboye' position='General Overseer, RCCG' />
                <TeamCard image='folu.jpg' name='Pst Folu Adeboye' position='Mother in Israel, RCCG' />
                <TeamCard image='iyp.jpg' name='Pst Belemina Obunge' position='Intercontinental Youth Pastor, RCCG' />
                <TeamCard image='steve.jpg' name='Engr Steve Ozeh' position='Director, Intl Shift Talent' />
                <TeamCard image='james.jpg' name='Pst James Oyesanmi' position='Deputy Director, Intl Shift Talent' />
                <TeamCard image='abigail.jpg' name='Abigail Atuogu' position='Intl Shift Admin' />
            </div>

            <h4 className='borderr'>Shift Int&apos;l Executives</h4>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' style={{ display: 'grid' }}>
                <TeamCard image='seye.jpg' name='Pst Oluwaseye Dairo' position='Director of Logistics / IT' />
                <TeamCard image='jonah.jpg' name='Pst Jonah Paul Lawrence' position='Director of Prayer' />
                <TeamCard image='abiodun.jpg' name='Pst Abiodun Aderohunmu' position='Director of Programmes' />
                <TeamCard image='yemi.jpg' name='Pst Yemi Adetonwa' position='Director of Administration' />
                <TeamCard image='adesola.jpg' name='Pst Adesola Ayodele' position='Director of Technicals' />
                <TeamCard image='israel.jpg' name='Pst Israel Alalade' position='Director, Media & Publicity' />
                <TeamCard image='collins.jpg' name='Pst Collins Ojo Abu' position='Director of Finance and Treasury' />
                <TeamCard image='oni.jpg' name='Pst Oni Oluwagbemiga' position='Director of Production' />
                <TeamCard image='samson.jpg' name='Barr Samson Sadiq' position='Asst. Director of Administration' />
                <TeamCard image='joshua.jpg' name='Pst Ilesanmi Oluwaseyi Joshua' position='Director of Welfare' />
                <TeamCard image='david.jpg' name='Pst  Oladele Mayowa David' position='Asst. Director of Welfare' />
                <TeamCard image='sandra.jpg' name='Emesiri Sandra Ikide' position='Director of Contestants' />
                <TeamCard image='usoro.jpg' name='Pst Samuel Usoro' position='Director of Programs' />
            </div>

            <h4 className='borderr'>Regional Coordinators</h4>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' style={{ display: 'grid' }}>
                <TeamCard image='samuel.jpg' name='Pst Oluwaseyi Samuel' position='Region 41 Shift Coordinator' />
                <TeamCard image='stan.jpg' name='Pst Azimhi Stan.' position='Region 32 Shift Coordinator' />
                <TeamCard image='moses.jpg' name='Pst Samson Moses olawale' position='Region 8 Shift Coordinator' />
                <TeamCard image='olorunshola.jpg' name='Pst Olorunshola Omotayo' position='Region 42 Shift Coordinator' />
                <TeamCard image='joseph.jpg' name='Pst Joseph Bisong Ekpang' position='Region 28 Shift Coordinator' />
            </div >
        </>
    )
}

export default Team