# FlowLogix Agent Rehberi

Bu dosya, FlowLogix üzerinde çalışan her agent için kısa giriş noktasıdır. Ayrıntılı kurallar ve doğrulanmış durum yaşayan belgelerde tutulur; sohbet hafızası kaynak kabul edilmez.

## Okuma sırası

1. `FlowLogix_Baslangic_Agent_Promptu.md` — bağlayıcı agent talimatı
2. `docs/PRINCIPLES.md` — FlowLogix'e uyarlanmış çalışma kuralları
3. `docs/PROJECT-BRIEF.md` — onaylanmış ürün ve MVP sınırı
4. `docs/DECISIONS.md` — alınmış ürün ve teknik kararlar
5. `docs/PROGRESS.md` — doğrulanmış mevcut durum ve sıradaki tek adım
6. `docs/BACKLOG.md` — yalnız aktif fazın ayrıntılı işleri
7. İlgili task için `docs/RESEARCH.md`, `docs/ROADMAP.md` ve `docs/LEARNING.md`

Ürün/domain ayrıntısında `FlowLogix_Kapsamli_Proje_Planlama_ve_Agent_Rehberi.docx` ana referanstır. Kök dizindeki `PRINCIPLES.md` başka projeye ait örnektir; FlowLogix'e doğrudan kural taşımaz.

## Yetki sınırı

- Kaynak kodunu varsayılan olarak kullanıcı yazar.
- Agent repository'yi okuyabilir, kodu açıklamaları ve tam dosya yollarıyla verebilir, kullanıcı uyguladıktan sonra build/test çalıştırabilir.
- Agent bu Markdown takip belgelerini oluşturabilir ve güncelleyebilir.
- Yalnız kullanıcının açıkça izin verdiği belirli ve mekanik frontend taskında agent kaynak kodunu değiştirebilir. İzin başka taska taşınmaz.
- Açık onay olmadan commit, merge, rebase, push, branch silme veya migration uygulama yapılmaz.

## Çalışma döngüsü

`iş amacı → öğrenme hedefi → tasarım ve alternatif → dosyalar/bağımlılıklar → küçük kod adımı → kullanıcı uygular → gerçek kod incelenir → build/test → belgeler güncellenir`

Kullanıcı tamamladığını söylemeden sonraki kaynak kod adımına geçilmez.

Her teknik adım iki katmanlı anlatılır:

1. Kod bilmeyen biri için kısa amaç, benzetme ve sistemdeki yeri
2. Geliştirici için gerçek framework davranışı, bağımlılık yönü, alternatif ve risk

Framework çağrıları yalnız isim olarak verilmez; pipeline'da ne zaman çalıştığı ve hangi problemi çözdüğü açıklanır.

## Context ve handoff disiplini

- Her task başlangıcında bu dosyadaki okuma sırası uygulanır; sohbet özeti tek başına kaynak kabul edilmez.
- Her kullanıcı uygulaması sonrası önce gerçek dosya okunur, sonra build/test yapılır, en son yaşayan belgeler güncellenir.
- `PROGRESS.md` aktif durum ve sıradaki tek adımdır; `BACKLOG.md` task durumudur; karar gerekçesi `DECISIONS.md` ve araştırma kanıtı `RESEARCH.md` içindedir.
- Yeni karar veya mevcut kararda değişiklik aynı turda ilgili belgeye yazılır. Öğrenme çıktısı `LEARNING.md` içine kaydedilir.
- Context küçülmesi, yeni sohbet veya uzun ara öncesinde repository–belge tutarlılık kontrolü yapılır; doğrulanmamış sonuç “tamamlandı” yazılmaz.
- Belgeler ile repository çelişirse kaynak kod/build sonucu esas alınır, çalışma durdurulur ve belgeler önce düzeltilir.

## Aktif teknik çerçeve

- .NET 10 ve ASP.NET Core
- SQL Server; tek veritabanı, modül başına şema ve DbContext
- Modüler monolith; ihtiyaç oluşmadan ek enterprise pattern yok
- React + TypeScript; same-origin cookie authentication
- UTC saklama, `Europe/Istanbul` gösterim saat dilimi, varsayılan para birimi `TRY`

## Doğrulama komutları

Backend solution ve beş başlangıç projesi mevcuttur. Doğrulanmış temel sıra:

```powershell
dotnet restore .\FlowLogix.sln
dotnet build .\FlowLogix.sln --no-restore
dotnet test .\FlowLogix.sln --no-build
```

`dotnet test` API'yi test dependency graph'ında değilse yeniden derlemeyebilir; bu nedenle explicit solution build atlanmaz.

Frontend henüz oluşturulmadı. Oluşturulduktan sonra:

```powershell
npm ci --prefix .\src\FlowLogix.Web
npm run lint --prefix .\src\FlowLogix.Web
npm run test --prefix .\src\FlowLogix.Web
npm run build --prefix .\src\FlowLogix.Web
```

Frontend komutları gerçek script adları oluşunca tekrar doğrulanmalı; burada bulunmaları henüz çalıştıkları anlamına gelmez.
