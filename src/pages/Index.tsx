import { StarField } from "@/components/StarField"
import { ChevronDown, Linkedin, LayoutDashboard, Layers, Pencil, Eye, BotIcon as Robot } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { ChatbotModal } from "@/components/ChatbotModal"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Index() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [initialHeight, setInitialHeight] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  // Store initial height on first render
  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  // Handle scroll events to calculate blur amount
  useEffect(() => {
    const handleScroll = () => {
      // Store the current scroll position
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Calculate blur based on scroll position
          // Reduced max blur from 20px to 8px for a more subtle effect
          const maxBlur = 8
          // Increased trigger height to make the effect develop more slowly
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)

          setBlurAmount(newBlurAmount)

          // Update last scroll position for next comparison
          lastScrollRef.current = scrollRef.current
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [initialHeight])

  // Intersection observer for visibility
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
          // Once visible, no need to observe anymore
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true)
          // Once visible, no need to observe anymore
          if (aboutContentRef.current) {
            aboutObserver.unobserve(aboutContentRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (aboutContentRef.current) {
      aboutObserver.observe(aboutContentRef.current)
    }

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          // Once visible, no need to observe anymore
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current)
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          // Once visible, no need to observe anymore
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current)
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current)
      }
      if (aboutContentRef.current) {
        aboutObserver.unobserve(aboutContentRef.current)
      }
      if (servicesContentRef.current) {
        servicesObserver.unobserve(servicesContentRef.current)
      }
      if (servicesTitleRef.current) {
        servicesTitleObserver.unobserve(servicesTitleRef.current)
      }
    }
  }, [])

  // Calculate scale factor based on blur amount
  // Maintain the same scaling effect even with reduced blur
  const scaleFactor = 1 + blurAmount / 16 // Adjusted to maintain similar scaling with reduced blur

  // Add a warp speed effect to stars based on blur amount
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out", // Slightly longer transition for smoother effect
  }

  // Scroll to about section
  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Scroll to contact section
  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Open chatbot modal
  const openChatbot = () => {
    setIsChatbotOpen(true)
  }

  // Close chatbot modal
  const closeChatbot = () => {
    setIsChatbotOpen(false)
  }

  // Use fixed height for hero section based on initial viewport height
  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        {/* Navigation links in top right corner */}
        <div className="absolute top-6 right-6 z-10 flex space-x-3">
          <a
            href="https://linkedin.com/company/example"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Профиль в LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <Linkedin className="h-5 w-5" />
          </a>

          <Button
            onClick={scrollToContact}
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Контакты
          </Button>
        </div>

        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className="backdrop-blur-sm px-6 py-4 rounded-lg inline-block relative"
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
              }}
            >
              <h1 className="text-4xl font-bold text-white md:text-6xl font-heading">
                UX / UI Проектирование{" "}
                <span role="img" aria-label="design">
                  🎨
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 md:text-xl px-4 max-w-xs mx-auto md:max-w-none">
                Разработка схем и интерфейсов веб-приложений
              </p>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="sm"
                className="mt-6 bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
              >
                О нас
              </Button>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToAbout}
            role="button"
            aria-label="Перейти к разделу о нас"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToAbout()
              }
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      <section ref={aboutSectionRef} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-700 flex-shrink-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-d4g0PyeQftYkhSxiNDNMwiGNNteM3o.svg"
                  alt="Профиль"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 text-center md:text-left px-4 md:px-0">
                <h2 className="text-3xl font-bold font-heading">О проекте</h2>
                <div className="space-y-4 max-w-2xl">
                  <p className="text-gray-300">
                    Данный сайт создан в рамках учебного задания по дисциплине «Проектирование интерфейсов
                    веб-приложений». Цель — изучить подходы к разработке схем и прототипов пользовательских
                    интерфейсов.
                  </p>
                  <p className="text-gray-300">
                    Проект охватывает полный цикл UX-проектирования: от анализа требований и создания
                    пользовательских сценариев до построения wireframe-макетов и интерактивных прототипов.
                  </p>
                  <p className="text-gray-300">
                    Используемые методы: структурирование информационной архитектуры, создание схем навигации,
                    прототипирование ключевых экранов и тестирование юзабилити.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button
                      onClick={scrollToContact}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[140px] mx-auto sm:mx-0"
                    >
                      Связаться
                    </Button>
                    <Button
                      onClick={openChatbot}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[140px] mx-auto sm:mx-0 flex items-center justify-center"
                    >
                      <Robot className="mr-1 h-4 w-4" />
                      ИИ-чат
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesSectionRef} id="services" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Этапы проектирования
          </h2>
          <div
            ref={servicesContentRef}
            className={cn(
              "max-w-5xl mx-auto transition-all duration-1000 ease-out",
              isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Анализ требований */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <LayoutDashboard className="h-7 w-7 text-white mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Анализ требований</h3>
                </div>
                <p className="text-gray-300">
                  Сбор и структурирование требований к системе, определение целевой аудитории
                  и пользовательских сценариев (Use Cases).
                </p>
              </div>

              {/* Информационная архитектура */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Layers className="h-7 w-7 text-white mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Информационная архитектура</h3>
                </div>
                <p className="text-gray-300">
                  Построение структуры приложения: карта сайта, навигационные схемы,
                  иерархия контента и группировка функций.
                </p>
              </div>

              {/* Wireframe-прототипирование */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Pencil className="h-7 w-7 text-white mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Wireframe-прототипирование</h3>
                </div>
                <p className="text-gray-300">
                  Разработка низко- и среднеуровневых схем экранов: расположение элементов,
                  блочная структура, интерактивные переходы.
                </p>
              </div>

              {/* Юзабилити-тестирование */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Eye className="h-7 w-7 text-white mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Юзабилити-тестирование</h3>
                </div>
                <p className="text-gray-300">
                  Оценка удобства интерфейса по принципам Nielsen, выявление проблем
                  и итеративное улучшение прототипов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactSectionRef} id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Обратная связь
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  )
}