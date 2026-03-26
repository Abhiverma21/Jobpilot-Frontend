import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

function Dashboard() {
  const navigate = useNavigate()

  // --- States ---
  const [jobs, setJobs] = useState([])
  const [uploadedResume, setUploadedResume] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [missingSkills, setMissingSkills] = useState({})
  const [showNoResumeModal, setShowNoResumeModal] = useState(false) // For the Alert Pop-up
  
  const fileInputRef = useRef(null)
  const messageTimeoutRef = useRef(null)

  // --- Helper: Show Toast Message ---
  const showMessage = (type, text) => {
    setMessage({ type, text })
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage({ type: '', text: '' })
    }, 4000)
  }

  // --- Initial Data Fetch ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, resumeRes] = await Promise.allSettled([
          API.get("/jobs/getjobs"),
          API.get('/resume/getresume')
        ]);

        if (jobsRes.status === 'fulfilled') {
          setJobs(jobsRes.value.data.jobs || []);
        }
        if (resumeRes.status === 'fulfilled') {
          setUploadedResume(resumeRes.value.data);
        }
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      }
    };
    fetchData();
  }, [])

  // --- File Upload ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('resume', file)

    setUploading(true)
    try {
      const res = await API.post('/resume/uploadresume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setUploadedResume(res.data)
      showMessage('success', 'Resume uploaded successfully!')
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  // --- Delete Resume ---
  const handleDeleteResume = async () => {
    try {
      await API.delete('/resume/deleteresume')
      setUploadedResume(null)
      setJobs(jobs.map(j => ({ ...j, matchScore: 0 })))
      if (fileInputRef.current) fileInputRef.current.value = ''
      showMessage('success', 'Resume removed')
    } catch (err) {
      showMessage('error', 'Failed to delete resume')
    }
  }

  // --- Match Logic (With Pop-up Trigger) ---
  const handleMatch = async (jobId) => {
    if (!uploadedResume) {
      setShowNoResumeModal(true); // TRIGGER POP-UP
      return
    }

    try {
      const res = await API.post(`/jobs/${jobId}/match`, {
        resumeId: uploadedResume._id
      })
      
      setJobs(jobs.map(job => 
        job._id === jobId ? { ...job, matchScore: res.data.matchScore } : job
      ))
      setMissingSkills(prev => ({ ...prev, [jobId]: res.data.missing || [] }))
      showMessage('success', `Match Score: ${res.data.matchScore}%`)
    } catch (err) {
      showMessage('error', 'Matching failed')
    }
  }

  // --- Update Job Status ---
  const handleUpdateStatus = async (jobId, newStatus) => {
    try {
      const res = await API.put(`/jobs/${jobId}/updatejob`, { status: newStatus })
      setJobs(jobs.map(job => 
        job._id === jobId ? { ...job, status: res.data.status } : job
      ))
      showMessage('success', `Status: ${newStatus}`)
    } catch (err) {
      showMessage('error', 'Update failed')
    }
  }

  // --- Delete Job ---
  const handleDeleteJob = async (jobId) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/jobs/${jobId}/deletejob`)
      setJobs(jobs.filter(job => job._id !== jobId))
      showMessage('success', 'Job deleted')
    } catch (err) {
      showMessage('error', 'Delete failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 relative">

      {/* 1. FIXED TOAST NOTIFICATION */}
      {message.text && (
        <div className={`fixed top-8 right-8 z-[100] px-6 py-3 rounded-xl shadow-2xl text-white font-bold transform transition-all animate-in slide-in-from-right-10 ${
          message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      {/* 2. NO RESUME POP-UP MODAL */}
      {showNoResumeModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 text-3xl">⚠️</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Wait a second!</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We can't analyze your match score without a resume. Please upload one first.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                   setShowNoResumeModal(false);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
              >
                Upload Resume Now
              </button>
              <button onClick={() => setShowNoResumeModal(false)} className="text-gray-400 font-semibold hover:text-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Job Dashboard</h1>
            {/* <p className="text-gray-500">Track and optimize your job applications</p> */}
          </div>
          <button
            onClick={() => navigate('/addjob')}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white  rounded-2xl shadow-xl transition-all active:scale-95"
          >
            + Add New Application
          </button>
        </header>

        {/* Resume Card */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 text-2xl">📄</div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Your Master Resume</h2>
              <p className="text-sm text-gray-500">Used for all automated skill-gap analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white file:font-bold hover:file:bg-indigo-700 cursor-pointer"
            />
            {uploadedResume && (
              <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <span className="text-green-700 text-xs font-bold truncate max-w-[150px]">{uploadedResume.fileName}</span>
                <button onClick={handleDeleteResume} className="text-red-400 hover:text-red-600 font-bold">✕</button>
              </div>
            )}
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-gray-800 truncate pr-4">{job.companyName}</h2>
                <button onClick={() => handleDeleteJob(job._id)} className="text-gray-300 hover:text-red-500 transition-colors">✕</button>
              </div>
              <p className="text-indigo-500 font-bold mb-6">{job.role}</p>

              <div className="mb-6">
                <select
                  value={job.status}
                  onChange={(e) => handleUpdateStatus(job._id, e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border-none text-sm font-bold text-gray-600 outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Selected">Selected</option>
                </select>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>Skill Match</span>
                  <span>{job.matchScore || 0}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-700 ${job.matchScore > 75 ? 'bg-green-500' : 'bg-indigo-500'}`} 
                    style={{ width: `${job.matchScore || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleMatch(job._id)}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-black transition-all shadow-md active:scale-95"
                >
                  Quick Match
                </button>
                <button
                  onClick={() => navigate(`/jobdetail/${job._id}`)}
                  className="flex-1 bg-white text-gray-700 border border-gray-200 py-3 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all"
                >
                  Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard