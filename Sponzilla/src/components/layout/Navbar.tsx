
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
            <Link to="/" className="flex items-center gap-4 text-[#121416] cursor-pointer">
                <div className="size-4">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                    </svg>
                </div>
                <h2 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
            </Link>
            <div className="flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                    <a className="text-[#121416] text-sm font-medium leading-normal" href="#">For Clubs</a>
                    <a className="text-[#121416] text-sm font-medium leading-normal" href="#">For Brands</a>
                    <a className="text-[#121416] text-sm font-medium leading-normal" href="#">Resources</a>
                </div>
                <div className="flex gap-2">
                    <Link to="/list-event" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#dce8f3] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">List Your Event</span>
                    </Link>
                    <Link to="/browse-events" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Find Events</span>
                    </Link>
                    <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Login / Sign Up</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar;