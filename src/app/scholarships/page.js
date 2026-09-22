import ScholarshipsClient from './ScholarshipsClient';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Scholarships & Grants | Compare Degree',
  description: 'Explore available scholarships and financial grants at Compare Degree.',
};

export default function ScholarshipsPage() {
  return (
    <>
      <Navbar />
      <ScholarshipsClient />
      <Footer />
    </>
  );
}
