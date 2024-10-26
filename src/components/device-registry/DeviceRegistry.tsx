import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button} from "../ui";
import {useAuth, useLanguage} from "../../context";
import {useAlert} from "../../hooks";
import {getAllDevices, unassignDevice} from "../../services";
import {Device} from "../../services/deviceService";
import {translations} from "../../translations/translations";
import {DeviceCard} from "./index.ts";

const DeviceRegistry: React.FC = () => {
    const {isSignedIn} = useAuth();
    const {alertType, alertMessage, alertKey, showAlert} = useAlert();
    const navigate = useNavigate();
    const {language} = useLanguage();
    const [devices, setDevices] = useState<Device[]>([]);
    const t = translations[language];

    useEffect(() => {
        if (isSignedIn) {
            fetchDevices().then();
        }
    }, [isSignedIn]);

    const fetchDevices = async () => {
        try {
            const fetchedDevices = await getAllDevices(language);
            setDevices(fetchedDevices);
        } catch (error) {
            if (error instanceof Error) {
                showAlert('error', error.message);
            }
        }
    };

    const handleAssignDevice = () => navigate('/assign-device');

    const handleUnassignDevice = async (serialNumber: string) => {
        try {
            const data = await unassignDevice(serialNumber, language);
            showAlert('success', data.message);
            await fetchDevices();
        } catch (error) {
            if (error instanceof Error) {
                showAlert('error', error.message);
            }
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full text-base-content gap-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">{t.deviceRegistry.deviceRegistry}</h1>

            {alertType && (
                <Alert key={alertKey} type={alertType} message={alertMessage}/>
            )}

            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <Button
                        className="btn-square btn-success btn-sm"
                        onClick={handleAssignDevice}
                        text=""
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"
                             className="w-4 h-4">
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c-17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                        </svg>
                    </Button>
                </div>

                {!isSignedIn && (
                    <div className="text-center py-16">
                        <span>
                            <Link to="/sign-in"
                                  className="text-blue-500 hover:text-blue-700">{t.deviceRegistry.signIn}</Link>
                            {t.deviceRegistry.or}
                            <Link to="/sign-up"
                                  className="text-blue-500 hover:text-blue-700">{t.deviceRegistry.signUp}</Link>
                            {t.deviceRegistry.toSee}
                        </span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {devices.map((device) => (
                        <DeviceCard
                            key={device.id}
                            id={device.id}
                            serialNumber={device.serial_number}
                            assignedAt={device.assigned_at}
                            onUnassign={handleUnassignDevice}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DeviceRegistry;