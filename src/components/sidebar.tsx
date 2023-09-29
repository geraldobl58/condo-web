import { MainNav } from "@/components/main-nav"

const Sidebar = () => {
  return (
    <div className="w-[300px] max-w-[300px] h-[100vh] flex flex-col bg-indigo-500 text-white">
      <div className="w-full shadow-sm  border-b-1 p-6">
        <h1>Logo</h1>
      </div>
      <div className='h-[100vh] flex flex-col justify-between'>
        <MainNav />
        <footer className="p-6 text-white">Footer</footer>
      </div>
    </div>
  )
}

export default Sidebar