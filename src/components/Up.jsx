import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Up.scss';

const Up = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShow(true);
            } else {
                setShow(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`btn up-btn position-fixed rounded-circle d-flex align-items-center justify-content-center ${show ? 'show' : ''}`}
            style={{ bottom: '40px', right: '40px', width: '70px', height: '70px', zIndex: 9999 }}
            onClick={scrollToTop}
            aria-label="Lên đầu trang"
        >
            <i className="bi bi-arrow-up" style={{ fontSize: '2rem' }}></i>
        </button>
    );
};

export default Up;
