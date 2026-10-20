"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Pencil,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  X,
  UploadCloud,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Eye,
  Images,
  Info,
} from "lucide-react";
import { AboutPhoto, DEFAULT_ABOUT_PHOTOS } from "@/lib/db";
import { compressImage } from "@/lib/imageUtils";
import AboutImageCarousel from "@/components/AboutImageCarousel";

interface PhotoFormData {
  caption: string;
  sort_order: number | string;
  url: string;
  file: File | null;
  previewUrl: string | null;
}

const INITIAL_FORM: PhotoFormData = {
  caption: "",
  sort_order: "",
  url: "",
  file: null,
  previewUrl: null,
};

export default function AdminAboutPhotosManager() {
  const [photos, setPhotos] = useState<AboutPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreviewCarousel, setShowPreviewCarousel] = useState(true);

  // Add Form
  const [formData, setFormData] = useState<PhotoFormData>(INITIAL_FORM);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit Modal
  const [editingPhoto, setEditingPhoto] = useState<AboutPhoto | null>(null);
  const [editFormData, setEditFormData] = useState<{
    caption: string;
    sort_order: number | string;
    url: string;
  }>({ caption: "", sort_order: "", url: "" });

  // Delete Confirmation Modal
  const [deletingPhoto, setDeletingPhoto] = useState<AboutPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notification / Feedback banner
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/about-photos");
      if (!res.ok) {
        throw new Error("Failed to load photos");
      }
      const data = await res.json();
      setPhotos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message: "Failed to load photos from database. Showing default list.",
      });
      setPhotos(DEFAULT_ABOUT_PHOTOS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/about-photos");
        if (!res.ok) {
          throw new Error("Failed to load photos");
        }
        const data = await res.json();
        if (!ignore) {
          setPhotos(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setFeedback({
            type: "error",
            message: "Failed to load photos from database. Showing default list.",
          });
          setPhotos(DEFAULT_ABOUT_PHOTOS);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Handle file selection and preview
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({
        type: "error",
        message: "Please choose a valid image file (JPEG, PNG, WEBP).",
      });
      return;
    }

    try {
      // Compress to max 1200px width/height for fast loading
      const compressed = await compressImage(file, 1200, 0.85);
      const preview = URL.createObjectURL(compressed);
      setFormData((prev) => ({
        ...prev,
        file: compressed,
        previewUrl: preview,
      }));
    } catch (err) {
      console.error("Compression error:", err);
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        file,
        previewUrl: preview,
      }));
    }
  };

  // Submit new photo
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file && !formData.url.trim()) {
      setFeedback({
        type: "error",
        message: "Please select an image file or provide an image URL.",
      });
      return;
    }

    setIsUploading(true);
    setFeedback(null);

    try {
      let finalUrl = formData.url.trim();

      // If a file was selected, upload it via /api/upload
      if (formData.file) {
        const uploadData = new FormData();
        uploadData.append("file", formData.file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error || "Image upload failed");
        }

        const { url } = await uploadRes.json();
        finalUrl = url;
      }

      // Determine sort order: default to photos.length + 1 if not specified
      const sortOrderNum =
        formData.sort_order === ""
          ? photos.length + 1
          : parseInt(String(formData.sort_order), 10) || 0;

      // Save to /api/about-photos
      const res = await fetch("/api/about-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: finalUrl,
          caption: formData.caption.trim() || null,
          sort_order: sortOrderNum,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save photo");
      }

      setFeedback({
        type: "success",
        message: "Photo uploaded and added to About Us carousel successfully!",
      });

      setFormData(INITIAL_FORM);
      setShowAddModal(false);
      await fetchPhotos();
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Failed to upload photo. Please check your connection and try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Open Edit Modal
  const handleEditClick = (photo: AboutPhoto) => {
    setEditingPhoto(photo);
    setEditFormData({
      caption: photo.caption || "",
      sort_order: photo.sort_order,
      url: photo.url,
    });
  };

  // Submit Edit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    setIsUploading(true);
    try {
      const res = await fetch(`/api/about-photos/${editingPhoto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption: editFormData.caption.trim() || null,
          sort_order: parseInt(String(editFormData.sort_order), 10) || 0,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update photo");
      }

      setFeedback({
        type: "success",
        message: "Photo details updated successfully!",
      });
      setEditingPhoto(null);
      await fetchPhotos();
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Failed to update photo. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Delete
  const handleDeleteConfirm = async () => {
    if (!deletingPhoto) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/about-photos/${deletingPhoto.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete photo");
      }

      setFeedback({
        type: "success",
        message: "Photo deleted from carousel successfully.",
      });
      setDeletingPhoto(null);
      await fetchPhotos();
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Failed to delete photo. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Move photo up or down in sort order
  const handleShiftOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const current = photos[index];
    const target = photos[targetIndex];

    try {
      // Swap their sort orders
      const currentNewOrder = target.sort_order;
      const targetNewOrder = current.sort_order;

      await Promise.all([
        fetch(`/api/about-photos/${current.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sort_order: currentNewOrder }),
        }),
        fetch(`/api/about-photos/${target.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sort_order: targetNewOrder }),
        }),
      ]);

      await fetchPhotos();
    } catch (err) {
      console.error("Order shift error:", err);
      setFeedback({
        type: "error",
        message: "Failed to update photo order.",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`flex items-center justify-between p-4 rounded-2xl border text-sm transition-all ${
            feedback.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <p className="font-medium">{feedback.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 hover:opacity-75 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-text-dark">
              About Us Carousel Photos
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary-dark">
              {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
            </span>
          </div>
          <p className="text-sm text-text-light">
            Manage the photos displayed in the About Us section slider with arrow buttons and auto-play.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setShowPreviewCarousel((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
              showPreviewCarousel
                ? "bg-primary/10 border-primary/20 text-primary-dark"
                : "bg-gray-50 border-gray-200 text-text-light hover:bg-gray-100"
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{showPreviewCarousel ? "Hide Preview" : "Show Preview"}</span>
          </button>

          <button
            type="button"
            onClick={fetchPhotos}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-text-light hover:text-text-dark bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh Photos"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({
                ...INITIAL_FORM,
                sort_order: photos.length + 1,
              });
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        </div>
      </div>

      {/* Live Carousel Preview in Admin */}
      {showPreviewCarousel && photos.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Images className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text-dark text-base sm:text-lg">
                Live Visitor Carousel Preview
              </h3>
            </div>
            <span className="text-xs text-text-light flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Auto-advances every 4.5s; hover to pause
            </span>
          </div>
          <div className="max-w-xl mx-auto">
            <AboutImageCarousel initialPhotos={photos} autoPlayInterval={4500} />
          </div>
        </div>
      )}

      {/* Photos List / Grid */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-dark">Current Photos</h3>
          <p className="text-xs text-text-light">
            Ordered by sort order (top = first shown)
          </p>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-text-light flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm">Loading about photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="py-12 text-center text-text-light border-2 border-dashed border-gray-200 rounded-2xl p-8">
            <Images className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-text-dark text-base">No Photos in Gallery</p>
            <p className="text-sm text-text-light max-w-md mx-auto mt-1 mb-4">
              Click &quot;Upload New Photo&quot; to add photos of your gaushala and cows to the About Us section.
            </p>
            <button
              type="button"
              onClick={() => {
                setFormData({ ...INITIAL_FORM, sort_order: 1 });
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Photo</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative bg-bg-light/40 rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-primary/30"
              >
                {/* Photo Thumbnail */}
                <div className="relative w-full h-48 bg-neutral-900 overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={photo.caption || "About photo"}
                    fill
                    unoptimized={photo.url.startsWith("data:")}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Order badge */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-sm">
                    #{photo.sort_order} (Slide {index + 1})
                  </span>

                  {/* Quick Shift Up / Down buttons */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleShiftOrder(index, "up")}
                      title="Move slide earlier"
                      className="p-1 text-white hover:text-primary-light disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === photos.length - 1}
                      onClick={() => handleShiftOrder(index, "down")}
                      title="Move slide later"
                      className="p-1 text-white hover:text-primary-light disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-1">
                      Caption
                    </p>
                    <p className="text-sm font-medium text-text-dark line-clamp-2">
                      {photo.caption || <span className="italic text-gray-400">No caption</span>}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100/80">
                    <span className="text-[11px] text-text-light truncate max-w-[140px]" title={photo.url}>
                      {photo.url.startsWith("data:") ? "Base64 image" : photo.url.split("/").pop()}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEditClick(photo)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-text-dark hover:text-primary bg-white hover:bg-primary/5 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                        title="Edit caption and order"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingPhoto(photo)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload New Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-text-dark">
                  Upload Photo for About Us
                </h3>
                <p className="text-xs text-text-light mt-0.5">
                  Add photos that will cycle in the About Us carousel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setFormData(INITIAL_FORM);
                }}
                className="p-1 text-gray-400 hover:text-text-dark rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Image File Dropzone / Picker */}
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-2">
                  Select Photo File <span className="text-red-500">*</span>
                </label>

                {formData.previewUrl ? (
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden border-2 border-primary/40 bg-neutral-900 group">
                    <Image
                      src={formData.previewUrl}
                      alt="Upload preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white text-text-dark rounded-xl text-xs font-semibold shadow hover:bg-gray-100 cursor-pointer"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            file: null,
                            previewUrl: null,
                          }))
                        }
                        className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-semibold shadow hover:bg-red-700 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 hover:border-primary rounded-2xl p-6 text-center cursor-pointer transition-colors bg-bg-light/30 hover:bg-bg-light/60"
                  >
                    <UploadCloud className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold text-text-dark">
                      Click to choose an image
                    </p>
                    <p className="text-xs text-text-light mt-1">
                      JPEG, PNG, WEBP (auto-compressed for fast loading)
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Or Direct Image URL (optional alternative) */}
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Or Image URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://... or /Cow.jpg"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Caption (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Caring for cows at Premadhu Gau Seva Samiti"
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      caption: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Sort Order Number
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1, 2, 3..."
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sort_order: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <p className="text-[11px] text-text-light mt-1">
                  Lower numbers display earlier in the carousel sequence.
                </p>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData(INITIAL_FORM);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-light hover:text-text-dark bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || (!formData.file && !formData.url.trim())}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isUploading ? "Uploading..." : "Save Photo"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-text-dark">Edit Photo Details</h3>
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className="p-1 text-gray-400 hover:text-text-dark rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Thumbnail */}
            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-neutral-900">
              <Image
                src={editingPhoto.url}
                alt="Editing photo"
                fill
                unoptimized={editingPhoto.url.startsWith("data:")}
                className="object-cover"
              />
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Caption
                </label>
                <textarea
                  rows={3}
                  value={editFormData.caption}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      caption: e.target.value,
                    }))
                  }
                  placeholder="Enter caption for this photo..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">
                  Sort Order Number
                </label>
                <input
                  type="number"
                  value={editFormData.sort_order}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      sort_order: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-light hover:text-text-dark bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isUploading ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPhoto && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h4 className="text-lg font-bold text-text-dark">Delete Photo?</h4>
              <p className="text-xs text-text-light mt-1">
                Are you sure you want to remove this photo from the About Us section carousel?
              </p>
            </div>

            <div className="relative w-full h-32 rounded-xl overflow-hidden bg-neutral-900">
              <Image
                src={deletingPhoto.url}
                alt="To delete"
                fill
                unoptimized={deletingPhoto.url.startsWith("data:")}
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingPhoto(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-text-light hover:text-text-dark bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isDeleting ? "Deleting..." : "Yes, Delete Photo"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
