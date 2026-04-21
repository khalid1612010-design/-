import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Shield, Plus, Trash2, FileDown, Loader2, BarChart3,
  Users, BookOpen, ChevronDown, ChevronUp, CheckCircle, XCircle, Clock
} from 'lucide-react'
import {
  getExams, createExam, deleteExam, getAllResults
} from '../lib/supabase'

const ADMIN_PASSWORD = '2010'

// ────────────────── MAIN ──────────────────
export default function AdminPortal() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem('ekh_admin') === 'true')

  if (!auth) return <AdminLogin onAuth={() => { sessionStorage.setItem('ekh_admin', 'true'); setAuth(true) }} />
  return <AdminDashboard onLogout={() => { sessionStorage.removeItem('ekh_admin'); setAuth(false) }} />
}

// ────────────────── LOGIN ──────────────────
function AdminLogin({ onAuth }) {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')

  function handle(e) {
    e.preventDefault()
    if (pwd === ADMIN_PASSWORD) { setError(''); onAuth() }
    else setError('كلمة المرور غير صحيحة')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">لوحة الإدارة</h1>
          <p className="text-purple-300 mt-1">اختبارك</p>
        </div>
        <form onSubmit={handle} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-slate-300 text-sm mb-1">كلمة المرور</label>
            <input
              type="password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              placeholder="••••"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-500/30"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  )
}

// ────────────────── DASHBOARD ──────────────────
function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('exams')
  const [exams, setExams] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    const [{ data: ex }, { data: re }] = await Promise.all([getExams(), getAllResults()])
    setExams(ex || [])
    setResults(re || [])
    setLoading(false)
  }

  const avgScore = results.length
    ? Math.round(results.reduce((a, r) => a + (r.score / r.total) * 100, 0) / results.length)
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-black text-xl">لوحة الإدارة</h1>
              <p className="text-purple-300 text-xs">اختبارك</p>
            </div>
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
            { icon: BookOpen, label: 'عدد الامتحانات', value: exams.length, color: 'from-blue-500 to-cyan-500' },
            { icon: Users, label: 'عدد التسليمات', value: results.length, color: 'from-purple-500 to-pink-500' },
            { icon: BarChart3, label: 'متوسط الدرجات', value: avgScore !== null ? `${avgScore}%` : '-', color: 'from-emerald-500 to-teal-500' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Icon size={20} className="mx-auto mb-2 text-slate-400" />
              <div className={`text-2xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{value}</div>
              <div className="text-slate-400 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6 border border-white/10">
          {[['exams', 'الامتحانات'], ['results', 'النتائج'], ['create', 'إنشاء امتحان']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === key ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-purple-400" />
          </div>
        ) : (
          <>
            {tab === 'exams' && <ExamManager exams={exams} onRefresh={loadAll} />}
            {tab === 'results' && <ResultsView results={results} />}
            {tab === 'create' && <CreateExamForm onCreated={() => { loadAll(); setTab('exams') }} />}
          </>
        )}
      </div>
    </div>
  )
}

// ────────────────── EXAM MANAGER ──────────────────
function ExamManager({ exams, onRefresh }) {
  async function handleDelete(id, title) {
    if (!window.confirm(`حذف "${title}"؟`)) return
    await deleteExam(id)
    onRefresh()
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
        <p>لا توجد امتحانات. أنشئ امتحاناً أولاً</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {exams.map(exam => (
        <div key={exam.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold">{exam.title}</h3>
            {exam.subject && <p className="text-slate-400 text-sm mt-0.5">{exam.subject}</p>}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-slate-500 text-xs flex items-center gap-1"><Clock size={12} /> {exam.time_limit} دقيقة</span>
              <span className="text-slate-500 text-xs">{Array.isArray(exam.questions) ? exam.questions.length : 0} سؤال</span>
            </div>
          </div>
          <button
            onClick={() => handleDelete(exam.id, exam.title)}
            className="shrink-0 w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}

// ────────────────── RESULTS VIEW ──────────────────
function ResultsView({ results }) {
  function exportCSV() {
    const rows = [
      ['اسم الطالب', 'رقم الهاتف', 'الامتحان', 'الدرجة', 'المجموع', 'النسبة', 'التاريخ'],
      ...results.map(r => [
        r.students?.name || '',
        r.students?.phone || '',
        r.exams?.title || '',
        r.score,
        r.total,
        `${Math.round((r.score / r.total) * 100)}%`,
        new Date(r.created_at).toLocaleDateString('ar-EG'),
      ]),
    ]
    const csv = '\uFEFF' + rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'نتائج_اختبارك.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  if (results.length === 0) {
    return <div className="text-center py-20 text-slate-500"><p>لا توجد نتائج بعد</p></div>
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          <FileDown size={16} /> تصدير CSV
        </button>
      </div>
      <div className="space-y-3">
        {results.map(r => {
          const pct = Math.round((r.score / r.total) * 100)
          const pass = pct >= 50
          return (
            <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold">{r.students?.name || 'طالب'}</p>
                <p className="text-slate-400 text-xs mt-0.5">{r.students?.phone}</p>
                <p className="text-slate-500 text-xs mt-1">{r.exams?.title}</p>
              </div>
              <div className="text-center shrink-0">
                <div className={`text-xl font-black ${pass ? 'text-emerald-400' : 'text-red-400'}`}>{pct}%</div>
                <div className="text-slate-500 text-xs">{r.score}/{r.total}</div>
                <div className={`text-xs flex items-center gap-1 mt-1 ${pass ? 'text-emerald-400' : 'text-red-400'}`}>
                  {pass ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {pass ? 'ناجح' : 'راسب'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ────────────────── CREATE EXAM ──────────────────
const BLANK_Q = () => ({ text: '', options: ['', '', '', ''], correct: '' })

function CreateExamForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [timeLimit, setTimeLimit] = useState(30)
  const [questions, setQuestions] = useState([BLANK_Q()])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addQuestion() { setQuestions(q => [...q, BLANK_Q()]) }
  function removeQuestion(i) { setQuestions(q => q.filter((_, idx) => idx !== i)) }
  function updateQ(i, field, val) {
    setQuestions(q => q.map((item, idx) => idx === i ? { ...item, [field]: val } : item))
  }
  function updateOption(qi, oi, val) {
    setQuestions(q => q.map((item, idx) => idx === qi
      ? { ...item, options: item.options.map((o, oidx) => oidx === oi ? val : o) }
      : item))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!title.trim()) return setError('أدخل عنوان الامتحان')
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      if (!q.text.trim()) return setError(`السؤال ${i + 1}: أدخل نص السؤال`)
      if (q.options.some(o => !o.trim())) return setError(`السؤال ${i + 1}: أكمل جميع الخيارات`)
      if (!q.correct) return setError(`السؤال ${i + 1}: حدد الإجابة الصحيحة`)
    }
    setLoading(true)
    const { error } = await createExam({ title, subject, time_limit: timeLimit, questions })
    if (error) setError('حدث خطأ في الحفظ. تحقق من اتصال الإنترنت')
    else onCreated()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Exam Info */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <h3 className="text-white font-bold">معلومات الامتحان</h3>
        <div>
          <label className="block text-slate-300 text-sm mb-1">عنوان الامتحان *</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="مثال: امتحان الرياضيات"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">المادة</label>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="مثال: الرياضيات"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
          />
        </div>
        <div>
          <label className="block text-slate-300 text-sm mb-1">الوقت المسموح (بالدقائق)</label>
          <input
            type="number"
            value={timeLimit}
            onChange={e => setTimeLimit(Number(e.target.value))}
            min="5"
            max="180"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition"
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, qi) => (
          <div key={qi} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-bold">سؤال {qi + 1}</h4>
              {questions.length > 1 && (
                <button type="button" onClick={() => removeQuestion(qi)} className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <input
              value={q.text}
              onChange={e => updateQ(qi, 'text', e.target.value)}
              placeholder="اكتب السؤال هنا..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
            />
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">الخيارات (اختر الإجابة الصحيحة)</label>
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateQ(qi, 'correct', opt || '')}
                    className={`shrink-0 w-6 h-6 rounded-full border-2 transition-all ${q.correct === opt && opt ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 hover:border-emerald-500'}`}
                  />
                  <input
                    value={opt}
                    onChange={e => { updateOption(qi, oi, e.target.value); if (q.correct === opt) updateQ(qi, 'correct', e.target.value) }}
                    placeholder={`الخيار ${oi + 1}`}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition text-sm"
                  />
                </div>
              ))}
              {q.correct && <p className="text-emerald-400 text-xs">✓ الإجابة الصحيحة: {q.correct}</p>}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addQuestion}
        className="w-full border-2 border-dashed border-white/20 hover:border-purple-400/50 text-slate-400 hover:text-purple-300 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
      >
        <Plus size={18} /> إضافة سؤال
      </button>

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 disabled:opacity-60 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-lg transition-all shadow-lg shadow-purple-500/30"
      >
        {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
        {loading ? 'جارٍ الحفظ...' : 'حفظ الامتحان'}
      </button>
    </form>
  )
}
