"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CardData, CardDesign } from "@/lib/types";
import { ARTS, EFFECTS, FONTS, FRAMES, OCCASIONS, PALETTES, PATTERNS, designOf, getOccasion } from "@/lib/occasions";
import { encodeCard } from "@/lib/encode";
import { downloadCard, slug } from "@/lib/download";
import CardView from "./CardView";
import Art from "./Art";
import Effects from "./Effects";
import Icon from "./Icon";

const STEPS = ["Özel gün", "Tasarım", "Mesaj", "Gönder"] as const;
const MAX_MSG = 300;
const DRAFT_KEY = "kartcik-taslak";

interface Props {
  initialOccasion: string;
  initialTemplate: number;
  initialTo?: string;
  initialFrom?: string;
  fresh: boolean; // URL'de seçim yoksa taslak yüklenebilir
}

function initialCard(p: Props): CardData {
  const occ = getOccasion(p.initialOccasion);
  const t = occ.templates[p.initialTemplate] ?? occ.templates[0];
  return {
    ...designOf(t),
    o: occ.id,
    t: occ.title,
    to: p.initialTo ?? "",
    fr: p.initialFrom ?? "",
    m: occ.messages[0],
  };
}

export default function Editor(props: Props) {
  const [card, setCard] = useState<CardData>(() => initialCard(props));
  const [step, setStep] = useState(props.fresh ? 0 : 1);
  const [mode, setMode] = useState<"hazir" | "ozel">("hazir");
  const [showAll, setShowAll] = useState(false);
  const [msgTouched, setMsgTouched] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const [play, setPlay] = useState(0);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  const occ = getOccasion(card.o);

  // Taslağı yükle (yalnızca boş açılışta) ve kaydet
  useEffect(() => {
    setOrigin(window.location.origin);
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
    if (props.fresh) {
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (raw) {
          const d = JSON.parse(raw) as CardData;
          if (d && typeof d.m === "string" && OCCASIONS.some((o) => o.id === d.o)) {
            setCard(d);
            setMsgTouched(true);
            setTitleTouched(true);
          }
        }
      } catch {}
    }
    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(card));
    } catch {}
  }, [card]);

  const update = (patch: Partial<CardData>) => setCard((c) => ({ ...c, ...patch }));
  const applyDesign = (d: CardDesign) => update(designOf(d));

  const chooseOccasion = (id: string) => {
    const o = getOccasion(id);
    setCard((c) => ({
      ...c,
      ...designOf(o.templates[0]),
      o: o.id,
      t: titleTouched ? c.t : o.title,
      m: msgTouched ? c.m : o.messages[0],
    }));
    setShowAll(false);
    goTo(1);
  };

  const goTo = (s: number) => {
    setStep(s);
    requestAnimationFrame(() => {
      const top = panelRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0 || window.innerWidth < 900) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const missing = [
    !card.to.trim() && "alıcının adı",
    !card.fr.trim() && "senin adın",
    !card.m.trim() && "mesaj",
  ].filter(Boolean) as string[];

  const link = useMemo(() => (origin ? `${origin}/kart?k=${encodeCard({ ...card, to: card.to.trim(), fr: card.fr.trim(), m: card.m.trim(), t: card.t.trim() })}` : ""), [card, origin]);
  const shareText = `${card.fr.trim() || "Biri"} sana bir kart gönderdi! Açmak için dokun:`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const el = document.getElementById("share-link") as HTMLInputElement | null;
      el?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: card.t || "Bir kartın var", text: shareText, url: link });
    } catch {}
  };

  const download = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      await downloadCard(cardRef.current, slug(`${occ.name}-${card.to}`));
    } catch {
      alert("Resim oluşturulamadı, lütfen tekrar dene.");
    }
    setBusy(false);
  };

  const enc = encodeURIComponent;
  const templates = showAll ? OCCASIONS.flatMap((o) => o.templates.map((t) => ({ t, o }))) : occ.templates.map((t) => ({ t, o: occ }));
  const isSolid = card.b1 === card.b2;

  return (
    <div className="editor wrap">
      <Effects kind={card.fx} play={play} />

      <section className="editor-preview">
        <div className="preview-sticky">
          <div className="preview-card">
            <CardView ref={cardRef} card={card} />
          </div>
          <div className="preview-actions">
            <span className="preview-label">
              <span className="dot" style={{ background: card.ac === "#FFFFFF" ? card.b2 : card.ac }} />
              {occ.name}
            </span>
            {card.fx !== "none" && (
              <button className="btn btn-ghost btn-sm" onClick={() => setPlay((p) => p + 1)}>
                <Icon name="replay" size={16} /> Efekti oynat
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="editor-panel" ref={panelRef}>
        <ol className="stepper">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button className={`stepper-btn ${i === step ? "on" : ""} ${i < step ? "done" : ""}`} onClick={() => goTo(i)}>
                <span className="stepper-num">{i < step ? <Icon name="check" size={14} /> : i + 1}</span>
                <span className="stepper-label">{s}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="panel-body">
          {step === 0 && (
            <>
              <h2 className="panel-title">Hangi gün için kart hazırlıyorsun?</h2>
              <div className="pick-grid">
                {OCCASIONS.map((o) => (
                  <button
                    key={o.id}
                    className={`pick-occ ${o.id === card.o ? "on" : ""}`}
                    style={{ "--tint": o.tint } as React.CSSProperties}
                    onClick={() => chooseOccasion(o.id)}
                  >
                    <span className="pick-occ-art">
                      <Art kind={o.art} ac={o.templates[0].ac === "#FFFFFF" ? "#FF6F91" : o.templates[0].ac} />
                    </span>
                    <span>{o.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="panel-title">Kartının görünüşü</h2>
              <div className="segmented" role="tablist">
                <button className={mode === "hazir" ? "on" : ""} onClick={() => setMode("hazir")}>
                  <Icon name="grid" size={18} /> Hazır tasarımlar
                </button>
                <button className={mode === "ozel" ? "on" : ""} onClick={() => setMode("ozel")}>
                  <Icon name="palette" size={18} /> Kendin tasarla
                </button>
              </div>

              {mode === "hazir" ? (
                <>
                  <div className="tpl-grid">
                    {templates.map(({ t, o }, i) => {
                      const on =
                        t.b1 === card.b1 && t.b2 === card.b2 && t.a === card.a && t.p === card.p && t.f === card.f && t.fm === card.fm;
                      return (
                        <button key={o.id + i} className={`tpl ${on ? "on" : ""}`} onClick={() => applyDesign(t)}>
                          <div className="tpl-card">
                            <CardView card={{ ...card, ...designOf(t), m: card.m.slice(0, 90) }} />
                          </div>
                          <span>{t.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button className="link-btn" onClick={() => setShowAll((v) => !v)}>
                    {showAll ? `Sadece ${occ.name} tasarımlarını göster` : "Diğer günlerin tasarımlarını da göster"}
                  </button>
                  <p className="muted small">
                    Bir tasarımı seçip <button className="link-btn inline" onClick={() => setMode("ozel")}>Kendin tasarla</button> sekmesinde
                    istediğin gibi değiştirebilirsin.
                  </p>
                </>
              ) : (
                <div className="custom">
                  <div className="field">
                    <label>Renk paleti</label>
                    <div className="palette-row">
                      {Object.entries(PALETTES).map(([k, p]) => {
                        const on = p.b1 === card.b1 && (p.b2 === card.b2 || isSolid) && p.ac === card.ac;
                        return (
                          <button
                            key={k}
                            title={p.name}
                            aria-label={p.name}
                            className={`swatch ${on ? "on" : ""}`}
                            style={{ background: `linear-gradient(135deg, ${p.b1} 0 50%, ${p.b2} 50% 100%)` }}
                            onClick={() => update({ b1: p.b1, b2: isSolid ? p.b1 : p.b2, ik: p.ik, ac: p.ac })}
                          >
                            <span style={{ background: p.ac }} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="field">
                    <label>Renkleri ince ayarla</label>
                    <div className="color-row">
                      <ColorInput label="Arka plan" value={card.b1} onChange={(v) => update(isSolid ? { b1: v, b2: v } : { b1: v })} />
                      {!isSolid && <ColorInput label="Geçiş rengi" value={card.b2} onChange={(v) => update({ b2: v })} />}
                      <ColorInput label="Yazı" value={card.ik} onChange={(v) => update({ ik: v })} />
                      <ColorInput label="Süs rengi" value={card.ac} onChange={(v) => update({ ac: v })} />
                    </div>
                    <label className="check">
                      <input
                        type="checkbox"
                        checked={isSolid}
                        onChange={(e) => {
                          const pal = Object.values(PALETTES).find((p) => p.b1 === card.b1);
                          update({ b2: e.target.checked ? card.b1 : pal?.b2 ?? shiftColor(card.b1) });
                        }}
                      />
                      Düz renk (geçişsiz)
                    </label>
                  </div>

                  <div className="field">
                    <label>Çizim</label>
                    <div className="art-row">
                      {ARTS.map((a) => (
                        <button
                          key={a.key}
                          className={`art-btn ${card.a === a.key ? "on" : ""}`}
                          onClick={() => update({ a: a.key })}
                          title={a.name}
                        >
                          {a.key === "none" ? <span className="art-none">Yok</span> : <Art kind={a.key} ac={card.ac === "#FFFFFF" ? "#FF6F91" : card.ac} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>Desen</label>
                    <div className="chips">
                      {PATTERNS.map((p) => (
                        <button key={p.key} className={`chip ${card.p === p.key ? "on" : ""}`} onClick={() => update({ p: p.key })}>
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>Yazı tipi</label>
                    <div className="chips">
                      {FONTS.map((f) => (
                        <button
                          key={f.key}
                          className={`chip chip-font ${card.f === f.key ? "on" : ""}`}
                          style={{ fontFamily: f.css }}
                          onClick={() => update({ f: f.key })}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field-2">
                    <div className="field">
                      <label>Çerçeve</label>
                      <div className="chips">
                        {FRAMES.map((f) => (
                          <button key={f.key} className={`chip ${card.fm === f.key ? "on" : ""}`} onClick={() => update({ fm: f.key })}>
                            {f.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="field">
                      <label>Açılış efekti</label>
                      <div className="chips">
                        {EFFECTS.map((f) => (
                          <button
                            key={f.key}
                            className={`chip ${card.fx === f.key ? "on" : ""}`}
                            onClick={() => {
                              update({ fx: f.key });
                              setPlay((p) => p + 1);
                            }}
                          >
                            {f.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="panel-title">Ne yazmak istersin?</h2>
              <div className="field-2">
                <div className="field">
                  <label htmlFor="to">Kime?</label>
                  <input id="to" className="input" maxLength={40} placeholder="Alıcının adı" value={card.to} onChange={(e) => update({ to: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="fr">Kimden?</label>
                  <input id="fr" className="input" maxLength={40} placeholder="Senin adın" value={card.fr} onChange={(e) => update({ fr: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="title">
                  Başlık
                  {card.t !== occ.title && (
                    <button className="link-btn inline small" onClick={() => { update({ t: occ.title }); setTitleTouched(false); }}>
                      varsayılana dön
                    </button>
                  )}
                </label>
                <input
                  id="title"
                  className="input"
                  maxLength={60}
                  value={card.t}
                  onChange={(e) => {
                    update({ t: e.target.value });
                    setTitleTouched(true);
                  }}
                />
              </div>
              <div className="field">
                <label htmlFor="msg">
                  Mesajın <span className="muted small">{card.m.length}/{MAX_MSG}</span>
                </label>
                <textarea
                  id="msg"
                  className="input textarea"
                  maxLength={MAX_MSG}
                  rows={5}
                  value={card.m}
                  onChange={(e) => {
                    update({ m: e.target.value });
                    setMsgTouched(true);
                  }}
                />
              </div>
              <div className="field">
                <label>Hazır mesajlar</label>
                <div className="suggestions">
                  {occ.messages.map((m) => (
                    <button
                      key={m}
                      className={`suggestion ${card.m === m ? "on" : ""}`}
                      onClick={() => {
                        update({ m });
                        setMsgTouched(true);
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {missing.length > 0 ? (
                <div className="notice">
                  <h2 className="panel-title">Az kaldı!</h2>
                  <p>Kartı göndermeden önce şunları eklemelisin: <strong>{missing.join(", ")}</strong>.</p>
                  <button className="btn btn-primary" onClick={() => goTo(2)}>
                    <Icon name="pen" size={18} /> Mesaja dön
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="panel-title">Kartın hazır, şimdi gönder</h2>
                  <p className="muted">
                    Aşağıdaki linki <strong>{card.to}</strong> ile paylaş. Linke tıklayınca zarf açılacak ve kartı görecek.
                  </p>
                  <div className="link-box">
                    <Icon name="link" size={18} />
                    <input id="share-link" readOnly value={link} onFocus={(e) => e.target.select()} aria-label="Kart linki" />
                    <button className="btn btn-primary btn-sm" onClick={copy}>
                      {copied ? <><Icon name="check" size={16} /> Kopyalandı</> : <><Icon name="copy" size={16} /> Kopyala</>}
                    </button>
                  </div>
                  <div className="share-grid">
                    <a className="share-btn wa" href={`https://wa.me/?text=${enc(`${shareText} ${link}`)}`} target="_blank" rel="noreferrer">
                      <Icon name="chat" /> WhatsApp
                    </a>
                    <a className="share-btn mail" href={`mailto:?subject=${enc(`${card.fr} sana bir kart gönderdi`)}&body=${enc(`Merhaba ${card.to},\n\n${shareText}\n${link}\n`)}`}>
                      <Icon name="mail" /> E-posta
                    </a>
                    <a className="share-btn sms" href={`sms:?&body=${enc(`${shareText} ${link}`)}`}>
                      <Icon name="phone" /> SMS
                    </a>
                    <a className="share-btn tg" href={`https://t.me/share/url?url=${enc(link)}&text=${enc(shareText)}`} target="_blank" rel="noreferrer">
                      <Icon name="send" /> Telegram
                    </a>
                    {canShare && (
                      <button className="share-btn other" onClick={nativeShare}>
                        <Icon name="share" /> Diğer
                      </button>
                    )}
                  </div>
                  <div className="send-extra">
                    <a className="btn btn-ghost" href={link} target="_blank" rel="noreferrer">
                      <Icon name="eye" size={18} /> Alıcı gibi gör
                    </a>
                    <button className="btn btn-ghost" onClick={download} disabled={busy}>
                      <Icon name="download" size={18} /> {busy ? "Hazırlanıyor..." : "Resim olarak indir"}
                    </button>
                  </div>
                  <p className="muted small">
                    Kart bilgileri linkin içinde saklanır, hiçbir yere kaydedilmez. Linke sahip olan herkes kartı görebilir.
                  </p>
                </>
              )}
            </>
          )}
        </div>

        <div className="panel-nav">
          {step > 0 ? (
            <button className="btn btn-ghost" onClick={() => goTo(step - 1)}>
              <Icon name="arrowLeft" size={18} /> Geri
            </button>
          ) : (
            <Link href="/" className="btn btn-ghost">
              <Icon name="arrowLeft" size={18} /> Ana sayfa
            </Link>
          )}
          {step < 3 && (
            <button className="btn btn-primary" onClick={() => goTo(step + 1)}>
              {step === 2 ? "Gönderime geç" : "İleri"} <Icon name="arrowRight" size={18} />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function shiftColor(hex: string) {
  // Düz renkten geçişe dönerken biraz daha koyu ikinci bir ton üret
  const n = parseInt(hex.slice(1), 16);
  const ch = (s: number) => Math.max(0, ((n >> s) & 255) - 28).toString(16).padStart(2, "0");
  return `#${ch(16)}${ch(8)}${ch(0)}`;
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="color-input">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value.toUpperCase())} />
      <span>{label}</span>
    </label>
  );
}
