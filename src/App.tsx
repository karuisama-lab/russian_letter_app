import { useEffect, useRef, useState } from 'react'
import './App.css'

type Lesson = {
  id: number
  letter: string
  title: string
  subtitle: string
  words: string[]
  tasks: string[]
  progress: number
}

const lessons: Lesson[] = [
  { id: 1, letter: 'Аа', title: 'Урок 1', subtitle: 'Буква А', words: [], tasks: [], progress: 0 },
  { id: 2, letter: 'Оо', title: 'Урок 2', subtitle: 'Буква О', words: [], tasks: [], progress: 0 },
  { id: 3, letter: 'Уу', title: 'Урок 3', subtitle: 'Буква У', words: [], tasks: [], progress: 0 },
  { id: 4, letter: 'Мм', title: 'Урок 4', subtitle: 'Буква М', words: [], tasks: [], progress: 0 },
  { id: 5, letter: 'Тт', title: 'Урок 5', subtitle: 'Буква Т', words: [], tasks: [], progress: 0 },
  { id: 6, letter: 'Ээ', title: 'Урок 6', subtitle: 'Буква Э', words: [], tasks: [], progress: 0 },

  { id: 7, letter: 'Кк', title: 'Урок 7', subtitle: 'Буква К', words: [], tasks: [], progress: 0 },
  { id: 8, letter: 'Сс', title: 'Урок 8', subtitle: 'Буква С', words: [], tasks: [], progress: 0 },
  { id: 9, letter: 'Ии', title: 'Урок 9', subtitle: 'Буква И', words: [], tasks: [], progress: 0 },
  { id: 10, letter: 'Гг', title: 'Урок 10', subtitle: 'Буква Г', words: [], tasks: [], progress: 0 },
  { id: 11, letter: 'Дд', title: 'Урок 11', subtitle: 'Буква Д', words: [], tasks: [], progress: 0 },
  { id: 12, letter: 'Ыы', title: 'Урок 12', subtitle: 'Буква Ы', words: [], tasks: [], progress: 0 },

  { id: 13, letter: 'Лл', title: 'Урок 13', subtitle: 'Буква Л', words: [], tasks: [], progress: 0 },
  { id: 14, letter: 'Пп', title: 'Урок 14', subtitle: 'Буква П', words: [], tasks: [], progress: 0 },
  { id: 15, letter: 'Рр', title: 'Урок 15', subtitle: 'Буква Р', words: [], tasks: [], progress: 0 },
  { id: 16, letter: 'Бб', title: 'Урок 16', subtitle: 'Буква Б', words: [], tasks: [], progress: 0 },
  { id: 17, letter: 'Нн', title: 'Урок 17', subtitle: 'Буква Н', words: [], tasks: [], progress: 0 },

  { id: 18, letter: 'ь', title: 'Урок 18', subtitle: 'Буква ь', words: [], tasks: [], progress: 0 },
  { id: 19, letter: 'Бб', title: 'Урок 19', subtitle: 'Буква Б', words: [], tasks: [], progress: 0 },
  { id: 20, letter: 'Нн', title: 'Урок 20', subtitle: 'Буква Н', words: [], tasks: [], progress: 0 },
  { id: 21, letter: 'Яя', title: 'Урок 21', subtitle: 'Буква Я', words: [], tasks: [], progress: 0 },
  { id: 22, letter: 'Зз', title: 'Урок 22', subtitle: 'Буква З', words: [], tasks: [], progress: 0 },

  { id: 23, letter: 'Ёё', title: 'Урок 23', subtitle: 'Буква Ё', words: [], tasks: [], progress: 0 },
  { id: 24, letter: 'Жж', title: 'Урок 24', subtitle: 'Буква Ж', words: [], tasks: [], progress: 0 },
  { id: 25, letter: 'Юю', title: 'Урок 25', subtitle: 'Буква Ю', words: [], tasks: [], progress: 0 },
  { id: 26, letter: 'Фф', title: 'Урок 26', subtitle: 'Буква Ф', words: [], tasks: [], progress: 0 },
  { id: 27, letter: 'Хх', title: 'Урок 27', subtitle: 'Буква Х', words: [], tasks: [], progress: 0 },

  { id: 28, letter: 'Цц', title: 'Урок 28', subtitle: 'Буква Ц', words: [], tasks: [], progress: 0 },
  { id: 29, letter: 'Чч', title: 'Урок 29', subtitle: 'Буква Ч', words: [], tasks: [], progress: 0 },
  { id: 30, letter: 'Шш', title: 'Урок 30', subtitle: 'Буква Ш', words: [], tasks: [], progress: 0 },
  { id: 31, letter: 'Щщ', title: 'Урок 31', subtitle: 'Буква Щ', words: [], tasks: [], progress: 0 },
  { id: 32, letter: 'ь', title: 'Урок 32', subtitle: 'Мягкий знак', words: [], tasks: [], progress: 0 },
  { id: 33, letter: 'ъ', title: 'Урок 33', subtitle: 'Твёрдый знак', words: [], tasks: [], progress: 0 },
]

function LetterALesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'Ананас',
      image: '/images/a-words/ananas.png',
      audio: '/audio/a-words/ananas.mp3',
    },
    {
      word: 'Автобус',
      image: '/images/a-words/avtobus.png',
      audio: '/audio/a-words/avtobus.mp3',
    },
    {
      word: 'Апельсин',
      image: '/images/a-words/apelsin.png',
      audio: '/audio/a-words/apelsin.mp3',
    },
    {
      word: 'Аптека',
      image: '/images/a-words/apteka.png',
      audio: '/audio/a-words/apteka.mp3',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]

  const playAudio = () => {
    audioRef.current?.play()
  }

  const playWordAudio = () => {
    if (!wordAudioRef.current) return
    wordAudioRef.current.currentTime = 0
    wordAudioRef.current.play()
  }

  const drawCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '220px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('A', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    drawCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setStep(6)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={audioRef} src="/audio/letters/letter-a.mp3" />
      <audio ref={wordAudioRef} src={currentPicture.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 1</p>

            <div className="redLetters">
              <span className="bigRedLetter">А</span>
              <span className="smallRedLetter">а</span>
            </div>

            <h1 className="lessonTitle">Буква А</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">А А А А А А</div>
            <div className="letterLine">а а а а а а</div>
            <div className="letterLine">А а А а А а</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву А</h1>
            <p className="lessonText">
              Сначала посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-a.gif"
              alt="Образец написания буквы А"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву А пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву А.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setPictureIndex(0)
                setStep(5)
              }}
            >
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playWordAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">Назови. Какая буква первая?</p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Завершить'}
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву А, прочитал её, написал её и назвал слова на букву А.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterOLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement | null>(null)
  const joinAudioRef = useRef<HTMLAudioElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'Осёл',
      image: '/images/o-words/osel.png',
      audio: '/audio/o-words/osel.mp3',
    },
    {
      word: 'Остров',
      image: '/images/o-words/ostrov.png',
      audio: '/audio/o-words/ostrov.mp3',
    },
    {
      word: 'Облако',
      image: '/images/o-words/oblako.png',
      audio: '/audio/o-words/oblako.mp3',
    },
  ]

  const joinRows = [
  {
    title: 'Строка 1',
    image: '/images/o-joins/o-row-1.png',
    audio: '/audio/o-joins/o-row-1.mp3',
    alt: 'Буквосочетания ОА, АО, АОА',
  },
  {
    title: 'Строка 2',
    image: '/images/o-joins/o-row-2.png',
    audio: '/audio/o-joins/o-row-2.mp3',
    alt: 'Буквосочетания АО, ОА, ОАО',
  },
]

  const currentPicture = pictureTasks[pictureIndex]
  const currentJoinRow = step === 7 ? joinRows[1] : joinRows[0]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playWordAudio = () => {
    if (!wordAudioRef.current) return
    wordAudioRef.current.currentTime = 0
    wordAudioRef.current.play()
  }

  const playJoinAudio = () => {
    if (!joinAudioRef.current) return
    joinAudioRef.current.currentTime = 0
    joinAudioRef.current.play()
  }

  const drawCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '220px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('О', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    drawCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setStep(6)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-o.mp3" />
      <audio ref={wordAudioRef} src={currentPicture.audio} />
      <audio ref={joinAudioRef} src={currentJoinRow.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 2</p>

            <div className="redLetters">
              <span className="bigRedLetter">О</span>
              <span className="smallRedLetter">о</span>
            </div>

            <h1 className="lessonTitle">Буква О</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">О О О О О О</div>
            <div className="letterLine">о о о о о о</div>
            <div className="letterLine">О о О о О о</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву О</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-o.gif"
              alt="Как писать букву О"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву О пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву О.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setPictureIndex(0)
                setStep(5)
              }}
            >
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playWordAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">Назови. Какая буква первая?</p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

     {step === 6 && (
  <>
    <section className="taskHeader">
      <p className="eyebrow dark">Задание 5</p>
      <h1 className="taskTitle">Читай буквы вместе</h1>
      <p className="lessonText">
        Сначала послушай, как читает учитель. Потом прочитай сам.
      </p>
    </section>

    <section className="joinReadingCard">
      <p className="joinRowTitle">Строка 1</p>

      <div className="joinTextLine">
        <span className="joinPurple">О</span>
        <span className="joinArrowText">→</span>
        <span className="joinOrange">А</span>

        <span className="joinSpace" />

        <span className="joinPurple">А</span>
        <span className="joinArrowText">→</span>
        <span className="joinOrange">О</span>

        <span className="joinSpace" />

        <span className="joinPurple">А</span>
        <span className="joinArrowText">→</span>
        <span className="joinOrange">О</span>
        <span className="joinArrowText">→</span>
        <span className="joinPurple">А</span>
      </div>

      <button className="audioButton secondaryAudio" onClick={playJoinAudio}>
        ▶ Послушать строку 1
      </button>

      <p className="joinInstruction">
        Теперь прочитай эту строку сам. Соединяй звуки плавно.
      </p>
    </section>

    <button className="primaryButton" onClick={() => setStep(7)}>
      Дальше
    </button>
  </>
)}

      {step === 7 && (
  <>
    <section className="taskHeader">
      <p className="eyebrow dark">Задание 5</p>
      <h1 className="taskTitle">Читай буквы вместе</h1>
      <p className="lessonText">
        Сначала послушай вторую строку. Потом прочитай сам.
      </p>
    </section>

    <section className="joinReadingCard">
      <p className="joinRowTitle">Строка 2</p>

      <div className="joinTextLine">
        <span className="joinPurple">А</span>
        <span className="joinArrowText">→</span>
        <span className="joinOrange">О</span>

        <span className="joinSpace" />

        <span className="joinPurple">О</span>
        <span className="joinArrowText">→</span>
        <span className="joinOrange">А</span>

        <span className="joinSpace" />

        <span className="joinPurple">О</span>
        <span className="joinArrowText">→</span>
        <span className="joinOrange">А</span>
        <span className="joinArrowText">→</span>
        <span className="joinPurple">О</span>
      </div>

      <button className="audioButton secondaryAudio" onClick={playJoinAudio}>
        ▶ Послушать строку 2
      </button>

      <p className="joinInstruction">
        Теперь прочитай эту строку сам. Тяни звук и соединяй буквы.
      </p>
    </section>

    <button className="primaryButton" onClick={() => setStep(8)}>
      Завершить урок
    </button>
  </>
)}

      {step === 8 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву О, прочитал её, написал и прочитал
              буквосочетания.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterULesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'Утка',
      image: '/images/u-words/utka.png',
      audio: '/audio/u-words/utka.mp3',
    },
    {
      word: 'Усы',
      image: '/images/u-words/usy.png',
      audio: '/audio/u-words/usy.mp3',
    },
    {
      word: 'Утюг',
      image: '/images/u-words/utyug.png',
      audio: '/audio/u-words/utyug.mp3',
    },
    {
      word: 'Ухо',
      image: '/images/u-words/uho.png',
      audio: '/audio/u-words/uho.mp3',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playWordAudio = () => {
    if (!wordAudioRef.current) return
    wordAudioRef.current.currentTime = 0
    wordAudioRef.current.play()
  }

  const playJoinAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('У', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    drawCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setStep(6)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-u.mp3" />
      <audio ref={wordAudioRef} src={currentPicture.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 3</p>

            <div className="redLetters">
              <span className="bigRedLetter">У</span>
              <span className="smallRedLetter">у</span>
            </div>

            <h1 className="lessonTitle">Буква У</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">У У У У У У</div>
            <div className="letterLine">у у у у у у</div>
            <div className="letterLine">У у У у У у</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву У</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-u.gif"
              alt="Как писать букву У"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву У пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву У.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setPictureIndex(0)
                setStep(5)
              }}
            >
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playWordAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">Назови. Какая буква первая?</p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playJoinAudio('/audio/u-joins/y-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: У--А, У---О. Соединяй звуки плавно.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(7)}>
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playJoinAudio('/audio/u-joins/y-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: А---У, О---У. Тяни первый звук.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(8)}>
            Дальше
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай третью строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 3</p>

            <div className="joinTextLine">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playJoinAudio('/audio/u-joins/y-row-3.mp3')}
            >
              ▶ Послушать строку 3
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: А--О, О--А. Читай плавно, как песню.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(9)}>
            Завершить урок
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву У, прочитал её, написал и прочитал буквосочетания.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterMLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [writeWordIndex, setWriteWordIndex] = useState(0)

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement | null>(null)
  const readWordAudioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'Мяч',
      image: '/images/m-words/myach.png',
      audio: '/audio/m-words/myach.mp3',
    },
    {
      word: 'Машина',
      image: '/images/m-words/mashina.png',
      audio: '/audio/m-words/mashina.mp3',
    },
    {
      word: 'Мышь',
      image: '/images/m-words/mysh.png',
      audio: '/audio/m-words/mysh.mp3',
    },
  ]

  const readWords = [
    {
      word: 'Ам',
      audio: '/audio/m-read-words/am.mp3',
    },
    {
      word: 'Ум',
      audio: '/audio/m-read-words/um.mp3',
    },
    {
      word: 'Му',
      audio: '/audio/m-read-words/mu.mp3',
    },
    {
      word: 'Ма-ма',
      audio: '/audio/m-read-words/mama.mp3',
    },
  ]

  const writeWords = [
    {
      word: 'Ам',
      gif: '/gifs/m-words-write/m-word-am.gif',
    },
    {
      word: 'Ум',
      gif: '/gifs/m-words-write/m-word-um.gif',
    },
    {
      word: 'Му',
      gif: '/gifs/m-words-write/m-word-mu.gif',
    },
    {
      word: 'Мама',
      gif: '/gifs/m-words-write/m-word-mama.gif',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentWriteWord = writeWords[writeWordIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playWordAudio = () => {
    if (!wordAudioRef.current) return
    wordAudioRef.current.currentTime = 0
    wordAudioRef.current.play()
  }

  const playReadWordAudio = () => {
    if (!readWordAudioRef.current) return
    readWordAudioRef.current.currentTime = 0
    readWordAudioRef.current.play()
  }

  const playJoinAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('М', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    word: string,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = word.length > 3 ? '115px Arial' : '145px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(word, width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 10) {
      drawWordCanvasBase(ctx, rect.width, rect.height, currentWriteWord.word)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 10) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step, writeWordIndex])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setStep(6)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setWriteWordIndex(0)
      setStep(9)
    }
  }

  const nextWriteWord = () => {
    if (writeWordIndex < writeWords.length - 1) {
      setWriteWordIndex((prev) => prev + 1)
      setStep(9)
    } else {
      setStep(11)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-m.mp3" />
      <audio ref={wordAudioRef} src={currentPicture.audio} />
      <audio ref={readWordAudioRef} src={currentReadWord.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 4</p>

            <div className="redLetters">
              <span className="bigRedLetter">М</span>
              <span className="smallRedLetter">м</span>
            </div>

            <h1 className="lessonTitle">Буква М</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">М М М М М М</div>
            <div className="letterLine">м м м м м м</div>
            <div className="letterLine">М м М м М м</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву М</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-m.gif"
              alt="Как писать букву М"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву М пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву М.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setPictureIndex(0)
                setStep(5)
              }}
            >
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playWordAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">Назови. Какая буква первая?</p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">М</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">М</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinSpace" />

              <span className="joinPurple">М</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playJoinAudio('/audio/m-joins/m-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: МА, МО, МУ. Соединяй звуки плавно.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(7)}>
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">М</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">М</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">М</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playJoinAudio('/audio/m-joins/m-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: АМ, ОМ, УМ. Тяни первый звук.
            </p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setReadWordIndex(0)
              setStep(8)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Читай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button className="audioButton secondaryAudio" onClick={playReadWordAudio}>
              ▶ Послушать слово
            </button>

            <p className="joinInstruction">
              Теперь прочитай это слово сам.
            </p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src={currentWriteWord.gif}
              alt={`Как писать слово ${currentWriteWord.word}`}
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(10)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Напиши слово {currentWriteWord.word}</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={nextWriteWord}>
              {writeWordIndex < writeWords.length - 1
                ? 'Следующее слово'
                : 'Завершить урок'}
            </button>
          </div>
        </>
      )}

      {step === 11 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву М, прочитал её, написал, прочитал слоги и слова.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterTLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [genderIndex, setGenderIndex] = useState(0)
  const [genderAnswer, setGenderAnswer] = useState<'та' | 'тот' | null>(null)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [writeWordIndex, setWriteWordIndex] = useState(0)

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement | null>(null)
  const readWordAudioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'Тарелка',
      image: '/images/t-words/tarelka.png',
      audio: '/audio/t-words/tarelka.mp3',
    },
    {
      word: 'Тигр',
      image: '/images/t-words/tigr.png',
      audio: '/audio/t-words/tigr.mp3',
    },
    {
      word: 'Телевизор',
      image: '/images/t-words/televizor.png',
      audio: '/audio/t-words/televizor.mp3',
    },
    {
      word: 'Такси',
      image: '/images/t-words/taksi.png',
      audio: '/audio/t-words/taksi.mp3',
    },
    {
      word: 'Телефон',
      image: '/images/t-words/telefon.png',
      audio: '/audio/t-words/telefon.mp3',
    },
    {
      word: 'Томат',
      image: '/images/t-words/tomat.png',
      audio: '/audio/t-words/tomat.mp3',
    },
  ]

  const genderTasks = [
    {
      word: 'утка',
      image: '/images/t-gender/utka.png',
      correctAnswer: 'та' as const,
      audio: '/audio/t-gender/ta-utka.mp3',
      correctText: 'Верно! Та утка.',
      wrongText: 'Почти. Утка — она. Правильно: та утка.',
    },
    {
      word: 'машина',
      image: '/images/t-gender/mashina.png',
      correctAnswer: 'та' as const,
      audio: '/audio/t-gender/ta-mashina.mp3',
      correctText: 'Верно! Та машина.',
      wrongText: 'Почти. Машина — она. Правильно: та машина.',
    },
    {
      word: 'мышь',
      image: '/images/t-gender/mysh.png',
      correctAnswer: 'та' as const,
      audio: '/audio/t-gender/ta-mysh.mp3',
      correctText: 'Верно! Та мышь.',
      wrongText: 'Почти. Мышь — она. Правильно: та мышь.',
    },
    {
      word: 'осёл',
      image: '/images/t-gender/osel.png',
      correctAnswer: 'тот' as const,
      audio: '/audio/t-gender/tot-osel.mp3',
      correctText: 'Верно! Тот осёл.',
      wrongText: 'Почти. Осёл — он. Правильно: тот осёл.',
    },
    {
      word: 'тигр',
      image: '/images/t-gender/tigr.png',
      correctAnswer: 'тот' as const,
      audio: '/audio/t-gender/tot-tigr.mp3',
      correctText: 'Верно! Тот тигр.',
      wrongText: 'Почти. Тигр — он. Правильно: тот тигр.',
    },
    {
      word: 'мяч',
      image: '/images/t-gender/myach.png',
      correctAnswer: 'тот' as const,
      audio: '/audio/t-gender/tot-myach.mp3',
      correctText: 'Верно! Тот мяч.',
      wrongText: 'Почти. Мяч — он. Правильно: тот мяч.',
    },
  ]

  const readWords = [
    {
      word: 'та',
      audio: '/audio/t-read-words/ta.mp3',
    },
    {
      word: 'тот',
      audio: '/audio/t-read-words/tot.mp3',
    },
    {
      word: 'там',
      audio: '/audio/t-read-words/tam.mp3',
    },
    {
      word: 'том',
      audio: '/audio/t-read-words/tom.mp3',
    },
    {
      word: 'тут',
      audio: '/audio/t-read-words/tut.mp3',
    },
    {
      word: 'то-ма',
      audio: '/audio/t-read-words/to-ma.mp3',
    },
    {
      word: 'то-мат',
      audio: '/audio/t-read-words/to-mat.mp3',
    },
  ]

  const writeWords = [
    {
      word: 'та',
      gif: '/gifs/t-words-write/t-word-ta.gif',
    },
    {
      word: 'тот',
      gif: '/gifs/t-words-write/t-word-tot.gif',
    },
    {
      word: 'там',
      gif: '/gifs/t-words-write/t-word-tam.gif',
    },
    {
      word: 'том',
      gif: '/gifs/t-words-write/t-word-tom.gif',
    },
    {
      word: 'тут',
      gif: '/gifs/t-words-write/t-word-tut.gif',
    },
    {
      word: 'то-ма',
      gif: '/gifs/t-words-write/t-word-to-ma.gif',
    },
    {
      word: 'то-мат',
      gif: '/gifs/t-words-write/t-word-to-mat.gif',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentGenderTask = genderTasks[genderIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentWriteWord = writeWords[writeWordIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playWordAudio = () => {
    if (!wordAudioRef.current) return
    wordAudioRef.current.currentTime = 0
    wordAudioRef.current.play()
  }

  const playReadWordAudio = () => {
    if (!readWordAudioRef.current) return
    readWordAudioRef.current.currentTime = 0
    readWordAudioRef.current.play()
  }

  const playGenderAudio = () => {
    const audio = new Audio(currentGenderTask.audio)
    audio.play()
  }

  const playJoinAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Т', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    word: string,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = word.length > 4 ? '105px Arial' : '135px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(word, width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 12) {
      drawWordCanvasBase(ctx, rect.width, rect.height, currentWriteWord.word)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 12) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step, writeWordIndex])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setStep(6)
    }
  }

  const nextGenderTask = () => {
    if (genderIndex < genderTasks.length - 1) {
      setGenderIndex((prev) => prev + 1)
      setGenderAnswer(null)
    } else {
      setReadWordIndex(0)
      setStep(10)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setWriteWordIndex(0)
      setStep(11)
    }
  }

  const nextWriteWord = () => {
    if (writeWordIndex < writeWords.length - 1) {
      setWriteWordIndex((prev) => prev + 1)
      setStep(11)
    } else {
      setStep(13)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-t.mp3" />
      <audio ref={wordAudioRef} src={currentPicture.audio} />
      <audio ref={readWordAudioRef} src={currentReadWord.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 5</p>

            <div className="redLetters">
              <span className="bigRedLetter">Т</span>
              <span className="smallRedLetter">т</span>
            </div>

            <h1 className="lessonTitle">Буква Т</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">Т Т Т Т Т Т</div>
            <div className="letterLine">т т т т т т</div>
            <div className="letterLine">Т т Т т Т т</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву Т</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-t.gif"
              alt="Как писать букву Т"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву Т пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Т.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setPictureIndex(0)
                setStep(5)
              }}
            >
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playWordAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">Назови. Какая буква первая?</p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">Т</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">Т</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinSpace" />

              <span className="joinPurple">Т</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playJoinAudio('/audio/t-joins/t-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ТА, ТО, ТУ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(7)}>
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Т</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Т</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Т</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playJoinAudio('/audio/t-joins/t-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: АТ, ОТ, УТ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(8)}>
            Дальше
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Та и тот</h1>
            <p className="lessonText">
              Посмотри на подсказку. Девочка — та. Мальчик — тот.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/images/t-grammar/ta-tot-card.png"
              alt="Подсказка: та и тот"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setGenderIndex(0)
              setGenderAnswer(null)
              setStep(9)
            }}
          >
            Попробовать
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Выбери: та или тот?</h1>
            <p className="lessonText">
              Посмотри на картинку и выбери правильное слово.
            </p>
          </section>

          <section className="genderChoiceCard">
            <img
              src={currentGenderTask.image}
              alt={currentGenderTask.word}
              className="genderChoiceImage"
            />

            <button className="audioButton secondaryAudio" onClick={playGenderAudio}>
              🔊 Послушать подсказку
            </button>

            <p className="genderQuestion">Как правильно?</p>

            <div className="genderButtons">
              <button
                className={
                  genderAnswer === 'та'
                    ? currentGenderTask.correctAnswer === 'та'
                      ? 'genderButton genderButtonCorrect'
                      : 'genderButton genderButtonWrong'
                    : 'genderButton'
                }
                onClick={() => setGenderAnswer('та')}
              >
                та
              </button>

              <button
                className={
                  genderAnswer === 'тот'
                    ? currentGenderTask.correctAnswer === 'тот'
                      ? 'genderButton genderButtonCorrect'
                      : 'genderButton genderButtonWrong'
                    : 'genderButton'
                }
                onClick={() => setGenderAnswer('тот')}
              >
                тот
              </button>
            </div>

            {genderAnswer === currentGenderTask.correctAnswer && (
              <p className="correctFeedback">
                {currentGenderTask.correctText}
              </p>
            )}

            {genderAnswer !== null &&
              genderAnswer !== currentGenderTask.correctAnswer && (
                <p className="wrongFeedback">
                  {currentGenderTask.wrongText}
                </p>
              )}
          </section>

          <button className="primaryButton" onClick={nextGenderTask}>
            {genderIndex < genderTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Читай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button className="audioButton secondaryAudio" onClick={playReadWordAudio}>
              ▶ Послушать слово
            </button>

            <p className="joinInstruction">
              Теперь прочитай это слово сам.
            </p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src={currentWriteWord.gif}
              alt={`Как писать слово ${currentWriteWord.word}`}
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(12)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Напиши слово {currentWriteWord.word}</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={nextWriteWord}>
              {writeWordIndex < writeWords.length - 1
                ? 'Следующее слово'
                : 'Завершить урок'}
            </button>
          </div>
        </>
      )}

      {step === 13 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Т, прочитал её, написал, назвал слова, выбрал
              та или тот и написал новые слова.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterKLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [writeWordIndex, setWriteWordIndex] = useState(0)
  const [sentenceIndex, setSentenceIndex] = useState(0)

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const readWordAudioRef = useRef<HTMLAudioElement | null>(null)
  const sentenceAudioRef = useRef<HTMLAudioElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const readWords = [
    {
      word: 'кот',
      image: '/images/k-words/kot.png',
      audio: '/audio/k-read-words/kot.mp3',
    },
    {
      word: 'ком',
      image: '/images/k-words/kom.png',
      audio: '/audio/k-read-words/kom.mp3',
    },
    {
      word: 'ут-ка',
      image: '/images/u-words/utka.png',
      audio: '/audio/k-read-words/ut-ka.mp3',
    },
    {
      word: 'ум-ка',
      image: null,
      audio: '/audio/k-read-words/um-ka.mp3',
    },
    {
      word: 'мука',
      image: '/images/k-words/muka.png',
      audio: '/audio/k-read-words/muka.mp3',
    },
  ]

  const writeWords = [
    {
      word: 'кот',
      gif: '/gifs/k-words-write/k-word-kot.gif',
    },
    {
      word: 'умка',
      gif: '/gifs/k-words-write/k-word-umka.gif',
    },
    {
      word: 'мука',
      gif: '/gifs/k-words-write/k-word-muka.gif',
    },
  ]

  const sentenceTasks = [
    {
      text: 'тут кот',
      audio: '/audio/k-sentences/tut-kot.mp3',
    },
    {
      text: 'там ут-ка',
      audio: '/audio/k-sentences/tam-ut-ka.mp3',
    },
    {
      text: 'тот ком',
      audio: '/audio/k-sentences/tot-kom.mp3',
    },
    {
      text: 'там му-ка',
      audio: '/audio/k-sentences/tam-mu-ka.mp3',
    },
  ]

  const currentReadWord = readWords[readWordIndex]
  const currentWriteWord = writeWords[writeWordIndex]
  const currentSentence = sentenceTasks[sentenceIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playReadWordAudio = () => {
    if (!readWordAudioRef.current) return
    readWordAudioRef.current.currentTime = 0
    readWordAudioRef.current.play()
  }

  const playSentenceAudio = () => {
    if (!sentenceAudioRef.current) return
    sentenceAudioRef.current.currentTime = 0
    sentenceAudioRef.current.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('К', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    word: string,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = word.length > 3 ? '115px Arial' : '145px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(word, width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 7) {
      drawWordCanvasBase(ctx, rect.width, rect.height, currentWriteWord.word)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 7) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step, writeWordIndex])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setWriteWordIndex(0)
      setStep(6)
    }
  }

  const nextWriteWord = () => {
    if (writeWordIndex < writeWords.length - 1) {
      setWriteWordIndex((prev) => prev + 1)
      setStep(6)
    } else {
      setSentenceIndex(0)
      setStep(8)
    }
  }

  const nextSentence = () => {
    if (sentenceIndex < sentenceTasks.length - 1) {
      setSentenceIndex((prev) => prev + 1)
    } else {
      setStep(9)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-k.mp3" />
      <audio ref={readWordAudioRef} src={currentReadWord.audio} />
      <audio ref={sentenceAudioRef} src={currentSentence.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 6</p>

            <div className="redLetters">
              <span className="bigRedLetter">К</span>
              <span className="smallRedLetter">к</span>
            </div>

            <h1 className="lessonTitle">Буква К</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">К К К К К К</div>
            <div className="letterLine">к к к к к к</div>
            <div className="letterLine">К к К к К к</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву К</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-k.gif"
              alt="Как писать букву К"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву К пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву К.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setReadWordIndex(0)
                setStep(5)
              }}
            >
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            {currentReadWord.image && (
              <img
                src={currentReadWord.image}
                alt={currentReadWord.word}
                className="wordReadImage"
              />
            )}

            <div className="readSingleWord">{currentReadWord.word}</div>

            <button className="audioButton secondaryAudio" onClick={playReadWordAudio}>
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src={currentWriteWord.gif}
              alt={`Как писать слово ${currentWriteWord.word}`}
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(7)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Напиши слово {currentWriteWord.word}</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={nextWriteWord}>
              {writeWordIndex < writeWords.length - 1
                ? 'Следующее слово'
                : 'Дальше'}
            </button>
          </div>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Читай предложение</h1>
            <p className="lessonText">
              Сначала послушай предложение. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="sentenceReadText">{currentSentence.text}</div>

            <button className="audioButton secondaryAudio" onClick={playSentenceAudio}>
              ▶ Послушать предложение
            </button>

            <p className="wordReadHint">
              Обрати внимание: в конце предложения мы делаем паузу.
            </p>
          </section>

          <button className="primaryButton" onClick={nextSentence}>
            {sentenceIndex < sentenceTasks.length - 1
              ? 'Следующее предложение'
              : 'Завершить урок'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву К, прочитал её, написал букву, прочитал слова,
              написал слова и прочитал предложения.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterSLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [actionIndex, setActionIndex] = useState(0)
  const [actionAnswer, setActionAnswer] = useState<'pyem' | 'edim' | null>(null)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [writeWordIndex, setWriteWordIndex] = useState(0)

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement | null>(null)
  const readWordAudioRef = useRef<HTMLAudioElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'сок',
      image: '/images/s-words/sok.png',
      audio: '/audio/s-words/sok.mp3',
    },
    {
      word: 'салат',
      image: '/images/s-words/salat.png',
      audio: '/audio/s-words/salat.mp3',
    },
    {
      word: 'соль',
      image: '/images/s-words/sol.png',
      audio: '/audio/s-words/sol.mp3',
    },
    {
      word: 'суп',
      image: '/images/s-words/sup.png',
      audio: '/audio/s-words/sup.mp3',
    },
    {
      word: 'сахар',
      image: '/images/s-words/sakhar.png',
      audio: '/audio/s-words/sakhar.mp3',
    },
    {
      word: 'сироп',
      image: '/images/s-words/sirop.png',
      audio: '/audio/s-words/sirop.mp3',
    },
  ]

  const actionTasks = [
    {
      word: 'сок',
      image: '/images/s-words/sok.png',
      audio: '/audio/s-words/sok.mp3',
      correctAction: 'pyem' as const,
      correctText: 'Верно! Сок мы пьём.',
      wrongText: 'Почти. Сок — это напиток. Его мы пьём.',
    },
    {
      word: 'салат',
      image: '/images/s-words/salat.png',
      audio: '/audio/s-words/salat.mp3',
      correctAction: 'edim' as const,
      correctText: 'Верно! Салат мы едим.',
      wrongText: 'Почти. Салат — это еда. Его мы едим.',
    },
    {
      word: 'соль',
      image: '/images/s-words/sol.png',
      audio: '/audio/s-words/sol.mp3',
      correctAction: 'edim' as const,
      correctText: 'Верно! Соль мы едим.',
      wrongText: 'Почти. Соль — это еда. Её мы едим.',
    },
    {
      word: 'суп',
      image: '/images/s-words/sup.png',
      audio: '/audio/s-words/sup.mp3',
      correctAction: 'edim' as const,
      correctText: 'Верно! Суп мы едим.',
      wrongText: 'Почти. В этом задании суп мы едим.',
    },
    {
      word: 'сахар',
      image: '/images/s-words/sakhar.png',
      audio: '/audio/s-words/sakhar.mp3',
      correctAction: 'edim' as const,
      correctText: 'Верно! Сахар мы едим.',
      wrongText: 'Почти. Сахар — это еда. Его мы едим.',
    },
    {
      word: 'сироп',
      image: '/images/s-words/sirop.png',
      audio: '/audio/s-words/sirop.mp3',
      correctAction: 'pyem' as const,
      correctText: 'Верно! Сироп мы пьём.',
      wrongText: 'Почти. Сироп — это напиток. Его мы пьём.',
    },
  ]

  const readWords = [
    {
      word: 'сок',
      image: '/images/s-words/sok.png',
      audio: '/audio/s-read-words/sok.mp3',
    },
    {
      word: 'сто',
      image: '/images/s-words/sto.png',
      audio: '/audio/s-read-words/sto.mp3',
    },
    {
      word: 'мост',
      image: '/images/s-words/most.png',
      audio: '/audio/s-read-words/most.mp3',
    },
    {
      word: 'ко-са',
      image: '/images/s-words/kosa.png',
      audio: '/audio/s-read-words/ko-sa.mp3',
    },
    {
      word: 'сум-ка',
      image: '/images/s-words/sumka.png',
      audio: '/audio/s-read-words/sum-ka.mp3',
    },
    {
      word: 'кос-мос',
      image: '/images/s-words/kosmos.png',
      audio: '/audio/s-read-words/kos-mos.mp3',
    },
  ]

  const writeWords = [
    {
      word: 'мост',
      gif: '/gifs/s-words-write/s-word-most.gif',
    },
    {
      word: 'ко-са',
      gif: '/gifs/s-words-write/s-word-ko-sa.gif',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentActionTask = actionTasks[actionIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentWriteWord = writeWords[writeWordIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playWordAudio = () => {
    if (!wordAudioRef.current) return
    wordAudioRef.current.currentTime = 0
    wordAudioRef.current.play()
  }

  const playReadWordAudio = () => {
    if (!readWordAudioRef.current) return
    readWordAudioRef.current.currentTime = 0
    readWordAudioRef.current.play()
  }

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('С', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    word: string,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = word.length > 4 ? '105px Arial' : '130px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(word, width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 12) {
      drawWordCanvasBase(ctx, rect.width, rect.height, currentWriteWord.word)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 12) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step, writeWordIndex])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setActionIndex(0)
      setStep(8)
    }
  }

  const nextActionTask = () => {
    if (actionIndex < actionTasks.length - 1) {
      setActionIndex((prev) => prev + 1)
      setActionAnswer(null)
    } else {
      setReadWordIndex(0)
      setStep(10)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setWriteWordIndex(0)
      setStep(11)
    }
  }

  const nextWriteWord = () => {
    if (writeWordIndex < writeWords.length - 1) {
      setWriteWordIndex((prev) => prev + 1)
      setStep(11)
    } else {
      setStep(13)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-s.mp3" />
      <audio ref={wordAudioRef} src={currentPicture.audio} />
      <audio ref={readWordAudioRef} src={currentReadWord.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 7</p>

            <div className="redLetters">
              <span className="bigRedLetter">С</span>
              <span className="smallRedLetter">с</span>
            </div>

            <h1 className="lessonTitle">Буква С</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">С С С С С С</div>
            <div className="letterLine">с с с с с с</div>
            <div className="letterLine">С с С с С с</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву С</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-s.gif"
              alt="Как писать букву С"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву С пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву С.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">С</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">С</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinSpace" />

              <span className="joinPurple">С</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/s-joins/s-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">Теперь прочитай сам: СА, СО, СУ.</p>
          </section>

          <button className="primaryButton" onClick={() => setStep(6)}>
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">С</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">С</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">С</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/s-joins/s-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">Теперь прочитай сам: АС, ОС, УС.</p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setPictureIndex(0)
              setStep(7)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Посмотри и назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Нажми на подсказку, если нужно.
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playWordAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">Назови слово.</p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Пьём или едим?</h1>
            <p className="lessonText">
              Посмотри на картинки. Сначала послушай подсказку.
            </p>
          </section>

          <section className="actionExplainCard">
            <div className="actionExplainGrid">
              <div className="actionExplainItem">
                <img src="/images/s-words/pyem.png" alt="Пьём" />
                <div className="actionExplainWord">пьём</div>
              </div>

              <div className="actionExplainItem">
                <img src="/images/s-words/edim.png" alt="Едим" />
                <div className="actionExplainWord">едим</div>
              </div>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/s-actions/pyem-edim.mp3')}
            >
              ▶ Послушать: пьём — едим
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setActionIndex(0)
              setActionAnswer(null)
              setStep(9)
            }}
          >
            Попробовать
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Выбери картинку</h1>
            <p className="lessonText">
              Что мы делаем с этим словом: пьём или едим?
            </p>
          </section>

          <section className="actionChoiceCard">
            <img
              src={currentActionTask.image}
              alt={currentActionTask.word}
              className="actionMainImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentActionTask.audio)}
            >
              🔊 Послушать слово
            </button>

            <div className="actionChoiceButtons">
              <button
                className={
                  actionAnswer === 'pyem'
                    ? currentActionTask.correctAction === 'pyem'
                      ? 'actionChoiceButton actionChoiceCorrect'
                      : 'actionChoiceButton actionChoiceWrong'
                    : 'actionChoiceButton'
                }
                onClick={() => setActionAnswer('pyem')}
              >
                <img src="/images/s-words/pyem.png" alt="Пьём" />
              </button>

              <button
                className={
                  actionAnswer === 'edim'
                    ? currentActionTask.correctAction === 'edim'
                      ? 'actionChoiceButton actionChoiceCorrect'
                      : 'actionChoiceButton actionChoiceWrong'
                    : 'actionChoiceButton'
                }
                onClick={() => setActionAnswer('edim')}
              >
                <img src="/images/s-words/edim.png" alt="Едим" />
              </button>
            </div>

            {actionAnswer === currentActionTask.correctAction && (
              <p className="correctFeedback">{currentActionTask.correctText}</p>
            )}

            {actionAnswer !== null &&
              actionAnswer !== currentActionTask.correctAction && (
                <p className="wrongFeedback">{currentActionTask.wrongText}</p>
              )}
          </section>

          <button className="primaryButton" onClick={nextActionTask}>
            {actionIndex < actionTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <img
              src={currentReadWord.image}
              alt={currentReadWord.word}
              className="wordReadImage"
            />

            <div className="readSingleWord">{currentReadWord.word}</div>

            <button className="audioButton secondaryAudio" onClick={playReadWordAudio}>
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src={currentWriteWord.gif}
              alt={`Как писать слово ${currentWriteWord.word}`}
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(12)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Напиши слово {currentWriteWord.word}</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={nextWriteWord}>
              {writeWordIndex < writeWords.length - 1
                ? 'Следующее слово'
                : 'Завершить урок'}
            </button>
          </div>
        </>
      )}

      {step === 13 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву С, прочитал её, написал, назвал слова и выбрал:
              пьём или едим.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterELesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [genderIndex, setGenderIndex] = useState(0)
  const [genderAnswer, setGenderAnswer] = useState<'эта' | 'этот' | null>(null)

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement | null>(null)
  const readWordAudioRef = useRef<HTMLAudioElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'экскаватор',
      image: '/images/e-words/ekskavator.png',
      audio: '/audio/e-words/ekskavator.mp3',
    },
    {
      word: 'эльф',
      image: '/images/e-words/elf.png',
      audio: '/audio/e-words/elf.mp3',
    },
    {
      word: 'эскалатор',
      image: '/images/e-words/eskalator.png',
      audio: '/audio/e-words/eskalator.mp3',
    },
    {
      word: 'эскимо',
      image: '/images/e-words/eskimo.png',
      audio: '/audio/e-words/eskimo.mp3',
    },
  ]

  const readWords = [
    {
      word: 'эта',
      audio: '/audio/e-read-words/eta.mp3',
    },
    {
      word: 'этот',
      audio: '/audio/e-read-words/etot.mp3',
    },
    {
      word: 'это',
      audio: '/audio/e-read-words/eto.mp3',
    },
  ]

  const genderTasks = [
    {
      word: 'машина',
      image: '/images/m-words/mashina.png',
      correctAnswer: 'эта' as const,
      audio: '/audio/e-gender/eta-mashina.mp3',
      correctText: 'Верно! Эта машина.',
      wrongText: 'Почти. Машина — она. Правильно: эта машина.',
    },
    {
      word: 'мышь',
      image: '/images/m-words/mysh.png',
      correctAnswer: 'эта' as const,
      audio: '/audio/e-gender/eta-mysh.mp3',
      correctText: 'Верно! Эта мышь.',
      wrongText: 'Почти. Мышь — она. Правильно: эта мышь.',
    },
    {
      word: 'утка',
      image: '/images/u-words/utka.png',
      correctAnswer: 'эта' as const,
      audio: '/audio/e-gender/eta-utka.mp3',
      correctText: 'Верно! Эта утка.',
      wrongText: 'Почти. Утка — она. Правильно: эта утка.',
    },
    {
      word: 'эльф',
      image: '/images/e-words/elf.png',
      correctAnswer: 'этот' as const,
      audio: '/audio/e-gender/etot-elf.mp3',
      correctText: 'Верно! Этот эльф.',
      wrongText: 'Почти. Эльф — он. Правильно: этот эльф.',
    },
    {
      word: 'экскаватор',
      image: '/images/e-words/ekskavator.png',
      correctAnswer: 'этот' as const,
      audio: '/audio/e-gender/etot-ekskavator.mp3',
      correctText: 'Верно! Этот экскаватор.',
      wrongText: 'Почти. Экскаватор — он. Правильно: этот экскаватор.',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentGenderTask = genderTasks[genderIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playWordAudio = () => {
    if (!wordAudioRef.current) return
    wordAudioRef.current.currentTime = 0
    wordAudioRef.current.play()
  }

  const playReadWordAudio = () => {
    if (!readWordAudioRef.current) return
    readWordAudioRef.current.currentTime = 0
    readWordAudioRef.current.play()
  }

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Э', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = '82px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('это мама', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 13) {
      drawWordCanvasBase(ctx, rect.width, rect.height)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 13) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setReadWordIndex(0)
      setStep(9)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setStep(10)
    }
  }

  const nextGenderTask = () => {
    if (genderIndex < genderTasks.length - 1) {
      setGenderIndex((prev) => prev + 1)
      setGenderAnswer(null)
    } else {
      setStep(12)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-e.mp3" />
      <audio ref={wordAudioRef} src={currentPicture.audio} />
      <audio ref={readWordAudioRef} src={currentReadWord.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 8</p>

            <div className="redLetters">
              <span className="bigRedLetter">Э</span>
              <span className="smallRedLetter">э</span>
            </div>

            <h1 className="lessonTitle">Буква Э</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">Э Э Э Э Э Э</div>
            <div className="letterLine">э э э э э э</div>
            <div className="letterLine">Э э Э э Э э</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву Э</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-e.gif"
              alt="Как писать букву Э"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву Э пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Э.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Э</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Э</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Э</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/e-joins/e-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(6)}>
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine">
              <span className="joinPurple">Т</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Э</span>

              <span className="joinSpace" />

              <span className="joinPurple">М</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Э</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/e-joins/e-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(7)}>
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай третью строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 3</p>

            <div className="joinTextLine">
              <span className="joinPurple">Э</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">М</span>

              <span className="joinSpace" />

              <span className="joinPurple">Э</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Т</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/e-joins/e-row-3.mp3')}
            >
              ▶ Послушать строку 3
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setPictureIndex(0)
              setStep(8)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playWordAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">Назови. Какая буква первая?</p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button className="audioButton secondaryAudio" onClick={playReadWordAudio}>
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Эта и это</h1>
            <p className="lessonText">
              Посмотри на подсказку. Девочка — эта. Предмет — это.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/images/e-grammar/e-grammar-eta-eto.png"
              alt="Подсказка: эта и это"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setGenderIndex(0)
              setGenderAnswer(null)
              setStep(11)
            }}
          >
            Попробовать
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Выбери: эта или этот?</h1>
            <p className="lessonText">
              Посмотри на картинку и выбери правильное слово.
            </p>
          </section>

          <section className="genderChoiceCard">
            <img
              src={currentGenderTask.image}
              alt={currentGenderTask.word}
              className="genderChoiceImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentGenderTask.audio)}
            >
              🔊 Послушать подсказку
            </button>

            <p className="genderQuestion">Как правильно?</p>

            <div className="genderButtons">
              <button
                className={
                  genderAnswer === 'эта'
                    ? currentGenderTask.correctAnswer === 'эта'
                      ? 'genderButton genderButtonCorrect'
                      : 'genderButton genderButtonWrong'
                    : 'genderButton'
                }
                onClick={() => setGenderAnswer('эта')}
              >
                эта
              </button>

              <button
                className={
                  genderAnswer === 'этот'
                    ? currentGenderTask.correctAnswer === 'этот'
                      ? 'genderButton genderButtonCorrect'
                      : 'genderButton genderButtonWrong'
                    : 'genderButton'
                }
                onClick={() => setGenderAnswer('этот')}
              >
                этот
              </button>
            </div>

            {genderAnswer === currentGenderTask.correctAnswer && (
              <p className="correctFeedback">{currentGenderTask.correctText}</p>
            )}

            {genderAnswer !== null &&
              genderAnswer !== currentGenderTask.correctAnswer && (
                <p className="wrongFeedback">{currentGenderTask.wrongText}</p>
              )}
          </section>

          <button className="primaryButton" onClick={nextGenderTask}>
            {genderIndex < genderTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Посмотри, как писать</h1>
            <p className="lessonText">
              Посмотри на картинку и образец. Потом напиши сам.
            </p>
          </section>

          <section className="finalWritingCard">
            <img
              src="/images/e-words/mama.png"
              alt="Мама с ребёнком"
              className="finalWritingImage"
            />

            <img
              src="/gifs/e-words-write/e-word-eto-mama.gif"
              alt="Как писать это мама"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(13)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Напиши: это мама</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слова.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(14)}>
              Завершить урок
            </button>
          </div>
        </>
      )}

      {step === 14 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Э, прочитал её, написал, назвал слова и выбрал:
              эта или этот.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterILesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null)
  const [matchedZones, setMatchedZones] = useState<Record<string, string>>({})
  const [matchFeedback, setMatchFeedback] = useState('')

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const pictureAudioRef = useRef<HTMLAudioElement | null>(null)
  const readWordAudioRef = useRef<HTMLAudioElement | null>(null)
  const storyAudioRef = useRef<HTMLAudioElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'индюк',
      image: '/images/i-words/indyuk.png',
      audio: '/audio/i-words/indyuk.mp3',
    },
    {
      word: 'игрушки',
      image: '/images/i-words/igrushki.png',
      audio: '/audio/i-words/igrushki.mp3',
    },
    {
      word: 'иголка',
      image: '/images/i-words/igolka.png',
      audio: '/audio/i-words/igolka.mp3',
    },
    {
      word: 'изюм',
      image: '/images/i-words/izyum.png',
      audio: '/audio/i-words/izyum.mp3',
    },
  ]

  const readWords = [
    {
      word: 'УТ-КИ',
      image: '/images/i-read-words/ut-ki.png',
      audio: '/audio/i-read-words/ut-ki.mp3',
    },
    {
      word: 'У-СИ-КИ',
      image: '/images/i-read-words/u-si-ki.png',
      audio: '/audio/i-read-words/u-si-ki.mp3',
    },
    {
      word: 'КО-ТИК',
      image: '/images/i-read-words/ko-tik.png',
      audio: '/audio/i-read-words/ko-tik.mp3',
    },
    {
      word: 'МОС-ТИК',
      image: '/images/i-read-words/mos-tik.png',
      audio: '/audio/i-read-words/mos-tik.mp3',
    },
    {
      word: 'КУС-ТИК',
      image: '/images/i-read-words/kus-tik.png',
      audio: '/audio/i-read-words/kus-tik.mp3',
    },
  ]

  const sentenceTasks = [
    {
      id: 'bridge',
      text: 'ТУТ МОСТ',
    },
    {
      id: 'duck',
      text: 'У МОС-ТИ-КА УТ-КА',
    },
    {
      id: 'cat',
      text: 'НА МОС-ТУ КО-ТИК',
    },
  ]

  const hotspots = [
    {
      id: 'bridge',
      className: 'hotspotBridge',
    },
    {
      id: 'duck',
      className: 'hotspotDuck',
    },
    {
      id: 'cat',
      className: 'hotspotCat',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playPictureAudio = () => {
    if (!pictureAudioRef.current) return
    pictureAudioRef.current.currentTime = 0
    pictureAudioRef.current.play()
  }

  const playReadWordAudio = () => {
    if (!readWordAudioRef.current) return
    readWordAudioRef.current.currentTime = 0
    readWordAudioRef.current.play()
  }

  const playStoryAudio = () => {
    if (!storyAudioRef.current) return
    storyAudioRef.current.currentTime = 0
    storyAudioRef.current.play()
  }

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('И', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = '110px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('УТ-КИ', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 10) {
      drawWordCanvasBase(ctx, rect.width, rect.height)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 10) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setReadWordIndex(0)
      setStep(8)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setStep(9)
    }
  }

  const handleSentenceSelect = (id: string) => {
    setSelectedSentenceId(id)
    setMatchFeedback('')
  }

  const handleZoneClick = (zoneId: string) => {
    if (!selectedSentenceId) {
      setMatchFeedback('Сначала выбери предложение.')
      return
    }

    if (matchedZones[zoneId]) {
      return
    }

    if (selectedSentenceId === zoneId) {
      const sentence = sentenceTasks.find((item) => item.id === zoneId)
      setMatchedZones((prev) => ({
        ...prev,
        [zoneId]: sentence?.text ?? '',
      }))
      setSelectedSentenceId(null)
      setMatchFeedback('Верно!')
    } else {
      setMatchFeedback('Попробуй ещё раз.')
    }
  }

  const allMatched = Object.keys(matchedZones).length === sentenceTasks.length

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-i.mp3" />
      <audio ref={pictureAudioRef} src={currentPicture.audio} />
      <audio ref={readWordAudioRef} src={currentReadWord.audio} />
      <audio ref={storyAudioRef} src="/audio/i-story/park-text.mp3" />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 9</p>

            <div className="redLetters">
              <span className="bigRedLetter">И</span>
              <span className="smallRedLetter">и</span>
            </div>

            <h1 className="lessonTitle">Буква И</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">И И И И И И</div>
            <div className="letterLine">и и и и и и</div>
            <div className="letterLine">И и И и И и</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву И</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-i.gif"
              alt="Как писать букву И"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву И пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву И.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">М</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">И</span>

              <span className="joinSpace" />

              <span className="joinPurple">Т</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">И</span>

              <span className="joinSpace" />

              <span className="joinPurple">К</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">И</span>

              <span className="joinSpace" />

            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/i-joins/i-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: МИ, ТИ, КИ, СИ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(6)}>
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine">
              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">М</span>

              <span className="joinSpace" />

              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Т</span>

              <span className="joinSpace" />

              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">К</span>

              <span className="joinSpace" />

              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">С</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/i-joins/i-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ИМ, ИТ, ИК, ИС.
            </p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setPictureIndex(0)
              setStep(7)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Скажи, какая буква первая.
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playPictureAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови слово. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <img
              src={currentReadWord.image}
              alt={currentReadWord.word}
              className="wordReadImage"
            />

            <div className="readSingleWord">{currentReadWord.word}</div>

            <button className="audioButton secondaryAudio" onClick={playReadWordAudio}>
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/i-words-write/i-word-ut-ki.gif"
              alt="Как писать слово УТ-КИ"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(10)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Напиши слово УТ-КИ</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(11)}>
              Дальше
            </button>
          </div>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Послушай рассказ</h1>
            <p className="lessonText">
              Посмотри на картинку. Сначала послушай аудио.
            </p>
          </section>

          <section className="storyCard">
            <img
              src="/images/i-story/park-scene.png"
              alt="Парк, мостик, утка и котик"
              className="storyImage"
            />

            <button className="audioButton secondaryAudio" onClick={playStoryAudio}>
              ▶ Послушать рассказ
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setSelectedSentenceId(null)
              setMatchedZones({})
              setMatchFeedback('')
              setStep(12)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Соедини предложение с местом на картинке</h1>
            <p className="lessonText">
              Сначала нажми на предложение. Потом нажми на нужное место на картинке.
            </p>
          </section>

          <section className="matchCard">
            <div className="sentenceBank">
              {sentenceTasks.map((sentence) => {
                const isMatched = Object.values(matchedZones).includes(sentence.text)
                const isSelected = selectedSentenceId === sentence.id

                return (
                  <button
                    key={sentence.id}
                    className={
                      isMatched
                        ? 'sentenceOption sentenceMatched'
                        : isSelected
                          ? 'sentenceOption sentenceSelected'
                          : 'sentenceOption'
                    }
                    onClick={() => !isMatched && handleSentenceSelect(sentence.id)}
                    disabled={isMatched}
                  >
                    {sentence.text}
                  </button>
                )
              })}
            </div>

            <div className="sceneWrapper">
              <img
                src="/images/i-story/park-scene.png"
                alt="Парк, мостик, утка и котик"
                className="sceneImage"
              />

              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  className={
                    matchedZones[spot.id]
                      ? `storyHotspot ${spot.className} hotspotMatched`
                      : `storyHotspot ${spot.className}`
                  }
                  onClick={() => handleZoneClick(spot.id)}
                >
                  {matchedZones[spot.id] ? matchedZones[spot.id] : ''}
                </button>
              ))}
            </div>

            {matchFeedback && <p className="matchFeedback">{matchFeedback}</p>}
          </section>

          {allMatched && (
            <button className="primaryButton" onClick={() => setStep(13)}>
              Завершить урок
            </button>
          )}
        </>
      )}

      {step === 13 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву И, прочитал её, написал, назвал слова, прочитал
              слова и выполнил задание по картинке.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterGLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null)
  const [matchedZones, setMatchedZones] = useState<Record<string, string>>({})
  const [matchFeedback, setMatchFeedback] = useState('')

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const pictureAudioRef = useRef<HTMLAudioElement | null>(null)
  const readWordAudioRef = useRef<HTMLAudioElement | null>(null)
  const storyAudioRef = useRef<HTMLAudioElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'гусь',
      image: '/images/g-words/gus.png',
      audio: '/audio/g-words/gus.mp3',
    },
    {
      word: 'гусеница',
      image: '/images/g-words/gusenitsa.png',
      audio: '/audio/g-words/gusenitsa.mp3',
    },
    {
      word: 'горох',
      image: '/images/g-words/gorokh.png',
      audio: '/audio/g-words/gorokh.mp3',
    },
    {
      word: 'гриб',
      image: '/images/g-words/grib.png',
      audio: '/audio/g-words/grib.mp3',
    },
    {
      word: 'груша',
      image: '/images/g-words/grusha.png',
      audio: '/audio/g-words/grusha.mp3',
    },
  ]

  const readWords = [
    {
      word: 'ГУ-СИ',
      image: '/images/g-read-words/gu-si.png',
      audio: '/audio/g-read-words/gu-si.mp3',
    },
    {
      word: 'МА-КИ',
      image: '/images/g-read-words/ma-ki.png',
      audio: '/audio/g-read-words/ma-ki.mp3',
    },
    {
      word: 'МА-ГИ',
      image: '/images/g-read-words/ma-gi.png',
      audio: '/audio/g-read-words/ma-gi.mp3',
    },
    {
      word: 'КОГ-ТИ',
      image: '/images/g-read-words/kog-ti.png',
      audio: '/audio/g-read-words/kog-ti.mp3',
    },
  ]

  const sentenceTasks = [
    {
      id: 'geese',
      text: 'ТУТ ГУ-СИ',
    },
    {
      id: 'poppies',
      text: 'ТУТ МА-КИ',
    },
    {
      id: 'bush',
      text: 'ТУТ КУС-ТИК',
    },
  ]

  const hotspots = [
    {
      id: 'geese',
      className: 'gHotspotGeese',
    },
    {
      id: 'poppies',
      className: 'gHotspotPoppies',
    },
    {
      id: 'bush',
      className: 'gHotspotBush',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playPictureAudio = () => {
    if (!pictureAudioRef.current) return
    pictureAudioRef.current.currentTime = 0
    pictureAudioRef.current.play()
  }

  const playReadWordAudio = () => {
    if (!readWordAudioRef.current) return
    readWordAudioRef.current.currentTime = 0
    readWordAudioRef.current.play()
  }

  const playStoryAudio = () => {
    if (!storyAudioRef.current) return
    storyAudioRef.current.currentTime = 0
    storyAudioRef.current.play()
  }

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Г', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = '110px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('ГУ-СИ', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 11) {
      drawWordCanvasBase(ctx, rect.width, rect.height)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 11) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setStep(6)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setStep(10)
    }
  }

  const handleSentenceSelect = (id: string) => {
    setSelectedSentenceId(id)
    setMatchFeedback('')
  }

  const handleZoneClick = (zoneId: string) => {
    if (!selectedSentenceId) {
      setMatchFeedback('Сначала выбери предложение.')
      return
    }

    if (matchedZones[zoneId]) {
      return
    }

    if (selectedSentenceId === zoneId) {
      const sentence = sentenceTasks.find((item) => item.id === zoneId)

      setMatchedZones((prev) => ({
        ...prev,
        [zoneId]: sentence?.text ?? '',
      }))

      setSelectedSentenceId(null)
      setMatchFeedback('Верно!')
    } else {
      setMatchFeedback('Попробуй ещё раз.')
    }
  }

  const allMatched = Object.keys(matchedZones).length === sentenceTasks.length

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-g.mp3" />
      <audio ref={pictureAudioRef} src={currentPicture.audio} />
      <audio ref={readWordAudioRef} src={currentReadWord.audio} />
      <audio ref={storyAudioRef} src="/audio/g-story/story.mp3" />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 10</p>

            <div className="redLetters">
              <span className="bigRedLetter">Г</span>
              <span className="smallRedLetter">г</span>
            </div>

            <h1 className="lessonTitle">Буква Г</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">Г Г Г Г Г Г</div>
            <div className="letterLine">г г г г г г</div>
            <div className="letterLine">Г г Г г Г г</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву Г</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-g.gif"
              alt="Как писать букву Г"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву Г пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Г.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Скажи, какая буква первая.
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playPictureAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови слово. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">Г</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">Г</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>

              <span className="joinSpace" />

              <span className="joinPurple">Г</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinBreak" />

              <span className="joinPurple">Г</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">И</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/g-joins/g-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ГА, ГУ, ГО, ГИ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(7)}>
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Г</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Г</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Г</span>

              <span className="joinBreak" />

              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Г</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/g-joins/g-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: АГ, УГ, ОГ, ИГ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(8)}>
            Дальше
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай третью строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 3</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">ГАМ</span>

              <span className="joinSpace" />

              <span className="joinPurple">ГОМ</span>

              <span className="joinBreak" />

              <span className="joinPurple">ГУМ</span>

              <span className="joinSpace" />

              <span className="joinPurple">ГИМ</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/g-joins/g-row-3.mp3')}
            >
              ▶ Послушать строку 3
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ГАМ, ГОМ, ГУМ, ГИМ.
            </p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setReadWordIndex(0)
              setStep(9)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <img
              src={currentReadWord.image}
              alt={currentReadWord.word}
              className="wordReadImage"
            />

            <div className="readSingleWord">{currentReadWord.word}</div>

            <button className="audioButton secondaryAudio" onClick={playReadWordAudio}>
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/g-words-write/g-word-gu-si.gif"
              alt="Как писать слово ГУ-СИ"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(11)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Напиши слово ГУ-СИ</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(12)}>
              Дальше
            </button>
          </div>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Послушай рассказ</h1>
            <p className="lessonText">
              Посмотри на картинку. Сначала послушай аудио.
            </p>
          </section>

          <section className="storyCard">
            <img
              src="/images/g-story/g-story-scene.png"
              alt="Гуси, маки и кустик"
              className="storyImage"
            />

            <button className="audioButton secondaryAudio" onClick={playStoryAudio}>
              ▶ Послушать рассказ
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setSelectedSentenceId(null)
              setMatchedZones({})
              setMatchFeedback('')
              setStep(13)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Соедини предложение с местом на картинке</h1>
            <p className="lessonText">
              Сначала нажми на предложение. Потом нажми на нужное место на картинке.
            </p>
          </section>

          <section className="matchCard">
            <div className="sentenceBank">
              {sentenceTasks.map((sentence) => {
                const isMatched = Object.values(matchedZones).includes(sentence.text)
                const isSelected = selectedSentenceId === sentence.id

                return (
                  <button
                    key={sentence.id}
                    className={
                      isMatched
                        ? 'sentenceOption sentenceMatched'
                        : isSelected
                          ? 'sentenceOption sentenceSelected'
                          : 'sentenceOption'
                    }
                    onClick={() => !isMatched && handleSentenceSelect(sentence.id)}
                    disabled={isMatched}
                  >
                    {sentence.text}
                  </button>
                )
              })}
            </div>

            <div className="sceneWrapper">
              <img
                src="/images/g-story/g-story-scene.png"
                alt="Гуси, маки и кустик"
                className="sceneImage"
              />

              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  className={
                    matchedZones[spot.id]
                      ? `storyHotspot ${spot.className} hotspotMatched`
                      : `storyHotspot ${spot.className}`
                  }
                  onClick={() => handleZoneClick(spot.id)}
                >
                  {matchedZones[spot.id] ? matchedZones[spot.id] : ''}
                </button>
              ))}
            </div>

            {matchFeedback && <p className="matchFeedback">{matchFeedback}</p>}
          </section>

          {allMatched && (
            <button className="primaryButton" onClick={() => setStep(14)}>
              Завершить урок
            </button>
          )}
        </>
      )}

      {step === 14 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Г, прочитал её, написал, назвал слова и выполнил
              задание по картинке.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterDLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [writeWordIndex, setWriteWordIndex] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)

  const letterAudioRef = useRef<HTMLAudioElement | null>(null)
  const pictureAudioRef = useRef<HTMLAudioElement | null>(null)
  const readWordAudioRef = useRef<HTMLAudioElement | null>(null)
  const storyAudioRef = useRef<HTMLAudioElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'дом',
      image: '/images/d-words/dom.png',
      audio: '/audio/d-words/dom.mp3',
    },
    {
      word: 'диван',
      image: '/images/d-words/divan.png',
      audio: '/audio/d-words/divan.mp3',
    },
    {
      word: 'дорога',
      image: '/images/d-words/doroga.png',
      audio: '/audio/d-words/doroga.mp3',
    },
    {
      word: 'дерево',
      image: '/images/d-words/derevo.png',
      audio: '/audio/d-words/derevo.mp3',
    },
  ]

  const readWords = [
    {
      word: 'дом',
      audio: '/audio/d-read-words/dom.mp3',
    },
    {
      word: 'сад',
      audio: '/audio/d-read-words/sad.mp3',
    },
    {
      word: 'Ди-ма',
      audio: '/audio/d-read-words/dima.mp3',
    },
    {
      word: 'дос-ка',
      audio: '/audio/d-read-words/dos-ka.mp3',
    },
  ]

  const writeWords = [
    {
      word: 'дом',
      gif: '/gifs/d-words-write/d-word-dom.gif',
    },
    {
      word: 'сад',
      gif: '/gifs/d-words-write/d-word-sad.gif',
    },
  ]

  const storyTasks = [
    {
      id: 'dima',
      text: 'Тут Ди-ма',
      image: '/images/d-story/d-story-dima.png',
      audio: '/audio/d-story/dima.mp3',
    },
    {
      id: 'mama',
      text: 'Это ма-ма',
      image: '/images/d-story/d-story-mama.png',
      audio: '/audio/d-story/mama.mp3',
    },
    {
      id: 'kot-tim',
      text: 'Тут кот Тим',
      image: '/images/d-story/d-story-kot-tim.png',
      audio: '/audio/d-story/kot-tim.mp3',
    },
    {
      id: 'kogti',
      text: 'У ко-та ког-ти',
      image: '/images/d-story/d-story-kogti.png',
      audio: '/audio/d-story/kogti.mp3',
    },
    {
      id: 'miska-sosiska',
      text: 'Тут ми-ска. Там со-сис-ка',
      image: '/images/d-story/d-story-miska-sosiska.png',
      audio: '/audio/d-story/miska-sosiska.mp3',
    },
  ]

  const quizTasks = [
    {
      sentence: 'ТУТ МИ-СКА. ТАМ СО-СИС-КА',
      correctId: 'miska-sosiska',
      options: [
        {
          id: 'miska-sosiska',
          image: '/images/d-story/d-story-miska-sosiska.png',
        },
        {
          id: 'dima',
          image: '/images/d-story/d-story-dima.png',
        },
      ],
    },
    {
      sentence: 'ЭТО МА-МА',
      correctId: 'mama',
      options: [
        {
          id: 'kot-tim',
          image: '/images/d-story/d-story-kot-tim.png',
        },
        {
          id: 'mama',
          image: '/images/d-story/d-story-mama.png',
        },
      ],
    },
    {
      sentence: 'ТУТ КОТ ТИМ',
      correctId: 'kot-tim',
      options: [
        {
          id: 'kot-tim',
          image: '/images/d-story/d-story-kot-tim.png',
        },
        {
          id: 'miska-sosiska',
          image: '/images/d-story/d-story-miska-sosiska.png',
        },
      ],
    },
    {
      sentence: 'У КО-ТА КОГ-ТИ',
      correctId: 'kogti',
      options: [
        {
          id: 'mama',
          image: '/images/d-story/d-story-mama.png',
        },
        {
          id: 'kogti',
          image: '/images/d-story/d-story-kogti.png',
        },
      ],
    },
    {
      sentence: 'ТУТ ДИ-МА',
      correctId: 'dima',
      options: [
        {
          id: 'dima',
          image: '/images/d-story/d-story-dima.png',
        },
        {
          id: 'kogti',
          image: '/images/d-story/d-story-kogti.png',
        },
      ],
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentWriteWord = writeWords[writeWordIndex]
  const currentStory = storyTasks[storyIndex]
  const currentQuiz = quizTasks[quizIndex]

  const playLetterAudio = () => {
    if (!letterAudioRef.current) return
    letterAudioRef.current.currentTime = 0
    letterAudioRef.current.play()
  }

  const playPictureAudio = () => {
    if (!pictureAudioRef.current) return
    pictureAudioRef.current.currentTime = 0
    pictureAudioRef.current.play()
  }

  const playReadWordAudio = () => {
    if (!readWordAudioRef.current) return
    readWordAudioRef.current.currentTime = 0
    readWordAudioRef.current.play()
  }

  const playStoryAudio = () => {
    if (!storyAudioRef.current) return
    storyAudioRef.current.currentTime = 0
    storyAudioRef.current.play()
  }

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Д', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    word: string,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = '130px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(word, width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 10) {
      drawWordCanvasBase(ctx, rect.width, rect.height, currentWriteWord.word)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 10) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step, writeWordIndex])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setStep(6)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setWriteWordIndex(0)
      setStep(9)
    }
  }

  const nextWriteWord = () => {
    if (writeWordIndex < writeWords.length - 1) {
      setWriteWordIndex((prev) => prev + 1)
      setStep(9)
    } else {
      setStoryIndex(0)
      setStep(11)
    }
  }

  const nextStory = () => {
    if (storyIndex < storyTasks.length - 1) {
      setStoryIndex((prev) => prev + 1)
    } else {
      setQuizIndex(0)
      setQuizAnswer(null)
      setStep(12)
    }
  }

  const nextQuiz = () => {
    if (quizIndex < quizTasks.length - 1) {
      setQuizIndex((prev) => prev + 1)
      setQuizAnswer(null)
    } else {
      setStep(13)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <audio ref={letterAudioRef} src="/audio/letters/letter-d.mp3" />
      <audio ref={pictureAudioRef} src={currentPicture.audio} />
      <audio ref={readWordAudioRef} src={currentReadWord.audio} />
      <audio ref={storyAudioRef} src={currentStory.audio} />

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 11</p>

            <div className="redLetters">
              <span className="bigRedLetter">Д</span>
              <span className="smallRedLetter">д</span>
            </div>

            <h1 className="lessonTitle">Буква Д</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button className="audioButton" onClick={playLetterAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">Д Д Д Д Д Д</div>
            <div className="letterLine">д д д д д д</div>
            <div className="letterLine">Д д Д д Д д</div>
          </section>

          <button className="audioButton secondaryAudio" onClick={playLetterAudio}>
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву Д</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-d.gif"
              alt="Как писать букву Д"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву Д пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Д.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Скажи, какая буква первая.
            </p>
          </section>

          <section className="pictureTaskCard">
            <button className="hintButton" onClick={playPictureAudio}>
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови слово. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">Д</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">Д</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinSpace" />

              <span className="joinPurple">Д</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>

              <span className="joinBreak" />

              <span className="joinPurple">Д</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">И</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/d-joins/d-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ДА, ДО, ДУ, ДИ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(7)}>
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Д</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Д</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Д</span>

              <span className="joinSpace" />

              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Д</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/d-joins/d-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: АД, ОД, УД, ИД.
            </p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setReadWordIndex(0)
              setStep(8)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button className="audioButton secondaryAudio" onClick={playReadWordAudio}>
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src={currentWriteWord.gif}
              alt={`Как писать слово ${currentWriteWord.word}`}
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(10)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Напиши слово {currentWriteWord.word}</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={nextWriteWord}>
              {writeWordIndex < writeWords.length - 1
                ? 'Следующее слово'
                : 'Дальше'}
            </button>
          </div>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Посмотри и послушай</h1>
            <p className="lessonText">
              Посмотри на картинку. Потом послушай аудио.
            </p>
          </section>

          <section className="storyCard">
            <img
              src={currentStory.image}
              alt={currentStory.text}
              className="storyImage"
            />

            <button className="audioButton secondaryAudio" onClick={playStoryAudio}>
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={nextStory}>
            {storyIndex < storyTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай предложение. Потом выбери подходящую картинку.
            </p>
          </section>

          <section className="readingChoiceCard">
            <div className="readingChoiceSentence">{currentQuiz.sentence}</div>

            <div className="readingChoiceButtons">
              {currentQuiz.options.map((option) => (
                <button
                  key={option.id}
                  className={
                    quizAnswer === option.id
                      ? option.id === currentQuiz.correctId
                        ? 'readingChoiceButton readingChoiceCorrect'
                        : 'readingChoiceButton readingChoiceWrong'
                      : 'readingChoiceButton'
                  }
                  onClick={() => setQuizAnswer(option.id)}
                >
                  <img src={option.image} alt="" />
                </button>
              ))}
            </div>

            {quizAnswer === currentQuiz.correctId && (
              <p className="correctFeedback">Верно!</p>
            )}

            {quizAnswer !== null && quizAnswer !== currentQuiz.correctId && (
              <p className="wrongFeedback">Попробуй ещё раз.</p>
            )}
          </section>

          {quizAnswer === currentQuiz.correctId && (
            <button className="primaryButton" onClick={nextQuiz}>
              {quizIndex < quizTasks.length - 1 ? 'Следующее предложение' : 'Завершить урок'}
            </button>
          )}
        </>
      )}

      {step === 13 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Д, прочитал её, написал, назвал слова и выбрал
              картинки к предложениям.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterYeriLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [listenChoiceIndex, setListenChoiceIndex] = useState(0)
  const [storyIndex, setStoryIndex] = useState(0)

  const [listenChoiceAnswer, setListenChoiceAnswer] = useState<string | null>(null)

  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null)
  const [matchedZones, setMatchedZones] = useState<Record<string, string>>({})
  const [matchFeedback, setMatchFeedback] = useState('')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'сыр',
      image: '/images/yeri-words/syr.png',
      audio: '/audio/yeri-words/syr.mp3',
    },
    {
      word: 'мышь',
      image: '/images/yeri-words/mysh.png',
      audio: '/audio/yeri-words/mysh.mp3',
    },
    {
      word: 'усы',
      image: '/images/yeri-words/usy.png',
      audio: '/audio/yeri-words/usy.mp3',
    },
    {
      word: 'рыбы',
      image: '/images/yeri-words/ryby.png',
      audio: '/audio/yeri-words/ryby.mp3',
    },
  ]

  const readWords = [
    {
      word: 'ма-мы',
      audio: '/audio/yeri-read-words/ma-my.mp3',
    },
    {
      word: 'ко-ты',
      audio: '/audio/yeri-read-words/ko-ty.mp3',
    },
    {
      word: 'у-сы',
      audio: '/audio/yeri-read-words/u-sy.mp3',
    },
    {
      word: 'то-ма-ты',
      audio: '/audio/yeri-read-words/to-ma-ty.mp3',
    },
  ]

  const listenChoiceTasks = [
    {
      audio: '/audio/yeri-choose/mama.mp3',
      correctId: 'mama-one',
      options: [
        {
          id: 'mama-one',
          image: '/images/yeri-choose/mama-one.png',
        },
        {
          id: 'mama-two',
          image: '/images/yeri-choose/mama-two.png',
        },
      ],
    },
    {
      audio: '/audio/yeri-choose/mamy.mp3',
      correctId: 'mama-two',
      options: [
        {
          id: 'mama-one',
          image: '/images/yeri-choose/mama-one.png',
        },
        {
          id: 'mama-two',
          image: '/images/yeri-choose/mama-two.png',
        },
      ],
    },
    {
      audio: '/audio/yeri-choose/kot.mp3',
      correctId: 'cat-one',
      options: [
        {
          id: 'cat-one',
          image: '/images/yeri-choose/cat-one.png',
        },
        {
          id: 'cat-two',
          image: '/images/yeri-choose/cat-two.png',
        },
      ],
    },
    {
      audio: '/audio/yeri-choose/koty.mp3',
      correctId: 'cat-two',
      options: [
        {
          id: 'cat-one',
          image: '/images/yeri-choose/cat-one.png',
        },
        {
          id: 'cat-two',
          image: '/images/yeri-choose/cat-two.png',
        },
      ],
    },
    {
      audio: '/audio/yeri-choose/kust.mp3',
      correctId: 'bush-one',
      options: [
        {
          id: 'bush-one',
          image: '/images/yeri-choose/bush-one.png',
        },
        {
          id: 'bush-two',
          image: '/images/yeri-choose/bush-two.png',
        },
      ],
    },
    {
      audio: '/audio/yeri-choose/kusty.mp3',
      correctId: 'bush-two',
      options: [
        {
          id: 'bush-one',
          image: '/images/yeri-choose/bush-one.png',
        },
        {
          id: 'bush-two',
          image: '/images/yeri-choose/bush-two.png',
        },
      ],
    },
  ]

  const storyTasks = [
    {
      id: 'miska',
      image: '/images/yeri-story/yeri-story-scene.png',
      audio: '/audio/yeri-story/miska.mp3',
    },
    {
      id: 'tomaty',
      image: '/images/yeri-story/yeri-story-scene.png',
      audio: '/audio/yeri-story/tomaty.mp3',
    },
    {
      id: 'ryba',
      image: '/images/yeri-story/yeri-story-scene.png',
      audio: '/audio/yeri-story/ryba.mp3',
    },
    {
      id: 'syr',
      image: '/images/yeri-story/yeri-story-scene.png',
      audio: '/audio/yeri-story/syr.mp3',
    },
  ]

  const sentenceTasks = [
    {
      id: 'syr',
      text: 'ТАМ СЫР',
    },
    {
      id: 'miska',
      text: 'ВОТ МИСКА',
    },
    {
      id: 'ryba',
      text: 'ТАМ РЫБА',
    },
    {
      id: 'tomaty',
      text: 'ТАМ ТО-МА-ТЫ',
    },
  ]

  const hotspots = [
    {
      id: 'miska',
      className: 'yeriHotspotMiska',
    },
    {
      id: 'tomaty',
      className: 'yeriHotspotTomaty',
    },
    {
      id: 'ryba',
      className: 'yeriHotspotRyba',
    },
    {
      id: 'syr',
      className: 'yeriHotspotSyr',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentListenChoice = listenChoiceTasks[listenChoiceIndex]
  const currentStory = storyTasks[storyIndex]

  const playAudio = (src: string) => {
    const audio = new Audio(src)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Ы', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    word: string,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = '130px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(word, width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 11) {
      drawWordCanvasBase(ctx, rect.width, rect.height, 'усы')
    }
  }

  useEffect(() => {
    if (step === 4 || step === 11) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setReadWordIndex(0)
      setStep(9)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setStep(10)
    }
  }

  const nextListenChoice = () => {
    if (listenChoiceIndex < listenChoiceTasks.length - 1) {
      setListenChoiceIndex((prev) => prev + 1)
      setListenChoiceAnswer(null)
    } else {
      setStoryIndex(0)
      setStep(13)
    }
  }

  const nextStory = () => {
    if (storyIndex < storyTasks.length - 1) {
      setStoryIndex((prev) => prev + 1)
    } else {
      setSelectedSentenceId(null)
      setMatchedZones({})
      setMatchFeedback('')
      setStep(14)
    }
  }

  const handleSentenceSelect = (id: string) => {
    setSelectedSentenceId(id)
    setMatchFeedback('')
  }

  const handleZoneClick = (zoneId: string) => {
    if (!selectedSentenceId) {
      setMatchFeedback('Сначала выбери предложение.')
      return
    }

    if (matchedZones[zoneId]) {
      return
    }

    if (selectedSentenceId === zoneId) {
      const sentence = sentenceTasks.find((item) => item.id === zoneId)

      setMatchedZones((prev) => ({
        ...prev,
        [zoneId]: sentence?.text ?? '',
      }))

      setSelectedSentenceId(null)
      setMatchFeedback('Верно!')
    } else {
      setMatchFeedback('Попробуй ещё раз.')
    }
  }

  const allMatched = Object.keys(matchedZones).length === sentenceTasks.length

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 12</p>

            <div className="redLetters">
              <span className="bigRedLetter">Ы</span>
              <span className="smallRedLetter">ы</span>
            </div>

            <h1 className="lessonTitle">Буква Ы</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-yeri.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">Ы Ы Ы Ы Ы Ы</div>
            <div className="letterLine">ы ы ы ы ы ы</div>
            <div className="letterLine">Ы ы Ы ы Ы ы</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-yeri.mp3')}
          >
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву Ы</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-yeri.gif"
              alt="Как писать букву Ы"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву Ы пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Ы.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">М</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Ы</span>

              <span className="joinSpace" />

              <span className="joinPurple">Т</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Ы</span>

              <span className="joinSpace" />

              <span className="joinPurple">К</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Ы</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/yeri-joins/yeri-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: МЫ, ТЫ, КЫ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(6)}>
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">С</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Ы</span>

              <span className="joinSpace" />

              <span className="joinPurple">Г</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Ы</span>

              <span className="joinSpace" />

              <span className="joinPurple">Д</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Ы</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/yeri-joins/yeri-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: СЫ, ГЫ, ДЫ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(7)}>
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Важное правило</h1>
            <p className="lessonText">
              Послушай правило про букву Ы.
            </p>
          </section>

          <section className="ruleNoticeCard">
            <div className="crossedLetterWrap">
              <span className="crossedLetterLarge">Ы</span>
              <span className="crossLine" />
            </div>

            <p className="ruleNoticeText">
              Буква Ы никогда не стоит первая в слове.
            </p>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/yeri-rule/yeri-never-first.mp3')}
            >
              ▶ Послушать правило
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setPictureIndex(0)
              setStep(8)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Скажи, какая буква первая.
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови слово. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentReadWord.audio)}
            >
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/yeri-words-write/yeri-word-usy.gif"
              alt="Как писать слово усы"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(11)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Напиши слово усы</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setListenChoiceIndex(0)
                setListenChoiceAnswer(null)
                setStep(12)
              }}
            >
              Дальше
            </button>
          </div>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Послушай и выбери картинку</h1>
            <p className="lessonText">
              Нажми на кнопку, послушай аудио и выбери правильную картинку.
            </p>
          </section>

          <section className="audioChoiceCard">
            <button
              className="audioButton"
              onClick={() => playAudio(currentListenChoice.audio)}
            >
              ▶ Послушать
            </button>

            <div className="audioChoiceGrid">
              {currentListenChoice.options.map((option) => (
                <button
                  key={option.id}
                  className={
                    listenChoiceAnswer === option.id
                      ? option.id === currentListenChoice.correctId
                        ? 'audioChoiceButton audioChoiceCorrect'
                        : 'audioChoiceButton audioChoiceWrong'
                      : 'audioChoiceButton'
                  }
                  onClick={() => setListenChoiceAnswer(option.id)}
                >
                  <img src={option.image} alt="" />
                </button>
              ))}
            </div>

            {listenChoiceAnswer === currentListenChoice.correctId && (
              <p className="correctFeedback">Верно!</p>
            )}

            {listenChoiceAnswer !== null &&
              listenChoiceAnswer !== currentListenChoice.correctId && (
                <p className="wrongFeedback">Попробуй ещё раз.</p>
              )}
          </section>

          {listenChoiceAnswer === currentListenChoice.correctId && (
            <button className="primaryButton" onClick={nextListenChoice}>
              {listenChoiceIndex < listenChoiceTasks.length - 1
                ? 'Следующее задание'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Посмотри и послушай</h1>
            <p className="lessonText">
              Посмотри на картинку. Потом послушай аудио.
            </p>
          </section>

          <section className="storyCard">
            <img
              src={currentStory.image}
              alt="Миска, томаты, рыба и сыр"
              className="storyImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentStory.audio)}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={nextStory}>
            {storyIndex < storyTasks.length - 1 ? 'Следующее аудио' : 'Дальше'}
          </button>
        </>
      )}

      {step === 14 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 11</p>
            <h1 className="taskTitle">Соедини предложение с частью картинки</h1>
            <p className="lessonText">
              Сначала нажми на предложение. Потом нажми на нужное место на картинке.
            </p>
          </section>

          <section className="matchCard">
            <div className="sentenceBank">
              {sentenceTasks.map((sentence) => {
                const isMatched = Object.values(matchedZones).includes(sentence.text)
                const isSelected = selectedSentenceId === sentence.id

                return (
                  <button
                    key={sentence.id}
                    className={
                      isMatched
                        ? 'sentenceOption sentenceMatched'
                        : isSelected
                          ? 'sentenceOption sentenceSelected'
                          : 'sentenceOption'
                    }
                    onClick={() => !isMatched && handleSentenceSelect(sentence.id)}
                    disabled={isMatched}
                  >
                    {sentence.text}
                  </button>
                )
              })}
            </div>

            <div className="sceneWrapper">
              <img
                src="/images/yeri-story/yeri-story-scene.png"
                alt="Миска, томаты, рыба и сыр"
                className="sceneImage"
              />

              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  className={
                    matchedZones[spot.id]
                      ? `storyHotspot ${spot.className} hotspotMatched`
                      : `storyHotspot ${spot.className}`
                  }
                  onClick={() => handleZoneClick(spot.id)}
                >
                  {matchedZones[spot.id] ? matchedZones[spot.id] : ''}
                </button>
              ))}
            </div>

            {matchFeedback && <p className="matchFeedback">{matchFeedback}</p>}
          </section>

          {allMatched && (
            <button className="primaryButton" onClick={() => setStep(15)}>
              Завершить урок
            </button>
          )}
        </>
      )}

      {step === 15 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Ы, прочитал её, написал, выбрал картинки и
              выполнил задание по большой картинке.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterLLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [tasteIndex, setTasteIndex] = useState(0)
  const [tasteAnswer, setTasteAnswer] = useState<string | null>(null)

  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null)
  const [matchedPanels, setMatchedPanels] = useState<Record<string, string>>({})
  const [matchFeedback, setMatchFeedback] = useState('')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'лиса',
      image: '/images/l-words/lisa.png',
      audio: '/audio/l-words/lisa.mp3',
    },
    {
      word: 'лошадь',
      image: '/images/l-words/loshad.png',
      audio: '/audio/l-words/loshad.mp3',
    },
    {
      word: 'лук',
      image: '/images/l-words/luk.png',
      audio: '/audio/l-words/luk.mp3',
    },
    {
      word: 'лягушка',
      image: '/images/l-words/lyagushka.png',
      audio: '/audio/l-words/lyagushka.mp3',
    },
    {
      word: 'лодка',
      image: '/images/l-words/lodka.png',
      audio: '/audio/l-words/lodka.mp3',
    },
    {
      word: 'лампа',
      image: '/images/l-words/lampa.png',
      audio: '/audio/l-words/lampa.mp3',
    },
  ]

  const readWords = [
    {
      word: 'иг-ла',
      audio: '/audio/l-read-words/ig-la.mp3',
    },
    {
      word: 'ли-са',
      audio: '/audio/l-read-words/li-sa.mp3',
    },
    {
      word: 'мас-ло',
      audio: '/audio/l-read-words/mas-lo.mp3',
    },
    {
      word: 'лас-тик',
      audio: '/audio/l-read-words/las-tik.mp3',
    },
    {
      word: 'а-ку-ла',
      audio: '/audio/l-read-words/a-ku-la.mp3',
    },
    {
      word: 'стул',
      audio: '/audio/l-read-words/stul.mp3',
    },
    {
      word: 'стол',
      audio: '/audio/l-read-words/stol.mp3',
    },
    {
      word: 'улит-ка',
      audio: '/audio/l-read-words/ulit-ka.mp3',
    },
    {
      word: 'кис-ло',
      audio: '/audio/l-read-words/kis-lo.mp3',
    },
    {
      word: 'слад-ко',
      audio: '/audio/l-read-words/slad-ko.mp3',
    },
    {
      word: 'глад-ко',
      audio: '/audio/l-read-words/glad-ko.mp3',
    },
  ]

  const tasteTasks = [
    {
      image: '/images/l-taste/limon.png',
      correct: 'kislo',
    },
    {
      image: '/images/l-taste/tort.png',
      correct: 'sladko',
    },
    {
      image: '/images/l-taste/laim.png',
      correct: 'kislo',
    },
    {
      image: '/images/l-taste/konfety.png',
      correct: 'sladko',
    },
    {
      image: '/images/l-taste/morozhenoe.png',
      correct: 'sladko',
    },
  ]

  const comicPanels = [
    {
      id: 'p1',
      image: '/images/l-comic/l-comic-1.png',
      alt: 'Дима в саду',
    },
    {
      id: 'p2',
      image: '/images/l-comic/l-comic-2.png',
      alt: 'Дима видит кота',
    },
    {
      id: 'p3',
      image: '/images/l-comic/l-comic-3.png',
      alt: 'Дима дал коту молоко',
    },
    {
      id: 'p4',
      image: '/images/l-comic/l-comic-4.png',
      alt: 'Сладко',
    },
  ]

  const sentenceTasks = [
    {
      id: 'p3',
      text: 'ДИ-МА ДАЛ КО-ТУ МО-ЛО-КО.',
    },
    {
      id: 'p1',
      text: 'ДИ-МА В СА-ДУ.',
    },
    {
      id: 'p4',
      text: 'СЛАД-КО!',
    },
    {
      id: 'p2',
      text: 'ДИ-МА ВИ-ДИТ КО-ТА.',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentTasteTask = tasteTasks[tasteIndex]

  const playAudio = (src: string) => {
    const audio = new Audio(src)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Л', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    word: string,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = '120px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(word, width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 10) {
      drawWordCanvasBase(ctx, rect.width, rect.height, 'а-ку-ла')
    }
  }

  useEffect(() => {
    if (step === 4 || step === 10) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setReadWordIndex(0)
      setStep(8)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setStep(9)
    }
  }

  const nextTasteTask = () => {
    if (tasteIndex < tasteTasks.length - 1) {
      setTasteIndex((prev) => prev + 1)
      setTasteAnswer(null)
    } else {
      setStep(12)
    }
  }

  const handleSentenceSelect = (id: string) => {
    setSelectedSentenceId(id)
    setMatchFeedback('')
  }

  const handlePanelClick = (panelId: string) => {
    if (!selectedSentenceId) {
      setMatchFeedback('Сначала выбери предложение.')
      return
    }

    if (matchedPanels[panelId]) {
      return
    }

    if (selectedSentenceId === panelId) {
      const sentence = sentenceTasks.find((item) => item.id === panelId)

      setMatchedPanels((prev) => ({
        ...prev,
        [panelId]: sentence?.text ?? '',
      }))

      setSelectedSentenceId(null)
      setMatchFeedback('Верно!')
    } else {
      setMatchFeedback('Попробуй ещё раз.')
    }
  }

  const allMatched = Object.keys(matchedPanels).length === comicPanels.length

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 13</p>

            <div className="redLetters">
              <span className="bigRedLetter">Л</span>
              <span className="smallRedLetter">л</span>
            </div>

            <h1 className="lessonTitle">Буква Л</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-l.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">Л Л Л Л Л Л</div>
            <div className="letterLine">л л л л л л</div>
            <div className="letterLine">Л л Л л Л л</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-l.mp3')}
          >
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву Л</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-l.gif"
              alt="Как писать букву Л"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву Л пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Л.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">Л</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">Л</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinSpace" />

              <span className="joinPurple">Л</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>

              <span className="joinBreak" />

              <span className="joinPurple">Л</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">И</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/l-joins/l-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ЛА, ЛО, ЛУ, ЛИ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(6)}>
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Л</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Л</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Л</span>

              <span className="joinSpace" />

              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Л</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/l-joins/l-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: АЛ, ОЛ, УЛ, ИЛ.
            </p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setPictureIndex(0)
              setStep(7)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Скажи, какая буква первая.
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови слово. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentReadWord.audio)}
            >
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/l-words-write/l-word-akula.gif"
              alt="Как писать слово а-ку-ла"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(10)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Напиши слово а-ку-ла</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setTasteIndex(0)
                setTasteAnswer(null)
                setStep(11)
              }}
            >
              Дальше
            </button>
          </div>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Кисло или сладко?</h1>
            <p className="lessonText">
              Посмотри на картинку и выбери правильный вариант.
            </p>
          </section>

          <section className="tasteChoiceCard">
            <img
              src={currentTasteTask.image}
              alt=""
              className="tasteChoiceImage"
            />

            <div className="tasteButtons">
              <button
                className={
                  tasteAnswer === 'kislo'
                    ? currentTasteTask.correct === 'kislo'
                      ? 'tasteOption tasteCorrect'
                      : 'tasteOption tasteWrong'
                    : 'tasteOption'
                }
                onClick={() => setTasteAnswer('kislo')}
              >
                КИС-ЛО
              </button>

              <button
                className={
                  tasteAnswer === 'sladko'
                    ? currentTasteTask.correct === 'sladko'
                      ? 'tasteOption tasteCorrect'
                      : 'tasteOption tasteWrong'
                    : 'tasteOption'
                }
                onClick={() => setTasteAnswer('sladko')}
              >
                СЛАД-КО
              </button>
            </div>

            {tasteAnswer === currentTasteTask.correct && (
              <p className="correctFeedback">Верно!</p>
            )}

            {tasteAnswer !== null && tasteAnswer !== currentTasteTask.correct && (
              <p className="wrongFeedback">Попробуй ещё раз.</p>
            )}
          </section>

          {tasteAnswer === currentTasteTask.correct && (
            <button className="primaryButton" onClick={nextTasteTask}>
              {tasteIndex < tasteTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Послушай комикс</h1>
            <p className="lessonText">
              Сначала посмотри на картинки. Потом послушай аудио.
            </p>
          </section>

          <section className="comicListenCard">
            <div className="comicListenGrid">
              {comicPanels.map((panel) => (
                <div key={panel.id} className="comicListenItem">
                  <img src={panel.image} alt={panel.alt} className="comicListenImage" />
                </div>
              ))}
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/l-comic/story.mp3')}
            >
              ▶ Послушать комикс
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setSelectedSentenceId(null)
              setMatchedPanels({})
              setMatchFeedback('')
              setStep(13)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Соедини предложение с картинкой</h1>
            <p className="lessonText">
              Сначала нажми на предложение. Потом нажми на нужную картинку.
            </p>
          </section>

          <section className="matchCard">
            <div className="sentenceBank">
              {sentenceTasks.map((sentence) => {
                const isMatched = Object.values(matchedPanels).includes(sentence.text)
                const isSelected = selectedSentenceId === sentence.id

                return (
                  <button
                    key={sentence.id}
                    className={
                      isMatched
                        ? 'sentenceOption sentenceMatched'
                        : isSelected
                          ? 'sentenceOption sentenceSelected'
                          : 'sentenceOption'
                    }
                    onClick={() => !isMatched && handleSentenceSelect(sentence.id)}
                    disabled={isMatched}
                  >
                    {sentence.text}
                  </button>
                )
              })}
            </div>

            <div className="comicMatchGrid">
              {comicPanels.map((panel) => (
                <button
                  key={panel.id}
                  className={
                    matchedPanels[panel.id]
                      ? 'comicMatchButton comicMatchDone'
                      : 'comicMatchButton'
                  }
                  onClick={() => handlePanelClick(panel.id)}
                >
                  <img src={panel.image} alt={panel.alt} className="comicMatchImage" />
                  {matchedPanels[panel.id] && (
                    <div className="comicMatchCaption">{matchedPanels[panel.id]}</div>
                  )}
                </button>
              ))}
            </div>

            {matchFeedback && <p className="matchFeedback">{matchFeedback}</p>}
          </section>

          {allMatched && (
            <button className="primaryButton" onClick={() => setStep(14)}>
              Завершить урок
            </button>
          )}
        </>
      )}

      {step === 14 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Л, прочитал её, написал слово, выбрал правильные
              ответы и выполнил задание с комиксом.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterPLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null)
  const [matchedPanels, setMatchedPanels] = useState<Record<string, string>>({})
  const [matchFeedback, setMatchFeedback] = useState('')

  const [choiceIndex, setChoiceIndex] = useState(0)
  const [choiceAnswer, setChoiceAnswer] = useState<'в' | 'над' | 'под' | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'панда',
      image: '/images/p-words/panda.png',
      audio: '/audio/p-words/panda.mp3',
    },
    {
      word: 'пингвин',
      image: '/images/p-words/pingvin.png',
      audio: '/audio/p-words/pingvin.mp3',
    },
    {
      word: 'петух',
      image: '/images/p-words/petuh.png',
      audio: '/audio/p-words/petuh.mp3',
    },
    {
      word: 'принцесса',
      image: '/images/p-words/princessa.png',
      audio: '/audio/p-words/princessa.mp3',
    },
    {
      word: 'перец',
      image: '/images/p-words/perec.png',
      audio: '/audio/p-words/perec.mp3',
    },
    {
      word: 'птичка',
      image: '/images/p-words/ptichka.png',
      audio: '/audio/p-words/ptichka.mp3',
    },
  ]

  const readWords = [
    {
      word: 'суп',
      audio: '/audio/p-read-words/sup.mp3',
    },
    {
      word: 'па-па',
      audio: '/audio/p-read-words/pa-pa.mp3',
    },
    {
      word: 'по-ка',
      audio: '/audio/p-read-words/po-ka.mp3',
    },
    {
      word: 'па-ук',
      audio: '/audio/p-read-words/pa-uk.mp3',
    },
    {
      word: 'по-су-да',
      audio: '/audio/p-read-words/po-su-da.mp3',
    },
    {
      word: 'ком-пас',
      audio: '/audio/p-read-words/kom-pas.mp3',
    },
  ]

  const sentenceTasks = [
    {
      id: 'boat',
      text: 'ЛОД-КА В ПРУ-ДУ.',
    },
    {
      id: 'dog',
      text: 'СО-БА-КА ПОД СТО-ЛОМ.',
    },
    {
      id: 'cat',
      text: 'КОТ НАД СТО-ЛОМ.',
    },
  ]

  const sentencePanels = [
    {
      id: 'dog',
      image: '/images/p-sentences/sobaka-pod-stolom.png',
      alt: 'Собака под столом',
    },
    {
      id: 'cat',
      image: '/images/p-sentences/kot-nad-stolom.png',
      alt: 'Кот над столом',
    },
    {
      id: 'boat',
      image: '/images/p-sentences/lodka-v-prudu.png',
      alt: 'Лодка в пруду',
    },
  ]

  const choiceTasks = [
    {
      id: 'gusi',
      image: '/images/p-choice/gusi-v-prudu.png',
      sentence: 'ГУ-СИ … ПРУ-ДУ.',
      correct: 'в' as const,
      correctText: 'Верно! Гуси в пруду.',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      id: 'pauk',
      image: '/images/p-choice/pauk-pod-mostom.png',
      sentence: 'ПА-УК … МОС-ТОМ.',
      correct: 'под' as const,
      correctText: 'Верно! Паук под мостом.',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      id: 'utka',
      image: '/images/p-choice/utka-nad-domom.png',
      sentence: 'УТ-КА … ДО-МОМ.',
      correct: 'над' as const,
      correctText: 'Верно! Утка над домом.',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      id: 'ulitka',
      image: '/images/p-choice/ulitka-v-sadu.png',
      sentence: 'У-ЛИТ-КА … СА-ДУ.',
      correct: 'в' as const,
      correctText: 'Верно! Улитка в саду.',
      wrongText: 'Попробуй ещё раз.',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentChoice = choiceTasks[choiceIndex]

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('П', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = '96px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('по-су-да', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 10) {
      drawWordCanvasBase(ctx, rect.width, rect.height)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 10) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: any) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setReadWordIndex(0)
      setStep(8)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setStep(9)
    }
  }

  const handleSentenceSelect = (id: string) => {
    setSelectedSentenceId(id)
    setMatchFeedback('')
  }

  const handlePanelClick = (panelId: string) => {
    if (!selectedSentenceId) {
      setMatchFeedback('Сначала выбери предложение.')
      return
    }

    if (matchedPanels[panelId]) {
      return
    }

    if (selectedSentenceId === panelId) {
      const sentence = sentenceTasks.find((item) => item.id === panelId)

      setMatchedPanels((prev) => ({
        ...prev,
        [panelId]: sentence?.text ?? '',
      }))

      setSelectedSentenceId(null)
      setMatchFeedback('Верно!')
    } else {
      setMatchFeedback('Попробуй ещё раз.')
    }
  }

  const nextChoiceTask = () => {
    if (choiceIndex < choiceTasks.length - 1) {
      setChoiceIndex((prev) => prev + 1)
      setChoiceAnswer(null)
    } else {
      setStep(14)
    }
  }

  const allMatched = Object.keys(matchedPanels).length === sentencePanels.length

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 14</p>

            <div className="redLetters">
              <span className="bigRedLetter">П</span>
              <span className="smallRedLetter">п</span>
            </div>

            <h1 className="lessonTitle">Буква П</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-p.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">П П П П П П</div>
            <div className="letterLine">п п п п п п</div>
            <div className="letterLine">П п П п П п</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-p.mp3')}
          >
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву П</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-p.gif"
              alt="Как писать букву П"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву П пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву П.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">П</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">П</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinSpace" />

              <span className="joinPurple">П</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>

              <span className="joinBreak" />

              <span className="joinPurple">П</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">И</span>

              <span className="joinSpace" />

              <span className="joinPurple">П</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Ы</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/p-joins/p-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ПА, ПО, ПУ, ПИ, ПЫ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(6)}>
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">П</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">П</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">П</span>

              <span className="joinBreak" />

              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">П</span>

              <span className="joinSpace" />

              <span className="joinPurple">Ы</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">П</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/p-joins/p-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: АП, ОП, УП, ИП, ЫП.
            </p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setPictureIndex(0)
              setStep(7)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Скажи, какая буква первая.
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови слово. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentReadWord.audio)}
            >
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/p-words-write/p-word-po-su-da.gif"
              alt="Как писать слово по-су-да"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(10)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Напиши слово по-су-да</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => {
                setSelectedSentenceId(null)
                setMatchedPanels({})
                setMatchFeedback('')
                setStep(11)
              }}
            >
              Дальше
            </button>
          </div>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Посмотри и послушай</h1>
            <p className="lessonText">
              Птичка может быть над коробкой, под коробкой и в коробке.
            </p>
          </section>

          <section className="storyCard">
            <div className="comicListenGrid">
              <div className="comicListenItem">
                <img
                  src="/images/p-grammar/ptichka-nad-korobkoy.png"
                  alt="Птичка над коробкой"
                  className="comicListenImage"
                />
              </div>

              <div className="comicListenItem">
                <img
                  src="/images/p-grammar/ptichka-pod-korobkoy.png"
                  alt="Птичка под коробкой"
                  className="comicListenImage"
                />
              </div>

              <div className="comicListenItem">
                <img
                  src="/images/p-grammar/ptichka-v-korobke.png"
                  alt="Птичка в коробке"
                  className="comicListenImage"
                />
              </div>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/p-grammar/prepositions.mp3')}
            >
              ▶ Послушать объяснение
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(12)}>
            Дальше
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Соедини предложение с картинкой</h1>
            <p className="lessonText">
              Сначала нажми на предложение. Потом нажми на нужную картинку.
            </p>
          </section>

          <section className="matchCard">
            <div className="sentenceBank">
              {sentenceTasks.map((sentence) => {
                const isMatched = Object.values(matchedPanels).includes(sentence.text)
                const isSelected = selectedSentenceId === sentence.id

                return (
                  <button
                    key={sentence.id}
                    className={
                      isMatched
                        ? 'sentenceOption sentenceMatched'
                        : isSelected
                          ? 'sentenceOption sentenceSelected'
                          : 'sentenceOption'
                    }
                    onClick={() => !isMatched && handleSentenceSelect(sentence.id)}
                    disabled={isMatched}
                  >
                    {sentence.text}
                  </button>
                )
              })}
            </div>

            <div className="comicMatchGrid">
              {sentencePanels.map((panel) => (
                <button
                  key={panel.id}
                  className={
                    matchedPanels[panel.id]
                      ? 'comicMatchButton comicMatchDone'
                      : 'comicMatchButton'
                  }
                  onClick={() => handlePanelClick(panel.id)}
                >
                  <img
                    src={panel.image}
                    alt={panel.alt}
                    className="comicMatchImage"
                  />

                  {matchedPanels[panel.id] && (
                    <div className="comicMatchCaption">{matchedPanels[panel.id]}</div>
                  )}
                </button>
              ))}
            </div>

            {matchFeedback && <p className="matchFeedback">{matchFeedback}</p>}
          </section>

          {allMatched && (
            <button
              className="primaryButton"
              onClick={() => {
                setChoiceIndex(0)
                setChoiceAnswer(null)
                setStep(13)
              }}
            >
              Дальше
            </button>
          )}
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Выбери: в, над или под</h1>
            <p className="lessonText">
              Посмотри на картинку, прочитай предложение и выбери правильное слово.
            </p>
          </section>

          <section className="genderChoiceCard">
            <img
              src={currentChoice.image}
              alt={currentChoice.sentence}
              className="genderChoiceImage"
            />

            <p className="genderQuestion">{currentChoice.sentence}</p>

            <div className="genderButtons">
              <button
                className={
                  choiceAnswer === 'в'
                    ? currentChoice.correct === 'в'
                      ? 'genderButton genderButtonCorrect'
                      : 'genderButton genderButtonWrong'
                    : 'genderButton'
                }
                onClick={() => setChoiceAnswer('в')}
              >
                в
              </button>

              <button
                className={
                  choiceAnswer === 'над'
                    ? currentChoice.correct === 'над'
                      ? 'genderButton genderButtonCorrect'
                      : 'genderButton genderButtonWrong'
                    : 'genderButton'
                }
                onClick={() => setChoiceAnswer('над')}
              >
                над
              </button>

              <button
                className={
                  choiceAnswer === 'под'
                    ? currentChoice.correct === 'под'
                      ? 'genderButton genderButtonCorrect'
                      : 'genderButton genderButtonWrong'
                    : 'genderButton'
                }
                onClick={() => setChoiceAnswer('под')}
              >
                под
              </button>
            </div>

            {choiceAnswer === currentChoice.correct && (
              <p className="correctFeedback">{currentChoice.correctText}</p>
            )}

            {choiceAnswer !== null && choiceAnswer !== currentChoice.correct && (
              <p className="wrongFeedback">{currentChoice.wrongText}</p>
            )}
          </section>

          {choiceAnswer === currentChoice.correct && (
            <button className="primaryButton" onClick={nextChoiceTask}>
              {choiceIndex < choiceTasks.length - 1
                ? 'Следующее предложение'
                : 'Завершить урок'}
            </button>
          )}
        </>
      )}

      {step === 14 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву П, прочитал её, написал слово и потренировался
              со словами в, над и под.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterRLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null)
  const [matchedPanels, setMatchedPanels] = useState<Record<string, string>>({})
  const [matchFeedback, setMatchFeedback] = useState('')

  const [storyChoiceIndex, setStoryChoiceIndex] = useState(0)
  const [storyChoiceAnswer, setStoryChoiceAnswer] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'рот',
      image: '/images/r-words/rot.png',
      audio: '/audio/r-words/rot.mp3',
    },
    {
      word: 'рука',
      image: '/images/r-words/ruka.png',
      audio: '/audio/r-words/ruka.mp3',
    },
    {
      word: 'роза',
      image: '/images/r-words/roza.png',
      audio: '/audio/r-words/roza.mp3',
    },
    {
      word: 'робот',
      image: '/images/r-words/robot.png',
      audio: '/audio/r-words/robot.mp3',
    },
    {
      word: 'радио',
      image: '/images/r-words/radio.png',
      audio: '/audio/r-words/radio.mp3',
    },
    {
      word: 'радуга',
      image: '/images/r-words/raduga.png',
      audio: '/audio/r-words/raduga.mp3',
    },
  ]

  const readWords = [
    {
      word: 'у-ра',
      audio: '/audio/r-read-words/u-ra.mp3',
    },
    {
      word: 'ру-ка',
      audio: '/audio/r-read-words/ru-ka.mp3',
    },
    {
      word: 'иг-ра',
      audio: '/audio/r-read-words/ig-ra.mp3',
    },
    {
      word: 'до-ро-га',
      audio: '/audio/r-read-words/do-ro-ga.mp3',
    },
    {
      word: 'рот',
      audio: '/audio/r-read-words/rot.mp3',
    },
    {
      word: 'пи-рог',
      audio: '/audio/r-read-words/pi-rog.mp3',
    },
    {
      word: 'гор-ка',
      audio: '/audio/r-read-words/gor-ka.mp3',
    },
    {
      word: 'о-ко-ло',
      audio: '/audio/r-read-words/o-ko-lo.mp3',
    },
  ]

  const sentenceTasks = [
    {
      id: 'robot',
      text: 'РО-БОТ В ПРУ-ДУ.',
    },
    {
      id: 'ulitka',
      text: 'У-ЛИТ-КА О-КО-ЛО МОС-ТА.',
    },
    {
      id: 'panda',
      text: 'ПАН-ДА ПОД СТО-ЛОМ.',
    },
    {
      id: 'ptichka',
      text: 'ПТИЧ-КА НАД СТО-ЛОМ.',
    },
  ]

  const sentencePanels = [
    {
      id: 'panda',
      image: '/images/r-sentences/panda-pod-stolom.png',
      alt: 'Панда под столом',
    },
    {
      id: 'ptichka',
      image: '/images/r-sentences/ptichka-nad-stolom.png',
      alt: 'Птичка над столом',
    },
    {
      id: 'robot',
      image: '/images/r-sentences/robot-v-prudu.png',
      alt: 'Робот в пруду',
    },
    {
      id: 'ulitka',
      image: '/images/r-sentences/ulitka-okolo-mosta.png',
      alt: 'Улитка около моста',
    },
  ]

  const storyChoices = [
    {
      sentence: 'БО-БИК И БАР-БОС О-КО-ЛО ДО-МА.',
      options: [
        {
          id: 'a',
          image: '/images/r-story/dogs-okolo-doma.png',
          alt: 'Две собаки около дома',
        },
        {
          id: 'b',
          image: '/images/r-story/dogs-pod-domom-dozhd.png',
          alt: 'Две собаки под домом, дождь',
        },
      ],
      correct: 'a',
      correctText: 'Верно!',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      sentence: 'ВДРУГ ГРОМ – БУМ!',
      options: [
        {
          id: 'a',
          image: '/images/r-story/dogs-okolo-doma-grom.png',
          alt: 'Две собаки около дома, гром',
        },
        {
          id: 'b',
          image: '/images/r-story/dogs-okolo-doma-raduga.png',
          alt: 'Две собаки около дома, радуга',
        },
      ],
      correct: 'a',
      correctText: 'Верно!',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      sentence: 'БО-БИК И БАР-БОС ПОД ДО-МОМ.',
      options: [
        {
          id: 'a',
          image: '/images/r-story/dogs-pod-domom-dozhd.png',
          alt: 'Две собаки под домом, дождь',
        },
        {
          id: 'b',
          image: '/images/r-story/dogs-okolo-doma.png',
          alt: 'Две собаки около дома',
        },
      ],
      correct: 'a',
      correctText: 'Верно!',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      sentence: 'А ВОТ И РА-ДУ-ГА НАД ДО-МОМ.',
      options: [
        {
          id: 'a',
          image: '/images/r-story/dogs-okolo-doma-raduga.png',
          alt: 'Две собаки около дома, радуга',
        },
        {
          id: 'b',
          image: '/images/r-story/dogs-okolo-doma-grom.png',
          alt: 'Две собаки около дома, гром',
        },
      ],
      correct: 'a',
      correctText: 'Верно!',
      wrongText: 'Попробуй ещё раз.',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentStoryChoice = storyChoices[storyChoiceIndex]

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const drawLetterCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 80)
    ctx.lineTo(width - 20, 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 80)
    ctx.lineTo(width - 20, height - 80)
    ctx.stroke()

    ctx.save()
    ctx.font = '170px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Р', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const drawWordCanvasBase = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#f2caca'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(20, 110)
    ctx.lineTo(width - 20, 110)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height / 2)
    ctx.lineTo(width - 20, height / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(20, height - 90)
    ctx.lineTo(width - 20, height - 90)
    ctx.stroke()

    ctx.save()
    ctx.font = '96px Arial'
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('гор-ка', width / 2, height / 2 + 10)
    ctx.restore()
  }

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    if (step === 4) {
      drawLetterCanvasBase(ctx, rect.width, rect.height)
    }

    if (step === 10) {
      drawWordCanvasBase(ctx, rect.width, rect.height)
    }
  }

  useEffect(() => {
    if (step === 4 || step === 10) {
      requestAnimationFrame(() => {
        setupCanvas()
      })
    }
  }, [step])

  const getPoint = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)

    isDrawingRef.current = true
    lastPointRef.current = point

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.strokeStyle = '#ff3b3b'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: any) => {
    if (!isDrawingRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    const lastPoint = lastPointRef.current
    if (!lastPoint) return

    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    lastPointRef.current = point
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    setupCanvas()
  }

  const nextPictureTask = () => {
    if (pictureIndex < pictureTasks.length - 1) {
      setPictureIndex((prev) => prev + 1)
    } else {
      setReadWordIndex(0)
      setStep(8)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setStep(9)
    }
  }

  const handleSentenceSelect = (id: string) => {
    setSelectedSentenceId(id)
    setMatchFeedback('')
  }

  const handlePanelClick = (panelId: string) => {
    if (!selectedSentenceId) {
      setMatchFeedback('Сначала выбери предложение.')
      return
    }

    if (matchedPanels[panelId]) {
      return
    }

    if (selectedSentenceId === panelId) {
      const sentence = sentenceTasks.find((item) => item.id === panelId)

      setMatchedPanels((prev) => ({
        ...prev,
        [panelId]: sentence?.text ?? '',
      }))

      setSelectedSentenceId(null)
      setMatchFeedback('Верно!')
    } else {
      setMatchFeedback('Попробуй ещё раз.')
    }
  }

  const allMatched = Object.keys(matchedPanels).length === sentencePanels.length

  const nextStoryChoiceTask = () => {
    if (storyChoiceIndex < storyChoices.length - 1) {
      setStoryChoiceIndex((prev) => prev + 1)
      setStoryChoiceAnswer(null)
    } else {
      setStep(15)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок</p>

            <div className="redLetters">
              <span className="bigRedLetter">Р</span>
              <span className="smallRedLetter">р</span>
            </div>

            <h1 className="lessonTitle">Буква Р</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-r.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Читай буквы</h1>
            <p className="lessonText">
              Прочитай каждую строчку. Показывай на букву пальцем.
            </p>
          </section>

          <section className="readingCard">
            <div className="letterLine">Р Р Р Р Р Р</div>
            <div className="letterLine">р р р р р р</div>
            <div className="letterLine">Р р Р р Р р</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-r.mp3')}
          >
            ▶ Послушать ещё раз
          </button>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Посмотри, как писать букву Р</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-r.gif"
              alt="Как писать букву Р"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Напиши букву Р пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Р.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button className="primaryButton smallPrimary" onClick={() => setStep(5)}>
              Готово
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">Р</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">А</span>

              <span className="joinSpace" />

              <span className="joinPurple">Р</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">О</span>

              <span className="joinSpace" />

              <span className="joinPurple">Р</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">У</span>

              <span className="joinBreak" />

              <span className="joinPurple">Р</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">И</span>

              <span className="joinSpace" />

              <span className="joinPurple">Р</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Ы</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/r-joins/r-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: РА, РО, РУ, РИ, РЫ.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(6)}>
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай вторую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 2</p>

            <div className="joinTextLine multiLineJoinText">
              <span className="joinPurple">А</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Р</span>

              <span className="joinSpace" />

              <span className="joinPurple">О</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Р</span>

              <span className="joinSpace" />

              <span className="joinPurple">У</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Р</span>

              <span className="joinBreak" />

              <span className="joinPurple">И</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Р</span>

              <span className="joinSpace" />

              <span className="joinPurple">Ы</span>
              <span className="joinArrowText">→</span>
              <span className="joinOrange">Р</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/r-joins/r-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: АР, ОР, УР, ИР, ЫР.
            </p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setPictureIndex(0)
              setStep(7)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Назови слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Назови слово. Скажи, какая буква первая.
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              🔊
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови слово. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1 ? 'Следующая картинка' : 'Дальше'}
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentReadWord.audio)}
            >
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом напиши слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/r-words-write/r-word-gor-ka.gif"
              alt="Как писать слово гор-ка"
              className="sampleImage wideSampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(10)}>
            Попробовать написать
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Напиши слово гор-ка</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и напиши слово.
            </p>
          </section>

          <section className="drawingCard">
            <canvas
              ref={canvasRef}
              className="drawingCanvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </section>

          <div className="canvasButtons">
            <button className="secondaryButton" onClick={clearCanvas}>
              Очистить
            </button>

            <button
              className="primaryButton smallPrimary"
              onClick={() => setStep(11)}
            >
              Дальше
            </button>
          </div>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Посмотри и послушай</h1>
            <p className="lessonText">
              Птичка может быть над коробкой, под коробкой, в коробке и около коробки.
            </p>
          </section>

          <section className="storyCard">
            <div
              className="comicListenGrid"
              style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
            >
              <div className="comicListenItem">
                <img
                  src="/images/r-grammar/ptichka-nad-korobkoy.png"
                  alt="Птичка над коробкой"
                  className="comicListenImage"
                />
                <p className="wordReadHint">над коробкой</p>
              </div>

              <div className="comicListenItem">
                <img
                  src="/images/r-grammar/ptichka-pod-korobkoy.png"
                  alt="Птичка под коробкой"
                  className="comicListenImage"
                />
                <p className="wordReadHint">под коробкой</p>
              </div>

              <div className="comicListenItem">
                <img
                  src="/images/r-grammar/ptichka-v-korobke.png"
                  alt="Птичка в коробке"
                  className="comicListenImage"
                />
                <p className="wordReadHint">в коробке</p>
              </div>

              <div className="comicListenItem">
                <img
                  src="/images/r-grammar/ptichka-okolo-korobki.png"
                  alt="Птичка около коробки"
                  className="comicListenImage"
                />
                <p className="wordReadHint">около коробки</p>
              </div>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/r-grammar/prepositions.mp3')}
            >
              ▶ Послушать объяснение
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(12)}>
            Дальше
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Соедини предложение с картинкой</h1>
            <p className="lessonText">
              Сначала нажми на предложение. Потом нажми на нужную картинку.
            </p>
          </section>

          <section className="matchCard">
            <div className="sentenceBank">
              {sentenceTasks.map((sentence) => {
                const isMatched = Object.values(matchedPanels).includes(sentence.text)
                const isSelected = selectedSentenceId === sentence.id

                return (
                  <button
                    key={sentence.id}
                    className={
                      isMatched
                        ? 'sentenceOption sentenceMatched'
                        : isSelected
                          ? 'sentenceOption sentenceSelected'
                          : 'sentenceOption'
                    }
                    onClick={() => !isMatched && handleSentenceSelect(sentence.id)}
                    disabled={isMatched}
                  >
                    {sentence.text}
                  </button>
                )
              })}
            </div>

            <div
              className="comicMatchGrid"
              style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
            >
              {sentencePanels.map((panel) => (
                <button
                  key={panel.id}
                  className={
                    matchedPanels[panel.id]
                      ? 'comicMatchButton comicMatchDone'
                      : 'comicMatchButton'
                  }
                  onClick={() => handlePanelClick(panel.id)}
                >
                  <img
                    src={panel.image}
                    alt={panel.alt}
                    className="comicMatchImage"
                  />

                  {matchedPanels[panel.id] && (
                    <div className="comicMatchCaption">{matchedPanels[panel.id]}</div>
                  )}
                </button>
              ))}
            </div>

            {matchFeedback && <p className="matchFeedback">{matchFeedback}</p>}
          </section>

          {allMatched && (
            <button className="primaryButton" onClick={() => setStep(13)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Послушай рассказ</h1>
            <p className="lessonText">
              Посмотри на картинки. Сначала послушай аудио.
            </p>
          </section>

          <section className="storyCard">
            <div
              className="comicListenGrid"
              style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
            >
              <div className="comicListenItem">
                <img
                  src="/images/r-story/dogs-okolo-doma.png"
                  alt="Две собаки около дома"
                  className="comicListenImage"
                />
              </div>

              <div className="comicListenItem">
                <img
                  src="/images/r-story/dogs-okolo-doma-grom.png"
                  alt="Две собаки около дома, гром"
                  className="comicListenImage"
                />
              </div>

              <div className="comicListenItem">
                <img
                  src="/images/r-story/dogs-pod-domom-dozhd.png"
                  alt="Две собаки под домом, дождь"
                  className="comicListenImage"
                />
              </div>

              <div className="comicListenItem">
                <img
                  src="/images/r-story/dogs-okolo-doma-raduga.png"
                  alt="Две собаки около дома, радуга"
                  className="comicListenImage"
                />
              </div>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/r-story/story.mp3')}
            >
              ▶ Послушать рассказ
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setStoryChoiceIndex(0)
              setStoryChoiceAnswer(null)
              setStep(14)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 14 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 11</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай предложение и выбери правильную картинку.
            </p>
          </section>

          <section className="matchCard">
            <div className="readSingleWordCard">
              <div className="readSingleWord">{currentStoryChoice.sentence}</div>
            </div>

            <div
              className="comicMatchGrid"
              style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
            >
              {currentStoryChoice.options.map((option) => (
                <button
                  key={option.id}
                  className={
                    storyChoiceAnswer === option.id && storyChoiceAnswer === currentStoryChoice.correct
                      ? 'comicMatchButton comicMatchDone'
                      : 'comicMatchButton'
                  }
                  onClick={() => setStoryChoiceAnswer(option.id)}
                >
                  <img
                    src={option.image}
                    alt={option.alt}
                    className="comicMatchImage"
                  />
                </button>
              ))}
            </div>

            {storyChoiceAnswer === currentStoryChoice.correct && (
              <p className="correctFeedback">{currentStoryChoice.correctText}</p>
            )}

            {storyChoiceAnswer !== null && storyChoiceAnswer !== currentStoryChoice.correct && (
              <p className="wrongFeedback">{currentStoryChoice.wrongText}</p>
            )}
          </section>

          {storyChoiceAnswer === currentStoryChoice.correct && (
            <button className="primaryButton" onClick={nextStoryChoiceTask}>
              {storyChoiceIndex < storyChoices.length - 1
                ? 'Следующее предложение'
                : 'Завершить урок'}
            </button>
          )}
        </>
      )}

      {step === 15 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Р, прочитал её, написал слово и потренировался
              со словами над, под, в и около.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function LetterSoftSignLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [pairIndex, setPairIndex] = useState(0)
  const [pairAnswer, setPairAnswer] = useState<string | null>(null)

  const [listenIndex, setListenIndex] = useState(0)
  const [listenAnswer, setListenAnswer] = useState<boolean | null>(null)

  const [bonkaListenIndex, setBonkaListenIndex] = useState(0)
  const [bonkaChoiceIndex, setBonkaChoiceIndex] = useState(0)
  const [bonkaChoiceAnswer, setBonkaChoiceAnswer] = useState<string | null>(null)

  const readWords = [
    {
      word: 'угол',
      audio: '/audio/soft-sign-read-words/ugol.mp3',
    },
    {
      word: 'уголь',
      audio: '/audio/soft-sign-read-words/ugol-soft.mp3',
    },
    {
      word: 'дал',
      audio: '/audio/soft-sign-read-words/dal.mp3',
    },
    {
      word: 'даль',
      audio: '/audio/soft-sign-read-words/dal-soft.mp3',
    },
    {
      word: 'удар',
      audio: '/audio/soft-sign-read-words/udar.mp3',
    },
    {
      word: 'ударь',
      audio: '/audio/soft-sign-read-words/udar-soft.mp3',
    },
    {
      word: 'был',
      audio: '/audio/soft-sign-read-words/byl.mp3',
    },
    {
      word: 'боль',
      audio: '/audio/soft-sign-read-words/bol-soft.mp3',
    },
    {
      word: 'гусь',
      audio: '/audio/soft-sign-read-words/gus-soft.mp3',
    },
    {
      word: 'конь',
      audio: '/audio/soft-sign-read-words/kon-soft.mp3',
    },
  ]

  const pairChoiceTasks = [
    {
      word: 'УГОЛ',
      correctId: 'ugol',
      options: [
        {
          id: 'ugol',
          image: '/images/soft-sign-pairs/ugol.png',
        },
        {
          id: 'ugol-soft',
          image: '/images/soft-sign-pairs/ugol-soft.png',
        },
      ],
    },
    {
      word: 'УГОЛЬ',
      correctId: 'ugol-soft',
      options: [
        {
          id: 'ugol',
          image: '/images/soft-sign-pairs/ugol.png',
        },
        {
          id: 'ugol-soft',
          image: '/images/soft-sign-pairs/ugol-soft.png',
        },
      ],
    },
    {
      word: 'ПАЛ-КА',
      correctId: 'palka',
      options: [
        {
          id: 'palka',
          image: '/images/soft-sign-pairs/palka.png',
        },
        {
          id: 'palma-soft',
          image: '/images/soft-sign-pairs/palma-soft.png',
        },
      ],
    },
    {
      word: 'ПАЛЬ-МА',
      correctId: 'palma-soft',
      options: [
        {
          id: 'palka',
          image: '/images/soft-sign-pairs/palka.png',
        },
        {
          id: 'palma-soft',
          image: '/images/soft-sign-pairs/palma-soft.png',
        },
      ],
    },
    {
      word: 'БАЛ',
      correctId: 'bal',
      options: [
        {
          id: 'bal',
          image: '/images/soft-sign-pairs/bal.png',
        },
        {
          id: 'bol-soft',
          image: '/images/soft-sign-pairs/bol-soft.png',
        },
      ],
    },
    {
      word: 'БОЛЬ',
      correctId: 'bol-soft',
      options: [
        {
          id: 'bal',
          image: '/images/soft-sign-pairs/bal.png',
        },
        {
          id: 'bol-soft',
          image: '/images/soft-sign-pairs/bol-soft.png',
        },
      ],
    },
  ]

  const listenTasks = [
    {
      word: 'соль',
      audio: '/audio/soft-sign-listen/sol.mp3',
      hasSoftSign: true,
    },
    {
      word: 'палка',
      audio: '/audio/soft-sign-listen/palka.mp3',
      hasSoftSign: false,
    },
    {
      word: 'пальма',
      audio: '/audio/soft-sign-listen/palma.mp3',
      hasSoftSign: true,
    },
    {
      word: 'банан',
      audio: '/audio/soft-sign-listen/banan.mp3',
      hasSoftSign: false,
    },
    {
      word: 'банька',
      audio: '/audio/soft-sign-listen/banka.mp3',
      hasSoftSign: true,
    },
    {
      word: 'коньки',
      audio: '/audio/soft-sign-listen/konki.mp3',
      hasSoftSign: true,
    },
    {
      word: 'кони',
      audio: '/audio/soft-sign-listen/koni.mp3',
      hasSoftSign: false,
    },
    {
      word: 'дом',
      audio: '/audio/soft-sign-listen/dom.mp3',
      hasSoftSign: false,
    },
    {
      word: 'долька',
      audio: '/audio/soft-sign-listen/dolka.mp3',
      hasSoftSign: true,
    },
  ]

  const bonkaListenTasks = [
    {
      image: '/images/bonka/bonka.png',
      audio: '/audio/bonka/bonka.mp3',
      alt: 'Собака Бонька',
    },
    {
      image: '/images/bonka/bonka-family.png',
      audio: '/audio/bonka/bonka-family.mp3',
      alt: 'Бонька, мама и папа',
    },
    {
      image: '/images/bonka/bonka-brother.png',
      audio: '/audio/bonka/bonka-brother.mp3',
      alt: 'Брат Боньки',
    },
    {
      image: '/images/bonka/bonka-bow.png',
      audio: '/audio/bonka/bonka-bow.mp3',
      alt: 'Бонька с бантиком',
    },
    {
      image: '/images/bonka/bonka-bowl.png',
      audio: '/audio/bonka/bonka-bowl.mp3',
      alt: 'Бонька около миски',
    },
  ]

  const bonkaChoiceTasks = [
    {
      sentence: 'ЭТО СО-БА-КА БОНЬ-КА.',
      correctId: 'bonka',
      options: [
        {
          id: 'bonka',
          image: '/images/bonka/bonka.png',
        },
        {
          id: 'family',
          image: '/images/bonka/bonka-family.png',
        },
      ],
    },
    {
      sentence: 'ВОТ МА-МА И ПА-ПА БОНЬ-КИ.',
      correctId: 'family',
      options: [
        {
          id: 'brother',
          image: '/images/bonka/bonka-brother.png',
        },
        {
          id: 'family',
          image: '/images/bonka/bonka-family.png',
        },
      ],
    },
    {
      sentence: 'А ВОТ БРАТ БОНЬ-КИ.',
      correctId: 'brother',
      options: [
        {
          id: 'brother',
          image: '/images/bonka/bonka-brother.png',
        },
        {
          id: 'bowl',
          image: '/images/bonka/bonka-bowl.png',
        },
      ],
    },
    {
      sentence: 'У БОНЬ-КИ БАН-ТИК.',
      correctId: 'bow',
      options: [
        {
          id: 'bonka',
          image: '/images/bonka/bonka.png',
        },
        {
          id: 'bow',
          image: '/images/bonka/bonka-bow.png',
        },
      ],
    },
    {
      sentence: 'У БОНЬ-КИ МИС-КА.',
      correctId: 'bowl',
      options: [
        {
          id: 'bowl',
          image: '/images/bonka/bonka-bowl.png',
        },
        {
          id: 'family',
          image: '/images/bonka/bonka-family.png',
        },
      ],
    },
  ]

  const currentReadWord = readWords[readWordIndex]
  const currentPair = pairChoiceTasks[pairIndex]
  const currentListen = listenTasks[listenIndex]
  const currentBonkaListen = bonkaListenTasks[bonkaListenIndex]
  const currentBonkaChoice = bonkaChoiceTasks[bonkaChoiceIndex]

  const playAudio = (audioPath: string) => {
    const audio = new Audio(audioPath)
    audio.play()
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setPairIndex(0)
      setPairAnswer(null)
      setStep(7)
    }
  }

  const nextPairTask = () => {
    if (pairIndex < pairChoiceTasks.length - 1) {
      setPairIndex((prev) => prev + 1)
      setPairAnswer(null)
    } else {
      setListenIndex(0)
      setListenAnswer(null)
      setStep(8)
    }
  }

  const nextListenTask = () => {
    if (listenIndex < listenTasks.length - 1) {
      setListenIndex((prev) => prev + 1)
      setListenAnswer(null)
    } else {
      setStep(9)
    }
  }

  const nextBonkaListenTask = () => {
    if (bonkaListenIndex < bonkaListenTasks.length - 1) {
      setBonkaListenIndex((prev) => prev + 1)
    } else {
      setBonkaChoiceIndex(0)
      setBonkaChoiceAnswer(null)
      setStep(11)
    }
  }

  const nextBonkaChoiceTask = () => {
    if (bonkaChoiceIndex < bonkaChoiceTasks.length - 1) {
      setBonkaChoiceIndex((prev) => prev + 1)
      setBonkaChoiceAnswer(null)
    } else {
      setStep(12)
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок</p>

            <div className="redLetters">
              <span className="bigRedLetter">ь</span>
            </div>

            <h1 className="lessonTitle">Мягкий знак</h1>

            <p className="lessonText">
              Мягкий знак сам по себе никак не произносится.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-soft-sign.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(2)}>
            Дальше
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 1</p>
            <h1 className="taskTitle">Посмотри, как писать мягкий знак</h1>
            <p className="lessonText">
              Мягкий знак не бывает заглавным. Посмотри на образец.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-soft-sign.gif"
              alt="Как писать мягкий знак"
              className="sampleImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(3)}>
            Дальше
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 2</p>
            <h1 className="taskTitle">Послушай подсказку</h1>
            <p className="lessonText">
              Мягкий знак делает предыдущую букву мягкой.
            </p>
          </section>

          <section className="softExplainCard">
            <div className="softSignBig">ь</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/soft-sign/softens-previous.mp3')}
            >
              ▶ Послушать подсказку
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(4)}>
            Дальше
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Сравни: без мягкого знака и с ним</h1>
            <p className="lessonText">
              Прочитай два столбика. Слушай, как меняется звук.
            </p>
          </section>

          <section className="softCompareCard">
            <div className="softCompareGrid">
              <div className="softCompareColumn">
                <div className="softCompareItem">М</div>
                <div className="softCompareItem">Т</div>
                <div className="softCompareItem">К</div>
                <div className="softCompareItem">С</div>
                <div className="softCompareItem">Г</div>
              </div>

              <div className="softCompareColumn">
                <div className="softCompareItem softCompareSoft">М-Ь</div>
                <div className="softCompareItem softCompareSoft">Т-Ь</div>
                <div className="softCompareItem softCompareSoft">К-Ь</div>
                <div className="softCompareItem softCompareSoft">С-Ь</div>
                <div className="softCompareItem softCompareSoft">Г-Ь</div>
              </div>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/soft-sign-joins/soft-row-1.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(5)}>
            Дальше
          </button>
        </>
      )}

      {step === 5 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 3</p>
            <h1 className="taskTitle">Сравни ещё раз</h1>
            <p className="lessonText">
              Прочитай два столбика. Сравни звук без мягкого знака и с ним.
            </p>
          </section>

          <section className="softCompareCard">
            <div className="softCompareGrid">
              <div className="softCompareColumn">
                <div className="softCompareItem">Г</div>
                <div className="softCompareItem">Д</div>
                <div className="softCompareItem">Л</div>
                <div className="softCompareItem">П</div>
                <div className="softCompareItem">Р</div>
              </div>

              <div className="softCompareColumn">
                <div className="softCompareItem softCompareSoft">Г-Ь</div>
                <div className="softCompareItem softCompareSoft">Д-Ь</div>
                <div className="softCompareItem softCompareSoft">Л-Ь</div>
                <div className="softCompareItem softCompareSoft">П-Ь</div>
                <div className="softCompareItem softCompareSoft">Р-Ь</div>
              </div>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/soft-sign-joins/soft-row-2.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setReadWordIndex(0)
              setStep(6)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Прочитай слово</h1>
            <p className="lessonText">
              Сначала послушай слово. Потом прочитай сам.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="readSingleWord">{currentReadWord.word}</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentReadWord.audio)}
            >
              ▶ Послушать слово
            </button>

            <p className="wordReadHint">Теперь прочитай это слово сам.</p>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1 ? 'Следующее слово' : 'Дальше'}
          </button>
        </>
      )}

      {step === 7 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 5</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай слово и выбери правильную картинку.
            </p>
          </section>

          <section className="readingChoiceCard">
            <div className="readingChoiceSentence">{currentPair.word}</div>

            <div className="readingChoiceButtons">
              {currentPair.options.map((option) => (
                <button
                  key={option.id}
                  className={
                    pairAnswer === option.id
                      ? option.id === currentPair.correctId
                        ? 'readingChoiceButton readingChoiceCorrect'
                        : 'readingChoiceButton readingChoiceWrong'
                      : 'readingChoiceButton'
                  }
                  onClick={() => setPairAnswer(option.id)}
                >
                  <img src={option.image} alt="" />
                </button>
              ))}
            </div>

            {pairAnswer === currentPair.correctId && (
              <p className="correctFeedback">Верно!</p>
            )}

            {pairAnswer !== null && pairAnswer !== currentPair.correctId && (
              <p className="wrongFeedback">Попробуй ещё раз.</p>
            )}
          </section>

          {pairAnswer === currentPair.correctId && (
            <button className="primaryButton" onClick={nextPairTask}>
              {pairIndex < pairChoiceTasks.length - 1
                ? 'Следующее слово'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Есть мягкий знак или нет?</h1>
            <p className="lessonText">
              Послушай слово. Потом выбери: есть в слове мягкий знак или нет.
            </p>
          </section>

          <section className="softListenChoiceCard">
            <button
              className="audioButton"
              onClick={() => playAudio(currentListen.audio)}
            >
              ▶ Послушать слово
            </button>

            <div className="softSignOptionButtons">
              <button
                className={
                  listenAnswer === true
                    ? currentListen.hasSoftSign
                      ? 'softSignOption softSignCorrect'
                      : 'softSignOption softSignWrong'
                    : 'softSignOption'
                }
                onClick={() => setListenAnswer(true)}
              >
                ь
              </button>

              <button
                className={
                  listenAnswer === false
                    ? !currentListen.hasSoftSign
                      ? 'softSignOption softSignCorrect'
                      : 'softSignOption softSignWrong'
                    : 'softSignOption'
                }
                onClick={() => setListenAnswer(false)}
              >
                <span className="softCrossedMark">ь</span>
              </button>
            </div>

            {listenAnswer === currentListen.hasSoftSign && (
              <p className="correctFeedback">Верно!</p>
            )}

            {listenAnswer !== null && listenAnswer !== currentListen.hasSoftSign && (
              <p className="wrongFeedback">Попробуй ещё раз.</p>
            )}
          </section>

          {listenAnswer === currentListen.hasSoftSign && (
            <button className="primaryButton" onClick={nextListenTask}>
              {listenIndex < listenTasks.length - 1
                ? 'Следующее слово'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Новый герой</p>
            <h1 className="taskTitle">Знакомься: Бонька</h1>
            <p className="lessonText">
              Это собака Бонька. Она будет появляться в новых заданиях.
            </p>
          </section>

          <section className="storyCard">
            <img
              src="/images/bonka/bonka-intro.png"
              alt="Собака Бонька"
              className="storyImage"
            />

            <div className="bonkaName">БОНЬ-КА</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/bonka/bonka-intro.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setBonkaListenIndex(0)
              setStep(10)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри и послушай</h1>
            <p className="lessonText">
              Посмотри на картинку. Потом послушай аудио.
            </p>
          </section>

          <section className="storyCard">
            <img
              src={currentBonkaListen.image}
              alt={currentBonkaListen.alt}
              className="storyImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentBonkaListen.audio)}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={nextBonkaListenTask}>
            {bonkaListenIndex < bonkaListenTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай предложение. Потом выбери правильную картинку.
            </p>
          </section>

          <section className="readingChoiceCard">
            <div className="readingChoiceSentence">
              {currentBonkaChoice.sentence}
            </div>

            <div className="readingChoiceButtons">
              {currentBonkaChoice.options.map((option) => (
                <button
                  key={option.id}
                  className={
                    bonkaChoiceAnswer === option.id
                      ? option.id === currentBonkaChoice.correctId
                        ? 'readingChoiceButton readingChoiceCorrect'
                        : 'readingChoiceButton readingChoiceWrong'
                      : 'readingChoiceButton'
                  }
                  onClick={() => setBonkaChoiceAnswer(option.id)}
                >
                  <img src={option.image} alt="" />
                </button>
              ))}
            </div>

            {bonkaChoiceAnswer === currentBonkaChoice.correctId && (
              <p className="correctFeedback">Верно!</p>
            )}

            {bonkaChoiceAnswer !== null &&
              bonkaChoiceAnswer !== currentBonkaChoice.correctId && (
                <p className="wrongFeedback">Попробуй ещё раз.</p>
              )}
          </section>

          {bonkaChoiceAnswer === currentBonkaChoice.correctId && (
            <button className="primaryButton" onClick={nextBonkaChoiceTask}>
              {bonkaChoiceIndex < bonkaChoiceTasks.length - 1
                ? 'Следующее предложение'
                : 'Завершить урок'}
            </button>
          )}
        </>
      )}

      {step === 12 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты узнал мягкий знак, прочитал слова с ним и познакомился с Бонькой.
            </p>
          </section>

          <button className="primaryButton" onClick={onBack}>
            Вернуться к урокам
          </button>
        </>
      )}
    </main>
  )
}

function DefaultLesson({
  lesson,
  onBack,
}: {
  lesson: Lesson
  onBack: () => void
}) {
  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      <section className="lessonHero">
        <div>
          <p className="eyebrow">{lesson.title}</p>
          <h1>{lesson.letter}</h1>
          <p>{lesson.subtitle}</p>
        </div>

        <div className="bigLetter">{lesson.letter}</div>
      </section>

      <section className="block">
        <h2>Читай</h2>

        <div className="wordGrid">
          {lesson.words.map((word) => (
            <div className="wordCard" key={word}>
              {word}
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Делай задания по порядку</h2>

        <div className="taskList">
          {lesson.tasks.map((task, index) => (
            <div className="taskCard" key={task}>
              <div className="taskNumber">{index + 1}</div>
              <div>
                <h3>{task}</h3>
                <p>Прочитай задание и выполни его вместе с учителем.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="primaryButton">Начать урок</button>
    </main>
  )
}

function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  if (selectedLesson?.id === 1) {
    return <LetterALesson onBack={() => setSelectedLesson(null)} />
  }

  if (selectedLesson?.id === 2) {
    return <LetterOLesson onBack={() => setSelectedLesson(null)} />
  }

   if (selectedLesson?.id === 3) {
    return <LetterULesson onBack={() => setSelectedLesson(null)} />
  }

  if (selectedLesson?.id === 4) {
  return <LetterMLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 5) {
  return <LetterTLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 6) {
  return <LetterELesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 7) {
  return <LetterKLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 8) {
  return <LetterSLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 9) {
  return <LetterILesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 10) {
  return <LetterGLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 11) {
  return <LetterDLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 12) {
  return <LetterYeriLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 13) {
  return <LetterLLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 14) {
  return <LetterPLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 15) {
  return <LetterRLesson onBack={() => setSelectedLesson(null)} />
}


if (selectedLesson?.id === 16) {
  return <LetterBLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 17) {
  return <LetterNLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 18) {
  return <LetterSoftSignLesson onBack={() => setSelectedLesson(null)} />
}

  if (selectedLesson) {
    return (
      <DefaultLesson
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
      />
    )
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">Русский алфавит</p>
          <h1>Перейти к уроку</h1>
          <p className="heroText">
            Выбери букву, открой урок и выполняй задания по порядку.
          </p>
        </div>

        <div className="heroBadge">АБВ</div>
      </section>

      <section className="lessons">
        {lessons.map((lesson) => (
          <button
            className="lessonCard"
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
          >
            <div className="lessonTop">
              <span>{lesson.title}</span>
              <span>{lesson.progress}%</span>
            </div>

            <div className="letter">{lesson.letter}</div>
            <div className="subtitle">{lesson.subtitle}</div>

            <div className="progress">
              <div style={{ width: `${lesson.progress}%` }} />
            </div>
          </button>
        ))}
      </section>
    </main>
  )
}
export default App