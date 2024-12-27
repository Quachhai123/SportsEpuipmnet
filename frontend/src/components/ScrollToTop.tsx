import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [pathname]); // Mỗi khi đường dẫn (pathname) thay đổi, kích hoạt effect

  return null;
};

export default ScrollToTop;
