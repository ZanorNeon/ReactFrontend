import {Outlet} from 'react-router-dom';
import {useState} from "react";

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CreateModal from "../components/modal/CreateModal";

function RootLayout() {
    const [reloadKey, setReloadKey] = useState(0);

    function refreshTodos() {
        setReloadKey(prev => prev + 1);
    }

    const [isModalDisplayed, setModalDisplay] = useState(false);

    function openModal() {
        setModalDisplay(true);
    }

    function closeModal() {
        setModalDisplay(false);
    }

    return (
        <>
            <Header onCreatePost={openModal}/>

            {isModalDisplayed && <CreateModal onClose={closeModal} onCreated={refreshTodos}/>}

            <Outlet context={{reloadKey}}/>
            <Footer/>
        </>
    );
}

export default RootLayout;