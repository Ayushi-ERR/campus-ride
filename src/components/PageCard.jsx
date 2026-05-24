function PageCard({ children, className = '' }) {
  return (
    <div className={`w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}>
      {children}
    </div>
  )
}

export default PageCard