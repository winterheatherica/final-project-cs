import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AppShell from './app/layouts/AppShell';
import Home from './app/pages/Home';
import About from './app/pages/About';

const routes = {
  '/': <Home />,
  '/about': <About />,
};

export default function App() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setCurrentPage(routes[url] || <Home />);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    handleRouteChange(router.pathname);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return <AppShell>{currentPage}</AppShell>;
}
