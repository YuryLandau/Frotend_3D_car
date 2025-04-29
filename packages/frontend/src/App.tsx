import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import './App.scss'

const lngs: Record<'en' | 'pt', { nativeName: string }> = {
  en: { nativeName: 'English' },
  pt: { nativeName: 'Português' }
}

function App() {
  const { t, i18n } = useTranslation()
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <div>
        <div>
          {Object.keys(lngs).map((lng: string) => {
            return <button
              type='submit'
              key={lng}
              disabled={i18n.resolvedLanguage === lng}
              onClick={() => {
                i18n.changeLanguage(lng)
              }}>
              {lngs[lng as keyof typeof lngs].nativeName}
            </button>
          })}
        </div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {t('count_is')}{count}
        </button>
        <p>
          <Trans>

            Edit <code>src/App.tsx</code> and save to test HMR
          </Trans>

        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
