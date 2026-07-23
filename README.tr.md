# SGH Japan Assistant

<p align="center">
  <img src="assets/sgh-icon.png" alt="SGH Japan Assistant" width="88">
</p>

<p align="center">
  <a href="README.md">日本語</a> ・
  <a href="README.zh-TW.md">繁體中文</a> ・
  <a href="README.en.md">English</a> ・
  <a href="README.ko.md">한국어</a> ・
  <a href="README.tr.md">Türkçe</a>
</p>

![SGH Japan Assistant — Shingihou hizmetlerine açılan resmî AI giriş noktası](assets/sgh-service-navigator-hero.png)

> **Public Skill available / Remote execution private beta**
> Herkese açık Skill; SGH hizmetlerini keşfetmek, talebi düzenlemek ve doğru resmî kanala yönelmek için bir giriş noktasıdır. Telefon, rezervasyon veya insan desteği sağlayan Remote MCP yalnızca ücretli kullanım hakkı ve açık onay ile sınırlı olarak sunulur.

## Japonya'daki bir sonraki adımınıza AI'nızdan başlayın.

**Keşfedin. Anlayın. Hazırlayın. Doğru kanala yönelin. Yalnızca gerektiğinde işleme geçin.**

`SGH Japan Assistant`; Shingihou Co., Ltd.'nin LINE Bot/LIFF, Medical Supporter, MS Platform, Clinic DX, AI otomasyonu, Web ve Japonca iletişim hizmetlerini ChatGPT, Codex, Claude Code ve diğer AI araçlarında keşfetmek ve anlamak için geliştirilmiş resmî Agent Skill'dir.

Ana ürün fikri telefon değildir: **Talep LINE üzerinden karşılanır, AI tarafından düzenlenir ve doğru ekrana, görevliye ya da iş akışına yönlendirilir.** Telefon, yalnızca Japonca gerçek iletişim gerektiğinde devreye giren ücretli bir execution adapter'dır. Skill belirsiz bir talebi tek sayfalık bir Brief'e dönüştürür ve resmî kanalı gösterir; gerçek telefon, rezervasyon, koordinasyon ve insan emeği ise ancak fiyatlandırma ile açık onayın ardından ayrıca yürütülür.

[SGH hizmetlerini keşfedin](https://www.shingihou.com/ja/services?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [AI ve iş otomasyonunu inceleyin](https://www.shingihou.jp/ai-automation?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [Kurumsal danışmanlık talebi gönderin](https://www.shingihou.com/ja/contact?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill)

## 60 saniyede neler yapabilirsiniz?

- İhtiyacınıza uygun SGH hizmetini bulun
- Medical Supporter LINE, SGH SERVICE, MenuBridge ve MS Platform arasındaki farkı anlayın
- Talebinizi bir `SGH Consultation Brief` içinde düzenleyin
- Bir Japon şirketine gönderilebilecek doğal Japonca bir mesaj hazırlayın
- LINE rezervasyonu, Rich Menu, LIFF, MyPage ve bildirim için kurulum ihtiyaçlarını düzenleyin
- Telefon, LINE, e-posta, form ve CRM süreçlerindeki manuel işleri gözden geçirin
- İşleme başlamadan eksik bilgileri, ücret kategorisini ve izlenecek resmî kanalı görün

AI'nızdan örneğin şunları isteyebilirsiniz:

```text
“Yabancı hastaları kabul etme sürecimizi düzenlemek istiyorum. Hangi SGH hizmeti uygun?”

“Medical Supporter Official LINE üzerinden hangi girişleri kullanabilirim?
  Kişisel veya tıbbi veri girmeden yalnızca seçenekleri göster.”

“Kliniğimize LINE rezervasyonu ve MyPage eklemek istiyoruz.
  MS Platform için No-PHI kurulum Brief'i hazırla.”

“Rich Menu'den rezervasyon, AI çevirisi ve görevli desteğine giden yapıyı tasarla.
  Henüz yayımlama veya LINE mesajı gönderme.”

“Telefon, LINE, e-posta ve CRM'deki manuel işleri düzenle;
  üç otomasyon adayı öner.”

“Bu içeriği bir Japon şirketine gönderebileceğim doğal bir Japonca mesaja dönüştür.”

“Bu talebi SGH'ye aktarılabilecek tek sayfalık bir Brief hâline getir. Henüz gönderme.”

“Bir restorana danışmam gereken bir konu var. Telefon etme; yalnızca gerekli bilgileri düzenle.”
```

## SGH'nin LINE üzerinden erişilebilen ürün girişleri zaten var

LINE yalnızca bir bildirim kanalı değildir. SGH; talebi LINE'da karşılayan, AI ile düzenleyen ve LIFF ekranı, MyPage, rezervasyon, görevli, CRM veya otomasyon iş akışına bağlayan bir ürün ailesine sahiptir.

| LINE/LIFF girişi | Kullanıcının karşılaştığı işlevler | Güncel konumlandırma |
|---|---|---|
| Medical Supporter Official LINE | Japonya'daki sağlık kuruluşları, MyPage, yönlendirmeye bağlı tıbbi belge yükleme, AI anlık çeviri ve SGH SERVICE | Rich Menu V6 kullanımı doğrulandı. MyPage MVP/entegrasyon aşamasında; belgeler yalnızca kimliği doğrulanmış resmî akışta işlenir |
| 醫療助手 LINE | Japonya'daki sağlık kuruluşları, yönlendirmeye bağlı tıbbi belge yükleme, AI anlık çeviri, ücret/hizmet bilgisi ve SGH SERVICE | Rich Menu V6 kullanımı doğrulandı. Çeviri iletişimi destekler; tıbbi karar vermez |
| SGH SERVICE LINE/LIFF | AI'ın talebi yapılandırıp Web doğrulama, üyelik ve başvuru akışına aktardığı hizmet girişi | Uygulama örneği mevcut. Gerçek gönderim, haricî AI, rezervasyon ve telefon; kimlik doğrulama, sözleşme ve ücret kontrolünden sonra |
| MenuBridge LIFF | Kamerayla menüyü okuyup içeriği ve sipariş koşullarını çok dilli anlamaya yarayan giriş | Mevcut ürün yüzeyi. AI kullanım miktarı ve sunum koşulları hizmet ekranına tabidir |
| Klinikler için LINE/LIFF | LINE rezervasyonu, MyPage, bildirim ve online görüşmeye giriş akışı | MS Platform public mock demo ve productized pre-pilot. Gerçek kullanım, kuruma özel sözleşme ve başlangıç ayarlarından sonra |
| LINE Commerce | Ürün arama, hesap bağlantısı, Rich Menu, Webhook ve CRM/n8n entegrasyonu | code-level uygulama ve review örnekleri mevcut. Production etkinleştirmesi haricî ayarlar ve özel doğrulama sonrasında |
| Kliniğe özel LINE Bot | Metin, ses, görsel, çok dilli rehber, rezervasyon niyeti ve görevliye devri birleştirir | Demo/MVP uygulama örnekleri. Tüm sağlık kuruluşlarında faal olduğu söylenmez |

<table>
  <tr>
    <td width="50%"><img src="assets/medical-supporter-line-rich-menu.webp" alt="Medical Supporter LINE Rich Menu"></td>
    <td width="50%"><img src="assets/medical-assistant-line-rich-menu.webp" alt="Tıbbi destek LINE Rich Menu"></td>
  </tr>
  <tr>
    <td align="center"><strong>MEDICAL SUPPORTER</strong><br>MyPage, tıbbi belge yükleme, AI anlık çeviri ve SGH SERVICE</td>
    <td align="center"><strong>醫療助手</strong><br>Tıbbi belge yükleme, AI anlık çeviri, ücret/hizmet ve SGH SERVICE</td>
  </tr>
</table>

Yukarıdaki Rich Menu V6 örnekleri 24 Temmuz 2026 tarihinde mevcut LINE Official Account'lara kaydedilmiş ve altı URI action doğrulanmıştır. Bu, bağlı her işlevin production ortamında genel kullanıma açık olduğu anlamına gelmez. Herkese açık Skill tıbbi belge almaz veya yüklemez; kurulumu SGH telefonu, insan operasyonları ya da diğer ücretli hizmetleri ücretsiz hâle getirmez.

> [!IMPORTANT]
> Herkese açık Skill LINE mesajı göndermez veya Rich Menu yayımlamaz. Hasta kaydı oluşturmaz, tıbbi belge yüklemez, telefon etmez, rezervasyon veya ödeme yapmaz. Bu katman yalnızca hizmet keşfi, gereksinim düzenleme, Brief hazırlama ve resmî kanala yönlendirme sağlar.

[Medical Supporter'ı inceleyin](https://medicalsupporter.org/?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [Medical Supporter Official LINE'ı açın](https://line.me/R/ti/p/%40139snanl) ・ [醫療助手 LINE'ı açın](https://line.me/R/ti/p/%40acl1165c)

## Tek bir Bot değil, yeniden kullanılabilir bir LINE uygulama portföyü

SGH'nin kurumlara sunduğu değer yalnızca sohbet yanıtı değildir. Talebi karşılamak, gerekli bilgiyi AI ile düzenlemek, kullanıcıyı kimliği doğrulanmış ekrana veya görevliye aktarmak ve sonraki kayıt akışını tasarlamak da bu kapsamın parçasıdır.

```text
Discover          LINE intake         Prepare
Hizmeti keşfet →  Talebi/soruyu al  →  AI sınıflandırsın, eksikleri düzenlesin
                                                  ↓
Track             Human / System      Confirm & Route
Kaydı/durumu izle ← Görevli/CRM/işe  ← Kullanıcı içeriği ve koşulu onaylasın
```

Birlikte kullanılabilecek uygulama parçaları:

- LINE Official Account, LINE Login, LIFF ve Rich Menu
- SSS/RAG, çok dilli rehber; metin, ses ve görsel kabulü
- Rezervasyon, MyPage, bildirim, ürün arama ve online görüşme girişi
- Supabase, CRM, takvim, n8n, ödeme ve görevliye devir

Herkese açık Skill yalnızca bu tasarımı açıklar ve gizli bilgi içermeyen bir Brief hazırlar. Gerçek LINE gönderimi, Rich Menu yayını, hasta kaydı, rezervasyon, haricî AI kullanımı, ödeme, telefon ve insan emeği ancak ilgili production sisteminde kimlik, yetki, ücret ve açık onay koşulları karşılandığında yürütülür.

## MS Platform, LINE Bot'un arkasındaki sağlık kuruluşu operasyon katmanıdır

Medical Supporter LINE uluslararası hasta ile destek hizmeti arasında bir temas noktası oluştururken MS Platform; sağlık kuruluşu tarafında LINE rezervasyonu, MyPage, kimlik doğrulama, bildirim, online görüşmeye giriş ve yönetim ekranını aşamalı olarak kurar. Telefon hizmetinin sağlık sürümü değil; hasta yolculuğu ile klinik operasyonunu bağlayan ayrı bir ürün alanıdır.

<table>
  <tr>
    <td width="50%"><img src="assets/ms-platform-patient-mypage-demo.png" alt="MS Platform hasta MyPage Demo"></td>
    <td width="50%"><img src="assets/ms-platform-admin-dashboard-demo.png" alt="MS Platform klinik yönetim Dashboard Demo"></td>
  </tr>
  <tr>
    <td align="center"><strong>Hasta MyPage Demo</strong><br>Rezervasyon bilgisi, doğrulama kodu ve görüşmeye giriş</td>
    <td align="center"><strong>Sağlık Kuruluşu Dashboard Demo</strong><br>Rezervasyon, hazırlık durumu ve bildirim sonuçları</td>
  </tr>
</table>

- Herkese açık Demo yalnızca kurgusal veri kullanır; gerçek LINE, SMS, telefon veya ödeme işlemi başlatmaz.
- Güncel aşama **public mock demo / productized pre-pilot** düzeyidir. LINE rezervasyonu, MyPage, bildirim, online görüşme ve ödeme yönlendirmesinin gerçek kullanımı; sağlık kuruluşuna özel sözleşme, tenant yapılandırması, inceleme ve haricî servis ayarları gerektirir.
- Hasta anketi gönderimi, elektronik imza, elektronik sağlık kaydı, elektronik reçete veya online uygunluk doğrulamasının tümüyle production ortamında sunulduğu iddia edilmez.

[MS Platform'u inceleyin](https://ms-platform.shingihou.com/?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [Herkese açık Demo'yu açın](https://ms-platform.shingihou.com/demo?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill)

## Nasıl çalışır?

```text
Discover              Understand             Prepare
Hizmeti keşfet       → İhtiyacı ve sınırları → Brief ve mesaj taslağı
                       anla                   hazırla
                                                   ↓
Track                 Execute                Route
Durumu ve sonucu izle ← Yalnızca gerektiğinde ← Doğru resmî kanala yönel
                         ücretli olarak yürüt
```

İlk dört aşama, herkese açık Skill içindeki hizmet kataloğu ve şablonlarla tamamlanabilir. Dışarıya mesaj gönderimi, telefon, rezervasyon, insan tarafından kontrol veya özel sistem kurulumu otomatik olarak başlamaz.

## SGH hizmet haritası

| Talep konusu | Herkese açık Skill içinde düzenlenebilenler | SGH tarafından ayrıca ele alınanlar | Sunum durumu |
|---|---|---|---|
| Medical Supporter / LINE | Uluslararası hasta desteği girişi, LINE'da görülebilen açık bilgiler ve hazırlık noktaları | Sağlık kuruluşlarıyla iletişim; tercüme, belge ve süreç desteği | Resmî site ve LINE kanalı mevcut |
| LINE Bot / LIFF | Rich Menu, SSS, çok dilli rehber, rezervasyon, MyPage ve görevliye devir yapısını Brief'e dönüştürme | LINE Official Account, LIFF, Webhook ve CRM entegrasyonu tasarımı/kurulumu | Mevcut örnekler·özel fiyatlandırma |
| MS Platform | LINE rezervasyonu, MyPage, kimlik doğrulama, bildirim ve online görüşmeye giriş gereksinimleri | tenant başlangıç ayarı, gereksinim analizi, kurulum ve haricî hizmet entegrasyonu | Public mock Demo / pre-pilot·özel kurulum |
| SGH Phone | Telefon sürecinin amacı, hedefi, konuşma metni ve işletim koşulları | AI karşılama, IVR, kayıt, özet, bildirim ve dış arama | B2B hizmet·özel fiyatlandırma |
| 891 AI Automation | LINE, e-posta, form, CRM ve n8n için otomasyon adayları | İş akışı tasarımı, kurulum ve operasyon desteği | Danışma başvuruları açık |
| Web / SNS | Amaç, hedef kitle, kullanıcı akışı ve gerekli içerik için Brief | Web geliştirme ve işletim, sosyal medya desteği | Özel danışmanlık |
| KusuriJapan | Herkese açık bilgi ve doğru danışma kanalına yönlendirme | İthalat ve prosedürlerle ilgili özel değerlendirme | Bilgi ve danışmanlık hizmeti |
| SGH Bio Lab | B2B görüşmesi için kullanım amacı ve gerekli bilgilerin düzenlenmesi | RUO ile ilgili tedarik ve koordinasyon görüşmesi | B2B başvuru |
| Travel / Dining showcase | Menü, rezervasyon koşulları ve seyahat planı için kontrol listesi | Menu Bridge gibi özel hizmetler, gerçek rezervasyon ve telefon | Koşullar özelliğe göre değişir |

> [!NOTE]
> Bu tablo hizmetleri keşfetmeye yardımcı olan bir rehberdir; sözleşmeyi, fiyatı, talebin kabulünü veya hizmete başlama tarihini garanti etmez. Bir LINE Rich Menu'nün kullanımda olması, bağlandığı tüm işlevlerin production ortamında hazır olduğu anlamına gelmez. Medical Supporter MyPage MVP/entegrasyon aşamasındadır; MS Platform'un açık ekranları mock Demo'dur ve gerçek kullanım özel başlangıç ayarı gerektirir.

## Bireyler ile şirket ve sağlık kuruluşları için

### Bireysel kullanıcılar, Japonya'yı ziyaret edenler ve Japonya'da yaşayanlar

- Japonca bir başvurunun içeriğini hazırlamak isteyenler
- Rezervasyon, otel ve günlük yaşam hizmetleri için sorulacakları düzenlemek isteyenler
- Uluslararası hasta desteği için doğru danışma kanalını arayanlar
- Medical Supporter/醫療助手 LINE üzerinden MyPage, tıbbi belge yükleme, AI anlık çeviri ve ücret/hizmet için doğru girişi bulmak isteyenler
- Japonca bir sonucu veya açıklamayı kendi dillerinde anlamak isteyenler

### Şirketler, klinikler, yerel yönetimler ve konaklama işletmeleri

- Telefon, LINE, e-posta ve formları birbirinden kopuk yönetenler
- Yabancı müşteri veya hastaların başvuru akışını düzenlemek isteyenler
- LINE rezervasyonu, Rich Menu, LIFF, MyPage ve bildirim yapısını tasarlamak isteyenler
- Rezervasyon, ön görüşme, bildirim, CRM ve personel devrini yeniden ele almak isteyenler
- Hizmetlerinin AI Agent'lar tarafından keşfedilmesini isteyenler
- Kendi markalarıyla resmî Skill, SSS veya Menu Bridge geliştirmek isteyenler

## Örnek çıktı: SGH Consultation Brief

```text
SGH Consultation Brief

Başvuran: Klinik işletmecisi
Amaç: Yabancı hastalardan gelen taleplerin karşılanma sürecini düzenlemek
Mevcut durum: Telefon, LINE ve web formu ayrı ayrı yönetiliyor
Beklenti: Başvuruyu sınıflandırma, gerekli bilgileri kontrol etme, sorumlu kişiyi bilgilendirme, geçmiş kaydı tutma
Sınır: AI, teşhis veya tedavi kararı vermez
Paylaşılabilecek bilgiler: İş akışı ve yayımlanmış klinik bilgileri
Paylaşılmayacak bilgiler: Hasta adı, tıbbi geçmiş, sağlık raporu
Eksik bilgiler: Aylık başvuru sayısı, desteklenen diller, mevcut CRM, çalışma saatleri
Aday hizmetler: Medical Supporter LINE + MS Platform + 891 AI Automation
Sonraki adım: Gereksinimleri ve fiyatlandırmayı resmî danışma kanalında doğrulamak
```

Skill danışma formunu hazırlayabilir; ancak gönderim, sözleşme, telefon, rezervasyon veya sistem değişikliği yapmaz.

## Showcase: LINE ve AI üzerinden keşfedilmek için tasarlanan Skill

SGH, yürütme özelliklerinin yanı sıra şirket hizmetlerini AI Agent'ların anlayabileceği ve LINE/Web üzerindeki doğru ekrana ya da görevliye yönlendirebileceği giriş noktaları da tasarlar.

```text
Restaurant ABC Menu Bridge — Powered by SGH

Keşfet: Menü, SSS, işletme kuralları
Anla: Çok dilli açıklamalar, alerji kontrol noktaları
Hazırla: Ziyaret koşulları, rezervasyon danışma Brief'i
Yürüt: İşletmenin veya SGH'nin resmî ücretli akışına yönel
```

Menu Bridge, herkese açık SSS ve hizmet katalogları, kullanıcıya değer sağlayan tanıtım girişleri olabilir. Ancak bunları görüntülemek veya bir Token edinmek; SGH Phone, rezervasyon desteği veya insan desteğini ücretsiz kullanma hakkına dönüşmez.

Aynı yaklaşımla şirketler ve sağlık kuruluşları için şu ürün yüzeyleri tasarlanabilir:

- Resmî hizmetlerin keşfedilmesini sağlayan Agent Skill
- LINE Official Account ve Rich Menu
- LIFF üzerinde rezervasyon, MyPage, form ve üyelik ekranı
- Çok dilli SSS, talep sınıflandırması ve AI çeviri desteği
- CRM, takvim, n8n, görevli bildirimi ve insana devir akışı

## Üç resmî giriş noktasının rolü

| Giriş noktası | Rolü |
|---|---|
| [shingihou.com](https://www.shingihou.com/ja) | Şirket bilgileri, resmî hizmetler, sorumluluk kapsamı, hukukî bilgiler ve resmî danışma kanalı |
| [shingihou.jp](https://www.shingihou.jp/) | Çok dilli hizmet rehberi, kullanım örnekleri, Demo ve kurulum bilgileri |
| [SGH-skill](https://github.com/linchichuan/SGH-skill) | AI Agent'ların hizmetleri keşfetmesi, talebi düzenlemesi ve doğru resmî giriş noktasına ilerlemesi için herkese açık paket |

GitHub resmî web sitesinin yerine geçmez; AI çağında hizmetlerin keşfedilmesini sağlayan bir giriş noktasıdır. Fiyat, sözleşme, sunum koşulları ve kişisel verilerin işlenmesi ilgili resmî web sitesi ile özel sözleşmede doğrulanır.

## Ücretsiz herkese açık katman ve ücretli yürütme katmanı

| Herkese açık Skill'e dâhil olanlar | Ayrı sözleşme veya fiyatlandırma gerektirenler |
|---|---|
| README, hizmet kataloğu ve açık belgeler | Gerçek dış arama |
| Yerel Skill kurulumu | Gerçek rezervasyon, değişiklik ve iptal |
| Hizmet eşleştirme, danışma Brief'i ve mesaj taslağı | İnsan tarafından kontrol, koordinasyon ve istisna yönetimi |
| Resmî URL, LINE girişi ve public Demo yönlendirmesi | LINE gönderimi, Rich Menu yayını ve LIFF/tenant yapılandırması |
| Yan etkisiz uygunluk kontrolü | MenuBridge analizi, Clinic DX, otomasyon veya Web gibi özel kurulumlar |
| Yerel şablonla hazırlanan tasarım önerisi | SGH'nin haricî AI/API, iletişim, ödeme veya operasyon kaynaklarını kullanan işlemler |

> [!IMPORTANT]
> **Bu repository'yi görüntülemek veya clone etmek ya da Skill'i kurmak; SGH'nin LINE gönderimi, MenuBridge analizi, telefon, rezervasyon, insan emeği, haricî AI/API işlemi veya sistem kurulumu için ücretsiz kullanım hakkı sağlamaz.**
> Kullanıcının kendi ChatGPT, Claude, Codex veya diğer AI hizmetleri için ödeyeceği ücretler ve kullanım koşulları, ilgili sağlayıcıyla yaptığı sözleşmeye tabidir.

Herkese açık `get_sgh_capabilities` ve `check_task_supported` araçları yalnızca MCP gateway içindeki sürümlenmiş yerel kuralları kullanır. LINE Messaging API, SGH Service, Supabase, Twilio, haricî AI API veya insan iş kuyruğunu çağırmaz ve request oluşturmaz.

## Remote MCP: Telefon ve rezervasyon için ücretli yürütme modülü

Mevcut Remote MCP, tüm SGH hizmetlerini çalıştıran genel amaçlı bir API değildir. Phase 1 kapsamında ağırlıklı olarak acil olmayan telefon sorguları ve standart rezervasyonlar için draft, fiyatlandırma teyidi, açık onay, durum ve sonuç yönetimi sunar.

```text
Talebi düzenle                       Telefon yok
    ↓
OAuth ile kimliği doğrula            Telefon yok
    ↓
Request bazında fiyat ve hakkı doğrula Telefon yok
    ↓
Hedefi, paylaşılacak bilgiyi ve ücreti açıkça onayla
    ↓
Yalnızca kullanım kotası ayrılabildiyse QUEUED
```

- `DRAFT` — Taslaktır. Telefon veya rezervasyon yapılmamıştır.
- `AWAITING_CONFIRMATION` — Bilgi, fiyatlandırma veya onay beklenmektedir.
- `QUEUED` — Ücretli yürütme sırasındadır. Rezervasyon tamamlanmış değildir.
- `CONFIRMED` — Karşı taraftan doğrulanabilir bir teyit sonucu alınmıştır.

SGH Pass, satın alınmış veya bedeli düzenleyen kuruluş tarafından karşılanmış bir kullanım hakkıdır. tenant, service scope, issuer, geçerlilik süresi ve kullanım sayısı doğrulanır; Pass request ile atomik olarak ilişkilendirilir. Herkese açık Token veya Menu Bridge Pass, telefon ya da insan emeği için kullanılamaz.

## Sunum durumu

| Öğe | Durum |
|---|---|
| Public Agent Skill / README | **Available** |
| Yerel hizmet yönlendirmesi ve Brief hazırlama | **Available** |
| Medical Supporter Official LINE danışma girişi | **Available·MyPage MVP/entegrasyon hazırlığında** |
| Medical Supporter / 醫療助手 LINE Rich Menu | **Kullanımı doğrulandı·bağlı işlevler koşula tabi** |
| SGH SERVICE LINE / MenuBridge LIFF | **Uygulama ve mevcut ürün yüzeyi var·koşullar işlev bazında** |
| LINE Commerce / kliniğe özel Bot | **code-level / Demo·MVP örnekleri·production özel doğrulama gerektirir** |
| MS Platform herkese açık site / Demo | **Available·kurgusal veri** |
| MS Platform production LINE / LIFF | **productized pre-pilot / MVP·özel ayardan sonra** |
| Remote MCP `/mcp` | **Private beta / live doğrulanmadı** |
| OAuth ve ödeme içeren production yürütmesi | **Resmî sunumdan önce doğrulama gerekli** |
| Korece ve Türkçe | Yalnızca README / discovery copy |
| API sonuç dilleri | Japonca, Geleneksel Çince ve İngilizce (Phase 1) |

Son doğrulama: **2026-07-24**

## Kurulum

`skills/sgh-japan-assistant` klasörünü Agent Skills uyumlu aracınıza veya projenizin skills dizinine ekleyin.

```text
Use $sgh-japan-assistant to identify the right SGH service,
create a consultation brief, and show the official next step.
Do not send, call, book, pay, or create a human task.
```

Skill package: [`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

Geliştirme ve yerel doğrulama:

```bash
cp env.example .env
npm install
npm run typecheck
npm test
npm run dev
```

- [İstemci bağlantısı](docs/client-setup.md)
- [Mimari](docs/sgh-skill-architecture.md)
- [Ücretsiz/ücretli sınırı](docs/commercial-boundary.md)
- [Remote MCP tool contract](skills/sgh-japan-assistant/references/tool-contracts.md)

## GitHub tanıtım görselleri

- README hero: [`assets/sgh-service-navigator-hero.png`](assets/sgh-service-navigator-hero.png)
- Social preview: [`assets/sgh-service-navigator-social-preview.png`](assets/sgh-service-navigator-social-preview.png)
- Skill icon: [`assets/sgh-icon.svg`](assets/sgh-icon.svg)
- Medical Supporter LINE örneği: [`assets/medical-supporter-line-rich-menu.webp`](assets/medical-supporter-line-rich-menu.webp)
- 醫療助手 LINE örneği: [`assets/medical-assistant-line-rich-menu.webp`](assets/medical-assistant-line-rich-menu.webp)
- MS Platform Demo ekranları: [`assets/ms-platform-patient-mypage-demo.png`](assets/ms-platform-patient-mypage-demo.png) / [`assets/ms-platform-admin-dashboard-demo.png`](assets/ms-platform-admin-dashboard-demo.png)

Hero ve Social preview görselleri metin içermediği için beş dildeki README dosyalarının tamamında ortak kullanılabilir. LINE görselleri gerçek kullanım örnekleridir; MS Platform ekranlarının Demo olduğu açıkça belirtilmiştir. Social preview yalnızca dosyayı repository'ye eklemekle GitHub'da otomatik olarak ayarlanmaz; görseli repository'nin **Settings → General → Social preview** bölümünden manuel olarak seçin.

## Güvenlik ve sorumluluk sınırları

- Acil yardım çağrısı, teşhis, reçete, tedavi kararı veya hukukî değerlendirme yapmaz.
- Herkese açık Skill'e tıbbi geçmiş, sağlık raporu, pasaport, kart bilgisi, parola veya doğrulama kodu girmeyin.
- Müsaitlik, kabul koşulları, fiyat, ithalat uygunluğu, teslim tarihi veya tedavi sonucu tahmin edilmez ve garanti edilmez.
- Sağlık hizmeti, ürün satışı, AI otomasyonu ve telefon gibi her hizmetin sözleşme tarafı ve sorumluluk kapsamı ayrı tutulur.
- `QUEUED` veya `CALLING` durumu “rezervasyon tamamlandı” şeklinde ifade edilmez.
- Secret, OAuth Token, Twilio kimlik bilgileri veya hasta verileri bu repository'de saklanmaz.

## Sık sorulan sorular

### Skill'i kurduğumda ne yapabilirim?

SGH hizmetlerini keşfedebilir, talebinizi düzenleyebilir, mesaj taslağı hazırlayabilir ve bir sonraki resmî kanalı görebilirsiniz. Yalnızca kurulum yapmak telefon veya haricî gönderim başlatmaz.

### GitHub'da açık olduğuna göre SGH hizmetleri de ücretsiz mi?

Hayır. MIT License herkese açık koda uygulanır; SGH'nin telefon, rezervasyon desteği, insan emeği, haricî API kullanımı, sistem kurulumu veya marka kullanım hakkını kapsamaz.

### Telefon dışında bir hizmet talep edebilir miyim?

Evet. Skill; Medical Supporter LINE, LINE Bot/LIFF, MS Platform, Clinic DX, AI otomasyonu, Web/SNS ve KusuriJapan için doğru resmî kanalı gösterebilir. Ancak herkese açık Skill LINE mesajı göndermez, Rich Menu yayımlamaz, hasta kaydı oluşturmaz, tıbbi belge yüklemez, telefon etmez, rezervasyon veya ödeme yapmaz. Mevcut MCP'nin doğrudan ele aldığı alan yalnızca Phase 1 ücretli telefon ve standart rezervasyon modülüdür.

### Medical Supporter LINE ile MS Platform aynı hizmet midir?

Hayır. Medical Supporter LINE, uluslararası hastaların bilgi, danışma ve destek hizmetlerine ulaştığı hasta tarafı girişidir. MS Platform ise sağlık kuruluşu tarafında LINE rezervasyonu, MyPage, bildirim ve online görüşme akışını özel olarak kuran operasyon platformudur. Skill, amaca göre bu iki yolu ayırarak gösterir.

### README'de listelenen tüm LINE Bot'lar production ortamında hemen kullanılabilir mi?

Hayır. Resmî LINE danışma girişi, kullanımı doğrulanmış Rich Menu, mevcut ürün yüzeyi, public Demo, MVP ve code-level uygulama örneği ayrı ayrı belirtilir. Hesap, LIFF, tenant, Webhook, haricî AI, ödeme, rezervasyon veya hasta işlevi; ilgili proje için sözleşme, yapılandırma, inceleme ve test gerektirir.

### Menu Bridge ücretsiz telefon Token'ı mıdır?

Hayır. Menu Bridge, bilgi keşfi ve kullanıcı deneyimi için bir Showcase'dir. Kullanım koşulları her hizmetin kendi açıklamasına tabidir; SGH Phone veya insan desteği için ücretsiz kullanım hakkına dönüşmez.

### Sağlık danışmanlığı içeriği girebilir miyim?

Genel başvuru kanalları ve hazırlık adımları gösterilebilir; ancak herkese açık Skill'e belirtiler, tıbbi geçmiş veya sağlık raporu gibi hassas bilgiler girmeyin. Skill teşhis veya tedavi kararı da vermez.

## Hukukî belgeler ve fiyatlandırma

Resmî sunum öncesi inceleme için hazırlanan fiyat, iptal, kullanım şartları, gizlilik ve uygun kullanım belgeleri [docs/legal](docs/legal/README.md) altında toplanmıştır. Bunların bir bölümü henüz yürürlüğe girmemiş taslaklardır. Gerçek sözleşmelerde herkese açık URL'de yayımlanan en güncel metin, request bazındaki onay ekranı ve özel sözleşme önceliklidir.

## Resmî bağlantılar

- [Shingihou Co., Ltd.](https://www.shingihou.com/ja)
- [Hizmet listesi](https://www.shingihou.com/ja/services)
- [Çok dilli hizmet rehberi](https://www.shingihou.jp/)
- [Medical Supporter](https://medicalsupporter.org/)
- [MS Platform](https://ms-platform.shingihou.com/)
- [SGH Phone](https://phone.shingihou.com/)
- [KusuriJapan](https://kusurijapan.com/)
- [İletişim](https://www.shingihou.com/ja/contact)

---

<p align="center">
  <strong>Discover. Understand. Prepare. Route. Track.</strong><br>
  SGH Japan Assistant — Powered by Shingihou
</p>
