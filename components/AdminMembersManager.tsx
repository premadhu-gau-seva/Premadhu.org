"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  X,
  Loader2,
  Users,
  Hash,
  FileText,
  User,
  Briefcase,
  RefreshCw,
} from "lucide-react";
import { Member } from "@/lib/db";

interface MemberFormData {
  name: string;
  designation: string;
  bio: string;
  sort_order: number | string;
}

const INITIAL_FORM_DATA: MemberFormData = {
  name: "",
  designation: "",
  bio: "",
  sort_order: "",
};

export default function AdminMembersManager() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Add Form State
  const [formData, setFormData] = useState<MemberFormData>(INITIAL_FORM_DATA);
  const [showAddForm, setShowAddForm] = useState(false);

  // Edit Modal State
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editFormData, setEditFormData] = useState<MemberFormData>(INITIAL_FORM_DATA);

  // Delete Confirmation Modal State
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshMembers = () => {
    setIsLoading(true);
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    let ignore = false;
    async function loadMembers() {
      try {
        const res = await fetch("/api/members");
        if (!res.ok) {
          throw new Error("Failed to load members");
        }
        const data = await res.json();
        if (!ignore) {
          setMembers(data);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setFeedback({
            type: "error",
            message: "Failed to load members from database. Please refresh.",
          });
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMembers();
    return () => {
      ignore = true;
    };
  }, [refreshKey]);

  // Clear feedback automatically after 5 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Handle Add Member Submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim()) {
      setFeedback({
        type: "error",
        message: "Please provide both Name and Designation.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          designation: formData.designation.trim(),
          bio: formData.bio.trim() || null,
          sort_order:
            formData.sort_order === ""
              ? members.length + 1
              : parseInt(String(formData.sort_order), 10),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create member");
      }

      setFeedback({
        type: "success",
        message: `Member "${data.name}" added successfully!`,
      });
      setFormData(INITIAL_FORM_DATA);
      setShowAddForm(false);
      refreshMembers();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error creating member";
      setFeedback({
        type: "error",
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Edit Modal
  const handleStartEdit = (member: Member) => {
    setEditingMember(member);
    setEditFormData({
      name: member.name,
      designation: member.designation,
      bio: member.bio || "",
      sort_order: member.sort_order,
    });
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    if (!editFormData.name.trim() || !editFormData.designation.trim()) {
      setFeedback({
        type: "error",
        message: "Please provide both Name and Designation.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/members/${editingMember.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editFormData.name.trim(),
          designation: editFormData.designation.trim(),
          bio: editFormData.bio.trim() || null,
          sort_order:
            editFormData.sort_order === ""
              ? 0
              : parseInt(String(editFormData.sort_order), 10),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update member");
      }

      setFeedback({
        type: "success",
        message: `Member "${data.name}" updated successfully!`,
      });
      setEditingMember(null);
      refreshMembers();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error updating member";
      setFeedback({
        type: "error",
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Member
  const handleDeleteConfirm = async () => {
    if (!deletingMember) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/members/${deletingMember.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete member");
      }

      setFeedback({
        type: "success",
        message: `Member "${deletingMember.name}" deleted successfully.`,
      });
      setDeletingMember(null);
      refreshMembers();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error deleting member";
      setFeedback({
        type: "error",
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Alert / Toast Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-start justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 ${
            feedback.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 hover:bg-black/5 rounded-lg text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Actions Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-dark flex items-center gap-2.5">
            <Users className="w-5 h-5 text-primary" />
            <span>Members Directory</span>
          </h2>
          <p className="text-sm text-text-light mt-0.5">
            Manage all organization members, assign roles, and set display order.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={refreshMembers}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-text-light hover:text-text-dark transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh members list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (!showAddForm) {
                setFormData({
                  ...INITIAL_FORM_DATA,
                  sort_order: members.length + 1,
                });
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
          >
            {showAddForm ? (
              <>
                <X className="w-4 h-4" />
                <span>Close Form</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add Member Form (Collapsible Card) */}
      {showAddForm && (
        <div className="bg-white rounded-3xl border-2 border-primary/30 shadow-lg p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-bold text-text-dark">
                Add New Member
              </h3>
              <p className="text-xs text-text-light mt-0.5">
                Fill in the details below to add a member to the directory.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>Full Name <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                  <span>Designation / Role <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Volunteer Coordinator"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-primary" />
                  <span>Sort Order</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1, 2, 3..."
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({ ...formData, sort_order: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50/50 focus:bg-white transition-all"
                />
                <span className="text-[11px] text-text-light mt-1 block">
                  Lower numbers appear first on the public members page.
                </span>
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span>Bio (Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description or background..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50/50 focus:bg-white transition-all resize-y"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-5 py-2.5 text-sm font-medium text-text-light hover:text-text-dark hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Save Member</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members List Table / Cards */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-text-light flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm font-medium">Loading members directory...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center text-text-light space-y-3">
            <Users className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-text-dark">No Members Found</h3>
            <p className="text-sm text-text-light max-w-sm mx-auto">
              Get started by adding your first organization member using the &quot;Add Member&quot; button above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-text-light">
                  <th className="py-3.5 px-4 sm:px-6 w-16 text-center">Order</th>
                  <th className="py-3.5 px-4 sm:px-6">Name</th>
                  <th className="py-3.5 px-4 sm:px-6">Designation</th>
                  <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">Bio</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50/60 transition-colors group"
                  >
                    {/* Sort Order */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-bg-light text-primary font-bold text-xs">
                        {member.sort_order}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="py-4 px-4 sm:px-6 font-semibold text-text-dark">
                      {member.name}
                    </td>

                    {/* Designation */}
                    <td className="py-4 px-4 sm:px-6">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary-dark">
                        {member.designation}
                      </span>
                    </td>

                    {/* Bio */}
                    <td className="py-4 px-4 sm:px-6 text-text-light text-xs hidden md:table-cell max-w-xs truncate">
                      {member.bio || (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(member)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-dark hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit member"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingMember(member)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-text-dark">
                  Edit Member
                </h3>
                <p className="text-xs text-text-light mt-0.5">
                  Update details for {editingMember.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5">
                  Designation / Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.designation}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      designation: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={editFormData.sort_order}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      sort_order: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5">
                  Bio (Optional)
                </label>
                <textarea
                  rows={3}
                  value={editFormData.bio}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, bio: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-5 py-2.5 text-sm font-medium text-text-light hover:text-text-dark hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-md p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-text-dark mb-2">
              Delete Member?
            </h3>

            <p className="text-sm text-text-light mb-6 leading-relaxed">
              Are you sure you want to remove{" "}
              <strong className="text-text-dark font-semibold">
                {deletingMember.name}
              </strong>{" "}
              ({deletingMember.designation}) from the members directory? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingMember(null)}
                disabled={isSubmitting}
                className="w-full px-5 py-2.5 text-sm font-medium text-text-light hover:text-text-dark bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 text-white font-semibold text-sm rounded-xl hover:bg-red-700 shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
