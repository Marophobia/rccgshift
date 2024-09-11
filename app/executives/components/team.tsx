"use client"
import React from 'react'
import Link from 'next/link'
import TeamCard from './card'

type Props = {}

const Team = (props: Props) => {
    return (
        <>
            <div className="grid">
                <div className="unit whole">
                    <h4 className='borderr'>RCCG Leaders</h4>
                    <TeamCard image='GO.jpg' name='Pst E.A Adeboye' position='General Overseer, RCCG' />
                    <TeamCard image='folu.jpg' name='Pst Folu Adeboye' position='Mother in Israel, RCCG' />
                    <TeamCard image='iyp.jpg' name='Pst Belemina Obunge' position='Intercontinental Youth Pastor, RCCG' />

                    <h4 className='borderr'>Shift Executives</h4>
                    <TeamCard image='steve.jpg' name='Engr Steve Ozeh' position='Director, Intl Shift Talent' />
                    <TeamCard image='james.jpg' name='Pst James Oyesanmi' position='Deputy Director, Intl Shift Talent' />
                    <TeamCard image='abigail.jpg' name='Abigail Atuogu' position='Intl Shift Admin' />
                    <TeamCard image='seye.jpg' name='Pst Oluwaseye Dairo' position='Director Logistics / Asst IT / Region 11 Shift Cord.' />
                    <TeamCard image='jonah.jpg' name='Jonah Paul Lawrence' position='Director of Prayer' />
                    <TeamCard image='abiodun.jpg' name='Abiodun Aderohunmu' position='SHIFT South West Coordinator / Director of Programmes / Region 36 Director' />
                    <TeamCard image='yemi.jpg' name='Yemi Adetonwa' position='Director of Administration' />
                    <TeamCard image='adesola.jpg' name='Adesola Ayodele' position='Director, Technical /  Region 45 Shift Cord.' />
                    <TeamCard image='israel.jpg' name='Israel Alalade' position='Director, Media & Publicity' />
                </div>

                <TeamCard image='oni.jpg' name='Oni Oluwagbemiga' position='Director, Production' />
                <TeamCard image='samson.jpg' name='Samson Sadiq' position='Director of Admin 2' />
                <TeamCard image='david.jpg' name='A/P Oladele Mayowa David' position='Asst. Welfare 2 / Region 38 Cord.' />
                <TeamCard image='samuel.jpg' name='Oluwaseyi Samuel' position='Region 41 Shift Cord.' />
                <TeamCard image='stan.jpg' name='Azimhi Stan.' position='Region 32 Shift Cord.' />
                <TeamCard image='moses.jpg' name='Pst Samson Moses olawale' position='Regional Coordinator' />
                <TeamCard image='collins.jpg' name='Collins Ojo Abu' position='Shift Coordinator, Southern Nigeria' />
                <TeamCard image='olorunshola.jpg' name='Pst Olorunshola Omotayo' position='Region 42 Shift Cord.' />
                <TeamCard image='joseph.jpg' name='Pst Joseph Bisong Ekpang' position='Region 28 Shift Cord.' />
                <TeamCard image='joshua.jpg' name='Ilesanmi Oluwaseyi Joshua' position='Director of Welfare' />
                <TeamCard image='sandra.jpg' name='Emesiri Sandra Ikide' position='Director of Contestants' />
                <TeamCard image='usoro.jpg' name='Samuel Usoro' position='Director of Programs / Region 47 Shift Cord.' />

                <h4 className='borderr'>Judges</h4>
            </div>
        </>
    )
}

export default Team