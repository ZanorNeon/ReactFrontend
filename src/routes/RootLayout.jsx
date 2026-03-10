import { Outlet } from 'react-router-dom';
import { useState } from "react";

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CreateModal from "../components/modal/CreateModal";

function RootLayout() {
    const [isModalDisplayed, setModalDisplay] = useState(false);

    function openModal() {
        setModalDisplay(true);
    }

    function closeModal() {
        setModalDisplay(false);
    }

    return (
        <>
            <Header onCreatePost={openModal} />

            {isModalDisplayed && <CreateModal onClose={closeModal} />}

            <Outlet />
            <Footer />
        </>
    );
}

export default RootLayout;