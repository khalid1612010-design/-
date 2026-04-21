import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, LogIn, UserPlus, Clock, CheckCircle, XCircle, ExternalLink, Loader2, ChevronRight } from 'lucide-react'
import {
  loginStudent,
  registerStudent,
  getExams,
  getResultsByStudent,
  checkAlreadyTaken,
} from '../lib/supabase'

// ────────────────── MAIN ──────────────────
export default function StudentPortal() {
  const [student, setStudent] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('ekhtibarak_student')) } catch { return null }
  })

  if (!student) return <AuthScreen onAuth={setStudent} />
  return <Dashboard student={student} onLogout={() => { sessionStorage.removeItem('ekhtibarak_student'); setStudent(null) }} />
}

// ────────────────── AUTH ──────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        if (!name.trim() || !phone.trim() || !pin.trim()) throw new Error('كل الحقول مطلوبة')
        if (pin.length < 4) throw new Error('الرقم السري يجب أن يكون 4 أرقام على الأقل')
        const { data, error } = await registerStudent({ name, phone, pin })
        if (error) throw new Error('حدث خطأ في التسجيل. تأكد من اتصال بالإنترنت')
        sessionStorage.setItem('ekhtibarak_student', JSON.stringify(data))
        onAuth(data)
      } else {
        const { data, error } = await loginStudent({ phone, pin })
        if (error || !data) throw new Error('رقم الهاتف أو الرقم السري غير صحيح')
        sessionStorage.setItem('ekhtibarak_student', JSON.stringify(data))
        onAuth(data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <BookOpen size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">اختبارك</h1>
          <p className="text-blue-300 mt-1">بوابة الطلاب</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6 border border-white/10">
          <button
            onClick={() => { setMode('login'); setError('') }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${mode === 'login' ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <LogIn size={14} className="inline ml-1" /> تسجيل الدخول
          </button>
          <button
            onClick={() => { setMode('register'); setError('') }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${mode === 'register' ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <UserPlus size={14} className="inline ml-1" /> حساب جديد
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-slate-300 text-sm mb-1">الاسم الكامل</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="أدخل اسمك"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
          )}
          <div>
            <label className="block text-slate-300 text-sm mb-1">رقم الهاتف</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">الرقم السري</label>
            <input
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="••••"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 shadow-lg shadow-blue-500/30"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : mode === 'login' ? 'دخول' : 'إنشاء حساب'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ────────────────── DASHBOARD ──────────────────
function Dashboard({ student, onLogout }) {
  const [exams, setExams] = useState([])
  const [results, setResults] = useState([])
  const [takenMap, setTakenMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('exams') // 'exams' | 'results'

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [{ data: examsData }, { data: resultsData }] = await Promise.all([
      getExams(),
      getResultsByStudent(student.id),
    ])
    const exList = examsData || []
    const resList = resultsData || []
    setExams(exList)
    setResults(resList)

    // بناء خريطة الامتحانات المؤداة
    const map = {}
    resList.forEach(r => { map[r.exam_id] = true })
    setTakenMap(map)
    setLoading(false)
  }

  function startExam(examId) {
    // حفظ بيانات الطالب في sessionStorage للوصول من التاب الجديد
    sessionStorage.setItem('ekhtibarak_student', JSON.stringify(student))
    // فتح الامتحان في تاب جديد
    const examUrl = `${window.location.origin}/exam/${examId}`
    window.open(examUrl, '_blank', 'noopener,noreferrer')
  }

  const avgScore = results.length
    ? Math.round(results.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / results.length)
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">أهلاً، {student.name} 👋</h1>
            <p className="text-blue-300 text-sm mt-1">{student.phone}</p>
          </div>
          <button
            onClick={onLogout}
            className="text-slate-400 hover:text-red-400 text-sm border border-white/10 hover:border-red-400/30 px-4 py-2 rounded-xl transition-all"
          >
            خروج
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'امتحانات متاحة', value: exams.length, color: 'from-blue-500 to-cyan-500' },
            { label: 'امتحانات أديتها', value: results.length, color: 'from-indigo-500 to-purple-500' },
            { label: 'متوسط درجاتك', value: avgScore !== null ? `${avgScore}%` : '-', color: 'from-emerald-500 to-teal-500' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <div className={`text-2xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
              <div className="text-slate-400 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6 border border-white/10">
          {[['exams', 'الامتحانات المتاحة'], ['results', 'نتائجي']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === key ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-blue-400" />
          </div>
        ) : tab === 'exams' ? (
          <ExamsList exams={exams} takenMap={takenMap} onStart={startExam} />
        ) : (
          <ResultsList results={results} />
        )}
      </div>
    </div>
  )
}

// ────────────────── EXAMS LIST ──────────────────
function ExamsList({ exams, takenMap, onStart }) {
  if (exams.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
        <p>لا توجد امتحانات متاحة حالياً</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {exams.map(exam => {
        const taken = takenMap[exam.id]
        return (
          <div
            key={exam.id}
            className={`bg-white/5 border rounded-2xl p-5 flex items-center justify-between gap-4 transition-all duration-200 ${taken ? 'border-white/5 opacity-70' : 'border-white/10 hover:border-blue-400/40 hover:bg-white/8'}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-white font-bold text-lg truncate">{exam.title}</h3>
                {!taken && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">جديد</span>
                )}
                {taken && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">✓ مكتمل</span>
                )}
              </div>
              {exam.subject && <p className="text-slate-400 text-sm mt-1">{exam.subject}</p>}
              <div className="flex items-center gap-4 mt-2">
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <Clock size={12} /> {exam.time_limit} دقيقة
                </span>
                <span className="text-slate-500 text-xs">
                  {Array.isArray(exam.questions) ? exam.questions.length : 0} سؤال
                </span>
              </div>
            </div>

            {!taken ? (
              <button
                onClick={() => onStart(exam.id)}
                className="shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/20 whitespace-nowrap"
              >
                <ExternalLink size={16} />
                ابدأ الامتحان
              </button>
            ) : (
              <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle size={20} className="text-emerald-400" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ────────────────── RESULTS LIST ──────────────────
function ResultsList({ results }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <CheckCircle size={48} className="mx-auto mb-4 opacity-30" />
        <p>لم تؤدِ أي امتحانات بعد</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map(r => {
        const pct = Math.round((r.score / r.total) * 100)
        const pass = pct >= 50
        return (
          <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold">{r.exams?.title || 'امتحان'}</h3>
              {r.exams?.subject && <p className="text-slate-400 text-sm mt-0.5">{r.exams.subject}</p>}
              <p className="text-slate-500 text-xs mt-1">{new Date(r.created_at).toLocaleDateString('ar-EG')}</p>
            </div>
            <div className="text-center shrink-0">
              <div className={`text-2xl font-black ${pass ? 'text-emerald-400' : 'text-red-400'}`}>{pct}%</div>
              <div className="text-xs text-slate-500">{r.score} / {r.total}</div>
              <div className={`mt-1 text-xs flex items-center gap-1 ${pass ? 'text-emerald-400' : 'text-red-400'}`}>
                {pass ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {pass ? 'ناجح' : 'راسب'}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
