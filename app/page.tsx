import Link from "next/link";
import Header from "@/components/Header";
import Art from "@/components/Art";
import CardView from "@/components/CardView";
import Gallery from "@/components/Gallery";
import Icon from "@/components/Icon";
import { OCCASIONS, getOccasion } from "@/lib/occasions";
import { sampleCard } from "@/lib/sample";

export default function Home() {
  const heroCards = [
    sampleCard(getOccasion("sevgililer"), 1, { to: "Can", fr: "Elif", m: "Kalbimin en güzel köşesi hep senin." }),
    sampleCard(getOccasion("yilbasi"), 0, { to: "Ali", fr: "Zeynep", m: "Yeni yıl sana sağlık, huzur ve bolca güzel an getirsin." }),
    sampleCard(getOccasion("dogum-gunu"), 0, { m: "Yeni yaşın kocaman bir mutluluk olsun. İyi ki varsın!" }),
  ];

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-text">
              <span className="pill">Ücretsiz, üyelik yok</span>
              <h1>
                Sevdiklerine <span className="hl">minik bir mutluluk</span> gönder
              </h1>
              <p className="lead">
                Özel günü seç, hazır tasarımlardan birini al ya da kartını kendin tasarla. Kartın bir linke
                dönüşsün; WhatsApp&apos;tan, e-postayla ya da mesajla istediğin kişiye gönder.
              </p>
              <div className="hero-actions">
                <Link href="/olustur" className="btn btn-primary btn-lg">
                  Kart oluştur <Icon name="arrowRight" />
                </Link>
                <Link href="#ornekler" className="btn btn-ghost btn-lg">
                  Tasarımlara bak
                </Link>
              </div>
              <ul className="hero-points">
                <li><Icon name="check" size={18} /> {OCCASIONS.length} özel gün, {OCCASIONS.reduce((n, o) => n + o.templates.length, 0)} hazır tasarım</li>
                <li><Icon name="check" size={18} /> Açılınca zarftan çıkan kart</li>
              </ul>
            </div>
            <div className="hero-stack" aria-hidden="true">
              {heroCards.map((c, i) => (
                <div key={i} className={`hero-card hero-card-${i}`}>
                  <CardView card={c} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gunler" className="section">
          <div className="wrap">
            <div className="section-head">
              <h2>Hangi gün için?</h2>
              <p>Bir gün seç, gerisi çok kolay.</p>
            </div>
            <div className="occasion-grid">
              {OCCASIONS.map((o) => (
                <Link key={o.id} href={`/olustur?gun=${o.id}`} className="occasion-tile" style={{ background: o.tint }}>
                  <div className="occasion-art">
                    <Art kind={o.art} ac={o.templates[0].ac === "#FFFFFF" ? "#FF6F91" : o.templates[0].ac} />
                  </div>
                  <strong>{o.name}</strong>
                  <span>{o.hint}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="ornekler" className="section section-soft">
          <div className="wrap">
            <div className="section-head">
              <h2>Tasarım örnekleri</h2>
              <p>Beğendiğine dokun, yazını ekle, gönder. İstersen renklerini de değiştir.</p>
            </div>
            <Gallery />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <h2>Nasıl çalışır?</h2>
            </div>
            <ol className="steps">
              <li>
                <span className="step-num">1</span>
                <div className="step-art"><Art kind="gift" ac="#FF8A5B" /></div>
                <h3>Günü seç</h3>
                <p>Doğum günü, yılbaşı, geçmiş olsun... Hangi gün olursa olsun bir kartımız var.</p>
              </li>
              <li>
                <span className="step-num">2</span>
                <div className="step-art"><Art kind="flower" ac="#C06BE0" /></div>
                <h3>Tasarla ve yaz</h3>
                <p>Hazır tasarım seç ya da renkleri, çizimi, deseni ve yazı tipini kendin belirle.</p>
              </li>
              <li>
                <span className="step-num">3</span>
                <div className="step-art"><Art kind="envelope" ac="#4A8FE2" /></div>
                <h3>Linki gönder</h3>
                <p>Kartın bir linke dönüşür. Alıcı linki açınca zarf açılır, kart süzülerek çıkar.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="cta">
              <div className="cta-art"><Art kind="bear" ac="#FF6F91" /></div>
              <div>
                <h2>Bugün kimi mutlu etmek istersin?</h2>
                <p>Bir dakikada hazır, bir ömür hatırlanır.</p>
              </div>
              <Link href="/olustur" className="btn btn-light btn-lg">
                Hemen başla <Icon name="arrowRight" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap">Kartçık, sevgiyle yapıldı.</div>
      </footer>
    </>
  );
}
