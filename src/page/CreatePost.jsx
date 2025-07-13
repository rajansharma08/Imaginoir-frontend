import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { toast } from "react-toastify";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await axios.post(
          `${baseURL}/api/v1/clipdrop`,
          {
            prompt: form.prompt,
          }
        );

        const { photo } = response.data;
        if (!photo) throw new Error("Photo not returned by API");

        setForm({ ...form, photo: `data:image/jpeg;base64,${photo}` });
        toast.success("Image generated successfully!");
      } catch (err) {
        toast.error("Error: " + err.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toast.warn("Please provide all details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseURL}/api/v1/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        toast.success("Success!");
        navigate("/home");
      } catch (err) {
        toast.error("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn("Please generate an image with proper details");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.section
        className="w-full max-w-4xl mx-auto px-6 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
            Create
          </h1>
          <p className="mt-2 text-gray-600 text-base max-w-lg">
            Generate an imaginative image using{" "}
            <span className="font-semibold text-purple-500">AI</span> and share
            it with the community.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          className=" mt-10 w-full bg-white/50 border border-white/30 shadow-2xl backdrop-blur-lg p-8 rounded-3xl"
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Input Fields */}
          <div className="flex flex-col gap-6">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Ex., John Doe"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            {/* Image Preview */}
            <div className="relative bg-white/60 border border-gray-300 rounded-xl w-64 h-64 flex justify-center items-center shadow-inner mx-auto">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-6 flex justify-center">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateImage}
              className="text-white bg-gradient-to-r from-green-500 to-emerald-600 font-semibold rounded-md text-sm px-6 py-2.5 shadow-md"
            >
              {generatingImg ? "Generating..." : " Generate"}
            </motion.button>
          </div>

          {/* Share Section */}
          <div className="mt-10 text-center">
            <p className="text-gray-700 text-sm italic mb-2">
              ⭐ Once your image is ready, you can share it with the community.
            </p>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold rounded-md text-sm px-6 py-2.5 shadow-md"
            >
              {loading ? "Sharing..." : " Share with the Community"}
            </motion.button>
          </div>
        </motion.form>
      </motion.section>
    </motion.div>
  );
};

export default CreatePost;
