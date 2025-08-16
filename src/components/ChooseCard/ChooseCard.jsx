import './ChooseCard.css'

const ChooseCard = ({ title, discription, logo }) => {
    return (
        <div className="row m-3 p-4  choosecard ">
            <div className='col-md-12  text-center image-card-choose2'>
                <img src={logo} alt="" />

            </div>
            <div className='col-lg-6 col-md-12 col-sm-12 text-md-center text-sm-center choose-container '>
                <h1 className='title'>{title}</h1>
                <p className='discription'>{discription}</p>
                <button className='button-choose'>Get Started!</button>
            </div>
            <div className='col-lg-6 col-md-2 image-card-choose text-center position-relative'>
                <img className='image-choose' src={logo} alt="" />
            </div>
        </div>
    )
}

export default ChooseCard
