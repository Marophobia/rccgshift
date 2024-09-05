"use client"
import { Mail, Phone, Star } from 'lucide-react';

type Props = {
    contestant: any
}

const ContestantSingle = (props: Props) => {
    const { contestant } = props

    return (
        <>
            <div className="card">
                <h2 className="card-title">Contestant {contestant.name}</h2>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-full">
                    <div className="col-span-full sm:col-span-6 xl:col-span-4 card p-0">
                        <div className="bg-white dark:bg-dark-card rounded-15 overflow-hidden">
                            <div className="relative w-full h-[250px]">
                                <img src="/images/profile/cover.png" alt="cover-image" className="w-full h-full" />
                                <label className="file-container bg-[url('https://template.codexshaper.com/assets/images/profile/profile.png')] bg-no-repeat bg-cover absolute left-1/2 -translate-x-1/2 -bottom-[calc(theme('spacing.ins-pro-img')_/_2)] w-[calc(theme('spacing.ins-pro-img')_+_5px)] h-[theme('spacing.ins-pro-img')] border-2 border-white dark:border-dark-border-two rounded-20">

                                    <span className="absolute bottom-0 right-0 border-2 border-white dark:border-dark-border-two rounded-full">

                                    </span>
                                </label>
                            </div>
                            <div className="mt-7 px-6 text-center">
                                <div className="py-5">
                                    <div className="flex-center">
                                        <h4 className="text-[22px] leading-none text-heading font-semibold relative">
                                            {contestant.name}
                                            <img src="/images/icons/verified-icon-green.svg" alt="verified-icon" className="absolute -top-1.5 -right-3.5 [&.verified]:block unverified" />
                                        </h4>
                                    </div>
                                    <p className="font-spline_sans leading-[1.62] text-heading dark:text-dark-text mt-2.5">{contestant.bio}</p>
                                </div>
                                <div className='grid lg:grid-cols-12'>
                                    <div className='col-span-6'>
                                        <div className="py-5 border-t border-gray-200 dark:border-dark-border text-left">
                                            <div className="flex-center-between">
                                                <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">Category and Type</h6>
                                            </div>
                                            <ul className="flex items-center flex-wrap gap-2.5 *:rounded-full *:px-2.5 *:py-1.5 mt-4">
                                                <li className="badge badge-primary-light">{contestant.category}</li>
                                                <li className="badge badge-primary-light">{contestant.type}</li>
                                            </ul>
                                        </div>
                                        <div className="py-5 border-t border-gray-200 dark:border-dark-border text-left">
                                            <div className="flex-center-between">
                                                <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">About</h6>

                                            </div>
                                            <ul className="flex flex-col gap-y-3 *:flex *:gap-x-2.5 *:leading-none *:text-gray-500 dark:*:text-dark-text *:font-medium mt-4">
                                                <li>
                                                    <Mail size={15} />
                                                    <div>{contestant.email}</div>
                                                </li>
                                                <li>
                                                    <Phone size={15} />
                                                    <div>{contestant.telephone}</div>
                                                </li>
                                                <li>
                                                    <Star size={15} />
                                                    <div>{contestant.age_grade}</div>
                                                </li>
                                                <li>
                                                    <Star size={15} />
                                                    <div>{contestant.region}</div>
                                                </li>
                                                <li>
                                                    <Star size={15} />
                                                    <div>{contestant.regional_pastor}</div>
                                                </li>
                                                <li>
                                                    <Star size={15} />
                                                    <div>{contestant.province}</div>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className='col-span-6'>



                                        <div className="py-5 border-t border-gray-200 dark:border-dark-border text-left">
                                            <div className="flex-center-between">
                                                <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">Rounds</h6>

                                            </div>
                                            <ul className="flex flex-col gap-y-3 *:flex *:items-center *:gap-x-2.5 *:leading-none *:text-gray-500 dark:*:text-dark-text *:font-medium mt-4">
                                                <li>
                                                    <i className="ri-global-line text-inherit"></i>
                                                    <a href="#" className="hover:text-heading dark:hover:text-dark-text-two">Website.com</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContestantSingle