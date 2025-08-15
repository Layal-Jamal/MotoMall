import './ServiceCard.css'
import { MdPushPin } from "react-icons/md";
export default function ServiceCard({ direction, title, description, photo1, photo2 }) {
    return (
        <div>
            <div className={direction ? 'SingleCard' : 'SingleCardReverse'}>
                <div className='Side-1 text-md-start p-4'>
                    <h3> <MdPushPin />{title}</h3>
                    <p>{description}</p>
                </div>
                <div className='Side-2'>
                    <img src={photo1} alt="" className=' img-fluid' />
                    <img src={photo2} alt="" className=' img-fluid' />
                </div>
            </div>
        </div>
    )
}
