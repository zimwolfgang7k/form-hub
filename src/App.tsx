import img_logo from './assets/img.svg';
import { Formulary } from './components/form';
import './style/globals.css';

function App() {
    return (
        <>
            <main className="flex h-screen bg-purple-200 p-24 rounded-md main-container">
                <div className="w-2/4 bg-amber-100 flex justify-center items-center p-10">
                    <img
                        src={img_logo}
                        alt="img-logo"
                        className="flex justify-center items-center"
                    />
                </div>

                <Formulary />
            </main>
        </>
    );
}

export default App;
