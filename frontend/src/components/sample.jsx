// App.jsx - A Complete Landing Page Layout
export default function Sample() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HEADER - Full width, sticky top */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Logo</h1>
          
          {/* NAV - Inside header */}
          <nav className="flex gap-6">
            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* MAIN - The core content */}
      <main>
        
        {/* HERO SECTION */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-4">Build Amazing Websites</h2>
            <p className="text-xl mb-8">Learn to structure HTML like a pro</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Get Started
            </button>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
            
            {/* FLEX CONTAINER - This div is for LAYOUT ONLY */}
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* CARD 1 - Each card is an <article> because it's self-contained */}
              <article className="flex-1 bg-white rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4"></div>
                <h4 className="text-xl font-bold mb-2">Feature One</h4>
                <p className="text-gray-600">Description of this amazing feature.</p>
              </article>

              <article className="flex-1 bg-white rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mb-4"></div>
                <h4 className="text-xl font-bold mb-2">Feature Two</h4>
                <p className="text-gray-600">Another incredible capability.</p>
              </article>

              <article className="flex-1 bg-white rounded-xl shadow-md p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg mb-4"></div>
                <h4 className="text-xl font-bold mb-2">Feature Three</h4>
                <p className="text-gray-600">One more reason to love this.</p>
              </article>

            </div>
          </div>
        </section>

        {/* TWO-COLUMN LAYOUT SECTION */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* GRID CONTAINER - Using grid for 2-column layout */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* LEFT COLUMN - Content */}
              <div>
                <h3 className="text-3xl font-bold mb-4">Content Goes Here</h3>
                <p className="text-gray-600 mb-4">
                  This is the left column with text content. 
                  The grid automatically handles the two-column layout.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Point number one
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Point number two
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Point number three
                  </li>
                </ul>
              </div>
              
              {/* RIGHT COLUMN - Image placeholder */}
              <div className="bg-gray-300 rounded-xl h-64 flex items-center justify-center">
                <span className="text-gray-600">Image Placeholder</span>
              </div>
              
            </div>
          </div>
        </section>

        {/* ASIDE EXAMPLE - Sidebar content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Main content area */}
              <div className="flex-2">
                <h3 className="text-2xl font-bold mb-4">Main Article</h3>
                <p className="text-gray-600">This is the primary content...</p>
              </div>
              
              {/* ASIDE - Secondary/related content */}
              <aside className="flex-1 bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold mb-2">Related Info</h4>
                <p className="text-sm text-gray-600">This is supplementary content in an aside.</p>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="font-semibold">Quick Tip:</p>
                  <p className="text-sm">Use aside for sidebars and pull quotes!</p>
                </div>
              </aside>
              
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Footer grid - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Guides</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
    </div>
  )
}
