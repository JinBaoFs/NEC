import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
// import { cookieToInitialState } from 'wagmi';
// import { headers } from 'next/headers';
// import { useIsMounted } from '@/hooks/useIsMounted';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { notFound } from 'next/navigation';
import getRequestConfig from '@/i18n';
// import { config } from '@/constants/wagmi';
import AuthModal from '@/components/AuthModal';
import { locales } from '../../i18n/i18nConfig';
import Provider from './Provider';

export const metadata = {
  title: 'Boundary',
  description: ''
};

export async function generateStaticParams() {
  return locales.map((locale: string) => ({ locale }));
}

// export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
  params: { session, locale }
}: {
  children: React.ReactNode;
  params: { session: any; locale: string };
}) {
  const { messages } = await getRequestConfig({ locale });
  unstable_setRequestLocale(locale);

  // const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <Provider session={session}>
            <Header />
            <AuthModal />
            {children}
            {/* <Footer /> */}
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
