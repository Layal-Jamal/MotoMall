import './OurStory.css'
import { MdPushPin } from "react-icons/md";
import gold from './../../assets/images/gold.png'
import carstory1 from './../../assets/images/carstory1.jpg'
import carstory2 from './../../assets/images/carstory2.jpg'
import { Row } from 'react-bootstrap';
export default function OurStory() {
    return (
        <div className='StorySection'>
            <div className='story-title d-flex justify-content-center align-items-center'>
                <h2 className=' mb-3'><img className='gold' src={gold} alt='' />MotoMall Story<img className='gold' src={gold} alt='' /></h2>
            </div>


            <Row className='StoryItem d-flex justify-content-between flex-wrap my-2 gap-4'>
                <div className='StoryText '>
                    <div><MdPushPin />
                        <span>MotoMall</span> was founded in 2023 with one clear goal: to simplify car buying and renting across Syria.
                        We believe the process should be smooth, fast, and transparent. Our journey began in Damascus — our main headquarters — with just a few vehicles and a passion for better service.

                        Today, MotoMall has grown into a trusted name in the automotive market, proudly serving customers in every Syrian governorate. We offer secure nationwide delivery to all provinces, ensuring your vehicle arrives safely and on time.

                        Hundreds of customers choose us every month — and that number keeps growing. We focus on providing top-quality vehicles that are clean, inspected, and ready for the road.

                        Our team is committed to delivering fast and friendly service with full transparency, offering flexible and easy payment options to suit every customer. Whether you’re buying or renting, MotoMall is here to make your experience effortless and rewarding.

                    </div>
                    <span className='pt-5'>MotoMall is here to make your experience better.</span>

                </div>

                <div className='carset-group d-flex justify-content-between gap-5 p-0 w-100'>
                    <div className='carsset img-fluid'><img src={carstory1} className='w-100' alt='' /></div>
                    <div className='carsset img-fluid'><img src={carstory2} className='w-100' alt='' /></div>
                </div>
            </Row>

        </div>
    )
}
