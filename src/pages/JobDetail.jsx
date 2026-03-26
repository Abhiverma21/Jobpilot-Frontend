import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const JobDetail = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [resume, setResume] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const editFormRef = useRef(null);

  const [editForm, setEditForm] = useState({
    status: "",
    interviewDate: "",
    notes: "",
  });

  const formatDate = (date) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get("/jobs/getjobs");
        const found = res.data.jobs.find((j) => j._id === jobId);

        if (!found) {
          setError("Job not found");
          return;
        }

        setJob(found);

        try {
          const resumeRes = await API.get("/resume/getresume");
          setResume(resumeRes.data);

          const matchRes = await API.post(`/jobs/${jobId}/match`, {
            resumeId: resumeRes.data._id,
          });

          setMissingSkills(matchRes.data.missing || []);
        } catch (err) {
          console.warn("Resume not available");
        }
      } catch (err) {
        setError("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJob();
  }, [jobId]);

  const handleEditClick = () => {
    setEditForm({
      status: job.status,
      interviewDate: formatDate(job.interviewDate),
      notes: job.notes || "",
    });

    setIsEditing(true);

    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();

    setUpdating(true);

    try {
      const res = await API.put(`/jobs/${jobId}/updatejob`, editForm);
      setJob(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  if (error || !job)
    return (
      <div className="p-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 text-sm mb-4"
        >
          ← Back
        </button>

        <div className="bg-red-50 border border-red-200 p-4 rounded text-red-600">
          {error}
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {job.companyName}
            </h1>

            <p className="text-gray-600">{job.role}</p>
          </div>

          <div className="flex gap-2">

            <button
              onClick={() => navigate("/dashboard")}
              className="px-3 py-2 text-sm border rounded-md hover:bg-gray-100"
            >
              Dashboard
            </button>

            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
            )}

          </div>

        </div>

        {/* Status */}

        <div className="flex items-center gap-4 text-sm">

          <span
            className={`px-2 py-1 rounded-md text-xs font-medium
            ${
              job.status === "Applied"
                ? "bg-blue-100 text-blue-700"
                : job.status === "Interview"
                ? "bg-yellow-100 text-yellow-700"
                : job.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {job.status}
          </span>

          <span className="text-gray-600">
            Match Score: <b>{job.matchScore || 0}%</b>
          </span>

        </div>

        {/* Description */}

        <div className="bg-white border rounded-lg p-5">

          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Job Description
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {job.jobDescription}
          </p>

        </div>

        {/* Skills */}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white border rounded-lg p-5">

            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {job.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-gray-100 border rounded"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          <div className="bg-white border rounded-lg p-5">

            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Skill Gap
            </h3>

            {!resume ? (
              <p className="text-xs text-gray-500">
                Upload resume to analyze skills
              </p>
            ) : missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-red-50 text-red-600 border border-red-200 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-green-600 text-sm font-medium">
                Perfect match
              </p>
            )}

          </div>

        </div>

        {/* Edit Form */}

        {isEditing && (

          <div
            ref={editFormRef}
            className="bg-white border rounded-lg p-6"
          >

            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Update Application
            </h3>

            <form
              onSubmit={handleUpdateJob}
              className="grid md:grid-cols-2 gap-4"
            >

              <div>
                <label className="text-xs text-gray-600">Status</label>

                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                  className="w-full border rounded-md p-2 text-sm mt-1"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                  <option>Selected</option>
                </select>

              </div>

              <div>
                <label className="text-xs text-gray-600">Interview Date</label>

                <input
                  type="date"
                  value={editForm.interviewDate}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      interviewDate: e.target.value,
                    })
                  }
                  className="w-full border rounded-md p-2 text-sm mt-1"
                />

              </div>

              <div className="md:col-span-2">

                <label className="text-xs text-gray-600">Notes</label>

                <textarea
                  value={editForm.notes}
                  onChange={(e) =>
                    setEditForm({ ...editForm, notes: e.target.value })
                  }
                  className="w-full border rounded-md p-2 text-sm mt-1 h-28"
                />

              </div>

              <div className="flex gap-3">

                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {updating ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm border rounded-md"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};

export default JobDetail;