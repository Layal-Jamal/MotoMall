
import ClientSection from "../../components/ClientSection/ClientSection";
import Hero from "../../components/Hero/Hero";
import NavBar from "../../components/NavBar/NavBar";
import NumbersSection from "../../components/NumbersSection/NumbersSection";
import OurStory from "../../components/OurStory/OurStory";
import BackGround2 from './../../assets/images/BackGround2.webp'

export default function About() {
  return (
    <div className="about">
      <NavBar/>
      <Hero x={false} BackGround={BackGround2} />
      <NumbersSection/>
      <OurStory/>
      <ClientSection/>
    </div>
  )
}
