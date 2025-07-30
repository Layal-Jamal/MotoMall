
import Hero from '../../components/Hero/Hero'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import NavBar from '../../components/NavBar/NavBar'
import ServiceSection from '../../components/ServiceSection/ServiceSection'

export default function Home() {
  return (
    <div>
      <NavBar />
      {/* <Hero /> */}
       <Hero title={"Your Journey Your Story"}/>
      <InfiniteScroll />
      <ServiceSection/>
    </div>
  )
}
