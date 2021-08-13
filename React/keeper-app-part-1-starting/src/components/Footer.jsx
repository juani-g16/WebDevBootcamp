import React from "react";

function Footer(){
    const year = new Date().getFullYear();
    return <footer>
            <p>Copyright ⓒ {year} Juan I. Giorgetti</p>
            </footer>;
}

export default Footer;