import Footer from "@/components/shared/footer/footer";
import MenuBar from "@/components/shared/nav/navbar";



export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <MenuBar>
                {children}
            </MenuBar>
            <Footer />
        </div>
    )
}
