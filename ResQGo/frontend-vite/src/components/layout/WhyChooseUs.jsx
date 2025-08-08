import { Heart, Clock, Shield, Users } from "lucide-react";

const features = [
  {
    icon: <Heart size={40} className="text-white" />,
    title: "24/7 Emergency Service",
    description: "Round-the-clock ambulance service for all your medical emergencies"
  },
  {
    icon: <Clock size={40} className="text-white" />,
    title: "Quick Response Time",
    description: "Average response time of 8 minutes in urban areas"
  },
  {
    icon: <Shield size={40} className="text-white" />,
    title: "Professional Medical Team",
    description: "Trained paramedics and modern life-support equipment"
  },
  {
    icon: <Users size={40} className="text-white" />,
    title: "Trusted by Thousands",
    description: "Over 50,000 successful emergency transports completed"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-white text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why Choose ResQGo?
      </h2>
      <p className="text-gray-500 text-lg mb-12">
        We're committed to providing the fastest, most reliable emergency medical transport services
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 mx-auto mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
