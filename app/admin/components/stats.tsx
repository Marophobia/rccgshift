"use client"
import StatsComp from "./statsComp";

type Props = {
    contestants: number
}

const Stats = (props: Props) => {

    const { contestants } = props

    return (
        <>
            <div className='col-span-full 2xl:col-span-5 card'>
                <div className='grid grid-cols-12 gap-4'>
                    <StatsComp name="All Contestants" count={contestants} />
                    <StatsComp name="Judges" count={3} />
                    <StatsComp name="All Contestants" count={200} />
                    <StatsComp name="Judges" count={3} />
                </div>
            </div>
        </>
    );
};

export default Stats;
