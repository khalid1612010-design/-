import { createClient } from '@supabase/supabase-js'

// ⚠️ استبدل هذه القيم ببيانات مشروعك في Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// =========================================================
// STUDENTS
// =========================================================
export async function registerStudent({ name, phone, pin }) {
  // تحقق إذا الطالب موجود أصلاً
  const { data: existing } = await supabase
    .from('students')
    .select('*')
    .eq('phone', phone)
    .single()

  if (existing) return { data: existing, error: null }

  const { data, error } = await supabase
    .from('students')
    .insert([{ name, phone, pin }])
    .select()
    .single()

  return { data, error }
}

export async function loginStudent({ phone, pin }) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('phone', phone)
    .eq('pin', pin)
    .single()

  return { data, error }
}

// =========================================================
// EXAMS
// =========================================================
export async function getExams() {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getExamById(id) {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createExam({ title, subject, time_limit, questions }) {
  const { data, error } = await supabase
    .from('exams')
    .insert([{ title, subject, time_limit, questions }])
    .select()
    .single()
  return { data, error }
}

export async function deleteExam(id) {
  const { error } = await supabase.from('exams').delete().eq('id', id)
  return { error }
}

// =========================================================
// RESULTS
// =========================================================
export async function submitResult({ student_id, exam_id, score, total, answers }) {
  const { data, error } = await supabase
    .from('results')
    .insert([{ student_id, exam_id, score, total, answers }])
    .select()
    .single()
  return { data, error }
}

export async function getResultsByStudent(student_id) {
  const { data, error } = await supabase
    .from('results')
    .select('*, exams(title, subject)')
    .eq('student_id', student_id)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getAllResults() {
  const { data, error } = await supabase
    .from('results')
    .select('*, students(name, phone), exams(title, subject)')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function checkAlreadyTaken(student_id, exam_id) {
  const { data } = await supabase
    .from('results')
    .select('id')
    .eq('student_id', student_id)
    .eq('exam_id', exam_id)
    .single()
  return !!data
}
