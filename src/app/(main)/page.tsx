import Header from "@/components/sections/header/Header";
import AboutDoctor from "@/components/sections/main/AboutDoctor";
import Appointment from "@/components/sections/main/Appointment";
import Services from "@/components/sections/main/Services";
import Team from "@/components/sections/main/Team";
import { Poppins } from "next/font/google";


const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500'] })


export default function MainPage(){
    
    return (
        <div  className={`${poppins.className}`}>
            <Header />
            <main>
                <Services />
                <AboutDoctor />
                <Appointment />
                <Team />
            </main>
        </div>
    )
}