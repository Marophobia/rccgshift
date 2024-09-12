import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    generator: 'RCCG SHIFT',
    applicationName: 'RCCG SHIFT',
    referrer: 'origin-when-cross-origin',
    keywords: ['RCCG', 'RCCGYAYA', 'The redeemed christian church of God', 'Young Adults and Youth Church', 'YAYA', 'Youths', 'church', 'international', 'Pst Belemina Obunge', 'Pastor', 'Pst E.A Adeboye', 'Daddy G.O', 'RCCG SHIFT', 'SHIFT', 'Talent Hunt', 'Show'],
    authors: [{ name: 'Maro Orode' }],
    creator: 'Maro orode',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: 'https://rccgshift.org/images/fav.png',
        shortcut: 'https://rccgshift.org/images/fav.png',
        apple: 'https://rccgshift.org/images/fav.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: 'https://rccgshift.org/images/fav.png',
        },
    },
    metadataBase: new URL('https://rccgshift.org/images'),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US',
            'de-DE': '/de-DE',
        },
    },
    twitter: {
        card: 'RCCG SHIFT',
        title: 'RCCG SHIFT',
        description: 'Official Website of RCCG Shift Talent Hunt',
        creator: 'Maro orode',
        images: ['/snip.png'],
    },
    openGraph: {
        title: 'RCCG SHIFT',
        description: 'Official Website of RCCG Shift Talent Hunt',
        url: 'https://rccgshift.org',
        siteName: 'RCCG SHIFT',
        images: [
            {
                url: '/snip.png',
                width: 800,
                height: 600,
            },
        ],
        type: 'website',
    },
}



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"></link>
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
