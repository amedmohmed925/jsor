import React from 'react'

const DownloadApp = () => {
  return (
    <section className='mt-5'>
        <div className="container">
        <div className="mx-auto text-center">
            <h1 className="app-title mx-auto mb-4">احصل على تطبيقنا المحمول المجاني</h1>
            <p className="app-description mx-auto mb-4">
            انضم إلينا الآن! حمل تطبيقنا مجانًا من App Store أو Play Store واكتشف أفضل الخدمات والميزات التي تسهل حياتك. لا تفوت الفرصة، حمل التطبيق الآن واستمتع بتجربة لا مثيل لها!
            </p>

            <div className="d-flex justify-content-center align-items-center gap-3 mb-5">
              <img src="../assets/Google Play.png" alt="Google" />
              <img src="../assets/App Store.png" alt="App" />
            </div>
            <img src="../assets/mobiles.jpg" className='container-fluid' alt="mobiles" />
          </div>
        </div>
    </section>
  )
}

export default DownloadApp
