import "./ManagersComponent.css"
import { FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function ManagersComponent({ name, work, link, gmail }) {
    return (
        <div className="ManagerCard rounded-4">
            <h3 className='Managername'>{name}</h3>
            <p className='Managerwork'>{work}</p>
            <div className='managersicon'>
                <a href={link} target="_blank">
                    <FaTelegramPlane  className="me-3" />
                </a>
                <a href={gmail} target="_blank">
                    <SiGmail className="me-3" />
                </a>

            </div>
        </div>
    )
}
