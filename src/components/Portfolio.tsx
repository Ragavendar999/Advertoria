'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const projects = [
  {
    title: 'Brand Identity for LuxeVilla',
    image: '/images/portfolio1.jpg',
    category: 'Branding',
  },
  {
    title: 'E-commerce Web Design',
    image: '/images/portfolio2.jpg',
    category: 'Web Design',
  },
  {
    title: 'Food Product Photoshoot',
    image: '/images/portfolio3.jpg',
    category: 'Photography',
  },
  {
    title: 'Social Media Ads - FitFuel',
    image: '/images/portfolio4.jpg',
    category: 'Digital Marketing',
  },
]

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<null | (typeof projects)[0]>(null)

  return (
    <section
      id="portfolio"
      className="scroll-mt-28 relative py-24 px-6 max-w-7xl mx-auto text-center overflow-hidden"
    >
      <div className="absolute top-[-100px] left-[-120px] w-[280px] h-[280px] bg-purple-600 blur-[100px] opacity-20 rounded-full z-0" />
      <div className="absolute bottom-[-80px] right-[-100px] w-[220px] h-[220px] bg-pink-500 blur-[80px] opacity-10 rounded-full z-0" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 relative z-10"
      >
        Our Portfolio
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            onClick={() => setSelectedProject(project)}
            className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/5 hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden">
              <div className="relative h-60 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                <p className="text-white/70 text-sm">{project.category}</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition duration-300 blur-[2px]" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[80vh] w-full bg-black">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-contain"
                  sizes="80vw"
                />
              </div>
              <div className="p-4 text-left">
                <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                <p className="text-gray-600">{selectedProject.category}</p>
              </div>
              <button
                className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full hover:bg-black"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
