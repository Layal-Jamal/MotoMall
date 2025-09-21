
import Hero from '../../components/Hero/Hero'
import ManagersSection from '../../components/ManagersSection/ManagersSection'
import NavBar from '../../components/NavBar/NavBar'
import BackGround2 from './../../assets/images/BackGround2.webp'
export default function Contact() {
  return (
    <div>
        <NavBar/>
        <Hero x={false} BackGround={BackGround2} />
        <ManagersSection/>
       
    </div>
  )
}
