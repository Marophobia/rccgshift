import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import Image from 'next/image';

type Props = {};

const ContestantCarousel = (props: Props) => {
    return (
        <div className="hover:first:-translate-y-20 hover:last:-translate-y-10 transition ease-linear">
            <Card className="w-[320px] h-[350px] rounded-none ">
                <CardContent className="flex flex-col items-center justify-center h-full">
                    <Image
                        src={'/img/service-2.jpg'}
                        width={200}
                        height={200}
                        alt="person"
                        className="w-full origin-center rounded-full"
                    />
                </CardContent>
            </Card>
            <Button className="absolute text-center p-5 -z-10 botto w-[20rem]">
                Category
            </Button>
        </div>
    );
};

export default ContestantCarousel;
