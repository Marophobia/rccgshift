'use client';
import { Icontestants } from '@/app/types/contestants';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListIcon, Mail, Phone, Star } from 'lucide-react';
import Image from 'next/image';

type Props = {
    contestant: Icontestants;
};

const ContestantSingle = (props: Props) => {
    const { contestant } = props;

    if (!contestant.user_sessions) {
        return <div>No sessions found</div>;
    }

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
                                <img
                                    src="/images/profile/cover.png"
                                    alt="cover-image"
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="mt-7 px-6 text-center">
                                <div
                                    className="h-60 flex-center"
                                    style={{ borderRadius: '100%' }}
                                >
                                    <img
                                        src={`/images/contestants/${contestant.picture}`}
                                        alt="cover-image"
                                        className=" h-full"
                                        style={{ borderRadius: '100%' }}
                                    />
                                </div>
                                <div className="py-5">
                                    <div className="flex-center">
                                        <h4 className="text-[22px] leading-none text-heading font-semibold relative">
                                            {contestant.name}
                                            <Image
                                                width={15}
                                                height={15}
                                                src="/images/icons/verified-icon-green.svg"
                                                alt="verified-icon"
                                                className="absolute -top-1.5 -right-3.5 [&.verified]:block unverified"
                                            />
                                        </h4>
                                    </div>
                                    <p className="font-spline_sans leading-[1.62] text-heading dark:text-dark-text mt-2.5">
                                        {contestant.bio}
                                    </p>
                                </div>
                                <div className="grid lg:grid-cols-12 w-full">
                                    <div className="col-span-6">
                                        {contestant.competitionType === 1 &&
                                            <>
                                                <div className="py-5 border-t border-gray-200 dark:border-dark-border text-left">
                                                    <div className="flex-center-between">
                                                        <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">
                                                            Category and Type
                                                        </h6>
                                                    </div>
                                                    <ul className="flex items-center flex-wrap gap-2.5 *:rounded-full *:px-2.5 *:py-1.5 mt-4">
                                                        <li className="badge badge-primary-light">
                                                            {contestant.category}
                                                        </li>
                                                        <li className="badge badge-primary-light">
                                                            {contestant.type}
                                                        </li>
                                                    </ul>
                                                </div>

                                                {contestant.type === 'Group' &&
                                                    <>
                                                        <div className="py-5 border-t border-gray-200 dark:border-dark-border text-left">
                                                            <div className="flex-center-between">
                                                                <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">
                                                                    Group Size and Registered Members
                                                                </h6>
                                                            </div>
                                                            <ul className="flex items-center flex-wrap gap-2.5 *:rounded-full *:px-2.5 *:py-1.5 mt-4">
                                                                <li className="badge badge-primary-light">
                                                                    Group Size: {contestant.number_of_members}
                                                                </li>
                                                                <li className="badge badge-primary-light">
                                                                    Registered Members: {contestant.Group?.GroupMembers?.length}
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        {contestant.Group?.GroupMembers &&
                                                            contestant.Group?.GroupMembers?.length > 0 &&
                                                            <div className="col-span-6 ">
                                                                <div className="py-5 border-t border-gray-200 text-left">
                                                                    <div className="flex-center-between h-20">
                                                                    <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">
                                                                        Group Members
                                                                    </h6>
                                                                </div>

                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>
                                                                                S/N
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Name
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Email
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Telephone
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Gender
                                                                            </TableHead>
                                                                            <TableHead>
                                                                                Age
                                                                            </TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {contestant.Group?.GroupMembers &&
                                                                            contestant.Group?.GroupMembers
                                                                                .length > 0 ? (
                                                                            contestant.Group?.GroupMembers.map(
                                                                                (
                                                                                    member,
                                                                                    index
                                                                                ) => (
                                                                                    <TableRow
                                                                                        className={`${index %
                                                                                            2 ==
                                                                                            0
                                                                                            ? 'bg-gray-50'
                                                                                            : ''
                                                                                            }`}
                                                                                        key={
                                                                                            member.id
                                                                                        }
                                                                                    >
                                                                                        <TableCell>
                                                                                            {index +
                                                                                                1}
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {
                                                                                                member.name
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {
                                                                                                member.email
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {
                                                                                                member.telephone
                                                                                            }
                                                                                        </TableCell>

                                                                                        <TableCell>
                                                                                            {
                                                                                                member.gender
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {
                                                                                                member.age_grade
                                                                                            }
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                )
                                                                            )
                                                                        ) : (
                                                                            <div>
                                                                                No group members found
                                                                            </div>
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }

                                        {contestant.competitionType === 2 &&
                                            <>
                                                <div className="py-5 border-t border-gray-200 dark:border-dark-border text-left">
                                                    <div className="flex-center-between">
                                                        <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">
                                                            Choir Size and Registered Members
                                                        </h6>
                                                    </div>
                                                    <ul className="flex items-center flex-wrap gap-2.5 *:rounded-full *:px-2.5 *:py-1.5 mt-4">
                                                        <li className="badge badge-primary-light">
                                                            Choir Size: {contestant.number_of_members}
                                                        </li>
                                                        <li className="badge badge-primary-light">
                                                            Registered Members: {contestant.Group?.GroupMembers?.length}
                                                        </li>
                                                    </ul>
                                                </div>


                                                {contestant.Group?.GroupMembers &&
                                                    contestant.Group?.GroupMembers?.length > 0 &&
                                                    <div className="col-span-6 ">
                                                        <div className="py-5 border-t border-gray-200 text-left">
                                                            <div className="flex-center-between h-20">
                                                            <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">
                                                                Choir Members
                                                            </h6>
                                                        </div>

                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>
                                                                        S/N
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Name
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Email
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Telephone
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Gender
                                                                    </TableHead>
                                                                    <TableHead>
                                                                        Age
                                                                    </TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {contestant.Group?.GroupMembers &&
                                                                    contestant.Group?.GroupMembers
                                                                        .length > 0 ? (
                                                                    contestant.Group?.GroupMembers.map(
                                                                        (
                                                                            member,
                                                                            index
                                                                        ) => (
                                                                            <TableRow
                                                                                className={`${index %
                                                                                    2 ==
                                                                                    0
                                                                                    ? 'bg-gray-50'
                                                                                    : ''
                                                                                    }`}
                                                                                key={
                                                                                    member.id
                                                                                }
                                                                            >
                                                                                <TableCell>
                                                                                    {index +
                                                                                        1}
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {
                                                                                        member.name
                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {
                                                                                        member.email
                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {
                                                                                        member.telephone
                                                                                    }
                                                                                </TableCell>

                                                                                <TableCell>
                                                                                    {
                                                                                        member.gender
                                                                                    }
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {
                                                                                        member.age_grade
                                                                                    }
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    )
                                                                ) : (
                                                                    <div>
                                                                        No choir members found
                                                                    </div>
                                                                )}
                                                            </TableBody>
                                                        </Table>
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }
                                        <div className="py-5 border-t border-gray-200 dark:border-dark-border text-left">
                                            <div className="flex-center-between">
                                                <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">
                                                    About
                                                </h6>
                                            </div>
                                            <ul className="flex flex-col gap-y-3 *:flex *:gap-x-2.5 *:leading-none *:text-gray-500 dark:*:text-dark-text *:font-medium mt-4">
                                                <li>
                                                    <Mail size={15} />
                                                    <div>
                                                        {contestant.email}
                                                    </div>
                                                </li>
                                                <li>
                                                    <Phone size={15} />
                                                    <div>
                                                        {contestant.telephone}
                                                    </div>
                                                </li>
                                                <li>
                                                    <Star size={15} />
                                                    <div>
                                                        {contestant.age_grade}
                                                    </div>
                                                </li>
                                                <li>
                                                    <Star size={15} />
                                                    <div>
                                                        {contestant.region}
                                                    </div>
                                                </li>
                                                <li>
                                                    <Star size={15} />
                                                    <div>
                                                        {
                                                            contestant.regional_pastor
                                                        }
                                                    </div>
                                                </li>
                                                <li>
                                                    <Star size={15} />
                                                    <div>
                                                        {contestant.province}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-span-6 ">
                                        <div className="py-5 border-t border-gray-200 text-left">
                                            <div className="flex-center-between h-20">
                                                <h6 className="text-gray-500 dark:text-dark-text leading-none font-semibold">
                                                    Rounds
                                                </h6>
                                            </div>

                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            S/N
                                                        </TableHead>
                                                        <TableHead>
                                                            Round
                                                        </TableHead>
                                                        <TableHead>
                                                            Votes
                                                        </TableHead>
                                                        <TableHead>
                                                            judge1 Votes
                                                        </TableHead>
                                                        <TableHead>
                                                            judge2 Votes
                                                        </TableHead>
                                                        <TableHead>
                                                            judge3 Votes
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {contestant.user_sessions &&
                                                        contestant.user_sessions
                                                            .length > 0 ? (
                                                        contestant.user_sessions.map(
                                                            (
                                                                session,
                                                                index
                                                            ) => (
                                                                <TableRow
                                                                    className={`${index %
                                                                        2 ==
                                                                        0
                                                                        ? 'bg-gray-50'
                                                                        : ''
                                                                        }`}
                                                                    key={
                                                                        session.id
                                                                    }
                                                                >
                                                                    <TableCell>
                                                                        {index +
                                                                            1}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            session
                                                                                .round
                                                                                .name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            session.votes
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            session.judge_votes1
                                                                        }
                                                                    </TableCell>

                                                                    <TableCell>
                                                                        {
                                                                            session.judge_votes2
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            session.judge_votes3
                                                                        }
                                                                    </TableCell>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger>
                                                                            <TableCell>
                                                                                <ListIcon />
                                                                            </TableCell>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent>
                                                                            {session.parameters !==
                                                                                null &&
                                                                                session
                                                                                    .parameters
                                                                                    .length >
                                                                                0 ? (
                                                                                session.parameters.map(
                                                                                    (
                                                                                        parameter
                                                                                    ) => (
                                                                                        <>
                                                                                            <DropdownMenuLabel>
                                                                                                Judge:
                                                                                                {
                                                                                                    parameter.judge
                                                                                                }
                                                                                            </DropdownMenuLabel>
                                                                                            <DropdownMenuItem>
                                                                                                Appearance:{' '}
                                                                                                {
                                                                                                    parameter.Appearance
                                                                                                }
                                                                                            </DropdownMenuItem>
                                                                                            <DropdownMenuItem>
                                                                                                Delivery:{' '}
                                                                                                {
                                                                                                    parameter.Delivery
                                                                                                }
                                                                                            </DropdownMenuItem>
                                                                                            <DropdownMenuItem>
                                                                                                Communication:{' '}
                                                                                                {
                                                                                                    parameter.Communication
                                                                                                }
                                                                                            </DropdownMenuItem>
                                                                                            <DropdownMenuItem>
                                                                                                Expression:{' '}
                                                                                                {
                                                                                                    parameter.Expression
                                                                                                }
                                                                                            </DropdownMenuItem>
                                                                                            <DropdownMenuItem>
                                                                                                Technical
                                                                                                skills:{' '}
                                                                                                {
                                                                                                    parameter.Technical_skills
                                                                                                }
                                                                                            </DropdownMenuItem>
                                                                                            <DropdownMenuItem>
                                                                                                Overall
                                                                                                Value:{' '}
                                                                                                {
                                                                                                    parameter.value
                                                                                                }
                                                                                            </DropdownMenuItem>
                                                                                        </>
                                                                                    )
                                                                                )
                                                                            ) : (
                                                                                <div>
                                                                                    No
                                                                                    Parameters
                                                                                </div>
                                                                            )}
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </TableRow>
                                                            )
                                                        )
                                                    ) : (
                                                        <div>
                                                            No contestants found
                                                        </div>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContestantSingle;
