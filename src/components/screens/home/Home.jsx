import {Link} from "react-router-dom";
import Header from "../../ui/Header.jsx";
import Footer from "../../ui/Footer.jsx";
import MainPage from "../feedMain/MainPage.jsx"


const Home = () => {
    return (
        <div>
            <Header/>
            <MainPage />

            <Footer/>
        </div>
    );
};

export default Home;