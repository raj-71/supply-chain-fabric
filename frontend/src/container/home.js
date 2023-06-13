import { Link } from "react-router-dom";
import farmer from "../assets/images/home/farmer.png";
import wholesaler from "../assets/images/home/wholesaler.png";
import retailer from "../assets/images/home/retailer.png";

function Home() {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <section className="bg-white shadow-lg rounded-lg px-8 pt-12 pb-10 flex flex-col justify-center items-center">
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Supply Chain Management</h1>
                            <p className="mt-4 max-w-2xl text-center text-xl text-gray-500">Our platform built on Hyperledger Fabric provides a secure and transparent way for supply chain members to track and manage an item.</p>
                            <div className="mt-10">
                                <Link to="/register" className="inline-block px-6 py-4 text-lg font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">Get Started</Link>
                            </div>
                        </section>

                        {/* Features */}
                        <section className="bg-gray-100 py-16">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-3xl mx-auto text-center">
                                    <h2 className="text-3xl font-extrabold text-gray-900">Key Features</h2>
                                </div>
                                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="bg-white shadow-lg rounded-lg px-8 pt-12 pb-10 flex flex-col justify-center items-center">
                                        <img src={farmer} alt="Medical Record" className="h-12 w-12 mb-4" />
                                        <h3 className="text-xl font-medium text-gray-900 mb-2">For Farmers</h3>
                                        <p className="text-base text-gray-500 text-center">Our platform allows farmers to create tokens exclusively for their produce, ensuring traceability and ownership rights and then they can sell it to wholesalers.</p>
                                    </div>
                                    <div className="bg-white shadow-lg rounded-lg px-8 pt-12 pb-10 flex flex-col justify-center items-center">
                                        <img src={wholesaler} alt="Secure Data" className="h-12 w-12 mb-4" />
                                        <h3 className="text-xl font-medium text-gray-900 mb-2">For Wholesalers</h3>
                                        <p className="text-base text-gray-500 text-center">Wholesalers can easily create packaged items using the produced tokens, enabling efficient inventory management and seamless tracking.</p>
                                    </div>
                                    <div className="bg-white shadow-lg rounded-lg px-8 pt-12 pb-10 flex flex-col justify-center items-center">
                                        <img src={retailer} alt="Decentralized" className="h-12 w-12 mb-4" />
                                        <h3 className="text-xl font-medium text-gray-900 mb-2">For Retailers and Consumers</h3>
                                        <p className="text-base text-gray-500 text-center">Consumers can buy products from the retailers and then can track the authenticity of the product by tracking it over the supply chain.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-gray-100 py-16">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-3xl mx-auto text-center">
                                    <h2 className="text-3xl font-extrabold text-gray-900">About Us</h2>
                                </div>
                                <div className="mt-12 bg-white text-center shadow-lg rounded-lg px-8 pt-12 pb-10 flex flex-col justify-center items-center">
                                    <p className="mt-4 max-w-2xl text-xl text-gray-500">Our platform revolutionizes the way businesses handle and track their supply chains. With a focus on security and transparency, we provide a seamless solution for managing the flow of goods and services. By leveraging blockchain technology, farmers can create tokens for their produce, and enable wholesalers to create tokens for the packaged products, and track them throughout the entire supply chain.</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-gray-100 py-16">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-3xl mx-auto text-center">
                                    <h2 className="text-3xl font-extrabold text-gray-900">Get Started</h2>
                                </div>
                                <div className="mt-12 bg-white text-center shadow-lg rounded-lg px-8 pt-12 pb-10 flex flex-col justify-center items-center">
                                    <p className="mt-4 max-w-2xl text-xl text-gray-500">Sign up for our platform today and experience the benefits of secure and decentralized supply chain management.</p>
                                    <div className="mt-8">
                                        <a href="#" className="inline-block px-6 py-4 text-lg font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">Get Started</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <footer className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 pt-4 flex flex-col justify-center items-center">
                        <p className="text-base leading-6 text-gray-500">
                            © 2023 Supply Chain Management Platform. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Home;