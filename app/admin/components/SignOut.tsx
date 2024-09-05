'use client'

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react'

type Props = {}

const SignOut = (props: Props) => {
    return (
        <>
            <Button onClick={(e) => {
                e.preventDefault();
                signOut().catch(console.error
                )
            }} variant={'destructive'}>Sign Out</Button>
        </>
    )
}

export default SignOut