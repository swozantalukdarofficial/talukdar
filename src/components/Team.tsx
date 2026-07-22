import { motion } from "framer-motion";
import { ExternalLink, Mail, UserCheck } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function Team() {
  const { teamMembers } = useContent();

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  const sortedMembers = [...teamMembers].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Meet the <span className="text-neon-green">Experts</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              We are a team of data-driven marketers, creative designers, and AI specialists dedicated to your growth.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedMembers.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-neutral-900/40 border border-white/5 p-6 rounded-3xl hover:border-neon-green/40 hover:shadow-[0_0_50px_rgba(135,230,92,0.15)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Profile Photo */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-5 border border-white/10 group-hover:border-neon-green/40 transition-all bg-neutral-950">
                  {member.profile ? (
                    <img
                      src={member.profile}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-600">
                      <UserCheck className="w-12 h-12" />
                    </div>
                  )}

                  {/* Hover Overlay Action Buttons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div className="flex items-center gap-2.5 w-full">
                      {member.portfolio && (
                        <a
                          href={member.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-neon-green text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:scale-105 transition-all shadow-lg"
                          title="View Portfolio"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Portfolio</span>
                        </a>
                      )}
                      {member.contact && (
                        <a
                          href={member.contact}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
                          title="Contact Member"
                        >
                          <Mail className="w-4 h-4 text-neon-green" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-green transition-colors">{member.name}</h3>
                <p className="text-xs font-extrabold text-neon-green uppercase tracking-widest mb-3">{member.role}</p>
              </div>

              {/* Action Buttons below for mobile/accessibility */}
              <div className="flex items-center gap-2 pt-3 border-t border-white/5 mt-2">
                {member.portfolio && (
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-400 hover:text-neon-green flex items-center gap-1 font-medium transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-neon-green" /> Portfolio
                  </a>
                )}
                {member.portfolio && member.contact && <span className="text-neutral-700">•</span>}
                {member.contact && (
                  <a
                    href={member.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-400 hover:text-neon-green flex items-center gap-1 font-medium transition-colors"
                  >
                    <Mail className="w-3 h-3 text-neon-green" /> Contact
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
