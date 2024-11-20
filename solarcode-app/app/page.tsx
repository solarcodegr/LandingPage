import dynamic from 'next/dynamic';

// Dynamically import the LandingPage component with SSR disabled
const ClientOnlyLandingPage = dynamic(() => import('@/components/landing-page').then((mod) => mod.LandingPage), { ssr: false });

export default function Page() {
  return <ClientOnlyLandingPage />;
}
