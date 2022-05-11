const TopBar = () => {
    return (
        <header class="bg-white text-gray-600 body-font ">
            <div class="container mx-auto flex flex-wrap px-5 flex-col md:flex-row items-center">
                <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
</svg>
                <span class="ml-3 text-xl">DSVI TOOL DEMO</span>
                </a>
                <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <img src="/images/sdglogodark.jpg" className="w-50 h-20"/>
                   
                </a>
                </nav>
                <a class="inline-flex items-center  border-0 py-1 px-3   rounded text-base mt-4 md:mt-0">
                <img src="/images/UNDP_Logo.png" className=" h-20"/>
                </a>
            </div>
        </header>
    )
}
export default TopBar;