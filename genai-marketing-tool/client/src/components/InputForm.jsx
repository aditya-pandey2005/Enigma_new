import { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    product: "",
    audience: "",
    platform: "Instagram",
    tone: "Professional",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // send data to parent
  };

  return (
    <div className="p-4 shadow-md rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4">Generate Marketing Content</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Product Description */}
        <textarea
          name="product"
          placeholder="Enter product description..."
          value={formData.product}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Target Audience */}
        <input
          type="text"
          name="audience"
          placeholder="Target audience (e.g., students, fitness lovers)"
          value={formData.audience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Platform */}
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Instagram</option>
          <option>LinkedIn</option>
          <option>Twitter</option>
        </select>

        {/* Tone */}
        <select
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Professional</option>
          <option>Funny</option>
          <option>Emotional</option>
          <option>Casual</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Generate Content
        </button>
      </form>
    </div>
  );
};

export default InputForm;