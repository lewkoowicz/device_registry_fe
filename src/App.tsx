import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Navbar} from "./layouts";
import {Signin, Signup} from "./pages";
import {AuthProvider, CsrfProvider, LanguageProvider, ThemeProvider} from "./context";
import {AssignDevice, DeviceRegistry} from "./components/device-registry";

function App() {
    return (
        <Router>
            <LanguageProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <CsrfProvider>
                            <div className="flex flex-col min-h-dvh">
                                <Navbar/>
                                <Routes>
                                    <Route path="/" element={
                                        <div className="flex-grow flex items-start p-4 justify-center">
                                            <DeviceRegistry/>
                                        </div>
                                    }/>
                                    <Route path="/sign-in" element={
                                        <div className="flex-grow flex items-center justify-center">
                                            <Signin/>
                                        </div>
                                    }/>
                                    <Route path="/sign-up" element={
                                        <div className="flex-grow flex items-center justify-center">
                                            <Signup/>
                                        </div>
                                    }/>
                                    <Route path="/assign-device" element={
                                        <div className="flex-grow flex items-center justify-center">
                                            <AssignDevice/>
                                        </div>
                                    }/>
                                </Routes>
                            </div>
                        </CsrfProvider>
                    </AuthProvider>
                </ThemeProvider>
            </LanguageProvider>
        </Router>
    )
}

export default App;
