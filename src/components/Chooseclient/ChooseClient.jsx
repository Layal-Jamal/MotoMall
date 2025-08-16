import { Choose } from "../../Data/Choose"
import ChooseCard from "../ChooseCard/ChooseCard"
import './ChooseCleint.css'
const ChooseClient = () => {
  return (
    <div className="row  ChooseClient ">
        {Choose.map((ch , index) => {

            return(
                <div className="col-lg-6">
                <ChooseCard title={ch.title} discription={ch.discription} logo={ch.logo}  />


                </div>

            )
        })}
    </div>
  )
  
}

export default ChooseClient
