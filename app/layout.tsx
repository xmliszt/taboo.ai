'use client';

import './global.css';
import './main.css';
import { Orbitron, Grenze } from '@next/font/google';
import { AnalyticsWrapper } from './(components)/AnalayticsWrapper';
import WordCarousell from './(components)/WordCarousell';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LightDarkToggle from './(components)/LightDarkToggle';
import { getMaintenance } from '../lib/services/maintenanceService';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { getSession } from '../lib/services/sessionService';

const grenze = Grenze({
  weight: '400',
  subsets: ['latin'],
  fallback: [
    'ui-serif',
    'Georgia',
    'Cambria',
    'Times New Roman',
    'Times',
    'serif',
  ],
});

const orbitron = Orbitron({
  weight: '400',
  subsets: ['latin'],
  fallback: [
    'ui-serif',
    'Georgia',
    'Cambria',
    'Times New Roman',
    'Times',
    'serif',
  ],
});

interface IMaintenance {
  isGPTOutage: boolean;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [maintenanceData, setMaintenanceData] = useState<IMaintenance>();
  const [session, setSession] = useState<Session>();
  const [isDark, setIsDark] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    fetchMaintenance();
    fetchSession();
  }, []);

  const fetchMaintenance = async () => {
    const data = await getMaintenance();
    setMaintenanceData(data);
  };

  const fetchSession = async () => {
    const session = await getSession();
    session && setSession(session);
  };

  return (
    <html
      lang='en'
      className={`${isDark && 'dark'} ${
        isDark ? orbitron.className : grenze.className
      } font-serif`}
    >
      <head />
      <body className='bg-black dark:bg-neon-black dark:text-neon-white text-white'>
        {!(pathName === '/level') && <WordCarousell />}
        <LightDarkToggle
          onToggle={(dark) => {
            setIsDark(dark);
          }}
        />
        {maintenanceData?.isGPTOutage ? (
          <section className='flex justify-center items-center text-3xl leading-normal h-full w-full p-16'>
            OpenAI API is experiencing unexpected outage. We will be back once
            the outage from OpenAI has been resolved! Thank you for your
            patience!
          </section>
        ) : (
          <SessionProvider session={session}>{children}</SessionProvider>
        )}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
