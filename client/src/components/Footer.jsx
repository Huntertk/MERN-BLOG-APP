import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsGithub, BsInstagram, BsLinkedin} from 'react-icons/bs'

const FooterComponenet = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                    <Link to={'/'} className='self-center whitespace-nowrap text-ld sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Taufik's
                        </span>
                            Blog
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <Footer.Title title="About"/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href="/about"
                            >
                                Taufik's Blog
                            </Footer.Link>
                            <Footer.Link
                                href="https://github.com/huntertk"
                                target="_blank"
                            >
                                GitHub
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Quick Links"/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href="/contact"
                            >
                                Contact Us
                            </Footer.Link>
                            <Footer.Link
                                href="mailto:taufik.khan65@gmail.com"
                                target="_blank"
                            >
                                Email Us
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Legal"/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                            href="#"
                            >
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link
                                href="#"
                            >
                                Terms &amp; Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href="#" by="Taufik's Blog" year={new Date().getFullYear()}/>
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href="#" icon={BsFacebook} />
                    <Footer.Icon href="#" icon={BsInstagram} />
                    <Footer.Icon href="#" icon={BsLinkedin} />
                    <Footer.Icon href="#" icon={BsGithub} />
                </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterComponenet