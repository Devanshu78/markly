import { motion } from "framer-motion";

type Props = {
  text: string;
};

export default function AnimatedHeadline({ text }: Props) {
  const words = text.split(" ");

  return (
    <h1 className="text-2xl md:text-5xl tracking-tight font-bold leading-tight text-gray-800">
      {words.map((word, i) => (
        <span key={i}>
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: i * 0.06,
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
            className="inline-block mr-[0.25em] whitespace-nowrap"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
