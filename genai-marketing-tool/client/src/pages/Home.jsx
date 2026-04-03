// import React, { useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const [form, setForm] = useState({
//     product: "",
//     audience: "",
//     platform: "Instagram",
//     tone: "Energetic"
//   });

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const platforms = ["Instagram", "LinkedIn", "Twitter", "Facebook"];
//   const tones = ["Energetic", "Professional", "Funny", "Emotional"];

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const generateContent = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:5000/api/content/generate",
//         form
//       );
//       setResult(res.data);
//     } catch (err) {
//       alert("Error generating content");
//     }
//     setLoading(false);
//   };

//   const copyText = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Copied!");
//   };

//   const extractHashtags = (text) => {
//     return text.match(/#\w+/g) || [];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-6">

//       <h1 className="text-4xl font-bold mb-8 text-center">
//         🚀 AI Marketing Generator
//       </h1>

//       {/* FORM */}
//       <div className="bg-gray-900 p-6 rounded-xl mb-8 shadow-lg flex flex-wrap gap-4 justify-center">

//         <input
//           name="product"
//           placeholder="Product"
//           onChange={handleChange}
//           className="p-2 text-black rounded"
//         />

//         <input
//           name="audience"
//           placeholder="Audience"
//           onChange={handleChange}
//           className="p-2 text-black rounded"
//         />

//         {/* PLATFORM DROPDOWN */}
//         <select
//           name="platform"
//           value={form.platform}
//           onChange={handleChange}
//           className="p-2 text-black rounded"
//         >
//           {platforms.map((p) => (
//             <option key={p}>{p}</option>
//           ))}
//         </select>

//         {/* TONE DROPDOWN */}
//         <select
//           name="tone"
//           value={form.tone}
//           onChange={handleChange}
//           className="p-2 text-black rounded"
//         >
//           {tones.map((t) => (
//             <option key={t}>{t}</option>
//           ))}
//         </select>

//         <button
//           onClick={generateContent}
//           className="bg-pink-600 px-6 py-2 rounded hover:bg-pink-500"
//         >
//           {loading ? "Generating..." : "Generate"}
//         </button>
//       </div>

//       {/* LOADING */}
//       {loading && (
//         <div className="text-center text-xl animate-pulse">
//           ⚡ Generating AI Content...
//         </div>
//       )}

//       {/* RESULT */}
//       {result && (
//         <div className="grid md:grid-cols-2 gap-8">

//           {/* IMAGE CARD */}
//           <div className="bg-gray-900 p-4 rounded-xl shadow-lg">
//             <img
//               src={result.image.image_url}
//               alt="Generated"
//               className="rounded-xl mb-4"
//             />
//           </div>

//           {/* TEXT + SCORES */}
//           <div className="space-y-4">

//             {/* CAPTIONS */}
//             <div className="bg-gray-900 p-4 rounded-xl">
//               <h3 className="text-xl mb-2">📝 Content</h3>
//               <pre className="whitespace-pre-wrap text-sm">
//                 {result.textContent}
//               </pre>

//               <button
//                 onClick={() => copyText(result.textContent)}
//                 className="mt-2 bg-blue-600 px-3 py-1 rounded"
//               >
//                 Copy Text
//               </button>
//             </div>

//             {/* HASHTAGS */}
//             <div className="bg-gray-900 p-4 rounded-xl">
//               <h3 className="text-xl mb-2">🏷 Hashtags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {extractHashtags(result.textContent).map((tag, i) => (
//                   <span
//                     key={i}
//                     className="bg-purple-700 px-2 py-1 rounded text-sm"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* SCORES */}
//             <div className="bg-gray-900 p-4 rounded-xl">
//               <h3 className="text-xl mb-2">📊 Scores</h3>
//               <p>Creativity: {result.evaluation.creativity}</p>
//               <p>Engagement: {result.evaluation.engagement}</p>
//               <p>Clarity: {result.evaluation.clarity}</p>
//               <p>CTA: {result.evaluation.cta}</p>
//               <p>ML Score: {result.mlScore}</p>

//               <h2 className="text-2xl mt-3 text-green-400">
//                 🔥 Final Score: {result.finalScore}
//               </h2>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;







import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [form, setForm] = useState({
    product: "",
    audience: "",
    platform: "Instagram",
    tone: "Energetic",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const platforms = ["Instagram", "Facebook", "LinkedIn", "Twitter"];
  const tones = ["Energetic", "Professional", "Casual", "Luxury"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generate = async () => {
    try {
      setLoading(true);
      setData(null);

      const res = await axios.post(
        "http://127.0.0.1:5000/api/content/generate",
        form
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Error generating content");
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(data.textContent);
    alert("Copied!");
  };

  const downloadImage = () => {
    window.open(
      `http://127.0.0.1:8000/download-image?url=${encodeURIComponent(
        data.image.image_url
      )}`
    );
  };

  const hashtags = data?.textContent?.match(/#\w+/g) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        🚀 AI Marketing Generator
      </h1>

      {/* INPUT */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <input name="product" placeholder="Product" onChange={handleChange} className="p-2 rounded text-black" />
          <input name="audience" placeholder="Audience" onChange={handleChange} className="p-2 rounded text-black" />

          <select name="platform" onChange={handleChange} className="p-2 rounded text-black">
            {platforms.map(p => <option key={p}>{p}</option>)}
          </select>

          <select name="tone" onChange={handleChange} className="p-2 rounded text-black">
            {tones.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <button
          onClick={generate}
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 p-3 rounded-xl font-bold"
        >
          {loading ? "Generating..." : "✨ Generate"}
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center mt-10 animate-pulse">
          ⚡ Generating AI magic...
        </div>
      )}

      {/* RESULT */}
      {data && (
        <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

          {/* IMAGE */}
          <div className="bg-white/10 p-4 rounded-2xl">
            <img src={data.image.image_url} className="rounded-xl" />

            <button
              onClick={downloadImage}
              className="mt-3 w-full bg-green-600 p-2 rounded"
            >
              📥 Download Image
            </button>
          </div>

          {/* TEXT */}
          <div className="bg-white/10 p-4 rounded-2xl">
            <h2 className="font-bold mb-2">📝 Content</h2>

            <pre className="whitespace-pre-wrap text-sm">
              {data.textContent}
            </pre>

            <button
              onClick={copyText}
              className="mt-3 bg-blue-500 px-3 py-1 rounded"
            >
              📋 Copy Text
            </button>

            <div className="mt-4 flex flex-wrap gap-2">
              {hashtags.map((tag, i) => (
                <span key={i} className="bg-purple-700 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* SCORES */}
          <div className="col-span-2 bg-white/10 p-5 rounded-2xl">
            <h2 className="font-bold mb-4">📊 Score Analysis</h2>

            <ScoreBar label="Creativity" value={data.evaluation.creativity} />
            <ScoreBar label="Engagement" value={data.evaluation.engagement} />
            <ScoreBar label="Clarity" value={data.evaluation.clarity} />
            <ScoreBar label="CTA" value={data.evaluation.cta} />
            <ScoreBar label="ML Score" value={data.mlScore} />

            <div className="mt-4 text-xl font-bold text-green-400">
              🔥 Final Score: {data.finalScore}
            </div>

            <p className="mt-3 text-sm opacity-80">
              {data.evaluation.feedback}
            </p>
          </div>

          <button
            onClick={generate}
            className="col-span-2 bg-purple-600 p-3 rounded-xl"
          >
            🔁 Regenerate
          </button>

        </div>
      )}
    </div>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-gray-700 h-2 rounded">
        <div
          className="bg-green-400 h-2 rounded transition-all duration-700"
          style={{ width: `${value * 10}%` }}
        ></div>
      </div>
    </div>
  );
}