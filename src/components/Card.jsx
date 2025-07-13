import { motion } from "framer-motion";
import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => (
  <motion.div
    className="rounded-xl group relative shadow-lg hover:shadow-2xl transition duration-300 bg-white"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {/* Image with slight zoom on hover */}
    <div className="overflow-hidden rounded-xl">
      <img
        className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        src={photo}
        alt={prompt}
      />
    </div>

    {/* Hover Overlay */}
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f]/90 m-2 p-4 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-green-700 flex justify-center items-center text-white text-xs font-bold">
            {name[0]}
          </div>
          <p className="text-white text-sm">{name}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadImage(_id, photo)}
          className="outline-none bg-white/20 hover:bg-white/40 rounded-full p-1 transition"
        >
          <img
            src={download}
            alt="download"
            className="w-6 h-6 object-contain invert"
          />
        </button>
      </div>
    </div>
  </motion.div>
);

export default Card;
