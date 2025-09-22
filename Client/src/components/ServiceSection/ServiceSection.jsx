import ServiceCard from '../ServiceCard/ServiceCard'
import { ServiceData } from './../../Data/Service'
import './ServiceSection.css'
import gold from './../../assets/images/gold.png'
export default function ServiceSection() {
  return (
    <section className='ServiceSection'>
      <h2><img className='gold' src={gold} alt=''/>Our Services<img className='gold' src={gold} alt=''/></h2>
      <p className='Description text-secondary'>start your journey with confidence and peace of mind.</p>



      
        {ServiceData.map((e, index) => {
          return (
            <ServiceCard key={index} title={e.title} text={e.text} description={e.description} direction={e.direction} photo1={e.photo1} photo2={e.photo2} />

          )
        })}

    </section>
  )
}
