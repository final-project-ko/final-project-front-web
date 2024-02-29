import {Outlet} from "react-router-dom";
import Navbar from "../commons/Navbar";
import Footers from "../commons/Footer";


const Layout = ( {toggle, setToggle} ) => {

    return(
        <>
            <Navbar toggle={toggle} setToggle={setToggle}/>
            <Outlet/>
            <Footers/>
        </>
    )
}
export default Layout;