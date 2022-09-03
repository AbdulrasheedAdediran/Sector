import  { Suspense, lazy } from 'react';
const Description = lazy(()=> import("./components/Description"));
const BarChart =  lazy(()=> import('./components/BarChart'))
const Footer = lazy(()=> import("./components/Footer"));

function App() {
    return (
        <Suspense fallback={<p style={{display: "grid", placeItems: "center", height:"100vh"}}>LOADING...</p>}>
            <main className="app">
                <Description />
                <BarChart />
                <Footer />
            </main>
        </Suspense>
       
    );
}

export default App;
