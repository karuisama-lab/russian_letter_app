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

  { id: 13, letter: 'Нн', title: 'Урок 13', subtitle: 'Буква Н', words: [], tasks: [], progress: 0 },
  { id: 14, letter: 'Пп', title: 'Урок 14', subtitle: 'Буква П', words: [], tasks: [], progress: 0 },
  { id: 15, letter: 'Рр', title: 'Урок 15', subtitle: 'Буква Р', words: [], tasks: [], progress: 0 },
  { id: 16, letter: 'Бб', title: 'Урок 16', subtitle: 'Буква Б', words: [], tasks: [], progress: 0 },
  { id: 17, letter: 'Лл', title: 'Урок 17', subtitle: 'Буква Л', words: [], tasks: [], progress: 0 },

  { id: 18, letter: 'ь', title: 'Урок 18', subtitle: 'Буква ь', words: [], tasks: [], progress: 0 },
  { id: 19, letter: 'Вв', title: 'Урок 19', subtitle: 'Буква В', words: [], tasks: [], progress: 0 },
  { id: 20, letter: 'Йй', title: 'Урок 20', subtitle: 'Буква Й', words: [], tasks: [], progress: 0 },
  { id: 21, letter: 'Зз', title: 'Урок 21', subtitle: 'Буква З', words: [], tasks: [], progress: 0 },
  { id: 22, letter: 'Яя', title: 'Урок 22', subtitle: 'Буква Я', words: [], tasks: [], progress: 0 },

  { id: 23, letter: 'Цц', title: 'Урок 23', subtitle: 'Буква Ц', words: [], tasks: [], progress: 0 },
  { id: 24, letter: 'Ее', title: 'Урок 24', subtitle: 'Буква Е', words: [], tasks: [], progress: 0 },
  { id: 25, letter: 'Хх', title: 'Урок 25', subtitle: 'Буква Х', words: [], tasks: [], progress: 0 },
  { id: 26, letter: 'Ёё', title: 'Урок 26', subtitle: 'Буква Ё', words: [], tasks: [], progress: 0 },
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
        <div className="readSingleWord rStoryChoiceSentence">
          {currentStoryChoice.sentence}
        </div>
      </div>

      <div
        className="comicMatchGrid"
        style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
      >
        {currentStoryChoice.options.map((option) => (
          <button
            key={option.id}
            className={
              storyChoiceAnswer === option.id &&
              storyChoiceAnswer === currentStoryChoice.correct
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

      {storyChoiceAnswer !== null &&
        storyChoiceAnswer !== currentStoryChoice.correct && (
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
                <div className="softCompareItem">Д</div>
                <div className="softCompareItem">Л</div>
                <div className="softCompareItem">П</div>
                <div className="softCompareItem">Р</div>
              </div>

              <div className="softCompareColumn">
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

function LetterBLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [storyChoiceIndex, setStoryChoiceIndex] = useState(0)
  const [storyChoiceAnswer, setStoryChoiceAnswer] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'бабочка',
      image: '/images/b-words/babochka.png',
      audio: '/audio/b-words/babochka.mp3',
    },
    {
      word: 'белка',
      image: '/images/b-words/belka.png',
      audio: '/audio/b-words/belka.mp3',
    },
    {
      word: 'бегемот',
      image: '/images/b-words/begemot.png',
      audio: '/audio/b-words/begemot.mp3',
    },
    {
      word: 'бабушка',
      image: '/images/b-words/babushka.png',
      audio: '/audio/b-words/babushka.mp3',
    },
    {
      word: 'барабан',
      image: '/images/b-words/baraban.png',
      audio: '/audio/b-words/baraban.mp3',
    },
    {
      word: 'бобр',
      image: '/images/b-words/bobr.png',
      audio: '/audio/b-words/bobr.mp3',
    },
  ]

  const readWords = [
    {
      word: 'БЫК',
      audio: '/audio/b-read-words/byk.mp3',
    },
    {
      word: 'БОБР',
      audio: '/audio/b-read-words/bobr.mp3',
    },
    {
      word: 'БУЛ-КА',
      audio: '/audio/b-read-words/bul-ka.mp3',
    },
    {
      word: 'БОМ-БА',
      audio: '/audio/b-read-words/bom-ba.mp3',
    },
    {
      word: 'БУ-МА-ГА',
      audio: '/audio/b-read-words/bu-ma-ga.mp3',
    },
    {
      word: 'БРОК-КО-ЛИ',
      audio: '/audio/b-read-words/brok-ko-li.mp3',
    },
  ]

  const storyPanels = [
    {
      id: 'bobr-boris',
      image: '/images/b-story/bobr-boris.png',
      alt: 'Бобр Борис',
    },
    {
      id: 'boris-iris',
      image: '/images/b-story/boris-iris.png',
      alt: 'У Бориса ирис',
    },
    {
      id: 'bobry-gory',
      image: '/images/b-story/bobry-gory.png',
      alt: 'Бобры идут в горы',
    },
    {
      id: 'bobry-pomidory',
      image: '/images/b-story/bobry-pomidory.png',
      alt: 'У бобров помидоры',
    },
  ]

  const storyChoices = [
    {
      sentence: 'ЭТО БОБР БО-РИС.',
      options: [
        {
          id: 'bobr-boris',
          image: '/images/b-story/bobr-boris.png',
          alt: 'Бобр Борис',
        },
        {
          id: 'boris-iris',
          image: '/images/b-story/boris-iris.png',
          alt: 'У Бориса ирис',
        },
      ],
      correct: 'bobr-boris',
      correctText: 'Верно!',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      sentence: 'У БО-РИ-СА ИРИС.',
      options: [
        {
          id: 'boris-iris',
          image: '/images/b-story/boris-iris.png',
          alt: 'У Бориса ирис',
        },
        {
          id: 'bobry-pomidory',
          image: '/images/b-story/bobry-pomidory.png',
          alt: 'У бобров помидоры',
        },
      ],
      correct: 'boris-iris',
      correctText: 'Верно!',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      sentence: 'БОБ-РЫ И-ДУТ В ГО-РЫ.',
      options: [
        {
          id: 'bobry-gory',
          image: '/images/b-story/bobry-gory.png',
          alt: 'Бобры идут в горы',
        },
        {
          id: 'bobry-pomidory',
          image: '/images/b-story/bobry-pomidory.png',
          alt: 'У бобров помидоры',
        },
      ],
      correct: 'bobry-gory',
      correctText: 'Верно!',
      wrongText: 'Попробуй ещё раз.',
    },
    {
      sentence: 'У БОБ-РОВ ПО-МИ-ДО-РЫ.',
      options: [
        {
          id: 'bobry-pomidory',
          image: '/images/b-story/bobry-pomidory.png',
          alt: 'У бобров помидоры',
        },
        {
          id: 'bobry-gory',
          image: '/images/b-story/bobry-gory.png',
          alt: 'Бобры идут в горы',
        },
      ],
      correct: 'bobry-pomidory',
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
    ctx.fillText('Б', width / 2, height / 2 + 10)
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
    ctx.fillText('бобр', width / 2, height / 2 + 10)
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

  const nextStoryChoiceTask = () => {
    if (storyChoiceIndex < storyChoices.length - 1) {
      setStoryChoiceIndex((prev) => prev + 1)
      setStoryChoiceAnswer(null)
    } else {
      setStep(13)
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
            <p className="eyebrow dark">Урок 16</p>

            <div className="redLetters">
              <span className="bigRedLetter">Б</span>
              <span className="smallRedLetter">б</span>
            </div>

            <h1 className="lessonTitle">Буква Б</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-b.mp3')}
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
            <div className="letterLine">Б Б Б Б Б Б</div>
            <div className="letterLine">б б б б б б</div>
            <div className="letterLine">Б б Б б Б б</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-b.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву Б</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-b.gif"
              alt="Как писать букву Б"
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
            <h1 className="taskTitle">Напиши букву Б пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Б.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай, как читает учитель. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">Б-А</span>
              <span className="joinSpace" />
              <span className="joinPurple">Б-О</span>
              <span className="joinSpace" />
              <span className="joinPurple">Б-У</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">Б-И</span>
              <span className="joinSpace" />
              <span className="joinOrange">Б-Ы</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/b-joins/b-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам. Соединяй звуки плавно.
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
              <span className="joinPurple">А-Б</span>
              <span className="joinSpace" />
              <span className="joinPurple">О-Б</span>
              <span className="joinSpace" />
              <span className="joinPurple">У-Б</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">И-Б</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ы-Б</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/b-joins/b-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
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
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              ▶
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
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
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentReadWord.audio)}
          >
            ▶ Послушать слово
          </button>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/b-words-write/bobr.gif"
              alt="Как писать слово бобр"
              className="sampleImage"
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
            <h1 className="taskTitle">Напиши слово БОБР</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и попробуй написать слово.
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
                setStoryChoiceIndex(0)
                setStoryChoiceAnswer(null)
                setStep(11)
              }}
            >
              Готово
            </button>
          </div>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Послушай рассказ</h1>
            <p className="lessonText">
              Посмотри на картинки. Сначала послушай аудио.
            </p>
          </section>

          <section className="readingCard">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '16px',
              }}
            >
              {storyPanels.map((panel) => (
                <img
                  key={panel.id}
                  src={panel.image}
                  alt={panel.alt}
                  className="pictureTaskImage"
                />
              ))}
            </div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/b-story/story.mp3')}
          >
            ▶ Послушать рассказ
          </button>

          <button
            className="primaryButton"
            onClick={() => {
              setStoryChoiceIndex(0)
              setStoryChoiceAnswer(null)
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
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай предложение и выбери правильную картинку.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">
              {currentStoryChoice.sentence}
            </div>
          </section>

          <section className="readingCard">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '16px',
              }}
            >
              {currentStoryChoice.options.map((option) => {
                const isSelected = storyChoiceAnswer === option.id
                const isCorrect = option.id === currentStoryChoice.correct
                const shouldShowCorrect =
                  storyChoiceAnswer !== null && isCorrect
                const shouldShowWrong = isSelected && !isCorrect

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setStoryChoiceAnswer(option.id)}
                    style={{
                      border: shouldShowCorrect
                        ? '4px solid #49b96f'
                        : shouldShowWrong
                          ? '4px solid #f05a5a'
                          : '4px solid transparent',
                      borderRadius: '24px',
                      padding: '10px',
                      background: '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="pictureTaskImage"
                    />
                  </button>
                )
              })}
            </div>
          </section>

          {storyChoiceAnswer === currentStoryChoice.correct && (
            <p className="lessonText">{currentStoryChoice.correctText}</p>
          )}

          {storyChoiceAnswer !== null &&
            storyChoiceAnswer !== currentStoryChoice.correct && (
              <p className="lessonText">{currentStoryChoice.wrongText}</p>
            )}

          {storyChoiceAnswer === currentStoryChoice.correct && (
            <button className="primaryButton" onClick={nextStoryChoiceTask}>
              {storyChoiceIndex < storyChoices.length - 1
                ? 'Следующее предложение'
                : 'Завершить урок'}
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
              Ты послушал букву Б, прочитал её, написал слово и выбрал
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

function LetterNLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)
  const [writeWordIndex, setWriteWordIndex] = useState(0)

  const [genderIndex, setGenderIndex] = useState(0)
  const [genderAnswer, setGenderAnswer] = useState<string | null>(null)

  const [positionIndex, setPositionIndex] = useState(0)
  const [positionAnswer, setPositionAnswer] = useState<string | null>(null)

  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [sentenceAnswer, setSentenceAnswer] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'ножницы',
      image: '/images/n-words/nozhnitsy.png',
      audio: '/audio/n-words/nozhnitsy.mp3',
    },
    {
      word: 'наушники',
      image: '/images/n-words/naushniki.png',
      audio: '/audio/n-words/naushniki.mp3',
    },
    {
      word: 'нож',
      image: '/images/n-words/nozh.png',
      audio: '/audio/n-words/nozh.mp3',
    },
    {
      word: 'небо',
      image: '/images/n-words/nebo.png',
      audio: '/audio/n-words/nebo.mp3',
    },
  ]

  const readWords = [
    {
      word: 'НОС',
      audio: '/audio/n-read-words/nos.mp3',
    },
    {
      word: 'НО-ГА',
      audio: '/audio/n-read-words/no-ga.mp3',
    },
    {
      word: 'НО-СОК',
      audio: '/audio/n-read-words/no-sok.mp3',
    },
    {
      word: 'НИТ-КИ',
      audio: '/audio/n-read-words/nit-ki.mp3',
    },
    {
      word: 'НО-ТА',
      audio: '/audio/n-read-words/no-ta.mp3',
    },
  ]

  const writeWords = [
    {
      word: 'ОН',
      trace: 'он',
      gif: '/gifs/n-write-words/on.gif',
    },
    {
      word: 'ОНА',
      trace: 'она',
      gif: '/gifs/n-write-words/ona.gif',
    },
    {
      word: 'ОНО',
      trace: 'оно',
      gif: '/gifs/n-write-words/ono.gif',
    },
  ]

  const genderTasks = [
    {
      word: 'гусеница',
      image: '/images/n-gender-choice/gusenitsa.png',
      correct: 'ona',
      alt: 'Гусеница',
    },
    {
      word: 'гриб',
      image: '/images/n-gender-choice/grib.png',
      correct: 'on',
      alt: 'Гриб',
    },
    {
      word: 'груша',
      image: '/images/n-gender-choice/grusha.png',
      correct: 'ona',
      alt: 'Груша',
    },
    {
      word: 'гусь',
      image: '/images/n-gender-choice/gus.png',
      correct: 'on',
      alt: 'Гусь',
    },
    {
      word: 'дом',
      image: '/images/n-gender-choice/dom.png',
      correct: 'on',
      alt: 'Дом',
    },
    {
      word: 'диван',
      image: '/images/n-gender-choice/divan.png',
      correct: 'on',
      alt: 'Диван',
    },
  ]

  const positionTasks = [
    {
      image: '/images/n-na-nad-choice/01-nad.png',
      correct: 'nad',
      alt: 'Картинка 1: правильный ответ НАД',
    },
    {
      image: '/images/n-na-nad-choice/02-nad.png',
      correct: 'nad',
      alt: 'Картинка 2: правильный ответ НАД',
    },
    {
      image: '/images/n-na-nad-choice/03-na.png',
      correct: 'na',
      alt: 'Картинка 3: правильный ответ НА',
    },
    {
      image: '/images/n-na-nad-choice/04-na.png',
      correct: 'na',
      alt: 'Картинка 4: правильный ответ НА',
    },
    {
      image: '/images/n-na-nad-choice/05-nad.png',
      correct: 'nad',
      alt: 'Картинка 5: правильный ответ НАД',
    },
  ]

  const sentenceTasks = [
    {
      sentence: 'МУ-КА НАД СО-КОМ.',
      correct: 'muka-nad-sokom',
      options: [
        {
          id: 'muka-nad-sokom',
          image: '/images/n-sentences/muka-nad-sokom.png',
          alt: 'Мука над соком',
        },
        {
          id: 'muka-na-soke',
          image: '/images/n-sentences/muka-na-soke.png',
          alt: 'Мука на соке',
        },
      ],
    },
    {
      sentence: 'МУ-КА НАД СА-ЛА-ТОМ.',
      correct: 'muka-nad-salatom',
      options: [
        {
          id: 'muka-nad-salatom',
          image: '/images/n-sentences/muka-nad-salatom.png',
          alt: 'Мука над салатом',
        },
        {
          id: 'muka-na-salate',
          image: '/images/n-sentences/muka-na-salate.png',
          alt: 'Мука на салате',
        },
      ],
    },
    {
      sentence: 'СОК НАД СА-ЛА-ТОМ.',
      correct: 'sok-nad-salatom',
      options: [
        {
          id: 'sok-nad-salatom',
          image: '/images/n-sentences/sok-nad-salatom.png',
          alt: 'Сок над салатом',
        },
        {
          id: 'sok-na-salate',
          image: '/images/n-sentences/sok-na-salate.png',
          alt: 'Сок на салате',
        },
      ],
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentWriteWord = writeWords[writeWordIndex]
  const currentGenderTask = genderTasks[genderIndex]
  const currentPositionTask = positionTasks[positionIndex]
  const currentSentenceTask = sentenceTasks[sentenceIndex]

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
    ctx.fillText('Н', width / 2, height / 2 + 10)
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
    ctx.fillText(currentWriteWord.trace, width / 2, height / 2 + 10)
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
  }, [step, writeWordIndex])

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
      setWriteWordIndex(0)
      setStep(9)
    }
  }

  const nextWriteWord = () => {
    if (writeWordIndex < writeWords.length - 1) {
      setWriteWordIndex((prev) => prev + 1)
      setStep(9)
    } else {
      setGenderIndex(0)
      setGenderAnswer(null)
      setStep(11)
    }
  }

  const nextGenderTask = () => {
    if (genderIndex < genderTasks.length - 1) {
      setGenderIndex((prev) => prev + 1)
      setGenderAnswer(null)
    } else {
      setStep(13)
    }
  }

  const nextPositionTask = () => {
    if (positionIndex < positionTasks.length - 1) {
      setPositionIndex((prev) => prev + 1)
      setPositionAnswer(null)
    } else {
      setSentenceIndex(0)
      setSentenceAnswer(null)
      setStep(15)
    }
  }

  const nextSentenceTask = () => {
    if (sentenceIndex < sentenceTasks.length - 1) {
      setSentenceIndex((prev) => prev + 1)
      setSentenceAnswer(null)
    } else {
      setStep(16)
    }
  }

  const getImageChoiceStyle = (isSelected: boolean, isCorrect: boolean) => ({
    border:
      isSelected && isCorrect
        ? '4px solid #49b96f'
        : isSelected && !isCorrect
          ? '4px solid #f05a5a'
          : '4px solid transparent',
    borderRadius: '24px',
    padding: '10px',
    background: '#ffffff',
    cursor: 'pointer',
  })

  const getTextChoiceStyle = (isSelected: boolean, isCorrect: boolean) => ({
    minWidth: '140px',
    padding: '18px 28px',
    border:
      isSelected && isCorrect
        ? '4px solid #49b96f'
        : isSelected && !isCorrect
          ? '4px solid #f05a5a'
          : '4px solid transparent',
    borderRadius: '22px',
    background: '#ffffff',
    fontSize: '32px',
    fontWeight: 800,
    cursor: 'pointer',
  })

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 17</p>

            <div className="redLetters">
              <span className="bigRedLetter">Н</span>
              <span className="smallRedLetter">н</span>
            </div>

            <h1 className="lessonTitle">Буква Н</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-n.mp3')}
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
            <div className="letterLine">Н Н Н Н Н Н</div>
            <div className="letterLine">н н н н н н</div>
            <div className="letterLine">Н н Н н Н н</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-n.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву Н</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-n.gif"
              alt="Как писать букву Н"
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
            <h1 className="taskTitle">Напиши букву Н пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Н.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай, как читает учитель. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">Н-А</span>
              <span className="joinSpace" />
              <span className="joinPurple">Н-О</span>
              <span className="joinSpace" />
              <span className="joinPurple">Н-У</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">Н-И</span>
              <span className="joinSpace" />
              <span className="joinOrange">Н-Ы</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/n-joins/n-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам. Соединяй звуки плавно.
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
              <span className="joinPurple">А-Н</span>
              <span className="joinSpace" />
              <span className="joinPurple">О-Н</span>
              <span className="joinSpace" />
              <span className="joinPurple">У-Н</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">И-Н</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ы-Н</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/n-joins/n-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
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
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              ▶
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
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
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentReadWord.audio)}
          >
            ▶ Послушать слово
          </button>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src={currentWriteWord.gif}
              alt={`Как писать слово ${currentWriteWord.word}`}
              className="sampleImage"
            />

            <div className="readSingleWord">{currentWriteWord.word}</div>
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
              Веди пальцем или мышкой по экрану и попробуй написать слово.
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
            <h1 className="taskTitle">Он или она?</h1>
            <p className="lessonText">
              Посмотри на картинку. Учитель объяснит, когда мы говорим
              «он», а когда — «она».
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/images/n-gender/on-ona-info.png"
              alt="Он и она"
              className="sampleImage"
            />
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setGenderIndex(0)
              setGenderAnswer(null)
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
            <h1 className="taskTitle">Выбери: он или она</h1>
            <p className="lessonText">
              Посмотри на картинку и выбери правильное слово.
            </p>
          </section>

          <section className="pictureTaskCard">
            <img
              src={currentGenderTask.image}
              alt={currentGenderTask.alt}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                {currentGenderTask.word}
              </p>
            </div>
          </section>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              marginTop: '20px',
            }}
          >
            <button
              type="button"
              onClick={() => setGenderAnswer('on')}
              style={getTextChoiceStyle(
                genderAnswer === 'on',
                currentGenderTask.correct === 'on',
              )}
            >
              ОН
            </button>

            <button
              type="button"
              onClick={() => setGenderAnswer('ona')}
              style={getTextChoiceStyle(
                genderAnswer === 'ona',
                currentGenderTask.correct === 'ona',
              )}
            >
              ОНА
            </button>
          </div>

          {genderAnswer === currentGenderTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {genderAnswer !== null &&
            genderAnswer !== currentGenderTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {genderAnswer === currentGenderTask.correct && (
            <button className="primaryButton" onClick={nextGenderTask}>
              {genderIndex < genderTasks.length - 1
                ? 'Следующая картинка'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">На и над</h1>
            <p className="lessonText">
              Посмотри на картинку. Потом послушай объяснение.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/images/n-na-nad/na-nad-info.png"
              alt="Разница между словами НА и НАД"
              className="sampleImage"
            />
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/n-na-nad/na-nad-info.mp3')}
          >
            ▶ Послушать
          </button>

          <button
            className="primaryButton"
            onClick={() => {
              setPositionIndex(0)
              setPositionAnswer(null)
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
            <h1 className="taskTitle">Выбери: на или над</h1>
            <p className="lessonText">
              Посмотри на картинку и выбери правильное слово.
            </p>
          </section>

          <section className="pictureTaskCard">
            <img
              src={currentPositionTask.image}
              alt={currentPositionTask.alt}
              className="pictureTaskImage"
            />
          </section>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              marginTop: '20px',
            }}
          >
            <button
              type="button"
              onClick={() => setPositionAnswer('nad')}
              style={getTextChoiceStyle(
                positionAnswer === 'nad',
                currentPositionTask.correct === 'nad',
              )}
            >
              НАД
            </button>

            <button
              type="button"
              onClick={() => setPositionAnswer('na')}
              style={getTextChoiceStyle(
                positionAnswer === 'na',
                currentPositionTask.correct === 'na',
              )}
            >
              НА
            </button>
          </div>

          {positionAnswer === currentPositionTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {positionAnswer !== null &&
            positionAnswer !== currentPositionTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {positionAnswer === currentPositionTask.correct && (
            <button className="primaryButton" onClick={nextPositionTask}>
              {positionIndex < positionTasks.length - 1
                ? 'Следующая картинка'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 15 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 12</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай предложение и выбери правильную картинку.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">
              {currentSentenceTask.sentence}
            </div>
          </section>

          <section className="readingCard">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '16px',
              }}
            >
              {currentSentenceTask.options.map((option) => {
                const isSelected = sentenceAnswer === option.id
                const isCorrect = option.id === currentSentenceTask.correct

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSentenceAnswer(option.id)}
                    style={getImageChoiceStyle(isSelected, isCorrect)}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="pictureTaskImage"
                    />
                  </button>
                )
              })}
            </div>
          </section>

          {sentenceAnswer === currentSentenceTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {sentenceAnswer !== null &&
            sentenceAnswer !== currentSentenceTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {sentenceAnswer === currentSentenceTask.correct && (
            <button className="primaryButton" onClick={nextSentenceTask}>
              {sentenceIndex < sentenceTasks.length - 1
                ? 'Следующее предложение'
                : 'Завершить урок'}
            </button>
          )}
        </>
      )}

      {step === 16 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Н, прочитал её, написал слова и выбрал
              правильные картинки.
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

function LetterVLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [repeatIndex, setRepeatIndex] = useState(0)

  const [storyIndex, setStoryIndex] = useState(0)
  const [storyAnswer, setStoryAnswer] = useState<string | null>(null)

  const [listenIndex, setListenIndex] = useState(0)
  const [listenAnswer, setListenAnswer] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'варенье',
      image: '/images/v-words/varenie.png',
      audio: '/audio/v-words/varenie.mp3',
    },
    {
      word: 'трава',
      image: '/images/v-words/trava.png',
      audio: '/audio/v-words/trava.mp3',
    },
    {
      word: 'виноград',
      image: '/images/v-words/vinograd.png',
      audio: '/audio/v-words/vinograd.mp3',
    },
    {
      word: 'ветер',
      image: '/images/v-words/veter.png',
      audio: '/audio/v-words/veter.mp3',
    },
  ]

  const readWords = [
    {
      word: 'ВО-ДА',
      audio: '/audio/v-read-words/vo-da.mp3',
    },
    {
      word: 'КИ-ВИ',
      audio: '/audio/v-read-words/ki-vi.mp3',
    },
    {
      word: 'КО-РО-ВА',
      audio: '/audio/v-read-words/ko-ro-va.mp3',
    },
    {
      word: 'ВИЛ-КА',
      audio: '/audio/v-read-words/vil-ka.mp3',
    },
    {
      word: 'ВОЛК',
      audio: '/audio/v-read-words/volk.mp3',
    },
    {
      word: 'СЛО-ВА',
      audio: '/audio/v-read-words/slo-va.mp3',
    },
  ]

  const writeWord = {
    word: 'ВОЛК',
    trace: 'волк',
    gif: '/gifs/v-write-words/volk.gif',
  }

  const repeatTasks = [
    {
      text: 'ВА-ВА-ВА',
      audio: '/audio/v-repeat/va-va-va.mp3',
    },
    {
      text: 'ВИ-ВИ-ВИ',
      audio: '/audio/v-repeat/vi-vi-vi.mp3',
    },
    {
      text: 'АВ-АВ-АВ',
      audio: '/audio/v-repeat/av-av-av.mp3',
    },
    {
      text: 'ОВ-ОВ-ОВ',
      audio: '/audio/v-repeat/ov-ov-ov.mp3',
    },
  ]

  const storyTasks = [
    {
      sentence: 'БОНЬ-КА И ВОЛК.',
      audio: '/audio/v-story/01-bonka-i-volk.mp3',
      correct: 'bonka-and-wolf',
      options: [
        {
          id: 'bonka-and-wolf',
          image: '/images/v-story/bonka-and-wolf.png',
          alt: 'Бонька и волк',
        },
        {
          id: 'dog-bonka',
          image: '/images/v-story/dog-bonka.png',
          alt: 'Бонька',
        },
      ],
    },
    {
      sentence: 'У ВОЛ-КА ЛА-ПЫ.',
      audio: '/audio/v-story/02-u-volka-lapy.mp3',
      correct: 'wolf-paw',
      options: [
        {
          id: 'wolf-paw',
          image: '/images/v-story/wolf-paw.png',
          alt: 'Волчья лапа',
        },
        {
          id: 'dog-paw',
          image: '/images/v-story/dog-paw.png',
          alt: 'Собачья лапа',
        },
      ],
    },
    {
      sentence: 'А У БОНЬ-КИ ЛАП-КИ.',
      audio: '/audio/v-story/03-u-bonki-lapki.mp3',
      correct: 'dog-paw',
      options: [
        {
          id: 'wolf-paw',
          image: '/images/v-story/wolf-paw.png',
          alt: 'Волчья лапа',
        },
        {
          id: 'dog-paw',
          image: '/images/v-story/dog-paw.png',
          alt: 'Собачья лапа',
        },
      ],
    },
    {
      sentence: 'ВОЛК СИ-ДИТ У КУС-ТА.',
      audio: '/audio/v-story/04-volk-u-kusta.mp3',
      correct: 'wolf-bush',
      options: [
        {
          id: 'wolf-bush',
          image: '/images/v-story/wolf-bush.png',
          alt: 'Волк у куста',
        },
        {
          id: 'dog-house',
          image: '/images/v-story/dog-house.png',
          alt: 'Собака у дома',
        },
      ],
    },
    {
      sentence: 'БОНЬ-КА СИ-ДИТ У ДО-МА.',
      audio: '/audio/v-story/05-bonka-u-doma.mp3',
      correct: 'dog-house',
      options: [
        {
          id: 'wolf-bush',
          image: '/images/v-story/wolf-bush.png',
          alt: 'Волк у куста',
        },
        {
          id: 'dog-house',
          image: '/images/v-story/dog-house.png',
          alt: 'Собака у дома',
        },
      ],
    },
    {
      sentence: 'ВОЛК ОТ-КРЫЛ РОТ: «Р-Р-Р!».',
      audio: '/audio/v-story/06-volk-rrr.mp3',
      correct: 'wolf-roar',
      options: [
        {
          id: 'wolf-roar',
          image: '/images/v-story/wolf-roar.png',
          alt: 'Волк рычит',
        },
        {
          id: 'dog-bark',
          image: '/images/v-story/dog-bark.png',
          alt: 'Собака лает',
        },
      ],
    },
    {
      sentence: 'БОНЬ-КА ОТ-КРЫЛ РОТ: «ГАВ-ГАВ!»',
      audio: '/audio/v-story/07-bonka-gav-gav.mp3',
      correct: 'dog-bark',
      options: [
        {
          id: 'wolf-roar',
          image: '/images/v-story/wolf-roar.png',
          alt: 'Волк рычит',
        },
        {
          id: 'dog-bark',
          image: '/images/v-story/dog-bark.png',
          alt: 'Собака лает',
        },
      ],
    },
  ]

  const listenTasks = [
    {
      audio: '/audio/v-listen/01-vo-da.mp3',
      first: '',
      second: 'ДА',
      blankPosition: 'first',
      options: ['ВО', 'БО'],
      correct: 'ВО',
    },
    {
      audio: '/audio/v-listen/02-bul-ka.mp3',
      first: '',
      second: 'КА',
      blankPosition: 'first',
      options: ['ВУЛ', 'БУЛ'],
      correct: 'БУЛ',
    },
    {
      audio: '/audio/v-listen/03-ban-ka.mp3',
      first: '',
      second: 'КА',
      blankPosition: 'first',
      options: ['ВАН', 'БАН'],
      correct: 'БАН',
    },
    {
      audio: '/audio/v-listen/04-ki-vi.mp3',
      first: 'КИ',
      second: '',
      blankPosition: 'second',
      options: ['ВИ', 'БИ'],
      correct: 'ВИ',
    },
    {
      audio: '/audio/v-listen/05-vil-ka.mp3',
      first: '',
      second: 'КА',
      blankPosition: 'first',
      options: ['ВИЛ', 'БИЛ'],
      correct: 'ВИЛ',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentRepeatTask = repeatTasks[repeatIndex]
  const currentStoryTask = storyTasks[storyIndex]
  const currentListenTask = listenTasks[listenIndex]

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
    ctx.fillText('В', width / 2, height / 2 + 10)
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
    ctx.fillText(writeWord.trace, width / 2, height / 2 + 10)
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

  const nextRepeatTask = () => {
    if (repeatIndex < repeatTasks.length - 1) {
      setRepeatIndex((prev) => prev + 1)
    } else {
      setStoryIndex(0)
      setStoryAnswer(null)
      setStep(13)
    }
  }

  const nextStoryTask = () => {
    if (storyIndex < storyTasks.length - 1) {
      setStoryIndex((prev) => prev + 1)
      setStoryAnswer(null)
    } else {
      setListenIndex(0)
      setListenAnswer(null)
      setStep(14)
    }
  }

  const nextListenTask = () => {
    if (listenIndex < listenTasks.length - 1) {
      setListenIndex((prev) => prev + 1)
      setListenAnswer(null)
    } else {
      setStep(15)
    }
  }

  const getImageChoiceStyle = (isSelected: boolean, isCorrect: boolean) =>
    ({
      border:
        isSelected && isCorrect
          ? '4px solid #49b96f'
          : isSelected && !isCorrect
            ? '4px solid #f05a5a'
            : '4px solid transparent',
      borderRadius: '24px',
      padding: '10px',
      background: '#ffffff',
      cursor: 'pointer',
    }) as const

  const getTextChoiceStyle = (isSelected: boolean, isCorrect: boolean) =>
    ({
      minWidth: '140px',
      padding: '18px 28px',
      border:
        isSelected && isCorrect
          ? '4px solid #49b96f'
          : isSelected && !isCorrect
            ? '4px solid #f05a5a'
            : '4px solid transparent',
      borderRadius: '22px',
      background: '#ffffff',
      fontSize: '32px',
      fontWeight: 800,
      cursor: 'pointer',
    }) as const

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 19</p>

            <div className="redLetters">
              <span className="bigRedLetter">В</span>
              <span className="smallRedLetter">в</span>
            </div>

            <h1 className="lessonTitle">Буква В</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-v.mp3')}
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
            <div className="letterLine">В В В В В В</div>
            <div className="letterLine">в в в в в в</div>
            <div className="letterLine">В в В в В в</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-v.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву В</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-v.gif"
              alt="Как писать букву В"
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
            <h1 className="taskTitle">Напиши букву В пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву В.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">В-А</span>
              <span className="joinSpace" />
              <span className="joinPurple">В-О</span>
              <span className="joinSpace" />
              <span className="joinPurple">В-У</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">В-И</span>
              <span className="joinSpace" />
              <span className="joinOrange">В-Ы</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/v-joins/v-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам. Соединяй звуки плавно.
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
              <span className="joinPurple">А-В</span>
              <span className="joinSpace" />
              <span className="joinPurple">О-В</span>
              <span className="joinSpace" />
              <span className="joinPurple">У-В</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">И-В</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ы-В</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/v-joins/v-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
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
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай мягко</h1>
            <p className="lessonText">
              Послушай разницу. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 3</p>

            <div className="joinTextLine">
              <span className="joinPurple">ВИ</span>
              <span className="joinSpace" />
              <span className="joinOrange">ВЬ-И</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/v-joins/v-row-3.mp3')}
            >
              ▶ Послушать строку 3
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ВИ, ВЬ-И.
            </p>
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
              Посмотри на картинку. Назови слово. Слышишь букву В?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              ▶
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Слышишь букву В?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
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
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentReadWord.audio)}
          >
            ▶ Послушать слово
          </button>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Посмотри, как писать слово</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать слово сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src={writeWord.gif}
              alt={`Как писать слово ${writeWord.word}`}
              className="sampleImage"
            />

            <div className="readSingleWord">{writeWord.word}</div>
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
            <h1 className="taskTitle">Напиши слово {writeWord.word}</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и попробуй написать слово.
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
                setRepeatIndex(0)
                setStep(12)
              }}
            >
              Готово
            </button>
          </div>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Послушай и повтори</h1>
            <p className="lessonText">
              Сначала послушай. Потом повтори громко.
            </p>
          </section>

          <section className="vRepeatCard">
            <div className="vRepeatText">{currentRepeatTask.text}</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentRepeatTask.audio)}
            >
              ▶ Послушать
            </button>

            <p className="vRepeatHint">
              Повтори: {currentRepeatTask.text}
            </p>
          </section>

          <button className="primaryButton" onClick={nextRepeatTask}>
            {repeatIndex < repeatTasks.length - 1
              ? 'Следующая строка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай предложение. Можешь послушать подсказку.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">
              {currentStoryTask.sentence}
            </div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentStoryTask.audio)}
          >
            ▶ Подсказка
          </button>

          <section className="readingCard">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '16px',
              }}
            >
              {currentStoryTask.options.map((option) => {
                const isSelected = storyAnswer === option.id
                const isCorrect = option.id === currentStoryTask.correct

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setStoryAnswer(option.id)}
                    style={getImageChoiceStyle(isSelected, isCorrect)}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="pictureTaskImage"
                    />
                  </button>
                )
              })}
            </div>
          </section>

          {storyAnswer === currentStoryTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {storyAnswer !== null &&
            storyAnswer !== currentStoryTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {storyAnswer === currentStoryTask.correct && (
            <button className="primaryButton" onClick={nextStoryTask}>
              {storyIndex < storyTasks.length - 1
                ? 'Следующее предложение'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 14 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Послушай и выбери слог</h1>
            <p className="lessonText">
              Послушай слово. Выбери, какой слог пропущен.
            </p>
          </section>

          <section className="vSyllableCard">
            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentListenTask.audio)}
            >
              ▶ Послушать слово
            </button>

            <div className="vSyllableWord">
              {currentListenTask.blankPosition === 'first' ? (
                <span className="vSyllableBlank">___</span>
              ) : (
                <span>{currentListenTask.first}</span>
              )}

              <span className="vSyllableDash">-</span>

              {currentListenTask.blankPosition === 'second' ? (
                <span className="vSyllableBlank">___</span>
              ) : (
                <span>{currentListenTask.second}</span>
              )}
            </div>
          </section>

          <div className="vSyllableButtons">
            {currentListenTask.options.map((option) => {
              const isSelected = listenAnswer === option
              const isCorrect = option === currentListenTask.correct

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setListenAnswer(option)}
                  style={getTextChoiceStyle(isSelected, isCorrect)}
                >
                  {option}
                </button>
              )
            })}
          </div>

          {listenAnswer === currentListenTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {listenAnswer !== null &&
            listenAnswer !== currentListenTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {listenAnswer === currentListenTask.correct && (
            <button className="primaryButton" onClick={nextListenTask}>
              {listenIndex < listenTasks.length - 1
                ? 'Следующее слово'
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
              Ты послушал букву В, прочитал её, написал слово, повторил слоги
              и выбрал правильные картинки.
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

function LetterYLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [firstWordIndex, setFirstWordIndex] = useState(0)
  const [middleWordIndex, setMiddleWordIndex] = useState(0)
  const [endWordIndex, setEndWordIndex] = useState(0)

  const [colorIndex, setColorIndex] = useState(0)
  const [colorAnswer, setColorAnswer] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const firstWords = [
    {
      word: 'ЙО-ГА',
      image: '/images/y-words/yoga.png',
      audio: '/audio/y-words/yoga.mp3',
    },
    {
      word: 'ЙО-ГУРТ',
      image: '/images/y-words/yogurt.png',
      audio: '/audio/y-words/yogurt.mp3',
    },
    {
      word: 'ЙОД',
      image: '/images/y-words/yod.png',
      audio: '/audio/y-words/yod.mp3',
    },
  ]

  const middleWords = [
    {
      word: 'МАЙ-КА',
      image: '/images/y-middle/may-ka.png',
      audio: '/audio/y-middle/may-ka.mp3',
    },
    {
      word: 'ЛАЙМ',
      image: '/images/y-middle/laym.png',
      audio: '/audio/y-middle/laym.mp3',
    },
    {
      word: 'СТРОЙ-КА',
      image: '/images/y-middle/stroj-ka.png',
      audio: '/audio/y-middle/stroj-ka.mp3',
    },
    {
      word: 'ТАЙ-НА',
      image: '/images/y-middle/taj-na.png',
      audio: '/audio/y-middle/taj-na.mp3',
    },
  ]

  const endWords = [
    {
      word: 'ДАЙ',
      image: '/images/y-end/day.png',
      audio: '/audio/y-end/day.mp3',
    },
    {
      word: 'ЛАЙ',
      image: '/images/y-end/lay.png',
      audio: '/audio/y-end/lay.mp3',
    },
    {
      word: 'МАЙ',
      image: '/images/y-end/may.png',
      audio: '/audio/y-end/may.mp3',
    },
    {
      word: 'СИ-НИ-Й',
      image: '/images/y-end/siniy.png',
      audio: '/audio/y-end/siniy.mp3',
    },
    {
      word: 'КРАС-НЫ-Й',
      image: '/images/y-end/krasniy.png',
      audio: '/audio/y-end/krasniy.mp3',
    },
    {
      word: 'СТА-РЫ-Й',
      image: '/images/y-end/stariy.png',
      audio: '/audio/y-end/stariy.mp3',
    },
  ]

  const colorTasks = [
    {
      phrase: 'КРАС-НЫЙ СТОЛ',
      correct: 'table-red',
      options: [
        {
          id: 'table-red',
          image: '/images/y-color/table-red.png',
          alt: 'Красный стол',
        },
        {
          id: 'table-not-red',
          image: '/images/y-color/table-not-red.png',
          alt: 'Стол не красный',
        },
      ],
    },
    {
      phrase: 'КРАС-НЫЙ БАНТ',
      correct: 'bow-red',
      options: [
        {
          id: 'bow-not-red',
          image: '/images/y-color/bow-not-red.png',
          alt: 'Бант не красный',
        },
        {
          id: 'bow-red',
          image: '/images/y-color/bow-red.png',
          alt: 'Красный бант',
        },
      ],
    },
    {
      phrase: 'КРАС-НЫЙ ГРИБ',
      correct: 'mushroom-red',
      options: [
        {
          id: 'mushroom-not-red',
          image: '/images/y-color/mushroom-not-red.png',
          alt: 'Гриб не красный',
        },
        {
          id: 'mushroom-red',
          image: '/images/y-color/mushroom-red.png',
          alt: 'Красный гриб',
        },
      ],
    },
    {
      phrase: 'КРАС-НЫЙ ПО-МИ-ДОР',
      correct: 'tomato-red',
      options: [
        {
          id: 'tomato-not-red',
          image: '/images/y-color/tomato-not-red.png',
          alt: 'Помидор не красный',
        },
        {
          id: 'tomato-red',
          image: '/images/y-color/tomato-red.png',
          alt: 'Красный помидор',
        },
      ],
    },
    {
      phrase: 'КРАС-НЫЙ ПИНГ-ВИН',
      correct: 'penguin-red',
      options: [
        {
          id: 'penguin-red',
          image: '/images/y-color/penguin-red.png',
          alt: 'Красный пингвин',
        },
        {
          id: 'penguin-not-red',
          image: '/images/y-color/penguin-not-red.png',
          alt: 'Пингвин не красный',
        },
      ],
    },
    {
      phrase: 'КРАС-НЫЙ РО-БОТ',
      correct: 'robot-red',
      options: [
        {
          id: 'robot-red',
          image: '/images/y-color/robot-red.png',
          alt: 'Красный робот',
        },
        {
          id: 'robot-not-red',
          image: '/images/y-color/robot-not-red.png',
          alt: 'Робот не красный',
        },
      ],
    },
  ]

  const currentFirstWord = firstWords[firstWordIndex]
  const currentMiddleWord = middleWords[middleWordIndex]
  const currentEndWord = endWords[endWordIndex]
  const currentColorTask = colorTasks[colorIndex]

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
    ctx.fillText('Й', width / 2, height / 2 + 10)
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

    drawLetterCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
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

  const nextFirstWord = () => {
    if (firstWordIndex < firstWords.length - 1) {
      setFirstWordIndex((prev) => prev + 1)
    } else {
      setStep(8)
    }
  }

  const nextMiddleWord = () => {
    if (middleWordIndex < middleWords.length - 1) {
      setMiddleWordIndex((prev) => prev + 1)
    } else {
      setStep(10)
    }
  }

  const nextEndWord = () => {
    if (endWordIndex < endWords.length - 1) {
      setEndWordIndex((prev) => prev + 1)
    } else {
      setStep(12)
    }
  }

  const nextColorTask = () => {
    if (colorIndex < colorTasks.length - 1) {
      setColorIndex((prev) => prev + 1)
      setColorAnswer(null)
    } else {
      setStep(14)
    }
  }

  const getImageChoiceStyle = (isSelected: boolean, isCorrect: boolean) =>
    ({
      border:
        isSelected && isCorrect
          ? '4px solid #49b96f'
          : isSelected && !isCorrect
            ? '4px solid #f05a5a'
            : '4px solid transparent',
      borderRadius: '24px',
      padding: '10px',
      background: '#ffffff',
      cursor: 'pointer',
    }) as const

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 20</p>

            <div className="redLetters">
              <span className="bigRedLetter">Й</span>
              <span className="smallRedLetter">й</span>
            </div>

            <h1 className="lessonTitle">Буква Й</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-y.mp3')}
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
            <div className="letterLine">Й Й Й Й Й Й</div>
            <div className="letterLine">й й й й й й</div>
            <div className="letterLine">Й й Й й Й й</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-y.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву Й</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-y.gif"
              alt="Как писать букву Й"
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
            <h1 className="taskTitle">Напиши букву Й пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Й.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">А-Й</span>
              <span className="joinSpace" />
              <span className="joinPurple">О-Й</span>
              <span className="joinSpace" />
              <span className="joinPurple">У-Й</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">И-Й</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ы-Й</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/y-joins/y-row-1.mp3')}
            >
              ▶ Послушать строку
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
            </p>
          </section>

          <button className="primaryButton" onClick={() => setStep(6)}>
            Дальше
          </button>
        </>
      )}

      {step === 6 && (
        <>
          <section className="yExplanationCard">
            <div className="yExplanationLetter">Й</div>

            <h1 className="taskTitle">Буква Й в начале слова</h1>

            <p className="lessonText">
              Послушай подсказку учителя.
            </p>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/y-explanations/rare-first.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setFirstWordIndex(0)
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
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentFirstWord.audio)}
            >
              ▶
            </button>

            <img
              src={currentFirstWord.image}
              alt={currentFirstWord.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                {currentFirstWord.word}
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextFirstWord}>
            {firstWordIndex < firstWords.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="yExplanationCard">
            <div className="yExplanationLetter">Й</div>

            <h1 className="taskTitle">Буква Й в середине слова</h1>

            <p className="lessonText">
              Послушай подсказку учителя.
            </p>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/y-explanations/middle.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setMiddleWordIndex(0)
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
            <h1 className="taskTitle">Читай слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Прочитай слово на доске.
            </p>
          </section>

          <section className="yWordBoardCard">
            <img
              src={currentMiddleWord.image}
              alt={currentMiddleWord.word}
              className="yWordBoardImage"
            />

            <div className="yBoard">
              {currentMiddleWord.word}
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentMiddleWord.audio)}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={nextMiddleWord}>
            {middleWordIndex < middleWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="yExplanationCard">
            <div className="yExplanationLetter">Й</div>

            <h1 className="taskTitle">Буква Й в конце слова</h1>

            <p className="lessonText">
              Послушай подсказку учителя.
            </p>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/y-explanations/end.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setEndWordIndex(0)
              setStep(11)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Читай слово</h1>
            <p className="lessonText">
              Посмотри на картинку. Прочитай слово на доске.
            </p>
          </section>

          <section className="yWordBoardCard">
            <img
              src={currentEndWord.image}
              alt={currentEndWord.word}
              className="yWordBoardImage"
            />

            <div className="yBoard">
              {currentEndWord.word}
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentEndWord.audio)}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={nextEndWord}>
            {endWordIndex < endWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="yQuestionCard">
            <div className="yQuestionLine">ОН.</div>
            <div className="yQuestionLine">КА-КОЙ?</div>
            <div className="yQuestionAnswer">КРАС-НЫЙ.</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/y-explanations/on-ono.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setColorIndex(0)
              setColorAnswer(null)
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
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай фразу и выбери правильную картинку.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">
              {currentColorTask.phrase}
            </div>
          </section>

          <section className="readingCard">
            <div className="yColorChoiceGrid">
              {currentColorTask.options.map((option) => {
                const isSelected = colorAnswer === option.id
                const isCorrect = option.id === currentColorTask.correct

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setColorAnswer(option.id)}
                    style={getImageChoiceStyle(isSelected, isCorrect)}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="pictureTaskImage"
                    />
                  </button>
                )
              })}
            </div>
          </section>

          {colorAnswer === currentColorTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {colorAnswer !== null &&
            colorAnswer !== currentColorTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {colorAnswer === currentColorTask.correct && (
            <button className="primaryButton" onClick={nextColorTask}>
              {colorIndex < colorTasks.length - 1
                ? 'Следующая фраза'
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
              Ты послушал букву Й, прочитал слова с буквой Й и выбрал
              правильные картинки.
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

function LetterZLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)
  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [storyIndex, setStoryIndex] = useState(0)
  const [storyAnswer, setStoryAnswer] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'змея',
      image: '/images/z-words/zmeya.png',
      audio: '/audio/z-words/zmeya.mp3',
    },
    {
      word: 'зебра',
      image: '/images/z-words/zebra.png',
      audio: '/audio/z-words/zebra.mp3',
    },
    {
      word: 'звезда',
      image: '/images/z-words/zvezda.png',
      audio: '/audio/z-words/zvezda.mp3',
    },
    {
      word: 'замок',
      image: '/images/z-words/zamok-castle.png',
      audio: '/audio/z-words/zamok-castle.mp3',
    },
    {
      word: 'замок',
      image: '/images/z-words/zamok-lock.png',
      audio: '/audio/z-words/zamok-lock.mp3',
    },
  ]

  const readWords = [
    {
      word: 'ЗИ-МА',
      audio: '/audio/z-read-words/zi-ma.mp3',
    },
    {
      word: 'ЗУ-БЫ',
      audio: '/audio/z-read-words/zu-by.mp3',
    },
    {
      word: 'ВА-ЗА',
      audio: '/audio/z-read-words/va-za.mp3',
    },
    {
      word: 'ЗАЙ-КА',
      audio: '/audio/z-read-words/zay-ka.mp3',
    },
    {
      word: 'ЗОНТ',
      audio: '/audio/z-read-words/zont.mp3',
    },
    {
      word: 'ЗА-БОР',
      audio: '/audio/z-read-words/za-bor.mp3',
    },
  ]

  const storyTasks = [
    {
      sentence: 'ЗАЙ-КА У ЗА-БО-РА.',
      correct: 'zayka-u-zabora',
      options: [
        {
          id: 'zayka-u-zabora',
          image: '/images/z-story/zayka-u-zabora.png',
          alt: 'Зайка у забора',
        },
        {
          id: 'bonka-u-zabora',
          image: '/images/z-story/bonka-u-zabora.png',
          alt: 'Бонька у забора',
        },
      ],
    },
    {
      sentence: 'ЗА-БОР КРАС-НЫЙ.',
      correct: 'zabor-krasniy',
      options: [
        {
          id: 'zabor-siniy',
          image: '/images/z-story/zabor-siniy.png',
          alt: 'Синий забор',
        },
        {
          id: 'zabor-krasniy',
          image: '/images/z-story/zabor-krasniy.png',
          alt: 'Красный забор',
        },
      ],
    },
    {
      sentence: 'У ЗАЙ-КИ СИ-НИЙ БАНТ.',
      correct: 'bant-siniy',
      options: [
        {
          id: 'bant-siniy',
          image: '/images/z-story/bant-siniy.png',
          alt: 'Синий бант',
        },
        {
          id: 'bant-krasniy',
          image: '/images/z-story/bant-krasniy.png',
          alt: 'Красный бант',
        },
      ],
    },
    {
      sentence: 'У ЗАЙ-КИ КОР-ЗИН-КА.',
      correct: 'korzinka-u-zayki',
      options: [
        {
          id: 'korzinka-u-bonki',
          image: '/images/z-story/korzinka-u-bonki.png',
          alt: 'Корзинка у Боньки',
        },
        {
          id: 'korzinka-u-zayki',
          image: '/images/z-story/korzinka-u-zayki.png',
          alt: 'Корзинка у зайки',
        },
      ],
    },
    {
      sentence: 'ТАМ КА-ПУС-ТА.',
      correct: 'korzinka-kapusta',
      options: [
        {
          id: 'korzinka-ne-kapusta',
          image: '/images/z-story/korzinka-ne-kapusta.png',
          alt: 'В корзинке не капуста',
        },
        {
          id: 'korzinka-kapusta',
          image: '/images/z-story/korzinka-kapusta.png',
          alt: 'В корзинке капуста',
        },
      ],
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentStoryTask = storyTasks[storyIndex]

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
    ctx.fillText('З', width / 2, height / 2 + 10)
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

    drawLetterCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
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

  const nextStoryTask = () => {
    if (storyIndex < storyTasks.length - 1) {
      setStoryIndex((prev) => prev + 1)
      setStoryAnswer(null)
    } else {
      setStep(12)
    }
  }

  const getImageChoiceStyle = (isSelected: boolean, isCorrect: boolean) =>
    ({
      border:
        isSelected && isCorrect
          ? '4px solid #49b96f'
          : isSelected && !isCorrect
            ? '4px solid #f05a5a'
            : '4px solid transparent',
      borderRadius: '24px',
      padding: '10px',
      background: '#ffffff',
      cursor: 'pointer',
    }) as const

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 22</p>

            <div className="redLetters">
              <span className="bigRedLetter">З</span>
              <span className="smallRedLetter">з</span>
            </div>

            <h1 className="lessonTitle">Буква З</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-z.mp3')}
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
            <div className="letterLine">З З З З З З</div>
            <div className="letterLine">з з з з з з</div>
            <div className="letterLine">З з З з З з</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-z.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву З</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-z.gif"
              alt="Как писать букву З"
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
            <h1 className="taskTitle">Напиши букву З пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву З.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">З-А</span>
              <span className="joinSpace" />
              <span className="joinPurple">З-О</span>
              <span className="joinSpace" />
              <span className="joinPurple">З-У</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">З-И</span>
              <span className="joinSpace" />
              <span className="joinOrange">З-Ы</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/z-joins/z-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам. Соединяй звуки плавно.
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
              <span className="joinPurple">А-З</span>
              <span className="joinSpace" />
              <span className="joinPurple">О-З</span>
              <span className="joinSpace" />
              <span className="joinPurple">У-З</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">И-З</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ы-З</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/z-joins/z-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
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
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай мягко</h1>
            <p className="lessonText">
              Послушай разницу. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 3</p>

            <div className="joinTextLine">
              <span className="joinPurple">ЗИ</span>
              <span className="joinSpace" />
              <span className="joinOrange">ЗЬ-И</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/z-joins/z-row-3.mp3')}
            >
              ▶ Послушать строку 3
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: ЗИ, ЗЬ-И.
            </p>
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
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              ▶
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
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
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentReadWord.audio)}
          >
            ▶ Послушать слово
          </button>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Послушай рассказ</h1>
            <p className="lessonText">
              Посмотри на картинку. Послушай предложения.
            </p>
          </section>

          <section className="zStoryListenCard">
            <img
              src="/images/z-story/story.png"
              alt="История про зайку, забор и корзинку"
              className="zStoryListenImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/z-story/story.mp3')}
            >
              ▶ Послушать рассказ
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setStoryIndex(0)
              setStoryAnswer(null)
              setStep(11)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай предложение и выбери правильную картинку.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">
              {currentStoryTask.sentence}
            </div>
          </section>

          <section className="readingCard">
            <div className="zStoryChoiceGrid">
              {currentStoryTask.options.map((option) => {
                const isSelected = storyAnswer === option.id
                const isCorrect = option.id === currentStoryTask.correct

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setStoryAnswer(option.id)}
                    style={getImageChoiceStyle(isSelected, isCorrect)}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="pictureTaskImage"
                    />
                  </button>
                )
              })}
            </div>
          </section>

          {storyAnswer === currentStoryTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {storyAnswer !== null &&
            storyAnswer !== currentStoryTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {storyAnswer === currentStoryTask.correct && (
            <button className="primaryButton" onClick={nextStoryTask}>
              {storyIndex < storyTasks.length - 1
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
              Ты послушал букву З, прочитал её, прочитал слова и выбрал
              правильные картинки.
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

function LetterYaLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)

  const [firstWordIndex, setFirstWordIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [colorIndex, setColorIndex] = useState(0)
  const [colorAnswer, setColorAnswer] = useState<string | null>(null)

  const [storyIndex, setStoryIndex] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const firstWords = [
    {
      word: 'ящерица',
      image: '/images/ya-words/yashcheritsa.png',
      audio: '/audio/ya-words/yashcheritsa.mp3',
    },
    {
      word: 'яйцо',
      image: '/images/ya-words/yaytso.png',
      audio: '/audio/ya-words/yaytso.mp3',
    },
    {
      word: 'яхта',
      image: '/images/ya-words/yahta.png',
      audio: '/audio/ya-words/yahta.mp3',
    },
    {
      word: 'яблоня',
      image: '/images/ya-words/yablonya.png',
      audio: '/audio/ya-words/yablonya.mp3',
    },
  ]

  const readWords = [
    {
      word: 'Я-МА',
      audio: '/audio/ya-read/ya-ma.mp3',
    },
    {
      word: 'А-НЯ',
      audio: '/audio/ya-read/a-nya.mp3',
    },
    {
      word: 'ЯБ-ЛО-КО',
      audio: '/audio/ya-read/yab-lo-ko.mp3',
    },
    {
      word: 'Я-ГО-ДА',
      audio: '/audio/ya-read/ya-go-da.mp3',
    },
    {
      word: 'КРАС-НА-Я',
      audio: '/audio/ya-read/kras-na-ya.mp3',
    },
    {
      word: 'СТА-РА-Я',
      audio: '/audio/ya-read/sta-ra-ya.mp3',
    },
  ]

  const colorTasks = [
    {
      phrase: 'КРАС-НА-Я Я-ГО-ДА',
      correct: 'yagoda-red',
      options: [
        {
          id: 'yagoda-not-red',
          image: '/images/ya-color/yagoda-not-red.png',
          alt: 'Ягода не красная',
        },
        {
          id: 'yagoda-red',
          image: '/images/ya-color/yagoda-red.png',
          alt: 'Красная ягода',
        },
      ],
    },
    {
      phrase: 'КРАС-НА-Я КОР-ЗИ-НА',
      correct: 'korzina-red',
      options: [
        {
          id: 'korzina-not-red',
          image: '/images/ya-color/korzina-not-red.png',
          alt: 'Корзина не красная',
        },
        {
          id: 'korzina-red',
          image: '/images/ya-color/korzina-red.png',
          alt: 'Красная корзина',
        },
      ],
    },
    {
      phrase: 'КРАС-НА-Я РЫ-БА',
      correct: 'ryba-red',
      options: [
        {
          id: 'ryba-not-red',
          image: '/images/ya-color/ryba-not-red.png',
          alt: 'Рыба не красная',
        },
        {
          id: 'ryba-red',
          image: '/images/ya-color/ryba-red.png',
          alt: 'Красная рыба',
        },
      ],
    },
    {
      phrase: 'КРАС-НА-Я УТ-КА',
      correct: 'utka-red',
      options: [
        {
          id: 'utka-red',
          image: '/images/ya-color/utka-red.png',
          alt: 'Красная утка',
        },
        {
          id: 'utka-not-red',
          image: '/images/ya-color/utka-not-red.png',
          alt: 'Утка не красная',
        },
      ],
    },
    {
      phrase: 'КРАС-НА-Я СУМ-КА',
      correct: 'sumka-red',
      options: [
        {
          id: 'sumka-not-red',
          image: '/images/ya-color/sumka-not-red.png',
          alt: 'Сумка не красная',
        },
        {
          id: 'sumka-red',
          image: '/images/ya-color/sumka-red.png',
          alt: 'Красная сумка',
        },
      ],
    },
    {
      phrase: 'КРАС-НА-Я РО-ЗА',
      correct: 'roza-red',
      options: [
        {
          id: 'roza-red',
          image: '/images/ya-color/roza-red.png',
          alt: 'Красная роза',
        },
        {
          id: 'roza-not-red',
          image: '/images/ya-color/roza-not-red.png',
          alt: 'Роза не красная',
        },
      ],
    },
  ]

  const storyPanels = [
    {
      id: 'box-on-floor',
      image: '/images/ya-story/box-on-floor.png',
      alt: 'Розовая коробка на полу',
    },
    {
      id: 'ulyana-on-chair',
      image: '/images/ya-story/ulyana-on-chair.png',
      alt: 'Ульяна испугалась и запрыгнула на стул',
    },
    {
      id: 'bonka-in-box',
      image: '/images/ya-story/bonka-in-box.png',
      alt: 'Бонька в коробке',
    },
    {
      id: 'ulyana-happy',
      image: '/images/ya-story/ulyana-happy.png',
      alt: 'Ульяна рада',
    },
  ]

  const storyTasks = [
    {
      sentence:
        'КОГ-ДА У-ЛЬ-Я-НА ПРО-СНУ-ЛА-СЬ, НА ПО-ЛУ БЫ-ЛА РО-ЗО-ВА-Я КО-РОБ-КА.',
      image: '/images/ya-story/box-on-floor.png',
      alt: 'Розовая коробка на полу',
    },
    {
      sentence:
        'В-ДРУ-Г КО-РОБ-КА НА-ЧА-ЛА ДВИ-ГА-ТЬ-СЯ. У-ЛЬ-Я-НА ИС-ПУ-ГА-ЛА-СЬ И ЗА-ПРЫ-Г-НУ-ЛА НА СТУ-Л.',
      image: '/images/ya-story/ulyana-on-chair.png',
      alt: 'Ульяна испугалась и запрыгнула на стул',
    },
    {
      sentence:
        'ГАВ-ГАВ! — ГРОМ-КО ЗА-ЛА-ЯЛ КТО-ТО В-НУТ-РИ. У-ЛЬ-Я-НА ОТ-КРЫ-ЛА КО-РОБ-КУ. В-НУТ-РИ БЫЛ БО-НЬ-КА.',
      image: '/images/ya-story/bonka-in-box.png',
      alt: 'Бонька в коробке',
    },
    {
      sentence: 'У-ЛЬ-Я-НА БЫ-ЛА ТАК РА-ДА!',
      image: '/images/ya-story/ulyana-happy.png',
      alt: 'Ульяна рада',
    },
  ]

  const currentFirstWord = firstWords[firstWordIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentColorTask = colorTasks[colorIndex]
  const currentStoryTask = storyTasks[storyIndex]

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
    ctx.fillText('Я', width / 2, height / 2 + 10)
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

    drawLetterCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
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

  const nextFirstWord = () => {
    if (firstWordIndex < firstWords.length - 1) {
      setFirstWordIndex((prev) => prev + 1)
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

  const nextColorTask = () => {
    if (colorIndex < colorTasks.length - 1) {
      setColorIndex((prev) => prev + 1)
      setColorAnswer(null)
    } else {
      setStep(11)
    }
  }

  const nextStoryTask = () => {
    if (storyIndex < storyTasks.length - 1) {
      setStoryIndex((prev) => prev + 1)
    } else {
      setStep(14)
    }
  }

  const getImageChoiceStyle = (isSelected: boolean, isCorrect: boolean) =>
    ({
      border:
        isSelected && isCorrect
          ? '4px solid #49b96f'
          : isSelected && !isCorrect
            ? '4px solid #f05a5a'
            : '4px solid transparent',
      borderRadius: '24px',
      padding: '10px',
      background: '#ffffff',
      cursor: 'pointer',
    }) as const

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="yaIntroCard">
            <p className="eyebrow dark">Урок 21</p>

            <h1 className="lessonTitle">Буква Я</h1>

            <div className="yaFormula">
              <span className="yaFormulaPart">Й</span>
              <span className="yaFormulaPlus">+</span>
              <span className="yaFormulaPart">А</span>
              <span className="yaFormulaArrow">→</span>
              <span className="yaFormulaResult">Я</span>
            </div>

            <p className="lessonText">
              Послушай подсказку учителя.
            </p>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ya-explanations/inside.mp3')}
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
            <div className="letterLine">Я Я Я Я Я Я</div>
            <div className="letterLine">я я я я я я</div>
            <div className="letterLine">Я я Я я Я я</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-ya.mp3')}
          >
            ▶ Послушать букву
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
            <h1 className="taskTitle">Посмотри, как писать букву Я</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-ya.gif"
              alt="Как писать букву Я"
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
            <h1 className="taskTitle">Напиши букву Я пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Я.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">М-Я</span>
              <span className="joinSpace" />
              <span className="joinPurple">Т-Я</span>
              <span className="joinSpace" />
              <span className="joinPurple">К-Я</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">С-Я</span>
              <span className="joinSpace" />
              <span className="joinOrange">Г-Я</span>
              <span className="joinSpace" />
              <span className="joinOrange">Д-Я</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ya-joins/ya-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам. Соединяй звуки плавно.
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
              <span className="joinPurple">Я-М</span>
              <span className="joinSpace" />
              <span className="joinPurple">Я-Т</span>
              <span className="joinSpace" />
              <span className="joinPurple">Я-К</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">Я-С</span>
              <span className="joinSpace" />
              <span className="joinOrange">Я-Г</span>
              <span className="joinSpace" />
              <span className="joinOrange">Я-Д</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ya-joins/ya-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
            </p>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setFirstWordIndex(0)
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
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentFirstWord.audio)}
            >
              ▶
            </button>

            <img
              src={currentFirstWord.image}
              alt={currentFirstWord.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextFirstWord}>
            {firstWordIndex < firstWords.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 8 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 6</p>
            <h1 className="taskTitle">Читай слово</h1>
            <p className="lessonText">
              Прочитай слово на доске. Потом послушай аудио.
            </p>
          </section>

          <section className="yaWordBoardCard">
            <div className="yaBoard">
              {currentReadWord.word}
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentReadWord.audio)}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="yaQuestionCard">
            <div className="yaQuestionLine">ОНА.</div>
            <div className="yaQuestionLine">КА-КАЯ?</div>
            <div className="yaQuestionAnswer">КРАС-НА-Я.</div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ya-explanations/kakaya.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setColorIndex(0)
              setColorAnswer(null)
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
            <h1 className="taskTitle">Прочитай и выбери картинку</h1>
            <p className="lessonText">
              Прочитай фразу и выбери правильную картинку.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">
              {currentColorTask.phrase}
            </div>
          </section>

          <section className="readingCard">
            <div className="yaColorChoiceGrid">
              {currentColorTask.options.map((option) => {
                const isSelected = colorAnswer === option.id
                const isCorrect = option.id === currentColorTask.correct

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setColorAnswer(option.id)}
                    style={getImageChoiceStyle(isSelected, isCorrect)}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="pictureTaskImage"
                    />
                  </button>
                )
              })}
            </div>
          </section>

          {colorAnswer === currentColorTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {colorAnswer !== null &&
            colorAnswer !== currentColorTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {colorAnswer === currentColorTask.correct && (
            <button className="primaryButton" onClick={nextColorTask}>
              {colorIndex < colorTasks.length - 1
                ? 'Следующая фраза'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Познакомься с Ульяной</h1>
            <p className="lessonText">
              Посмотри на картинку. Послушай подсказку.
            </p>
          </section>

          <section className="yaUlyanaIntroCard">
            <img
              src="/images/ya-story/ulyana.png"
              alt="Ульяна"
              className="yaUlyanaImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ya-story/ulyana-intro.mp3')}
            >
              ▶ Послушать
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
            <h1 className="taskTitle">Послушай историю</h1>
            <p className="lessonText">
              Посмотри на картинки. Послушай историю про Ульяну.
            </p>
          </section>

          <section className="yaStoryListenCard">
            <div className="yaStoryListenGrid">
              {storyPanels.map((panel) => (
                <img
                  key={panel.id}
                  src={panel.image}
                  alt={panel.alt}
                  className="yaStoryPanelImage"
                />
              ))}
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ya-story/story.mp3')}
            >
              ▶ Послушать историю
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setStoryIndex(0)
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
            <h1 className="taskTitle">Прочитай историю</h1>
            <p className="lessonText">
              Прочитай отрывок и посмотри на картинку.
            </p>
          </section>

          <section className="yaStoryFragmentCard">
            <div className="yaStorySentence">
              {currentStoryTask.sentence}
            </div>

            <img
              src={currentStoryTask.image}
              alt={currentStoryTask.alt}
              className="yaStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={nextStoryTask}>
            {storyIndex < storyTasks.length - 1
              ? 'Следующий отрывок'
              : 'Завершить урок'}
          </button>
        </>
      )}

      {step === 14 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Я, прочитал слова с буквой Я и историю про
              Ульяну.
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

function LetterTsLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)

  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(null)
  const [matchedHotspots, setMatchedHotspots] = useState<Record<string, string>>({})
  const [hotspotFeedback, setHotspotFeedback] = useState('')

  const [moodOneAnswer, setMoodOneAnswer] = useState<string | null>(null)
  const [moodTwoAnswer, setMoodTwoAnswer] = useState<string | null>(null)

  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null)
  const [matchedFood, setMatchedFood] = useState<Record<string, string>>({})
  const [foodFeedback, setFoodFeedback] = useState('')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'цветок',
      image: '/images/ts-words/tsvetok.png',
      audio: '/audio/ts-words/tsvetok.mp3',
    },
    {
      word: 'цветы',
      image: '/images/ts-words/tsvety.png',
      audio: '/audio/ts-words/tsvety.mp3',
    },
    {
      word: 'цепь',
      image: '/images/ts-words/tsep.png',
      audio: '/audio/ts-words/tsep.mp3',
    },
    {
      word: 'цыплята',
      image: '/images/ts-words/tsyplyata.png',
      audio: '/audio/ts-words/tsyplyata.mp3',
    },
    {
      word: 'цвет',
      image: '/images/ts-words/tsvet.png',
      audio: '/audio/ts-words/tsvet.mp3',
    },
  ]

  const readWords = [
    {
      word: 'ЦЫП-ЦЫП',
      audio: '/audio/ts-read-words/tsyp-tsyp.mp3',
    },
    {
      word: 'ОВ-ЦЫ',
      audio: '/audio/ts-read-words/ov-tsy.mp3',
    },
    {
      word: 'КУ-РИ-ЦА',
      audio: '/audio/ts-read-words/ku-ri-tsa.mp3',
    },
    {
      word: 'У-ЛИ-ЦА',
      audio: '/audio/ts-read-words/u-li-tsa.mp3',
    },
    {
      word: 'ЦИРК',
      audio: '/audio/ts-read-words/tsirk.mp3',
    },
    {
      word: 'ЦА-РЬ',
      audio: '/audio/ts-read-words/tsa-r.mp3',
    },
  ]

  const storyPanels = [
    {
      id: 'story-1',
      image: '/images/ts-story/01-ulyana-bonka-kuritsa-tsyplyata.png',
      alt: 'Ульяна, Бонька, курица и цыплята',
      text:
        'У-ЛЬ-Я-НА И БО-НЬ-КА БЫ-ЛИ У БА-БУ-ЛИ. ТАМ В СА-ДУ ГУ-ЛЯ-ЛА КУ-РИ-ЦА С ЦЫП-ЛЯ-ТА-МИ.',
    },
    {
      id: 'story-2',
      image: '/images/ts-story/02-bonka-smotrit-na-tsyplyat.png',
      alt: 'Бонька рассматривает цыплят',
      text:
        'ПО-КА У-ЛЬ-Я-НА БРА-ЛА КОРМ, БО-НЬ-КА РАЗ-ГЛЯ-ДЫ-ВАЛ ЦЫП-ЛЯ-ТОК.',
    },
    {
      id: 'story-3',
      image: '/images/ts-story/03-korm-dlya-tsyplyat.png',
      alt: 'Ульяна поставила миску с кормом',
      text:
        'У-ЛЬ-Я-НА ПО-СТА-ВИ-ЛА МИС-КУ С КОР-МОМ НА ПОЛ. ЦЫП-ЛЯ-ТАМ ПО-НРА-ВИЛ-СЯ КОРМ. И БО-НЬ-КА ПО-ПРО-БО-ВАЛ КОРМ.',
    },
    {
      id: 'story-4',
      image: '/images/ts-story/04-bonka-poproboval-korm.png',
      alt: 'Бонька попробовал корм и высунул язык',
      text:
        'ОЙ-ОЙ-ОЙ! БО-НЬ-КА ВЫ-СУ-НУЛ Я-ЗЫК. СПА-СИ-БО, ЦЫП-ЛЯ-ТА, НО ЭТО КОРМ ДЛЯ ВАС!',
    },
    {
      id: 'story-5',
      image: '/images/ts-story/05-kolbasa-dlya-bonki.png',
      alt: 'Ульяна даёт Боньке колбасу',
      text:
        'А У У-ЛЬ-Я-НЫ ДЛЯ БО-НЬ-КИ КОЛ-БА-СА. — НА, БО-НЬ-КА, — ГО-ВО-РИТ У-ЛЬ-Я-НА.',
    },
  ]

  const hotspotSentences = [
    {
      id: 'ulyana',
      text: 'У-ЛЬ-Я-НА',
    },
    {
      id: 'bonka',
      text: 'БО-НЬ-КА',
    },
    {
      id: 'chicks',
      text: 'ЦЫП-ЛЯ-ТА',
    },
    {
      id: 'chicken',
      text: 'КУ-РИ-ЦА',
    },
  ]

  const hotspots = [
    {
      id: 'ulyana',
      className: 'tsHotspotUlyana',
    },
    {
      id: 'bonka',
      className: 'tsHotspotBonka',
    },
    {
      id: 'chicks',
      className: 'tsHotspotChicks',
    },
    {
      id: 'chicken',
      className: 'tsHotspotChicken',
    },
  ]

  const moodOptions = [
    {
      id: 'interested',
      emoji: '😮',
      label: 'У-ДИВ-ЛЁН-НЫЙ',
    },
    {
      id: 'happy',
      emoji: '😊',
      label: 'РА-ДОСТ-НЫЙ',
    },
    {
      id: 'sad',
      emoji: '😢',
      label: 'ГРУСТ-НЫЙ',
    },
  ]

  const foodAnimals = [
    {
      id: 'chick',
      label: 'ЦЫП-ЛЁ-НОК',
      image: '/images/ts-food/chick.png',
      correctFood: 'grain',
    },
    {
      id: 'dog',
      label: 'СО-БА-КА',
      image: '/images/ts-food/dog.png',
      correctFood: 'sausage',
    },
    {
      id: 'child',
      label: 'РЕ-БЁ-НОК',
      image: '/images/ts-food/child.png',
      correctFood: 'porridge',
    },
  ]

  const foodOptions = [
    {
      id: 'grain',
      label: 'ЗЕР-НО',
      image: '/images/ts-food/grain.png',
    },
    {
      id: 'sausage',
      label: 'КОЛ-БА-СА',
      image: '/images/ts-food/sausage.png',
    },
    {
      id: 'porridge',
      label: 'КА-ША',
      image: '/images/ts-food/porridge.png',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]

  const allHotspotsMatched = Object.keys(matchedHotspots).length === hotspotSentences.length
  const allFoodMatched = Object.keys(matchedFood).length === foodAnimals.length

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
    ctx.fillText('Ц', width / 2, height / 2 + 10)
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

    drawLetterCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
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
      setStep(10)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setStep(11)
    }
  }

  const handleHotspotSentenceSelect = (id: string) => {
    const alreadyMatched = Object.values(matchedHotspots).includes(
      hotspotSentences.find((item) => item.id === id)?.text ?? '',
    )

    if (alreadyMatched) return

    setSelectedSentenceId(id)
    setHotspotFeedback('')
  }

  const handleHotspotClick = (hotspotId: string) => {
    if (!selectedSentenceId) {
      setHotspotFeedback('Сначала выбери слово.')
      return
    }

    if (matchedHotspots[hotspotId]) return

    if (selectedSentenceId === hotspotId) {
      const sentence = hotspotSentences.find((item) => item.id === hotspotId)

      setMatchedHotspots((prev) => ({
        ...prev,
        [hotspotId]: sentence?.text ?? '',
      }))

      setSelectedSentenceId(null)
      setHotspotFeedback('Верно!')
    } else {
      setHotspotFeedback('Попробуй ещё раз.')
    }
  }

  const handleAnimalSelect = (animalId: string) => {
    if (matchedFood[animalId]) return

    setSelectedAnimalId(animalId)
    setFoodFeedback('')
  }

  const handleFoodClick = (foodId: string) => {
    if (!selectedAnimalId) {
      setFoodFeedback('Сначала выбери животное или ребёнка.')
      return
    }

    const selectedAnimal = foodAnimals.find((animal) => animal.id === selectedAnimalId)

    if (!selectedAnimal) return

    if (selectedAnimal.correctFood === foodId) {
      const food = foodOptions.find((item) => item.id === foodId)

      setMatchedFood((prev) => ({
        ...prev,
        [selectedAnimal.id]: food?.label ?? '',
      }))

      setSelectedAnimalId(null)
      setFoodFeedback('Верно!')
    } else {
      setFoodFeedback('Попробуй ещё раз.')
    }
  }

  const getImageChoiceStyle = (isSelected: boolean, isCorrect: boolean) =>
    ({
      border:
        isSelected && isCorrect
          ? '4px solid #49b96f'
          : isSelected && !isCorrect
            ? '4px solid #f05a5a'
            : '4px solid transparent',
      borderRadius: '24px',
      padding: '10px',
      background: '#ffffff',
      cursor: 'pointer',
    }) as const

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="tsIntroCard">
            <p className="eyebrow dark">Урок 28</p>

            <h1 className="lessonTitle">Буква Ц</h1>

            <div className="tsFormula">
              <span className="tsFormulaPart">Т</span>
              <span className="tsFormulaPlus">+</span>
              <span className="tsFormulaPart">С</span>
              <span className="tsFormulaArrow">→</span>
              <span className="tsFormulaResult">Ц</span>
            </div>

            <p className="lessonText">
              Послушай букву и подсказку учителя.
            </p>

            <div className="tsIntroButtons">
              <button
                className="audioButton secondaryAudio"
                onClick={() => playAudio('/audio/letters/letter-ts.mp3')}
              >
                ▶ Послушать букву
              </button>

              <button
                className="audioButton secondaryAudio"
                onClick={() => playAudio('/audio/ts-explanations/inside.mp3')}
              >
                ▶ Послушать подсказку
              </button>
            </div>
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
            <div className="letterLine">Ц Ц Ц Ц Ц Ц</div>
            <div className="letterLine">ц ц ц ц ц ц</div>
            <div className="letterLine">Ц ц Ц ц Ц ц</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-ts.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву Ц</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-ts.gif"
              alt="Как писать букву Ц"
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
            <h1 className="taskTitle">Напиши букву Ц пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Ц.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">Ц-А</span>
              <span className="joinSpace" />
              <span className="joinPurple">Ц-О</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">Ц-Э</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ц-Ы</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ц-У</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ts-joins/ts-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
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
              <span className="joinPurple">А-Ц</span>
              <span className="joinSpace" />
              <span className="joinPurple">О-Ц</span>
              <span className="joinSpace" />
              <span className="joinPurple">Э-Ц</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">У-Ц</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ы-Ц</span>
              <span className="joinSpace" />
              <span className="joinOrange">И-Ц</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ts-joins/ts-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
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
            <p className="eyebrow dark">Задание 4</p>
            <h1 className="taskTitle">Читай внимательно</h1>
            <p className="lessonText">
              Послушай разницу. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 3</p>

            <div className="joinTextLine">
              <span className="joinPurple">Ц-Ы</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ц-И</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ts-joins/ts-row-3.mp3')}
            >
              ▶ Послушать строку 3
            </button>

            <p className="joinInstruction">
              Теперь прочитай сам: Ц-Ы, Ц-И.
            </p>
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
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              ▶
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
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
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentReadWord.audio)}
          >
            ▶ Послушать слово
          </button>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Послушай историю</h1>
            <p className="lessonText">
              Посмотри на картинки. Послушай рассказ.
            </p>
          </section>

          <section className="tsStoryOverviewCard">
            <div className="tsStoryOverviewGrid">
              {storyPanels.map((panel, index) => (
                <div key={panel.id} className="tsStoryOverviewItem">
                  <div className="tsStoryNumber">{index + 1}</div>

                  <img
                    src={panel.image}
                    alt={panel.alt}
                    className="tsStoryOverviewImage"
                  />
                </div>
              ))}
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ts-story/story.mp3')}
            >
              ▶ Послушать историю
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
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
            <p className="lessonText">
              Прочитай текст и посмотри на картинку.
            </p>
          </section>

          <section className="tsStoryFragmentCard">
            <div className="tsStorySentence">{storyPanels[0].text}</div>

            <img
              src={storyPanels[0].image}
              alt={storyPanels[0].alt}
              className="tsStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(13)}>
            Дальше
          </button>
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Найди на картинке</h1>
            <p className="lessonText">
              Сначала нажми на слово. Потом нажми на нужное место на картинке.
            </p>
          </section>

          <section className="tsHotspotCard">
            <div className="tsHotspotSentenceList">
              {hotspotSentences.map((sentence) => {
                const isMatched = Object.values(matchedHotspots).includes(sentence.text)
                const isSelected = selectedSentenceId === sentence.id

                return (
                  <button
                    key={sentence.id}
                    type="button"
                    className={`tsHotspotSentenceButton ${
                      isSelected ? 'selected' : ''
                    } ${isMatched ? 'matched' : ''}`}
                    onClick={() => handleHotspotSentenceSelect(sentence.id)}
                    disabled={isMatched}
                  >
                    {sentence.text}
                  </button>
                )
              })}
            </div>

            <div className="tsHotspotImageWrap">
              <img
                src="/images/ts-story/01-ulyana-bonka-kuritsa-tsyplyata.png"
                alt="Ульяна, Бонька, курица и цыплята"
                className="tsHotspotImage"
              />

              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  className={`tsHotspot ${spot.className} ${
                    matchedHotspots[spot.id] ? 'matched' : ''
                  }`}
                  onClick={() => handleHotspotClick(spot.id)}
                >
                  {matchedHotspots[spot.id] ? matchedHotspots[spot.id] : ''}
                </button>
              ))}
            </div>

            {hotspotFeedback && (
              <p className="lessonText">{hotspotFeedback}</p>
            )}
          </section>

          {allHotspotsMatched && (
            <button className="primaryButton" onClick={() => setStep(14)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 14 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
            <p className="lessonText">
              Прочитай текст и посмотри на картинку.
            </p>
          </section>

          <section className="tsStoryFragmentCard">
            <div className="tsStorySentence">{storyPanels[1].text}</div>

            <img
              src={storyPanels[1].image}
              alt={storyPanels[1].alt}
              className="tsStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(15)}>
            Дальше
          </button>
        </>
      )}

      {step === 15 && (
        <>
          <section className="tsMoodCard">
            <p className="eyebrow dark">Задание 11</p>
            <h1 className="taskTitle">Как Бонька?</h1>

            <div className="tsMoodOptions">
              {moodOptions.map((option) => {
                const isSelected = moodOneAnswer === option.id
                const isCorrect = option.id === 'interested'

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`tsMoodButton ${
                      isSelected && isCorrect ? 'correct' : ''
                    } ${isSelected && !isCorrect ? 'wrong' : ''}`}
                    onClick={() => setMoodOneAnswer(option.id)}
                  >
                    <span className="tsMoodEmoji">{option.emoji}</span>
                    <span className="tsMoodLabel">{option.label}</span>
                  </button>
                )
              })}
            </div>

            {moodOneAnswer === 'interested' && (
              <p className="lessonText">Верно!</p>
            )}

            {moodOneAnswer !== null && moodOneAnswer !== 'interested' && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}
          </section>

          {moodOneAnswer === 'interested' && (
            <button className="primaryButton" onClick={() => setStep(16)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 16 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 12</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
            <p className="lessonText">
              Прочитай текст и посмотри на картинку.
            </p>
          </section>

          <section className="tsStoryFragmentCard">
            <div className="tsStorySentence">{storyPanels[2].text}</div>

            <img
              src={storyPanels[2].image}
              alt={storyPanels[2].alt}
              className="tsStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(17)}>
            Дальше
          </button>
        </>
      )}

      {step === 17 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 13</p>
            <h1 className="taskTitle">Соедини еду и животных</h1>
            <p className="lessonText">
              Сначала нажми на животное или ребёнка. Потом нажми на подходящую еду.
            </p>
          </section>

          <section className="tsFoodMatchCard">
            <div className="tsFoodColumns">
              <div className="tsFoodColumn">
                <h2 className="tsFoodColumnTitle">Кто?</h2>

                {foodAnimals.map((animal) => {
                  const isSelected = selectedAnimalId === animal.id
                  const isMatched = Boolean(matchedFood[animal.id])

                  return (
                    <button
                      key={animal.id}
                      type="button"
                      className={`tsFoodItem ${isSelected ? 'selected' : ''} ${
                        isMatched ? 'matched' : ''
                      }`}
                      onClick={() => handleAnimalSelect(animal.id)}
                      disabled={isMatched}
                    >
                      <img
                        src={animal.image}
                        alt={animal.label}
                        className="tsFoodImage"
                      />

                      <span className="tsFoodLabel">{animal.label}</span>

                      {isMatched && (
                        <span className="tsFoodMatchedText">
                          → {matchedFood[animal.id]}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="tsFoodColumn">
                <h2 className="tsFoodColumnTitle">Еда</h2>

                {foodOptions.map((food) => (
                  <button
                    key={food.id}
                    type="button"
                    className="tsFoodItem"
                    onClick={() => handleFoodClick(food.id)}
                  >
                    <img
                      src={food.image}
                      alt={food.label}
                      className="tsFoodImage"
                    />

                    <span className="tsFoodLabel">{food.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {foodFeedback && (
              <p className="lessonText">{foodFeedback}</p>
            )}
          </section>

          {allFoodMatched && (
            <button className="primaryButton" onClick={() => setStep(18)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 18 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 14</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
            <p className="lessonText">
              Прочитай текст и посмотри на картинку.
            </p>
          </section>

          <section className="tsStoryFragmentCard">
            <div className="tsStorySentence">{storyPanels[3].text}</div>

            <img
              src={storyPanels[3].image}
              alt={storyPanels[3].alt}
              className="tsStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(19)}>
            Дальше
          </button>
        </>
      )}

      {step === 19 && (
        <>
          <section className="tsMoodCard">
            <p className="eyebrow dark">Задание 15</p>
            <h1 className="taskTitle">Как Бонька?</h1>

            <div className="tsMoodOptions">
              {moodOptions.map((option) => {
                const isSelected = moodTwoAnswer === option.id
                const isCorrect = option.id === 'sad'

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`tsMoodButton ${
                      isSelected && isCorrect ? 'correct' : ''
                    } ${isSelected && !isCorrect ? 'wrong' : ''}`}
                    onClick={() => setMoodTwoAnswer(option.id)}
                  >
                    <span className="tsMoodEmoji">{option.emoji}</span>
                    <span className="tsMoodLabel">{option.label}</span>
                  </button>
                )
              })}
            </div>

            {moodTwoAnswer === 'sad' && (
              <p className="lessonText">Верно!</p>
            )}

            {moodTwoAnswer !== null && moodTwoAnswer !== 'sad' && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}
          </section>

          {moodTwoAnswer === 'sad' && (
            <button className="primaryButton" onClick={() => setStep(20)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 20 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 16</p>
            <h1 className="taskTitle">Прочитай конец истории</h1>
            <p className="lessonText">
              Прочитай текст и посмотри на картинку.
            </p>
          </section>

          <section className="tsStoryFragmentCard">
            <div className="tsStorySentence">{storyPanels[4].text}</div>

            <img
              src={storyPanels[4].image}
              alt={storyPanels[4].alt}
              className="tsStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(21)}>
            Завершить урок
          </button>
        </>
      )}

      {step === 21 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Ц, прочитал слова, познакомился с историей и выполнил задания.
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

function LetterYeLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)

  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [houseIndex, setHouseIndex] = useState(0)
  const [houseAnswer, setHouseAnswer] = useState<string | null>(null)
  const [houseFeedback, setHouseFeedback] = useState('')

  const [selectedTreeWordId, setSelectedTreeWordId] = useState<string | null>(
    null,
  )
  const [matchedTrees, setMatchedTrees] = useState<Record<string, string>>({})
  const [treeFeedback, setTreeFeedback] = useState('')

  const [selectedActionImageId, setSelectedActionImageId] = useState<
    string | null
  >(null)
  const [matchedActions, setMatchedActions] = useState<Record<string, string>>(
    {},
  )
  const [actionFeedback, setActionFeedback] = useState('')

  const [characterMarks, setCharacterMarks] = useState<
    Record<string, boolean | null>
  >({
    belka: null,
    bonka: null,
    ulyana: null,
  })
  const [characterFeedback, setCharacterFeedback] = useState('')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'енот',
      image: '/images/ye-words/enot.png',
      audio: '/audio/ye-words/enot.mp3',
    },
    {
      word: 'единорог',
      image: '/images/ye-words/edinorog.png',
      audio: '/audio/ye-words/edinorog.mp3',
    },
    {
      word: 'ежевика',
      image: '/images/ye-words/ezhevika.png',
      audio: '/audio/ye-words/ezhevika.mp3',
    },
    {
      word: 'ель',
      image: '/images/ye-words/el.png',
      audio: '/audio/ye-words/el.mp3',
    },
  ]

  const readWords = [
    {
      word: 'ЛЕС',
      audio: '/audio/ye-read-words/les.mp3',
    },
    {
      word: 'СЕЛ',
      audio: '/audio/ye-read-words/sel.mp3',
    },
    {
      word: 'БЕЛ-КА',
      audio: '/audio/ye-read-words/bel-ka.mp3',
    },
    {
      word: 'ГДЕ',
      audio: '/audio/ye-read-words/gde.mp3',
    },
    {
      word: 'ДА-ЛЕ-КО',
      audio: '/audio/ye-read-words/da-le-ko.mp3',
    },
  ]

  const houseTasks = [
    {
      sentence: 'КУК-ЛА В СПА-ЛЬ-НЕ.',
      correct: 'doll',
    },
    {
      sentence: 'КА-ПУС-ТА В ОГО-РО-ДЕ.',
      correct: 'cabbage',
    },
    {
      sentence: 'ПА-РО-ВОЗ В ВАН-НОЙ.',
      correct: 'train',
    },
    {
      sentence: 'РО-БОТ В ГОС-ТИН-НОЙ.',
      correct: 'robot',
    },
    {
      sentence: 'РЮК-ЗАК В КО-РИ-ДО-РЕ.',
      correct: 'backpack',
    },
  ]

  const houseSpots = [
    {
      id: 'doll',
      label: '1',
      className: 'yeHouseSpotDoll',
    },
    {
      id: 'cabbage',
      label: '2',
      className: 'yeHouseSpotCabbage',
    },
    {
      id: 'train',
      label: '3',
      className: 'yeHouseSpotTrain',
    },
    {
      id: 'robot',
      label: '4',
      className: 'yeHouseSpotRobot',
    },
    {
      id: 'backpack',
      label: '5',
      className: 'yeHouseSpotBackpack',
    },
  ]

  const storyPanels = [
    {
      id: 'story-1',
      image: '/images/ye-story/01-bonka-ulyana-v-lesu.png',
      alt: 'Бонька и Ульяна в лесу',
      text: 'БОНЬКА И УЛЬЯНА В ЛЕСУ. ТУТ СОСНЫ И ЕЛИ.',
    },
    {
      id: 'story-2',
      image: '/images/ye-story/02-ulyana-griby-bonka-belka.png',
      alt: 'Ульяна собирает грибы, Бонька видит белку',
      text: 'УЛЬЯНА СОБИРАЕТ ГРИБЫ. БОНЬКА ВИДИТ БЕЛКУ.',
    },
    {
      id: 'story-3',
      image: '/images/ye-story/03-belka-na-sosnu-el-bonka.png',
      alt: 'Белка на сосну, Бонька за ней',
      text: 'БЕЛКА НА СОСНУ — БОНЬКА ЗА НЕЙ. БЕЛКА НА ЕЛЬ — БОНЬКА ЗА НЕЙ.',
    },
    {
      id: 'story-4',
      image: '/images/ye-story/04-bonka-daleko-layet.png',
      alt: 'Бонька далеко и лает',
      text: 'ПОНЯЛ БОНЬКА, КАК ДАЛЕКО ОН. СТАЛ ЛАЯТЬ.',
    },
    {
      id: 'story-5',
      image: '/images/ye-story/05-ulyana-nashla-bonku.png',
      alt: 'Ульяна нашла Боньку',
      text: 'ВОТ ТЫ ГДЕ, БОНЬКА! — УЛЫБАЕТСЯ УЛЬЯНА.',
    },
  ]

  const treeWords = [
    {
      id: 'sosny',
      text: 'СОСНЫ',
    },
    {
      id: 'eli',
      text: 'ЕЛИ',
    },
  ]

  const treePictures = [
    {
      id: 'eli',
      image: '/images/ye-match/eli.png',
      alt: 'Ели',
    },
    {
      id: 'sosny',
      image: '/images/ye-match/sosny.png',
      alt: 'Сосны',
    },
  ]

  const actionPictures = [
    {
      id: 'bonka-begaet',
      image: '/images/ye-actions/bonka-begaet.png',
      alt: 'Бонька бегает',
      correct: 'begaet',
    },
    {
      id: 'belka-prygaet',
      image: '/images/ye-actions/belka-prygaet.png',
      alt: 'Белка прыгает',
      correct: 'prygaet',
    },
    {
      id: 'ulyana-sobiraet',
      image: '/images/ye-actions/ulyana-sobiraet-griby.png',
      alt: 'Ульяна собирает грибы',
      correct: 'sobiraet',
    },
  ]

  const actionWords = [
    {
      id: 'prygaet',
      text: 'ПРЫГАЕТ',
    },
    {
      id: 'sobiraet',
      text: 'СОБИРАЕТ',
    },
    {
      id: 'begaet',
      text: 'БЕГАЕТ',
    },
  ]

  const characters = [
    {
      id: 'belka',
      label: 'БЕЛ-КА',
      image: '/images/ye-characters/belka.png',
      correct: false,
    },
    {
      id: 'bonka',
      label: 'БОНЬ-КА',
      image: '/images/ye-characters/bonka.png',
      correct: true,
    },
    {
      id: 'ulyana',
      label: 'У-ЛЬ-Я-НА',
      image: '/images/ye-characters/ulyana.png',
      correct: false,
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentHouseTask = houseTasks[houseIndex]

  const allTreesMatched = Object.keys(matchedTrees).length === treeWords.length
  const allActionsMatched =
    Object.keys(matchedActions).length === actionPictures.length

  const allCharactersMarked = Object.values(characterMarks).every(
    (value) => value !== null,
  )

  const charactersAreCorrect = characters.every(
    (character) => characterMarks[character.id] === character.correct,
  )

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
    ctx.fillText('Е', width / 2, height / 2 + 10)
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

    drawLetterCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
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
      setHouseIndex(0)
      setHouseAnswer(null)
      setHouseFeedback('')
      setStep(9)
    }
  }

  const nextHouseTask = () => {
    if (houseIndex < houseTasks.length - 1) {
      setHouseIndex((prev) => prev + 1)
      setHouseAnswer(null)
      setHouseFeedback('')
    } else {
      setStep(10)
    }
  }

  const handleHouseSpotClick = (spotId: string) => {
    setHouseAnswer(spotId)

    if (spotId === currentHouseTask.correct) {
      setHouseFeedback('Верно!')
    } else {
      setHouseFeedback('Попробуй ещё раз.')
    }
  }

  const handleTreeWordSelect = (wordId: string) => {
    if (Object.values(matchedTrees).includes(wordId)) return

    setSelectedTreeWordId(wordId)
    setTreeFeedback('')
  }

  const handleTreePictureClick = (pictureId: string) => {
    if (!selectedTreeWordId) {
      setTreeFeedback('Сначала выбери слово.')
      return
    }

    if (matchedTrees[pictureId]) return

    if (selectedTreeWordId === pictureId) {
      const word = treeWords.find((item) => item.id === selectedTreeWordId)

      setMatchedTrees((prev) => ({
        ...prev,
        [pictureId]: word?.text ?? '',
      }))

      setSelectedTreeWordId(null)
      setTreeFeedback('Верно!')
    } else {
      setTreeFeedback('Попробуй ещё раз.')
    }
  }

  const handleActionImageSelect = (imageId: string) => {
    if (matchedActions[imageId]) return

    setSelectedActionImageId(imageId)
    setActionFeedback('')
  }

  const handleActionWordClick = (wordId: string) => {
    if (!selectedActionImageId) {
      setActionFeedback('Сначала выбери картинку.')
      return
    }

    const selectedPicture = actionPictures.find(
      (picture) => picture.id === selectedActionImageId,
    )

    if (!selectedPicture) return

    if (selectedPicture.correct === wordId) {
      const word = actionWords.find((item) => item.id === wordId)

      setMatchedActions((prev) => ({
        ...prev,
        [selectedPicture.id]: word?.text ?? '',
      }))

      setSelectedActionImageId(null)
      setActionFeedback('Верно!')
    } else {
      setActionFeedback('Попробуй ещё раз.')
    }
  }

  const handleCharacterMark = (characterId: string, value: boolean) => {
    setCharacterMarks((prev) => ({
      ...prev,
      [characterId]: value,
    }))

    setCharacterFeedback('')
  }

  const checkCharacters = () => {
    if (!allCharactersMarked) {
      setCharacterFeedback('Поставь галочку или крестик у каждой картинки.')
      return
    }

    if (charactersAreCorrect) {
      setCharacterFeedback('Верно!')
    } else {
      setCharacterFeedback('Попробуй ещё раз.')
    }
  }

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="yeIntroCard">
            <p className="eyebrow dark">Урок 23</p>

            <h1 className="lessonTitle">Буква Е</h1>

            <div className="yeFormula">
              <span className="yeFormulaPart">Й</span>
              <span className="yeFormulaPlus">+</span>
              <span className="yeFormulaPart">Э</span>
              <span className="yeFormulaArrow">→</span>
              <span className="yeFormulaResult">Е</span>
            </div>

            <p className="lessonText">
              Послушай букву и подсказку учителя.
            </p>

            <div className="yeIntroButtons">
              <button
                className="audioButton secondaryAudio"
                onClick={() => playAudio('/audio/letters/letter-ye.mp3')}
              >
                ▶ Послушать букву
              </button>

              <button
                className="audioButton secondaryAudio"
                onClick={() =>
                  playAudio('/audio/ye-explanations/inside.mp3')
                }
              >
                ▶ Послушать подсказку
              </button>
            </div>
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
            <div className="letterLine">Е Е Е Е Е Е</div>
            <div className="letterLine">е е е е е е</div>
            <div className="letterLine">Е е Е е Е е</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-ye.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву Е</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-ye.gif"
              alt="Как писать букву Е"
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
            <h1 className="taskTitle">Напиши букву Е пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Е.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">М-Е</span>
              <span className="joinSpace" />
              <span className="joinPurple">Т-Е</span>
              <span className="joinSpace" />
              <span className="joinPurple">К-Е</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">С-Е</span>
              <span className="joinSpace" />
              <span className="joinOrange">Г-Е</span>
              <span className="joinSpace" />
              <span className="joinOrange">Д-Е</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ye-joins/ye-row-1.mp3')}
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
              <span className="joinPurple">Е-М</span>
              <span className="joinSpace" />
              <span className="joinPurple">Е-Т</span>
              <span className="joinSpace" />
              <span className="joinPurple">Е-К</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">Е-С</span>
              <span className="joinSpace" />
              <span className="joinOrange">Е-Г</span>
              <span className="joinSpace" />
              <span className="joinOrange">Е-Д</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ye-joins/ye-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>
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
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              ▶
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
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
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentReadWord.audio)}
          >
            ▶ Послушать слово
          </button>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Найди место на картинке</h1>
            <p className="lessonText">
              Прочитай предложение. Потом нажми на правильный кружок на картинке.
            </p>
          </section>

          <section className="yeHouseTaskCard">
            <div className="yeHouseSentence">
              {currentHouseTask.sentence}
            </div>

            <div className="yeHouseImageWrap">
              <img
                src="/images/ye-house/house.png"
                alt="Дом с комнатами и садом"
                className="yeHouseImage"
              />

              {houseSpots.map((spot) => {
                const isSelected = houseAnswer === spot.id
                const isCorrect = spot.id === currentHouseTask.correct

                return (
                  <button
                    key={spot.id}
                    type="button"
                    className={`yeHouseSpot ${spot.className} ${
                      isSelected && isCorrect ? 'correct' : ''
                    } ${isSelected && !isCorrect ? 'wrong' : ''}`}
                    onClick={() => handleHouseSpotClick(spot.id)}
                  >
                    {spot.label}
                  </button>
                )
              })}
            </div>

            {houseFeedback && <p className="lessonText">{houseFeedback}</p>}
          </section>

          {houseAnswer === currentHouseTask.correct && (
            <button className="primaryButton" onClick={nextHouseTask}>
              {houseIndex < houseTasks.length - 1
                ? 'Следующее предложение'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Послушай историю</h1>
            <p className="lessonText">
              Посмотри на картинки. Послушай рассказ.
            </p>
          </section>

          <section className="yeStoryOverviewCard">
            <div className="yeStoryOverviewGrid">
              {storyPanels.map((panel, index) => (
                <div key={panel.id} className="yeStoryOverviewItem">
                  <div className="yeStoryNumber">{index + 1}</div>

                  <img
                    src={panel.image}
                    alt={panel.alt}
                    className="yeStoryOverviewImage"
                  />
                </div>
              ))}
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/ye-story/story.mp3')}
            >
              ▶ Послушать историю
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(11)}>
            Дальше
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
          </section>

          <section className="yeStoryFragmentCard">
            <div className="yeStorySentence">{storyPanels[0].text}</div>

            <img
              src={storyPanels[0].image}
              alt={storyPanels[0].alt}
              className="yeStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(12)}>
            Дальше
          </button>
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Соедини слово и картинку</h1>
            <p className="lessonText">
              Сначала нажми на слово. Потом нажми на правильную картинку.
            </p>
          </section>

          <section className="yeMatchCard">
            <div className="yeTreeWordRow">
              {treeWords.map((word) => {
                const isSelected = selectedTreeWordId === word.id
                const isMatched = Object.values(matchedTrees).includes(
                  word.text,
                )

                return (
                  <button
                    key={word.id}
                    type="button"
                    className={`yeMatchWordButton ${
                      isSelected ? 'selected' : ''
                    } ${isMatched ? 'matched' : ''}`}
                    onClick={() => handleTreeWordSelect(word.id)}
                    disabled={isMatched}
                  >
                    {word.text}
                  </button>
                )
              })}
            </div>

            <div className="yeTreePictureGrid">
              {treePictures.map((picture) => (
                <button
                  key={picture.id}
                  type="button"
                  className={`yeTreePictureButton ${
                    matchedTrees[picture.id] ? 'matched' : ''
                  }`}
                  onClick={() => handleTreePictureClick(picture.id)}
                >
                  <img
                    src={picture.image}
                    alt={picture.alt}
                    className="yeTreePicture"
                  />

                  {matchedTrees[picture.id] && (
                    <span className="yeMatchedLabel">
                      {matchedTrees[picture.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {treeFeedback && <p className="lessonText">{treeFeedback}</p>}
          </section>

          {allTreesMatched && (
            <button className="primaryButton" onClick={() => setStep(13)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 11</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
          </section>

          <section className="yeStoryFragmentCard">
            <div className="yeStorySentence">{storyPanels[1].text}</div>

            <img
              src={storyPanels[1].image}
              alt={storyPanels[1].alt}
              className="yeStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(14)}>
            Дальше
          </button>
        </>
      )}

      {step === 14 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 12</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
          </section>

          <section className="yeStoryFragmentCard">
            <div className="yeStorySentence">{storyPanels[2].text}</div>

            <img
              src={storyPanels[2].image}
              alt={storyPanels[2].alt}
              className="yeStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(15)}>
            Дальше
          </button>
        </>
      )}

      {step === 15 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 13</p>
            <h1 className="taskTitle">Соедини действие и картинку</h1>
            <p className="lessonText">
              Сначала нажми на картинку. Потом нажми на правильное слово.
            </p>
          </section>

          <section className="yeActionMatchCard">
            <div className="yeActionColumns">
              <div className="yeActionColumn">
                <h2 className="yeActionColumnTitle">Картинки</h2>

                {actionPictures.map((picture) => {
                  const isSelected = selectedActionImageId === picture.id
                  const isMatched = Boolean(matchedActions[picture.id])

                  return (
                    <button
                      key={picture.id}
                      type="button"
                      className={`yeActionImageButton ${
                        isSelected ? 'selected' : ''
                      } ${isMatched ? 'matched' : ''}`}
                      onClick={() => handleActionImageSelect(picture.id)}
                      disabled={isMatched}
                    >
                      <img
                        src={picture.image}
                        alt={picture.alt}
                        className="yeActionImage"
                      />

                      {isMatched && (
                        <span className="yeMatchedLabel">
                          {matchedActions[picture.id]}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="yeActionColumn">
                <h2 className="yeActionColumnTitle">Слова</h2>

                {actionWords.map((word) => (
                  <button
                    key={word.id}
                    type="button"
                    className="yeActionWordButton"
                    onClick={() => handleActionWordClick(word.id)}
                  >
                    {word.text}
                  </button>
                ))}
              </div>
            </div>

            {actionFeedback && <p className="lessonText">{actionFeedback}</p>}
          </section>

          {allActionsMatched && (
            <button className="primaryButton" onClick={() => setStep(16)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 16 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 14</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
          </section>

          <section className="yeStoryFragmentCard">
            <div className="yeStorySentence">{storyPanels[3].text}</div>

            <img
              src={storyPanels[3].image}
              alt={storyPanels[3].alt}
              className="yeStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(17)}>
            Дальше
          </button>
        </>
      )}

      {step === 17 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 15</p>
            <h1 className="taskTitle">Кто есть на картинке?</h1>
            <p className="lessonText">
              Поставь галочку, если герой есть на картинке. Поставь крестик,
              если его нет.
            </p>
          </section>

          <section className="yeCharacterCard">
            <div className="yeCharacterGrid">
              {characters.map((character) => (
                <div key={character.id} className="yeCharacterItem">
                  <img
                    src={character.image}
                    alt={character.label}
                    className="yeCharacterImage"
                  />

                  <div className="yeCharacterLabel">
                    {character.label}
                  </div>

                  <div className="yeCharacterButtons">
                    <button
                      type="button"
                      className={`yeMarkButton ${
                        characterMarks[character.id] === true ? 'selected' : ''
                      }`}
                      onClick={() => handleCharacterMark(character.id, true)}
                    >
                      ✓
                    </button>

                    <button
                      type="button"
                      className={`yeMarkButton ${
                        characterMarks[character.id] === false
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleCharacterMark(character.id, false)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="primaryButton smallPrimary"
              onClick={checkCharacters}
            >
              Проверить
            </button>

            {characterFeedback && (
              <p className="lessonText">{characterFeedback}</p>
            )}
          </section>

          {characterFeedback === 'Верно!' && (
            <button className="primaryButton" onClick={() => setStep(18)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 18 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 16</p>
            <h1 className="taskTitle">Прочитай конец истории</h1>
          </section>

          <section className="yeStoryFragmentCard">
            <div className="yeStorySentence">{storyPanels[4].text}</div>

            <img
              src={storyPanels[4].image}
              alt={storyPanels[4].alt}
              className="yeStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(19)}>
            Завершить урок
          </button>
        </>
      )}

      {step === 19 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Е, прочитал слова и историю про Боньку и
              Ульяну.
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

function LetterYoLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)

  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [listenIndex, setListenIndex] = useState(0)
  const [listenAnswer, setListenAnswer] = useState<string | null>(null)

  const [toyIndex, setToyIndex] = useState(0)
  const [toyAnswer, setToyAnswer] = useState<string | null>(null)

  const [selectedSortItemId, setSelectedSortItemId] = useState<string | null>(
    null,
  )
  const [sortedItems, setSortedItems] = useState<Record<string, string>>({})
  const [sortFeedback, setSortFeedback] = useState('')

  const [hardSoftIndex, setHardSoftIndex] = useState(0)
  const [hardSoftAnswer, setHardSoftAnswer] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'ёжик',
      image: '/images/yo-words/yozhik.png',
      audio: '/audio/yo-words/yozhik.mp3',
    },
    {
      word: 'ёршик',
      image: '/images/yo-words/yorshik.png',
      audio: '/audio/yo-words/yorshik.mp3',
    },
  ]

  const readWords = [
    {
      word: 'ЁЛ-КА',
      audio: '/audio/yo-read-words/yol-ka.mp3',
    },
    {
      word: 'МО-Ё',
      audio: '/audio/yo-read-words/mo-yo.mp3',
    },
    {
      word: 'ТВО-Ё',
      audio: '/audio/yo-read-words/tvo-yo.mp3',
    },
    {
      word: 'МЁД',
      audio: '/audio/yo-read-words/myod.mp3',
    },
    {
      word: 'СЁСТ-РЫ',
      audio: '/audio/yo-read-words/syost-ry.mp3',
    },
    {
      word: 'ЕЁ',
      audio: '/audio/yo-read-words/ye-yo.mp3',
    },
  ]

  const listenTasks = [
    {
      audio: '/audio/yo-listen/01-sestra.mp3',
      correct: 'Е',
    },
    {
      audio: '/audio/yo-listen/02-syostry.mp3',
      correct: 'Ё',
    },
    {
      audio: '/audio/yo-listen/03-letet.mp3',
      correct: 'Е',
    },
    {
      audio: '/audio/yo-listen/04-polyot.mp3',
      correct: 'Ё',
    },
    {
      audio: '/audio/yo-listen/05-myod.mp3',
      correct: 'Ё',
    },
    {
      audio: '/audio/yo-listen/06-medoviy.mp3',
      correct: 'Е',
    },
  ]

  const toyTasks = [
    {
      image: '/images/yo-pronouns/car.png',
      alt: 'Машинка',
      correct: 'ego',
    },
    {
      image: '/images/yo-pronouns/doll.png',
      alt: 'Кукла',
      correct: 'eyo',
    },
    {
      image: '/images/yo-pronouns/excavator.png',
      alt: 'Экскаватор',
      correct: 'ego',
    },
    {
      image: '/images/yo-pronouns/dollhouse.png',
      alt: 'Домик',
      correct: 'eyo',
    },
    {
      image: '/images/yo-pronouns/rocket.png',
      alt: 'Ракета',
      correct: 'ego',
    },
    {
      image: '/images/yo-pronouns/toy-kitchen.png',
      alt: 'Игрушечная кухня',
      correct: 'eyo',
    },
    {
      image: '/images/yo-pronouns/fire-truck.png',
      alt: 'Пожарная машина',
      correct: 'ego',
    },
  ]

  const storyPanels = [
    {
      id: 'story-1',
      image: '/images/yo-story/01-orehi-yagody.png',
      alt: 'У Боньки и Ульяны орехи и ягоды',
      text: 'У БО-НЬ-КИ И У-ЛЬ-Я-НЫ О-РЕ-ХИ И Я-ГО-ДЫ.',
    },
    {
      id: 'story-2',
      image: '/images/yo-story/02-ulyana-daet-oreh.png',
      alt: 'Ульяна даёт Боньке орех',
      text: 'У-ЛЬ-Я-НА ДА-ЁТ БО-НЬ-КЕ О-РЕХ — НА, БО-НЬ-КА, ЭТО ТВО-Ё.',
    },
    {
      id: 'story-3',
      image: '/images/yo-story/03-bonka-kusaet-oreh.png',
      alt: 'Бонька кусает орех',
      text: 'БО-НЬ-КА КУ-СА-ЕТ О-РЕХ — ТВЁР-ДЫ-Й!',
    },
    {
      id: 'story-4',
      image: '/images/yo-story/04-eto-tvoe.png',
      alt: 'Бонька возвращает орех Ульяне',
      text: 'НЕТ, У-ЛЬ-Я-НА. ЭТО ТВО-Ё.',
    },
  ]

  const sortItems = [
    {
      id: 'hazelnut',
      label: 'ЛЕС-НОЙ О-РЕХ',
      image: '/images/yo-sort/hazelnut.png',
      correct: 'nuts',
    },
    {
      id: 'raspberry',
      label: 'МА-ЛИ-НА',
      image: '/images/yo-sort/raspberry.png',
      correct: 'berries',
    },
    {
      id: 'strawberry',
      label: 'КЛУБ-НИ-КА',
      image: '/images/yo-sort/strawberry.png',
      correct: 'berries',
    },
    {
      id: 'cherry',
      label: 'ВИШ-НЯ',
      image: '/images/yo-sort/cherry.png',
      correct: 'berries',
    },
    {
      id: 'walnut',
      label: 'ГРЕЦ-КИЙ О-РЕХ',
      image: '/images/yo-sort/walnut.png',
      correct: 'nuts',
    },
    {
      id: 'peanut',
      label: 'А-РА-ХИС',
      image: '/images/yo-sort/peanut.png',
      correct: 'nuts',
    },
  ]

  const baskets = [
    {
      id: 'nuts',
      label: 'ОРЕХИ',
      image: '/images/yo-sort/basket-nuts.png',
    },
    {
      id: 'berries',
      label: 'ЯГОДЫ',
      image: '/images/yo-sort/basket-berries.png',
    },
  ]

  const hardSoftTasks = [
    {
      image: '/images/yo-hard-soft/nut.png',
      alt: 'Орех',
      correct: 'hard',
    },
    {
      image: '/images/yo-hard-soft/coconut.png',
      alt: 'Кокос',
      correct: 'hard',
    },
    {
      image: '/images/yo-hard-soft/jelly.png',
      alt: 'Желе',
      correct: 'soft',
    },
    {
      image: '/images/yo-hard-soft/puree.png',
      alt: 'Пюре',
      correct: 'soft',
    },
    {
      image: '/images/yo-hard-soft/sugar-cube.png',
      alt: 'Кусочек сахара',
      correct: 'hard',
    },
    {
      image: '/images/yo-hard-soft/rusk.png',
      alt: 'Сухарик',
      correct: 'hard',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]
  const currentListenTask = listenTasks[listenIndex]
  const currentToyTask = toyTasks[toyIndex]
  const currentHardSoftTask = hardSoftTasks[hardSoftIndex]

  const allSortItemsDone = Object.keys(sortedItems).length === sortItems.length

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
    ctx.fillText('Ё', width / 2, height / 2 + 10)
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

    drawLetterCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
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
      setStep(9)
    }
  }

  const nextReadWord = () => {
    if (readWordIndex < readWords.length - 1) {
      setReadWordIndex((prev) => prev + 1)
    } else {
      setListenIndex(0)
      setListenAnswer(null)
      setStep(10)
    }
  }

  const nextListenTask = () => {
    if (listenIndex < listenTasks.length - 1) {
      setListenIndex((prev) => prev + 1)
      setListenAnswer(null)
    } else {
      setStep(11)
    }
  }

  const nextToyTask = () => {
    if (toyIndex < toyTasks.length - 1) {
      setToyIndex((prev) => prev + 1)
      setToyAnswer(null)
    } else {
      setStep(13)
    }
  }

  const handleSortItemSelect = (itemId: string) => {
    if (sortedItems[itemId]) return

    setSelectedSortItemId(itemId)
    setSortFeedback('')
  }

  const handleBasketClick = (basketId: string) => {
    if (!selectedSortItemId) {
      setSortFeedback('Сначала выбери картинку.')
      return
    }

    const item = sortItems.find((sortItem) => sortItem.id === selectedSortItemId)

    if (!item) return

    if (item.correct === basketId) {
      setSortedItems((prev) => ({
        ...prev,
        [item.id]: basketId,
      }))

      setSelectedSortItemId(null)
      setSortFeedback('Верно!')
    } else {
      setSortFeedback('Попробуй ещё раз.')
    }
  }

  const nextHardSoftTask = () => {
    if (hardSoftIndex < hardSoftTasks.length - 1) {
      setHardSoftIndex((prev) => prev + 1)
      setHardSoftAnswer(null)
    } else {
      setStep(20)
    }
  }

  const getTextChoiceStyle = (isSelected: boolean, isCorrect: boolean) =>
    ({
      minWidth: '140px',
      padding: '18px 28px',
      border:
        isSelected && isCorrect
          ? '4px solid #49b96f'
          : isSelected && !isCorrect
            ? '4px solid #f05a5a'
            : '4px solid transparent',
      borderRadius: '22px',
      background: '#ffffff',
      fontSize: '32px',
      fontWeight: 800,
      cursor: 'pointer',
    }) as const

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="yoIntroCard">
            <p className="eyebrow dark">Урок 24</p>

            <h1 className="lessonTitle">Буква Ё</h1>

            <div className="yoFormula">
              <span className="yoFormulaPart">Й</span>
              <span className="yoFormulaPlus">+</span>
              <span className="yoFormulaPart">О</span>
              <span className="yoFormulaArrow">→</span>
              <span className="yoFormulaResult">Ё</span>
            </div>

            <p className="lessonText">
              Послушай букву и подсказку учителя.
            </p>

            <div className="yoIntroButtons">
              <button
                className="audioButton secondaryAudio"
                onClick={() => playAudio('/audio/letters/letter-yo.mp3')}
              >
                ▶ Послушать букву
              </button>

              <button
                className="audioButton secondaryAudio"
                onClick={() =>
                  playAudio('/audio/yo-explanations/inside.mp3')
                }
              >
                ▶ Послушать подсказку
              </button>
            </div>
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
            <div className="letterLine">Ё Ё Ё Ё Ё Ё</div>
            <div className="letterLine">ё ё ё ё ё ё</div>
            <div className="letterLine">Ё ё Ё ё Ё ё</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-yo.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву Ё</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-yo.gif"
              alt="Как писать букву Ё"
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
            <h1 className="taskTitle">Напиши букву Ё пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Ё.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">М-Ё</span>
              <span className="joinSpace" />
              <span className="joinPurple">Т-Ё</span>
              <span className="joinSpace" />
              <span className="joinPurple">К-Ё</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">С-Ё</span>
              <span className="joinSpace" />
              <span className="joinOrange">Г-Ё</span>
              <span className="joinSpace" />
              <span className="joinOrange">Д-Ё</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/yo-joins/yo-row-1.mp3')}
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
              <span className="joinPurple">Ё-М</span>
              <span className="joinSpace" />
              <span className="joinPurple">Ё-Т</span>
              <span className="joinSpace" />
              <span className="joinPurple">Ё-К</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">Ё-С</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ё-Г</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ё-Д</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/yo-joins/yo-row-2.mp3')}
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
            <h1 className="taskTitle">Сравни Е и Ё</h1>
            <p className="lessonText">
              Послушай разницу. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 3</p>

            <div className="joinTextLine">
              <span className="joinPurple">Т-Е</span>
              <span className="joinSpace" />
              <span className="joinOrange">Т-Ё</span>
            </div>

            <div className="joinTextLine">
              <span className="joinPurple">Д-Е</span>
              <span className="joinSpace" />
              <span className="joinOrange">Д-Ё</span>
            </div>

            <div className="joinTextLine">
              <span className="joinPurple">Р-Е</span>
              <span className="joinSpace" />
              <span className="joinOrange">Р-Ё</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/yo-joins/yo-row-3.mp3')}
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
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              ▶
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
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
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentReadWord.audio)}
          >
            ▶ Послушать слово
          </button>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Е или Ё?</h1>
            <p className="lessonText">
              Послушай слово и выбери, какая буква спряталась.
            </p>
          </section>

          <section className="yoListenLetterCard">
            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio(currentListenTask.audio)}
            >
              ▶ Послушать слово
            </button>

            <div className="yoLetterChoiceRow">
              {['Е', 'Ё'].map((letter) => {
                const isSelected = listenAnswer === letter
                const isCorrect = currentListenTask.correct === letter

                return (
                  <button
                    key={letter}
                    type="button"
                    style={getTextChoiceStyle(isSelected, isCorrect)}
                    onClick={() => setListenAnswer(letter)}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          </section>

          {listenAnswer === currentListenTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {listenAnswer !== null &&
            listenAnswer !== currentListenTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {listenAnswer === currentListenTask.correct && (
            <button className="primaryButton" onClick={nextListenTask}>
              {listenIndex < listenTasks.length - 1
                ? 'Следующее слово'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Его или её?</h1>
            <p className="lessonText">
              Посмотри на картинку. Потом послушай подсказку.
            </p>
          </section>

          <section className="yoPronounIntroCard">
            <img
              src="/images/yo-pronouns/boy-girl-toys.png"
              alt="Мальчик и девочка с игрушками"
              className="yoPronounIntroImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() =>
                playAudio('/audio/yo-pronouns/his-her-explanation.mp3')
              }
            >
              ▶ Послушать подсказку
            </button>
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setToyIndex(0)
              setToyAnswer(null)
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
            <h1 className="taskTitle">Выбери: его или её</h1>
            <p className="lessonText">
              Посмотри на игрушку и выбери правильное слово.
            </p>
          </section>

          <section className="yoToyCard">
            <img
              src={currentToyTask.image}
              alt={currentToyTask.alt}
              className="yoToyImage"
            />

            <div className="yoLetterChoiceRow">
              <button
                type="button"
                style={getTextChoiceStyle(
                  toyAnswer === 'ego',
                  currentToyTask.correct === 'ego',
                )}
                onClick={() => setToyAnswer('ego')}
              >
                ЕГО
              </button>

              <button
                type="button"
                style={getTextChoiceStyle(
                  toyAnswer === 'eyo',
                  currentToyTask.correct === 'eyo',
                )}
                onClick={() => setToyAnswer('eyo')}
              >
                ЕЁ
              </button>
            </div>
          </section>

          {toyAnswer === currentToyTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {toyAnswer !== null && toyAnswer !== currentToyTask.correct && (
            <p className="lessonText">Попробуй ещё раз.</p>
          )}

          {toyAnswer === currentToyTask.correct && (
            <button className="primaryButton" onClick={nextToyTask}>
              {toyIndex < toyTasks.length - 1
                ? 'Следующая игрушка'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Послушай историю</h1>
            <p className="lessonText">
              Посмотри на картинки. Послушай рассказ.
            </p>
          </section>

          <section className="yoStoryOverviewCard">
            <div className="yoStoryOverviewGrid">
              {storyPanels.map((panel, index) => (
                <div key={panel.id} className="yoStoryOverviewItem">
                  <div className="yoStoryNumber">{index + 1}</div>

                  <img
                    src={panel.image}
                    alt={panel.alt}
                    className="yoStoryOverviewImage"
                  />
                </div>
              ))}
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/yo-story/story.mp3')}
            >
              ▶ Послушать историю
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(14)}>
            Дальше
          </button>
        </>
      )}

      {step === 14 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 11</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
          </section>

          <section className="yoStoryFragmentCard">
            <div className="yoStorySentence">{storyPanels[0].text}</div>

            <img
              src={storyPanels[0].image}
              alt={storyPanels[0].alt}
              className="yoStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(15)}>
            Дальше
          </button>
        </>
      )}

      {step === 15 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 12</p>
            <h1 className="taskTitle">Разложи по корзинкам</h1>
            <p className="lessonText">
              Сначала нажми на картинку. Потом нажми на правильную корзинку.
            </p>
          </section>

          <section className="yoSortCard">
            <div className="yoBasketGrid">
              {baskets.map((basket) => (
                <button
                  key={basket.id}
                  type="button"
                  className="yoBasketButton"
                  onClick={() => handleBasketClick(basket.id)}
                >
                  <img
                    src={basket.image}
                    alt={basket.label}
                    className="yoBasketImage"
                  />

                  <div className="yoBasketLabel">{basket.label}</div>

                  <div className="yoBasketItems">
                    {sortItems
                      .filter((item) => sortedItems[item.id] === basket.id)
                      .map((item) => (
                        <span key={item.id} className="yoBasketItemName">
                          {item.label}
                        </span>
                      ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="yoSortItemsGrid">
              {sortItems
                .filter((item) => !sortedItems[item.id])
                .map((item) => {
                  const isSelected = selectedSortItemId === item.id

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`yoSortItemButton ${
                        isSelected ? 'selected' : ''
                      }`}
                      onClick={() => handleSortItemSelect(item.id)}
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        className="yoSortItemImage"
                      />

                      <span className="yoSortItemLabel">{item.label}</span>
                    </button>
                  )
                })}
            </div>

            {sortFeedback && <p className="lessonText">{sortFeedback}</p>}
          </section>

          {allSortItemsDone && (
            <button className="primaryButton" onClick={() => setStep(16)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 16 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 13</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
          </section>

          <section className="yoStoryFragmentCard">
            <div className="yoStorySentence">{storyPanels[1].text}</div>

            <img
              src={storyPanels[1].image}
              alt={storyPanels[1].alt}
              className="yoStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(17)}>
            Дальше
          </button>
        </>
      )}

      {step === 17 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 14</p>
            <h1 className="taskTitle">Прочитай отрывок</h1>
          </section>

          <section className="yoStoryFragmentCard">
            <div className="yoStorySentence">{storyPanels[2].text}</div>

            <img
              src={storyPanels[2].image}
              alt={storyPanels[2].alt}
              className="yoStoryFragmentImage"
            />
          </section>

          <button
            className="primaryButton"
            onClick={() => {
              setHardSoftIndex(0)
              setHardSoftAnswer(null)
              setStep(18)
            }}
          >
            Дальше
          </button>
        </>
      )}

      {step === 18 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 15</p>
            <h1 className="taskTitle">Мягкое или твёрдое?</h1>
            <p className="lessonText">
              Посмотри на картинку и выбери правильное слово.
            </p>
          </section>

          <section className="yoHardSoftCard">
            <img
              src={currentHardSoftTask.image}
              alt={currentHardSoftTask.alt}
              className="yoHardSoftImage"
            />

            <div className="yoLetterChoiceRow">
              <button
                type="button"
                style={getTextChoiceStyle(
                  hardSoftAnswer === 'soft',
                  currentHardSoftTask.correct === 'soft',
                )}
                onClick={() => setHardSoftAnswer('soft')}
              >
                МЯГ-КО-Е
              </button>

              <button
                type="button"
                style={getTextChoiceStyle(
                  hardSoftAnswer === 'hard',
                  currentHardSoftTask.correct === 'hard',
                )}
                onClick={() => setHardSoftAnswer('hard')}
              >
                ТВЁР-ДО-Е
              </button>
            </div>
          </section>

          {hardSoftAnswer === currentHardSoftTask.correct && (
            <p className="lessonText">Верно!</p>
          )}

          {hardSoftAnswer !== null &&
            hardSoftAnswer !== currentHardSoftTask.correct && (
              <p className="lessonText">Попробуй ещё раз.</p>
            )}

          {hardSoftAnswer === currentHardSoftTask.correct && (
            <button className="primaryButton" onClick={nextHardSoftTask}>
              {hardSoftIndex < hardSoftTasks.length - 1
                ? 'Следующая картинка'
                : 'Дальше'}
            </button>
          )}
        </>
      )}

      {step === 20 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 16</p>
            <h1 className="taskTitle">Прочитай конец истории</h1>
          </section>

          <section className="yoStoryFragmentCard">
            <div className="yoStorySentence">{storyPanels[3].text}</div>

            <img
              src={storyPanels[3].image}
              alt={storyPanels[3].alt}
              className="yoStoryFragmentImage"
            />
          </section>

          <button className="primaryButton" onClick={() => setStep(21)}>
            Завершить урок
          </button>
        </>
      )}

      {step === 21 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Ё, прочитал слова и историю про Боньку и
              Ульяну.
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

function LetterHLesson({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1)

  const [pictureIndex, setPictureIndex] = useState(0)
  const [readWordIndex, setReadWordIndex] = useState(0)

  const [animalAnswerOne, setAnimalAnswerOne] = useState<string | null>(null)
  const [animalAnswerTwo, setAnimalAnswerTwo] = useState<string | null>(null)
  const [drawAnswer, setDrawAnswer] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)

  const pictureTasks = [
    {
      word: 'хамелеон',
      image: '/images/h-words/hameleon.png',
      audio: '/audio/h-words/hameleon.mp3',
    },
    {
      word: 'художник',
      image: '/images/h-words/hudozhnik.png',
      audio: '/audio/h-words/hudozhnik.mp3',
    },
    {
      word: 'хоккей',
      image: '/images/h-words/hokkey.png',
      audio: '/audio/h-words/hokkey.mp3',
    },
    {
      word: 'халат',
      image: '/images/h-words/halat.png',
      audio: '/audio/h-words/halat.mp3',
    },
    {
      word: 'хлеб',
      image: '/images/h-words/hleb.png',
      audio: '/audio/h-words/hleb.mp3',
    },
  ]

  const readWords = [
    {
      word: 'УХО',
      audio: '/audio/h-read-words/uho.mp3',
    },
    {
      word: 'ХО-БОТ',
      audio: '/audio/h-read-words/ho-bot.mp3',
    },
    {
      word: 'ХО-МЯК',
      audio: '/audio/h-read-words/ho-myak.mp3',
    },
    {
      word: 'ХВОСТ',
      audio: '/audio/h-read-words/hvost.mp3',
    },
    {
      word: 'ХО-ТЕЛ',
      audio: '/audio/h-read-words/ho-tel.mp3',
    },
  ]

  const animalOptions = [
    {
      id: 'elephant',
      label: 'СЛОН',
      image: '/images/h-story/elephant.png',
      alt: 'Слон',
    },
    {
      id: 'hamster',
      label: 'ХО-МЯК',
      image: '/images/h-story/hamster.png',
      alt: 'Хомяк',
    },
    {
      id: 'peacock',
      label: 'ПАВ-ЛИН',
      image: '/images/h-story/peacock.png',
      alt: 'Павлин',
    },
  ]

  const drawOptions = [
    {
      id: 'hobot',
      label: 'ХО-БОТ',
      image: '/images/h-choice/hobot.png',
      alt: 'Хобот',
    },
    {
      id: 'peacock-tail',
      label: 'ХВОСТ',
      image: '/images/h-choice/peacock-tail.png',
      alt: 'Павлиний хвост',
    },
    {
      id: 'hamster-cheeks',
      label: 'ЩЁ-КИ',
      image: '/images/h-choice/hamster-cheeks.png',
      alt: 'Щёки хомяка',
    },
  ]

  const currentPicture = pictureTasks[pictureIndex]
  const currentReadWord = readWords[readWordIndex]

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
    ctx.fillText('Х', width / 2, height / 2 + 10)
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

    drawLetterCanvasBase(ctx, rect.width, rect.height)
  }

  useEffect(() => {
    if (step === 4) {
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

  const getImageChoiceStyle = (isSelected: boolean, isCorrect: boolean) =>
    ({
      border:
        isSelected && isCorrect
          ? '4px solid #49b96f'
          : isSelected && !isCorrect
            ? '4px solid #f05a5a'
            : '4px solid transparent',
      borderRadius: '24px',
      padding: '10px',
      background: '#ffffff',
      cursor: 'pointer',
    }) as const

  return (
    <main className="app">
      <button className="backButton" onClick={onBack}>
        ← Назад к урокам
      </button>

      {step === 1 && (
        <>
          <section className="letterIntro">
            <p className="eyebrow dark">Урок 27</p>

            <div className="redLetters">
              <span className="bigRedLetter">Х</span>
              <span className="smallRedLetter">х</span>
            </div>

            <h1 className="lessonTitle">Буква Х</h1>

            <p className="lessonText">
              Сначала послушай, как учитель читает букву.
            </p>

            <button
              className="audioButton"
              onClick={() => playAudio('/audio/letters/letter-h.mp3')}
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
            <div className="letterLine">Х Х Х Х Х Х</div>
            <div className="letterLine">х х х х х х</div>
            <div className="letterLine">Х х Х х Х х</div>
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio('/audio/letters/letter-h.mp3')}
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
            <h1 className="taskTitle">Посмотри, как писать букву Х</h1>
            <p className="lessonText">
              Посмотри на образец. Потом попробуй написать букву сам.
            </p>
          </section>

          <section className="sampleCard">
            <img
              src="/gifs/write/letter-h.gif"
              alt="Как писать букву Х"
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
            <h1 className="taskTitle">Напиши букву Х пальцем</h1>
            <p className="lessonText">
              Веди пальцем или мышкой по экрану и рисуй большую букву Х.
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
              onClick={() => setStep(5)}
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
            <h1 className="taskTitle">Читай буквы вместе</h1>
            <p className="lessonText">
              Сначала послушай первую строку. Потом прочитай сам.
            </p>
          </section>

          <section className="joinReadingCard">
            <p className="joinRowTitle">Строка 1</p>

            <div className="joinTextLine">
              <span className="joinPurple">Х-А</span>
              <span className="joinSpace" />
              <span className="joinPurple">Х-О</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">Х-Э</span>
              <span className="joinSpace" />
              <span className="joinOrange">Х-Ы</span>
              <span className="joinSpace" />
              <span className="joinOrange">Х-У</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/h-joins/h-row-1.mp3')}
            >
              ▶ Послушать строку 1
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
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
              <span className="joinPurple">А-Х</span>
              <span className="joinSpace" />
              <span className="joinPurple">О-Х</span>
              <span className="joinSpace" />
              <span className="joinPurple">Э-Х</span>
            </div>

            <div className="joinTextLine">
              <span className="joinOrange">У-Х</span>
              <span className="joinSpace" />
              <span className="joinOrange">Ы-Х</span>
              <span className="joinSpace" />
              <span className="joinOrange">И-Х</span>
            </div>

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/h-joins/h-row-2.mp3')}
            >
              ▶ Послушать строку 2
            </button>

            <p className="joinInstruction">
              Теперь прочитай эту строку сам.
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
              Посмотри на картинку. Назови слово. Какая буква первая?
            </p>
          </section>

          <section className="pictureTaskCard">
            <button
              className="hintButton"
              onClick={() => playAudio(currentPicture.audio)}
            >
              ▶
            </button>

            <img
              src={currentPicture.image}
              alt={currentPicture.word}
              className="pictureTaskImage"
            />

            <div className="pictureQuestion">
              <p className="pictureQuestionText">
                Назови. Какая буква первая?
              </p>
            </div>
          </section>

          <button className="primaryButton" onClick={nextPictureTask}>
            {pictureIndex < pictureTasks.length - 1
              ? 'Следующая картинка'
              : 'Дальше'}
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
          </section>

          <button
            className="audioButton secondaryAudio"
            onClick={() => playAudio(currentReadWord.audio)}
          >
            ▶ Послушать слово
          </button>

          <button className="primaryButton" onClick={nextReadWord}>
            {readWordIndex < readWords.length - 1
              ? 'Следующее слово'
              : 'Дальше'}
          </button>
        </>
      )}

      {step === 9 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 7</p>
            <h1 className="taskTitle">Прочитай текст</h1>
            <p className="lessonText">
              Прочитай предложение. Потом послушай подсказку.
            </p>
          </section>

          <section className="hStoryFragmentCard">
            <div className="hStorySentence">
              У-ЛЬ-Я-НА РИ-СО-ВА-ЛА, А БО-НЬ-КА СМОТ-РЕЛ.
            </div>

            <img
              src="/images/h-story/01-ulyana-risuet-bonka-smotrit.png"
              alt="Ульяна рисовала, а Бонька смотрел"
              className="hStoryFragmentImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() =>
                playAudio('/audio/h-story/01-ulyana-risuet-bonka-smotrit.mp3')
              }
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(10)}>
            Дальше
          </button>
        </>
      )}

      {step === 10 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 8</p>
            <h1 className="taskTitle">Прочитай текст</h1>
            <p className="lessonText">
              Прочитай предложение. Потом послушай подсказку.
            </p>
          </section>

          <section className="hStoryFragmentCard">
            <div className="hStorySentence">
              ВОТ НА БУ-МА-ГЕ ХО-БОТ И СЕ-РО-Е У-ХО. КТО ЭТО?
            </div>

            <img
              src="/images/h-story/02-hobot-i-uho.png"
              alt="На бумаге хобот и серое ухо"
              className="hStoryFragmentImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/h-story/02-hobot-i-uho.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(11)}>
            Дальше
          </button>
        </>
      )}

      {step === 11 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 9</p>
            <h1 className="taskTitle">Кто это?</h1>
            <p className="lessonText">
              Посмотри на картинки и выбери правильный ответ.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">КТО ЭТО?</div>
          </section>

          <section className="hChoiceCard">
            <div className="hThreeChoiceGrid">
              {animalOptions.map((option) => {
                const isSelected = animalAnswerOne === option.id
                const isCorrect = option.id === 'elephant'

                return (
                  <button
                    key={option.id}
                    type="button"
                    style={getImageChoiceStyle(isSelected, isCorrect)}
                    onClick={() => setAnimalAnswerOne(option.id)}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="hChoiceImage"
                    />

                    <div className="hChoiceLabel">{option.label}</div>
                  </button>
                )
              })}
            </div>
          </section>

          {animalAnswerOne === 'elephant' && (
            <p className="lessonText">Верно!</p>
          )}

          {animalAnswerOne !== null && animalAnswerOne !== 'elephant' && (
            <p className="lessonText">Попробуй ещё раз.</p>
          )}

          {animalAnswerOne === 'elephant' && (
            <button className="primaryButton" onClick={() => setStep(12)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 12 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 10</p>
            <h1 className="taskTitle">Прочитай текст</h1>
            <p className="lessonText">
              Прочитай предложение. Потом послушай подсказку.
            </p>
          </section>

          <section className="hStoryFragmentCard">
            <div className="hStorySentence">
              А ВОТ РАЗ-НО-ЦВЕТ-НЫЙ, ДЛИН-НЫЙ ХВОСТ. А ЭТО КТО?
            </div>

            <img
              src="/images/h-story/03-dlinnyy-hvost.png"
              alt="Разноцветный длинный хвост"
              className="hStoryFragmentImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() => playAudio('/audio/h-story/03-dlinnyy-hvost.mp3')}
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(13)}>
            Дальше
          </button>
        </>
      )}

      {step === 13 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 11</p>
            <h1 className="taskTitle">А кто это?</h1>
            <p className="lessonText">
              Посмотри на картинки и выбери правильный ответ.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">А КТО ЭТО?</div>
          </section>

          <section className="hChoiceCard">
            <div className="hThreeChoiceGrid">
              {animalOptions.map((option) => {
                const isSelected = animalAnswerTwo === option.id
                const isCorrect = option.id === 'peacock'

                return (
                  <button
                    key={option.id}
                    type="button"
                    style={getImageChoiceStyle(isSelected, isCorrect)}
                    onClick={() => setAnimalAnswerTwo(option.id)}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="hChoiceImage"
                    />

                    <div className="hChoiceLabel">{option.label}</div>
                  </button>
                )
              })}
            </div>
          </section>

          {animalAnswerTwo === 'peacock' && (
            <p className="lessonText">Верно!</p>
          )}

          {animalAnswerTwo !== null && animalAnswerTwo !== 'peacock' && (
            <p className="lessonText">Попробуй ещё раз.</p>
          )}

          {animalAnswerTwo === 'peacock' && (
            <button className="primaryButton" onClick={() => setStep(14)}>
              Дальше
            </button>
          )}
        </>
      )}

      {step === 14 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 12</p>
            <h1 className="taskTitle">Прочитай текст</h1>
            <p className="lessonText">
              Прочитай предложение. Потом послушай подсказку.
            </p>
          </section>

          <section className="hStoryFragmentCard">
            <div className="hStorySentence">
              БО-НЬ-КА ХО-ТЕЛ НА-РИ-СО-ВА-ТЬ ХО-МЯ-КА. КАК БЫТЬ?
            </div>

            <img
              src="/images/h-story/04-bonka-hochet-homyaka.png"
              alt="Бонька хотел нарисовать хомяка"
              className="hStoryFragmentImage"
            />

            <button
              className="audioButton secondaryAudio"
              onClick={() =>
                playAudio('/audio/h-story/04-bonka-hochet-homyaka.mp3')
              }
            >
              ▶ Послушать
            </button>
          </section>

          <button className="primaryButton" onClick={() => setStep(15)}>
            Дальше
          </button>
        </>
      )}

      {step === 15 && (
        <>
          <section className="taskHeader">
            <p className="eyebrow dark">Задание 13</p>
            <h1 className="taskTitle">Что нарисовать?</h1>
            <p className="lessonText">
              Выбери, что нужно нарисовать для хомяка.
            </p>
          </section>

          <section className="readSingleWordCard">
            <div className="rStoryChoiceSentence">ЧТО НА-РИ-СО-ВА-ТЬ?</div>
          </section>

          <section className="hChoiceCard">
            <div className="hThreeChoiceGrid">
              {drawOptions.map((option) => {
                const isSelected = drawAnswer === option.id
                const isCorrect = option.id === 'hamster-cheeks'

                return (
                  <button
                    key={option.id}
                    type="button"
                    style={getImageChoiceStyle(isSelected, isCorrect)}
                    onClick={() => setDrawAnswer(option.id)}
                  >
                    <img
                      src={option.image}
                      alt={option.alt}
                      className="hChoiceImage"
                    />

                    <div className="hChoiceLabel">{option.label}</div>
                  </button>
                )
              })}
            </div>
          </section>

          {drawAnswer === 'hamster-cheeks' && (
            <p className="lessonText">Верно!</p>
          )}

          {drawAnswer !== null && drawAnswer !== 'hamster-cheeks' && (
            <p className="lessonText">Попробуй ещё раз.</p>
          )}

          {drawAnswer === 'hamster-cheeks' && (
            <button className="primaryButton" onClick={() => setStep(16)}>
              Завершить урок
            </button>
          )}
        </>
      )}

      {step === 16 && (
        <>
          <section className="successCard">
            <div className="successIcon">✓</div>
            <h1 className="taskTitle">Молодец!</h1>
            <p className="lessonText">
              Ты послушал букву Х, прочитал слова и помог Боньке понять,
              кого он хотел нарисовать.
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
  return <LetterNLesson onBack={() => setSelectedLesson(null)} />
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
  return <LetterLLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 18) {
  return <LetterSoftSignLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 19) {
  return <LetterVLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 20) {
  return <LetterYLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 21) {
  return <LetterZLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 22) {
  return <LetterYaLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 23) {
  return <LetterTsLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 24) {
  return <LetterYeLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 25) {
  return <LetterHLesson onBack={() => setSelectedLesson(null)} />
}

if (selectedLesson?.id === 26) {
  return <LetterYoLesson onBack={() => setSelectedLesson(null)} />
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