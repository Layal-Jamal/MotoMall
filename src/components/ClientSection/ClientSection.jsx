import './ClientSection.css'
 import {ClientComment} from './../../Data/Feedback'
import ClientFeedback from '../ClientFeedback/ClientFeedback';
import gold from './../../assets/images/gold.png'
export default function ClientSection() {
    return (
        <div className='Client p-5'>
            <div className='text-center'>
                <h2><img className='gold' src={gold} alt=''/>Client Feedback<img className='gold' src={gold} alt=''/></h2>
            </div>

            <div className='ClientContainer d-flex align-items-center  flex-wrap'>
                {ClientComment.map((e, index) => {
                    return (
                        <ClientFeedback key={index} name={e.name} text={e.text}/>

                    )
                })}

            </div>
        </div>
    )
}
