import { useNavigate } from 'react-router-dom'
import { BookOpen, Shield, Sparkles } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glowing orbs background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <BookOpen size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">اختبارك</h1>
          <p className="text-blue-300 text-sm font-medium">منصة الامتحانات الذكية</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-12 text-blue-400">
        <Sparkles size={16} />
        <span className="text-sm">مدعوم بقاعدة بيانات Supabase السحابية</span>
        <Sparkles size={16} />
      </div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        {/* Student Card */}
        <button
          onClick={() => navigate('/student')}
          className="group flex-1 relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">👨‍🎓</span>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">بوابة الطلاب</h2>
          <p className="text-slate-400 text-sm">تسجيل الدخول وأداء الامتحانات</p>
        </button>

        {/* Admin Card */}
        <button
          onClick={() => navigate('/admin')}
          className="group flex-1 relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
            <Shield size={28} className="text-white" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">لوحة الإدارة</h2>
          <p className="text-slate-400 text-sm">إنشاء الامتحانات ومتابعة النتائج</p>
        </button>
      </div>
    </div>
  )
}
