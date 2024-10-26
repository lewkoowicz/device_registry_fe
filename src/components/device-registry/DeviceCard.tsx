import React from 'react';
import {Button} from "../ui";
import {useLanguage} from "../../context";
import {translations} from "../../translations/translations";

interface DeviceCardProps {
    id: number;
    serialNumber: string;
    assignedAt: string | null;
    onUnassign: (serialNumber: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({id, serialNumber, assignedAt, onUnassign}) => {
    const {language} = useLanguage();
    const t = translations[language];

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return "not assigned";

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    return (
        <div className="card bordered bg-base-100 shadow-xl p-6">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold mb-4">{t.deviceCard.deviceId}{id}</h2>
                <p><strong>{t.deviceCard.serialNumber}</strong>{serialNumber}</p>
                <p><strong>{t.deviceCard.assignedAt}</strong>{formatDate(assignedAt)}</p>
                <div className="card-actions justify-center mt-6">
                    <Button
                        className="btn-error btn-md"
                        onClick={() => onUnassign(serialNumber)}
                        text={t.deviceCard.unassign}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeviceCard;