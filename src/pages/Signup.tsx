import { useState } from 'react';
import { useLanguage, useAuth } from "../context";
import { translations } from "../translations/translations.ts";
import { Alert, Button, FormInput } from "../components/ui";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { alertType, alertMessage, alertKey, showAlert } = useAlert();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { signup } = useAuth();

    const t = translations[language];

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            showAlert('error', t.signup.passwordsDoNotMatch)
            return;
        }
        setIsLoading(true);
        try {
            await signup(email, password);
            showAlert('success', "Zarejestrowano pomyślnie");
            setTimeout(() => {
                navigate("/sign-in");
            }, 1500)
        } catch (error) {
            if (error instanceof Error) {
                showAlert('error', error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full text-base-content gap-4">
            <h1 className="text-3xl font-bold text-center mb-4 sm:mb-8 text-primary">{t.signup.signup}</h1>
            {alertType && (
                <Alert key={alertKey} type={alertType} message={alertMessage}/>
            )}
            <div className="form-control w-full max-w-xs p-4 sm:p-8 bg-base-200 shadow-xl rounded-lg">
                <FormInput label={t.signup.email} type="email" placeholder="" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                <FormInput label={t.signup.password} type="password" placeholder="" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                <FormInput label={t.signup.confirmPassword} type="password" placeholder="" value={confirmPassword}
                           onChange={e => setConfirmPassword(e.target.value)}/>
                <Button className={"btn-primary mt-3 sm:mt-4"}
                        onClick={handleSubmit}
                        text={t.signup.signup}
                        disabled={isLoading}/>
                <Button className={"btn-outline mt-3 sm:mt-4 flex items-center justify-center"}
                        onClick={() => {}}
                        text=""
                        disabled={isLoading}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 488 512"
                         className="w-4 h-4 sm:w-6 sm:h-6 mr-2">
                        <path
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                    </svg>
                    {t.signup.signupGoogle}
                </Button>
            </div>
        </div>
    );
};

export default Signup;