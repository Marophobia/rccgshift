'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu'
import { getAuthSession } from '@/lib/auth'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@radix-ui/react-dropdown-menu'
import { User, CreditCard, Settings, Keyboard, Users, UserPlus, Mail, MessageSquare, PlusCircle, Plus, Github, LifeBuoy, Cloud, LogOut, ChevronDown } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    user: any
}

const UserAvatar = ({ user }: Props) => {

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex justify-between items-center'>
                        <span>Admin</span>
                        <ChevronDown />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white" align='end'>
                    <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium">{user.name}</p>
                            <p className="w-[200px] truncate text-sm text-zinc-700">
                                {user.email}
                            </p>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={"/dashboard"}>DashBoard</Link>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={"/setting"}>Settings</Link>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            signOut().catch(console.error
                            )
                        }} className='bg-red-500 cursor-pointer' >
                        Sign Out
                        <LogOut className="ml-2 h-4 w-4" />
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserAvatar