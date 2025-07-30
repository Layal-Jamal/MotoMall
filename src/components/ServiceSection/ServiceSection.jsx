import serviceimg1 from './../../assets/images/serviceimg1.jpg'
import serviceimg2 from './../../assets/images/serviceimg2.jpg'
import serviceimg3 from './../../assets/images/serviceimg3.jpg'
import serviceimg4 from './../../assets/images/serviceimg4.jpg'
import serviceimg5 from './../../assets/images/serviceimg5.jpg'
import serviceimg6 from './../../assets/images/serviceimg6.jpg'
import serviceimg7 from './../../assets/images/serviceimg7.jpg'
import serviceimg8 from './../../assets/images/serviceimg8.jpg'
import ServiceCard from '../ServiceCard/ServiceCard'
import './ServiceSection.css'
export default function ServiceSection() {
  return (
    <section className='ServiceSection'>
      <h2>Our Services</h2>
      <p className='Description text-muted'>start your journey with confidence and peace of mind.</p>

      <ServiceCard
        title={" Luxury Car Rental for Your Special Events."}
        description={"Celebrate your special occasion with a luxury car that matches your refined taste. Whether you're having an extraordinary wedding or an unforgettable honeymoon, we offer a selection of luxurious cars suited for all types of events. For example, on your wedding day, you can choose a Rolls-Royce or a Lamborghini to kickstart your memorable day. We provide delivery of the car to your desired location, with a professional driver ensuring your comfort and safety. Enjoy your special day and add a touch of elegance to it."}
        direction={true}
        photo1={serviceimg1}
        photo2={serviceimg2}
      />
      <ServiceCard
        title={" Car Rental for Companies and Official Events."}
        description={"Do you need official cars for your company or business events? We offer you high-quality car rental or purchase options tailored to corporate and business needs. From daily commutes to formal events like meetings or conferences, we provide a fleet of luxury cars that combine comfort and professionalism. Let us be your trusted partner for all your corporate events."}
        direction={false}
        photo1={serviceimg3}
        photo2={serviceimg4}
      />
      <ServiceCard
        title={" Car Rental for Tourism and Travel."}
        description={"Planning a sightseeing trip or an adventure with family and friends? Choose from a wide range of cars suitable for all types of trips, from spacious family cars to comfortable sports cars. We offer you a flexible and comfortable car rental experience with different options to suit your travel needs. Enjoy your travels with ease and safety. Whether you're exploring the city or heading to new destinations, rest assured your journey will be enjoyable with our cars."}
        direction={true}
        photo1={serviceimg5}
        photo2={serviceimg6}
      />
      <ServiceCard
        title={"Car Rental for Sports Activities and Outdoor Adventures."}
        description={"If you're a fan of sports activities or outdoor adventures, we offer car rental services designed to meet your needs. From 4x4 vehicles perfect for mountain trips to crossover cars equipped for off-road travel, we have everything you need to enjoy your adventure with maximum comfort and safety. Whether you're planning a skiing trip in the mountains or a desert hunting expedition."}
        direction={false}
        photo1={serviceimg7}
        photo2={serviceimg8}
      />
    </section>
  )
}
