import React from 'react'
import {
    CarouselItem,
} from '../../components/ui/carousel';

type Props = {
    image: string
}

const Item = (props: Props) => {
    const { image } = props
    return (
        <>
            <CarouselItem className="basis-[320px]">
                <figure className="ombre-carousel">
                    <div className="gallery link">
                        <img src={image} alt="" />
                    </div>
                    <figcaption>
                        <a className="arrow-button">Music Category</a>
                    </figcaption>
                </figure>
            </CarouselItem>
        </>
    )
}

export default Item