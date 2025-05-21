import { FaTrophy, FaKey, FaCode } from "react-icons/fa";

const challenges = [
  {
    id: 1,
    name: "Status Quest",
    slogan: "Fun meets HTTP codes.",
    description:
      "Answer quizzes to test your HTTP status code knowledge. Earn badges for every correct answer and increase your score by collecting more badges.",
    icon: <FaTrophy className="text-3xl text-yellow-500" />,
  },
  {
    id: 2,
    name: "REST in Action",
    slogan: "REST isn't idle. It's in action.",
    description:
      "Prove your understanding of HTTP methods through interactive quizzes. Each correct answer rewards you with badges, boosting your overall score.",
    icon: <FaCode className="text-3xl text-blue-500" />,
  },
  {
    id: 3,
    name: "DevPilot: The Hidden Key",
    slogan: "Only the sharpest devs find the key.",
    description:
      "Navigate a 3D city using an airplane and use your dev skills to uncover a hidden key. Refer the instructions first. Skip if you must—but no key, no marks.",
    icon: <FaKey className="text-3xl text-green-600" />,
  },
];

const Projects = () => {
  return (
    <section className="px-6 py-16 max-container bg-gradient-to-b from-gray-50 to-white">
      <h2 className="mb-16 text-4xl font-extrabold text-center text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
        🚀 Game-Based Developer Challenges
      </h2>

      <div className="space-y-12">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="p-8 transition duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div>{challenge.icon}</div>
              <h3 className="text-2xl font-bold text-indigo-600">
                Challenge 0{challenge.id}: {challenge.name}
              </h3>
            </div>
            <p className="mb-4 text-lg italic text-purple-600">{challenge.slogan}</p>
            <div className="p-4 border border-purple-300 border-dashed bg-gray-50 rounded-xl">
              <p className="leading-relaxed text-gray-700">{challenge.description}</p>
              {challenge.id !== 3 && (
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <FaTrophy className="text-yellow-400" />
                  <span>Earn badges and score points</span>
                </div>
              )}
              {challenge.id === 3 && (
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                  <FaKey className="text-green-500" />
                  <span>Find the key or skip the challenge</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
