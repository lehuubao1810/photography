import Link from "next/link";

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <ul>
                    <li className="nav__item"> 
                        <Link href="gallery">
                            Gallery
                        </Link>
                    </li>
                    <li className="logo nav__item">
                        <Link href="/">
                            Huu Bao
                        </Link>
                    </li>

                    <li className="nav__item">
                        <Link href="contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;