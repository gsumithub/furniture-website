import { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    localStorage.getItem("adminPhoto") || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
  );
  const [username, setUsername] = useState(localStorage.getItem("adminUsername") || "Admin");
  const [email, setEmail] = useState(localStorage.getItem("adminEmail") || "krsumit2203@gmail.com");
  const [phone, setPhone] = useState(localStorage.getItem("adminPhone") || "9876543210");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    localStorage.setItem("adminPhoto", imagePreview);
    localStorage.setItem("adminUsername", username);
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("adminPhone", phone);
    
    // Dispatch custom event to notify Header
    window.dispatchEvent(new Event("adminPhotoUpdated"));
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-[88vh] bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      <div className="w-full bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6">
          User Profile
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b pb-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-5 py-2 rounded ${
              activeTab === "profile"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`px-5 py-2 rounded ${
              activeTab === "password"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Change Password
          </button>
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="space-y-6">

            {/* Image */}
            <div className="flex items-center gap-6">
              <label className="cursor-pointer">
                <img
                  src={imagePreview}
                  className="w-28 h-28 rounded-full object-cover border"
                />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <p className="text-gray-500">
                Click to change profile photo
              </p>
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="input"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input"
              />

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="input"
              />
            </div>

            <button 
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        )}

        {/* PASSWORD TAB */}
        {activeTab === "password" && (
          <div className="space-y-5">
            <input type="password" placeholder="Old Password" className="input" />
            <input type="password" placeholder="New Password" className="input" />
            <input type="password" placeholder="Confirm Password" className="input" />

            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
              Change Password
            </button>
          </div>
        )}
      </div>

      {/* Reusable class */}
      <style jsx>{`
        .input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          width: 100%;
          outline: none;
        }
        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
}