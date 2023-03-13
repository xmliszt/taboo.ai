'use client';
import Link from 'next/link';
import { BsFillQuestionDiamondFill } from 'react-icons/bs';
import { GiCoffeeCup } from 'react-icons/gi';
import { SiDiscord } from 'react-icons/si';
import CustomWordListLink from './(components)/CustomWordListLink';
import DevToggle from './(components)/DevToggle';
import FeatureUpdatesLink from './(components)/FeatureUpdatesLink';
import Footer from './(components)/Footer';
import SocialLinkButton from './(components)/SocialLinkButton';
import { signIn, useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface HomePageProps {
  session: Session;
}

export default function HomePage(props: HomePageProps) {
  const title = 'Taboo.AI';
  const versionNumber = 'V1.4';
  const environment = process.env.VERCEL_ENV;
  const { data: session, status } = useSession();

  return (
    <main className='h-full w-full overflow-auto'>
      <Link
        href='/rule'
        aria-label='Link to rule page'
        className='text-white dark:text-neon-red-light text-xl lg:text-3xl fixed z-40 top-5 left-5 hover:animate-pulse'
      >
        <div className='flex flex-row gap-2'>
          <span className='text-sm lg:text-lg'>How To Play</span>
          <BsFillQuestionDiamondFill data-testid='rule-icon' />
        </div>
      </Link>
      <section className='flex flex-col justify-center items-center h-full w-screen gap-8 lg:gap-16'>
        <div className='w-full relative'>
          <h1
            data-testid='heading-title'
            className='text-center text-4xl lg:text-8xl drop-shadow-lg'
          >
            {title}{' '}
            <span className='text-lg text-white-faded dark:text-neon-white'>
              {versionNumber}
            </span>
          </h1>
          <FeatureUpdatesLink />
        </div>
        <Link
          id='start'
          href='/levels'
          data-testid='link-start'
          className='text-2xl px-8 py-2'
        >
          Choose Topics
        </Link>
        {!session && (
          <Link
            href='/api/auth/signin'
            id='login'
            aria-label='Login Button'
            className='text-2xl px-8 py-2'
            data-testid='login-btn'
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </Link>
        )}
        {session && status === 'authenticated' && (
          <Link
            href='/api/auth/signout'
            id='login'
            aria-label='Login Button'
            className='text-2xl px-8 py-2'
            data-testid='login-btn'
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </Link>
        )}

        {(environment === 'preview' || environment === 'development') && (
          <DevToggle />
        )}
        <CustomWordListLink />
      </section>
      <div className='fixed bottom-16 w-full flex flex-row gap-2 justify-center z-[999]'>
        <SocialLinkButton
          content='Buy Me Coffee'
          icon={<GiCoffeeCup />}
          href='/buymecoffee'
        />
        <SocialLinkButton
          content='Join Discord!'
          icon={<SiDiscord />}
          href='https://discord.gg/dgqs29CHC2'
          newTab={true}
          accentColorClass='bg-purple dark:bg-neon-purple'
          dropShadowClass='hover:drop-shadow-[0_5px_15px_rgba(224,158,255,0.6)]'
        />
      </div>
      <Footer />
    </main>
  );
}
