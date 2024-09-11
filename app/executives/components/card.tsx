import React from 'react'

type Props = {
    image: string,
    name: string,
    position: string
}

const TeamCard = (props: Props) => {
    const { image, name, position } = props
    return (
        <>
            <div className='unit one-third'>
                <div className="grid-container">
                    <div className="grid-img">
                        <div className="h-80">
                            <img
                                src={`/images/team/${image}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                alt="Executive"
                            />
                        </div>
                    </div>

                    <div className="grid-content" style={{ padding: "20px" }}>
                        <h5> {name} <br /> <span style={{ fontSize: "14px" }}>({position})</span></h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamCard