
import Hero from '../../components/Hero/Hero'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import NavBar from '../../components/NavBar/NavBar'
import NumbersSection from '../../components/NumbersSection/NumbersSection'
import ServiceSection from '../../components/ServiceSection/ServiceSection'
import BackGround1 from './../../assets/images/BackGround1.jpg'
export default function Home() {
  return (
    <div>
      <NavBar />
       <Hero title={"Your Journey Your Story"} x={true} BackGround={BackGround1}/>
      <InfiniteScroll />
      <NumbersSection/>
      <ServiceSection/>
    </div>
  )
}
