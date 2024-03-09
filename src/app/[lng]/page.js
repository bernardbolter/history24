import { useTranslation } from "../i18n"

const Home = async ({ params: { lng} }) => {
  const { t } = await useTranslation(lng, 'common')
  
  return (
    <section className="home-container">
      <h1>{t('aColorfulHistory')}</h1>
    </section>
  )
}

export default Home