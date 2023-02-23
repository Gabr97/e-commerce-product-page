import SideCart from "./SideCart";
import TopNavbar from "./TopNavbar";

export default function Layout({ children }: any) {
   
    return (
        <>
            <TopNavbar />
            <div className="content">
                {children}
            </div>
            <footer>
            </footer>
            <SideCart />
        </>
    )


}