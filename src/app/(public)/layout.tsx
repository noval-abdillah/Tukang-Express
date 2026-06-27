import { Navbar }          from '@/components/ui/Navbar';
import { FooterSection }   from '@/components/ui/FooterSection';
import { MobileBottomBar } from '@/components/ui/MobileBottomBar';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <FooterSection />
      <MobileBottomBar />
    </>
  );
}
