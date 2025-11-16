import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6"
import { IoLogoLinkedin } from "react-icons/io"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="flex justify-center items-center px-6 py-6 bg-[#2f2f2f] flex-col text-white gap-6">

            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 max-w-5xl w-full">

                <div className="flex flex-col min-h-[140px]">
                    <Link className="text-xl font-medium pb-4 text-gray-300" to="/">React Cart</Link>
                    <p>Your trusted online shopping destination.</p>
                </div>

                <div className="flex flex-col min-h-[140px]">
                    <h3 className="font-medium pb-4 text-gray-300">Navigation</h3>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About Us</Link>
                </div>

                <div className="flex flex-col min-h-[140px]">
                    <h3 className="font-medium pb-4 text-gray-300">Support</h3>
                    <Link to="/">FAQ</Link>
                    <Link to="/">Shipping</Link>
                </div>

                <div className="flex flex-col min-h-[140px]">
                    <h3 className="font-medium pb-4 text-gray-300">Social</h3>
                    <div className="flex gap-3">

                        <Link to="https://github.com" className="w-6 h-6 flex items-center justify-center" aria-label="github">
                            <FaGithub className="w-full h-full" aria-hidden="true" />
                        </Link>
                        <Link to="https://instagram.com" className="w-6 h-6 flex items-center justify-center" aria-label="instagram">
                            <FaInstagram className="w-full h-full" aria-hidden="true" />
                        </Link>
                        <Link to="https://twitter.com" className="w-6 h-6 flex items-center justify-center" aria-label="twitter">
                            <FaTwitter className="w-full h-full" aria-hidden="true" />
                        </Link>
                        <Link to="https://linkedin.com" className="w-6 h-6 flex items-center justify-center" aria-label="linkedin">
                            <IoLogoLinkedin className="w-full h-full" aria-hidden="true" />
                        </Link>

                    </div>
                </div>

            </div>

            <p className="text-gray-300 pt-5 text-center">
                © 2025 React Cart - All Rights Reserved | Developed by <span className="font-medium">Jeesan Abbas</span>
            </p>
        </footer>

    )
}

export default Footer


