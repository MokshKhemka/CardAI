export function HeroDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circuit-like patterns */}
      <svg
        className="absolute top-1/4 -left-24 w-64 h-64 text-teal-500/10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M45,-57.2C58.2,-46.3,68.7,-31.9,72.1,-15.6C75.5,0.7,71.8,18.9,63.1,33.5C54.3,48.1,40.5,59.1,24.4,65.2C8.4,71.3,-9.9,72.4,-25.9,66.6C-41.9,60.8,-55.5,48,-63.3,32.5C-71.1,17,-73,1,-68.8,-12.8C-64.6,-26.6,-54.2,-38.2,-41.9,-49.1C-29.5,-60,-14.8,-70.2,0.8,-71.2C16.3,-72.2,31.7,-68.1,45,-57.2Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className="absolute bottom-1/4 -right-24 w-64 h-64 text-amber-500/10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M39.2,-48.7C52.9,-39.9,67.5,-30.9,71.5,-18.3C75.5,-5.7,68.9,10.5,60.1,23.5C51.3,36.5,40.3,46.3,27.5,52.7C14.7,59.1,0.1,62.1,-15.2,60.5C-30.5,58.9,-46.5,52.7,-56.8,41C-67.1,29.3,-71.7,12.1,-70.8,-4.9C-69.9,-21.9,-63.5,-38.7,-51.8,-47.8C-40.1,-56.9,-23.1,-58.3,-7.5,-49.9C8.1,-41.5,25.5,-57.5,39.2,-48.7Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Tech grid lines */}
      <div className="absolute left-1/4 top-1/3 w-64 h-64 border border-teal-500/20 rounded-full"></div>
      <div className="absolute left-1/4 top-1/3 w-48 h-48 border border-teal-500/15 rounded-full"></div>
      <div className="absolute left-1/4 top-1/3 w-32 h-32 border border-teal-500/10 rounded-full"></div>

      <div className="absolute right-1/4 bottom-1/3 w-64 h-64 border border-amber-500/20 rounded-full"></div>
      <div className="absolute right-1/4 bottom-1/3 w-48 h-48 border border-amber-500/15 rounded-full"></div>
      <div className="absolute right-1/4 bottom-1/3 w-32 h-32 border border-amber-500/10 rounded-full"></div>
    </div>
  )
}
