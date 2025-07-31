

const Navbar =() => {
    return (
        <nav className="bg-gray-100 px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    {/* Left - Navigation Links */}
                    <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
                </div>
                <div className="text-center">
                    {/* Center - Logo */}
                    <img src="/logo.png" alt="Logo" className="h-8" />
                </div>
                <div>
                    {/* Right - Login Button */}
                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;