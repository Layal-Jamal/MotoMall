import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaLocationDot } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
import { FaRegCopyright } from "react-icons/fa";
import './Footer.css'
export default function Footer() {
    return (
        <>
            <Row className="d-flex text-center text-lg-start g-0 footerRow">
                <div className='footerContainer'>
                    <Col className='footerCol rounded-4 col-12 col-lg-3 '>
                        <h4 className='text-white justify-content-center'><FaLocationDot className='me-2' />Location</h4>
                        <p>Syria, Damascus, Malki Street.</p>
                    </Col>

                    <Col className='footerCol rounded-4 col-12 col-lg-3'>
                        <h4 className='d-flex align-items-center text-white justify-content-center'><FaShippingFast className='me-2' />Shipping</h4>
                        <p>Available to all Syrian governorates.</p>
                    </Col>

                    <Col className='footerCol rounded-4 col-12 col-lg-3'>
                        <h4 className='d-flex align-items-center text-white justify-content-center'><MdOutlinePayment className='me-2' />Methods of payment</h4>
                        <p>Cash or bank transfer.</p>
                    </Col>

                    <Col className='footerCol rounded-4 col-12 d-flex align-items-center text-white justify-content-center flex-column '>
                        <h4><RiContactsBook2Fill className='me-2' />Contact</h4>
                        <div>
                            <a href="https://wa.me/963937832863" target="_blank" rel="noopener noreferrer" className='me-2'>
                                <IoLogoWhatsapp />
                            </a>
                            <a
                                href="mailto:motomallsystem@gmail.com">
                                <SiGmail />
                            </a>
                        </div>
                    </Col>
                </div>
                <p className='copyrights d-flex justify-content-center align-items-center mt-3'><FaRegCopyright /> 2025 All Rights Reserved.</p>
            </Row>

        </>


    )
}
