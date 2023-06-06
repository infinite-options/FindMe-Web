import React from 'react';
import { Link } from 'react-router-dom';

const QRCodeGenerator = "https://api.qrserver.com/v1/create-qr-code/?data=";
const APP_URL = process.env.REACT_APP_CLIENT_BASE_URI;

export default function QRCode({route, event_registration_code}) {
    const getQRcodeLink = QRCodeGenerator + APP_URL + route + event_registration_code + "&size=150x150";
    
    const link_path = APP_URL + route + event_registration_code;
    return (
        <>
            <Link to={link_path}>
            <img src={getQRcodeLink} alt="QR code unavailable" title="QR code" />
            </Link>
        </>
    )
}