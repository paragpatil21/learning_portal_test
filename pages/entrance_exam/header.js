export default function Header(){
    return (
        <section className="p-3 border-b-2 fixed top-0 w-full bg-white">
            <div className="container mx-auto">                
                <div className="flex flex-wrap items-center justify-between">
                    <img className="h-14 md:hidden" src="../../images/logo.png" alt="Nirmaan Logo" />
                    {/* <img className="h-12 md:hidden" src="../../infosys-logo-png.png" alt="Infosys Logo" /> */}
                </div>
                <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-auto">
                        <div className="flex flex-wrap items-center">
                        <img className="lg:h-16 md:h-12 md:inline-block hidden" src="../../images/logo.png" alt="Nirmaan Logo" />
                        </div>
                    </div>
                    <div className="w-full md:w-auto">                    
                        <div className="w-full md:w-auto text-center">
                            <h2 className="lg:text-4xl text-3xl font-heading font-bold">Admission Test</h2>
                            {/* <h2 className="lg:text-4xl text-3xl font-heading font-bold">Women in Technology</h2> */}
                        </div>
                    </div>
                    <div className="w-full md:w-auto">
                        <div className="flex flex-wrap items-center">
                            {/* <img className="lg:h-20 md:h-16 h-5 md:inline-block hidden" src="../../infosys-logo-png.png" alt="Infosys Logo" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}