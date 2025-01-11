"use client"

type Props = {

    image: string
}

const SingleImage = (data: Props) => {
    return (
        <>
            <div className='col-span-1'>
                <div className="grid-container">
                    <div className="grid-img">
                        <div className="h-96">
                            <img
                                src={`/images/gallery/${data.image}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                alt="Contestant"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleImage