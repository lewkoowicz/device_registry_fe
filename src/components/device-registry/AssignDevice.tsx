import {useAlert} from "../../hooks";
import {Alert, Button, FormInput} from "../ui";
import {useState} from "react";
import {assignDevice} from "../../services";
import {useLanguage} from "../../context";
import {translations} from "../../translations/translations.ts";

const AssignDevice = () => {
    const {language} = useLanguage();
    const {alertType, alertMessage, alertKey, showAlert} = useAlert();
    const [serialNumber, setSerialNumber] = useState('');
    const t = translations[language];

    const handleSubmit = async () => {
        if (!serialNumber.trim()) {
            showAlert('error', "Serial number can't be empty");
            return;
        }

        try {
            const data = await assignDevice(serialNumber, language);
            showAlert('success', data.message);
            setSerialNumber('');
        } catch (error) {
            if (error instanceof Error) {
                showAlert('error', error.message);
            }
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full text-base-content gap-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">{t.assignDevice.assignDevice}</h1>
            {alertType && (
                <Alert key={alertKey} type={alertType} message={alertMessage}/>
            )}
            <div className="form-control w-full max-w-xs p-8 bg-base-200 shadow-xl rounded-lg">
                <FormInput label={t.assignDevice.serialNumber}
                           type="string"
                           value={serialNumber}
                           onChange={e => setSerialNumber(e.target.value)}/>
                <Button className="btn-primary mt-4"
                        onClick={handleSubmit}
                        text={t.assignDevice.assign}/>
            </div>
        </div>
    )
}

export default AssignDevice;
