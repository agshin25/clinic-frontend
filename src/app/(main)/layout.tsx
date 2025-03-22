import Footer from '@/components/sections/footer/Footer';
import Loading from '@/components/ui/Loading';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { ReactNode, Suspense } from 'react';


export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Suspense fallback={<Loading />}>
                {children}
                <ScrollToTopButton />
            </Suspense>
            <Footer />
        </>
    )
}