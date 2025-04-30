import { useTranslation } from "react-i18next"

function LangSwitch() {
    const { i18n } = useTranslation()

    const lngs: Record<'en' | 'pt', { nativeName: string }> = {
        en: { nativeName: 'English' },
        pt: { nativeName: 'Português' }
    }

    return (
        <div>
            {/* Mapear as linguagens */}
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
    )
}

export default LangSwitch