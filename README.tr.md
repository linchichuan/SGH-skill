# SGH Japan Assistant Skill

<p align="center">
  <img src="assets/sgh-icon.png" alt="SGH Phone" width="88">
</p>

<p align="center">
  <a href="README.md">日本語</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <a href="README.en.md">English</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.tr.md">Türkçe</a>
</p>

![SGH Japan Assistant — Japonya'daki telefon ve rezervasyon taleplerini net bir özete dönüştürün](assets/sgh-skill-hero.png)

> **MVP / Private beta** — Bu repository Agent Skill, Streamable HTTP `/mcp`, dokuz araç, OAuth resource-server doğrulaması, SGH Service adapter, Supabase migration ve otomatik testleri içerir. Önerilen production URL, deployment ve OAuth smoke test tamamlanmadan canlı kabul edilmez.

## Japonca telefon görüşmesini tek başınıza halletmek zorunda değilsiniz.

**Japonya'daki telefon, rezervasyon ve teyit ihtiyaçlarınızı AI ile düzenleyip SGH'ye iletin.**

Restoran rezervasyonu, otel bilgisi, klinik sorgusu veya randevu değişikliği… Japonya'da web sitesini inceledikten sonra bile son adım çoğu zaman “Lütfen telefonla teyit edin” olur.

`SGH Japan Assistant Skill`, uyumlu AI araçlarının draft oluşturmasına, kullanıcının açık onayını almasına, durumu izlemesine ve SGH tarafından doğrulanmış sonucu getirmesine yardımcı olan herkese açık bir Agent Skill ve Remote MCP gateway'dir.

[SGH Phone'u ziyaret edin](https://phone.shingihou.com) · [İlk görüşmeyi planlayın](https://calendar.app.google/RF2YRyJifsPzjbDj8) · [Bize ulaşın](https://phone.shingihou.com/support/contact)

## AI'nıza doğrudan sorun

```text
“Bu restoranda yarın saat 19.00 için iki kişilik yer olup olmadığını sormak üzere bir talep hazırla.”

“Bu kliniğin yabancı hastaları kabul edip etmediğini öğrenmek için gerekli soruları düzenle.”

“Diş hekimi randevumu gelecek haftaya almak için bir danışma özeti hazırla.”

“Otele saat 23.00'te giriş yapılıp yapılamayacağını sormak için gerekli bilgileri düzenle.”

“Bu Japonca telefon görüşmesinden önce SGH'nin ihtiyaç duyacağı bilgileri hazırla.”
```

Skill; hedef işletmeyi, amacı, tercih edilen zamanı, son tarihi ve paylaşılmasına izin verilen bilgileri bir `SGH Consultation Brief` içinde düzenler.

## Bu Skill neden var?

AI bilgi bulmakta iyidir. Ancak Japonya'da rezervasyon veya hizmet talebinin son adımı hâlâ telefon görüşmesi gerektirebilir.

- Japonca ne söyleyeceğinizden emin değilseniz
- Yerel çalışma saatlerinde arama yapamıyorsanız
- İşletmenin sorabileceği bilgileri önceden hazırlamak istiyorsanız
- Sağlık, konaklama veya iptal ayrıntılarında hata yapmak istemiyorsanız
- Sonucu kendi dilinizde anlamak istiyorsanız

SGH, bilgi bulma ile Japonya'daki gerçek bir işletmeyle koordinasyon kurma arasındaki zor aşamaya odaklanır.

## Herkese açık Skill ne yapar?

1. **Talebi anlar** — Telefon, rezervasyon teyidi, tarih değişikliği ve geri arama ihtiyaçlarını sınıflandırır.
2. **Yalnızca gerekli bilgileri toplar** — Hedefi, amacı, zamanı, son tarihi ve sonuç dilini düzenler.
3. **Riskleri erken işaretler** — Sağlık, ödeme, kişisel veri ve iptal ücreti konularını insan incelemesine yönlendirir.
4. **SGH'ye hazır bir özet oluşturur** — AI görüşmesini SGH'nin hızlıca değerlendirebileceği bir biçime dönüştürür.
5. **Resmî kanala yönlendirir** — Hazırlanan talebi SGH Phone'un resmî danışma seçeneklerine bağlar.

![SGH Phone iş akışı](assets/sgh-phone-workflow.png)

## Örnek kullanım alanları

| Alan | Örnek talep |
|---|---|
| Restoranlar | Müsaitlik, rezervasyon koşulları, alerjiyle ilgili sorular |
| Otel ve seyahat | Geç giriş, bagaj saklama, ulaşım düzenlemeleri |
| Klinikler | Yabancı dil desteği, ilk ziyaret koşulları, randevu yöntemi |
| Güzellik ve günlük hizmetler | Randevu, tarih değişikliği, hizmet koşulları |
| Emlak ve temel hizmetler | Ev gösterimi, yönetim şirketi, elektrik, gaz ve internet sorguları |
| Kurumsal operasyonlar | Japonca telefon karşılama, geri arama, ön görüşme ve takip |

Talebin uygulanabilirliği, fiyat, süre, yetkilendirme ve sektöre özgü sınırlamalar resmî görüşmeden sonra SGH tarafından doğrulanır.

## Yalnızca bir reklam değil

Bu repository SGH için herkese açık bir giriş noktasıdır; aynı zamanda kurulan AI'nın gerçekten yapılandırılmış bir danışma özeti üretmesini sağlar.

```text
SGH Consultation Brief
- Fit: GOOD_FIT
- Target: Restaurant ABC, Fukuoka
- Goal: Yarın 19.00 için iki kişilik masa teyidi
- Preferred timing: 19.00; 18.30 da uygun
- Deadline: Bugün 17.00'ye kadar
- Result language: Turkish
- Information approved for sharing: Ad ve kişi sayısı
- Missing information: İptal politikasının kabulü
- Next step: Özeti resmî SGH kanalından gönderin
```

## Önemli sınırlar

Yerel `SKILL.md` tek başına arama yapmaz. Kimliği doğrulanmış Remote MCP'de draft oluşturmak da arama başlatmaz; yalnızca kullanıcı hedefi, amacı, paylaşılacak verileri, zamanı ve ücreti açıkça onayladıktan sonra `confirm_assistance_request` yürütmeyi kuyruğa alabilir. `QUEUED` veya `CALLING`, rezervasyonun onaylandığı anlamına gelmez.

- Talebin gerçekten karşılanıp karşılanamayacağını SGH doğrular.
- Fiyat, çalışma saati, müsaitlik veya klinik kabul koşulları uydurulmaz.
- Tıbbi teşhis veya tedavi önerisi verilmez.
- Sağlık kaydı, pasaport veya kart bilgilerini herkese açık GitHub Issue'larında paylaşmayın.
- Kişisel bilgilerin paylaşılması için kullanıcının açık onayı gerekir.

## Kurulum

`skills/sgh-japan-assistant` klasörünü Agent Skills uyumlu aracınızın veya projenizin skills dizinine ekleyin.

```text
Use $sgh-japan-assistant to draft a Japan phone request, then ask me to confirm it before SGH queues execution.
```

Skill package: [`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

## İşletmeler için

SGH Phone; Japonca telefon karşılama, IVR, arama kayıtları, özetler, personel bildirimleri, geri arama yönetimi, randevu öncesi bilgi toplama ve gerektiğinde kontrollü dış arama süreçleri için bir B2B telefon operasyon platformudur.

- Hizmetinizi AI Agent'ların keşfetmesini sağlayın
- Uluslararası müşterilerin telefon ve rezervasyon deneyimini iyileştirin
- Küçük bir ekiple telefon operasyonlarını ve takibi sürdürün

SGH, işletmelere yönelik uygulama danışmanlığı da sunar.

## Resmî bağlantılar

- **SGH Phone**: https://phone.shingihou.com
- **İlk görüşme**: https://calendar.app.google/RF2YRyJifsPzjbDj8
- **İletişim**: https://phone.shingihou.com/support/contact
- **İşletmeci**: [Shingihou Co., Ltd.](https://shingihou.com)
