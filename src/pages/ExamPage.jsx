import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, CheckCircle, XCircle, Send, Loader2, AlertTriangle } from 'lucide-react'
import { getExamById, submitResult, checkAlreadyTaken } from '../lib/supabase'

export default function ExamPage() {
  const { examId } = useParams()
  const navigate = useNavigate()

  const [student, setStudent] = useState(null)
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [alreadyTaken, setAlreadyTaken] = useState(false)

  // Exam state
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    // قراءة بيانات الطالب من sessionStorage
    try {
      const stored = sessionStorage.getItem('ekhtibarak_student')
      if (!stored) {
        setError('يجب تسجيل الدخول أولاً من صفحة بوابة الطلاب')
        setLoading(false)
        return
      }
      setStudent(JSON.parse(stored))
    } catch {
      setError('خطأ في بيانات الجلسة')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!student) return
    loadExam()
  }, [student, examId])

  async function loadExam() {
    setLoading(true)
    try {
      const taken = await checkAlreadyTaken(student.id, examId)
      if (taken) {
        setAlreadyTaken(true)
        setLoading(false)
        return
      }

      const { data, error } = await getExamById(examId)
      if (error || !data) throw new Error('لم يتم العثور على الامتحان')

      setExam(data)
      // خلط الأسئلة والخيارات
      const questions = Array.isArray(data.questions) ? data.questions : []
      const shuffled = [...questions]
        .sort(() => Math.random() - 0.5)
        .map(q => ({
          ...q,
          shuffledOptions: [...(q.options || [])].sort(() => Math.random() - 0.5),
        }))
      setShuffledQuestions(shuffled)
      setTimeLeft(data.time_limit * 60)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Timer
  useEffect(() => {
    if (timeLeft === null || submitted) return
    if (timeLeft <= 0) {
      handleSubmit(true)
      return
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(timerRef.current)
  }, [timeLeft, submitted])

  const handleAnswer = (qIndex, option) => {
    setAnswers(prev => ({ ...prev, [qIndex]: option }))
  }

  const handleSubmit = useCallback(async (autoSubmit = false) => {
    if (submitting || submitted) return
    if (!autoSubmit) {
      const unanswered = shuffledQuestions.length - Object.keys(answers).length
      if (unanswered > 0 && !window.confirm(`لديك ${unanswered} سؤال(اً) بدون إجابة. هل تريد التسليم؟`)) return
    }
    clearTimeout(timerRef.current)
    setSubmitting(true)

    let score = 0
    shuffledQuestions.forEach((q, i) => {
      if (answers[i] === q.correct) score++
    })

    const { data, error } = await submitResult({
      student_id: student.id,
      exam_id: examId,
      score,
      total: shuffledQuestions.length,
      answers,
    })

    setResult({ score, total: shuffledQuestions.length, questions: shuffledQuestions, answers })
    setSubmitted(true)
    setSubmitting(false)
  }, [answers, shuffledQuestions, student, examId, submitted, submitting])

  // ── Loading / Error states ──
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertTriangle size={48} className="text-yellow-400 mx-auto mb-4" />
          <p className="text-white text-xl font-bold mb-2">تعذّر فتح الامتحان</p>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    )
  }

  if (alreadyTaken) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle size={64} className="text-emerald-400 mx-auto mb-4" />
          <h2 className="text-white text-2xl font-black mb-2">لقد أديت هذا الامتحان مسبقاً</h2>
          <p className="text-slate-400">يمكنك مراجعة نتيجتك من لوحة تحكم الطالب</p>
          <button onClick={() => window.close()} className="mt-6 bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-xl font-semibold transition">
            إغلاق
          </button>
        </div>
      </div>
    )
  }

  // ── Result Screen ──
  if (submitted && result) {
    const pct = Math.round((result.score / result.total) * 100)
    const pass = pct >= 50
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-12">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl ${pass ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
              {pass ? '🎉' : '😔'}
            </div>
            <h2 className="text-white text-3xl font-black mb-2">{pass ? 'أحسنت!' : 'حاول مرة أخرى'}</h2>
            <div className={`text-6xl font-black mb-4 ${pass ? 'text-emerald-400' : 'text-red-400'}`}>{pct}%</div>
            <p className="text-slate-400 mb-2">{result.score} إجابة صحيحة من {result.total}</p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${pass ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {pass ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {pass ? 'ناجح' : 'راسب'}
            </div>
          </div>

          {/* Review */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">مراجعة الإجابات</h3>
            {result.questions.map((q, i) => {
              const userAnswer = result.answers[i]
              const isCorrect = userAnswer === q.correct
              return (
                <div key={i} className={`rounded-2xl p-5 border ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  <p className="text-white font-semibold mb-3">{i + 1}. {q.text}</p>
                  <div className="space-y-2">
                    {q.shuffledOptions.map((opt, j) => {
                      const isUser = opt === userAnswer
                      const isRight = opt === q.correct
                      return (
                        <div
                          key={j}
                          className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 ${isRight ? 'bg-emerald-500/20 text-emerald-300' : isUser && !isRight ? 'bg-red-500/20 text-red-300' : 'text-slate-400'}`}
                        >
                          {isRight && <CheckCircle size={14} className="shrink-0" />}
                          {isUser && !isRight && <XCircle size={14} className="shrink-0" />}
                          {!isRight && !isUser && <span className="w-3.5 shrink-0" />}
                          {opt}
                          {isRight && <span className="text-xs opacity-60">(الإجابة الصحيحة)</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <button onClick={() => window.close()} className="w-full mt-8 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition">
            إغلاق
          </button>
        </div>
      </div>
    )
  }

  // ── Exam Screen ──
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const seconds = (timeLeft % 60).toString().padStart(2, '0')
  const timerWarning = timeLeft <= 60

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pb-24">
      {/* Sticky timer bar */}
      <div className={`sticky top-0 z-40 flex items-center justify-between px-4 py-3 backdrop-blur-md border-b ${timerWarning ? 'bg-red-900/80 border-red-700/50' : 'bg-slate-900/80 border-white/10'}`}>
        <div>
          <p className="text-white font-bold text-sm">{exam.title}</p>
          <p className="text-slate-400 text-xs">{student?.name}</p>
        </div>
        <div className={`flex items-center gap-2 text-xl font-black px-4 py-1 rounded-xl ${timerWarning ? 'text-red-300 bg-red-500/20 animate-pulse' : 'text-white bg-white/10'}`}>
          <Clock size={18} />
          {minutes}:{seconds}
        </div>
        <div className="text-slate-400 text-sm">
          {Object.keys(answers).length} / {shuffledQuestions.length}
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-2xl mx-auto p-4 space-y-6 mt-6">
        {shuffledQuestions.map((q, i) => (
          <div
            key={i}
            id={`q-${i}`}
            className={`bg-white/5 border rounded-2xl p-5 transition-all duration-200 ${answers[i] !== undefined ? 'border-blue-500/40' : 'border-white/10'}`}
          >
            <p className="text-white font-bold mb-4 leading-relaxed">
              <span className="text-blue-400 ml-2">{i + 1}.</span>
              {q.text}
            </p>
            <div className="space-y-2">
              {q.shuffledOptions.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => handleAnswer(i, opt)}
                  className={`w-full text-right px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${answers[i] === opt
                    ? 'bg-blue-500/20 border-blue-400 text-blue-200 shadow shadow-blue-500/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-md border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-60 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-lg transition-all shadow-lg shadow-emerald-500/30"
          >
            {submitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            {submitting ? 'جارٍ التسليم...' : 'تسليم الامتحان'}
          </button>
        </div>
      </div>
    </div>
  )
}
