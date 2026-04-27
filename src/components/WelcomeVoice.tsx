'use client'

import { useEffect, useRef } from 'react'

const SESSION_KEY = 'advertoria-welcome-voice-played'
const AUDIO_SRC = '/audio/welcome.mp3.mp3'

export default function WelcomeVoice() {
  const hasPlayedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY) === 'true') return

    const audio = new Audio(AUDIO_SRC)
    audio.preload = 'auto'
    audioRef.current = audio

    const markPlayed = () => {
      hasPlayedRef.current = true
      sessionStorage.setItem(SESSION_KEY, 'true')
    }

    const speakFallback = () => {
      if (!('speechSynthesis' in window)) return
      if (hasPlayedRef.current || sessionStorage.getItem(SESSION_KEY) === 'true') return

      const utterance = new SpeechSynthesisUtterance('Welcome to Advertoria')
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice =
        voices.find((voice) => /zira|aria|samantha|female/i.test(voice.name)) ??
        voices.find((voice) => /^en(-|_)/i.test(voice.lang)) ??
        voices[0]

      if (preferredVoice) utterance.voice = preferredVoice
      utterance.rate = 0.96
      utterance.pitch = 1
      utterance.volume = 0.85
      utterance.onstart = markPlayed

      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }

    const playWelcome = async () => {
      if (hasPlayedRef.current || sessionStorage.getItem(SESSION_KEY) === 'true') return

      try {
        audio.currentTime = 0
        await audio.play()
        markPlayed()
      } catch {
        speakFallback()
      }
    }

    const handleFirstInteraction = () => {
      void playWelcome()
    }

    void playWelcome()
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true })
    window.addEventListener('keydown', handleFirstInteraction, { once: true })

    return () => {
      audio.pause()
      audioRef.current = null
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  return null
}
