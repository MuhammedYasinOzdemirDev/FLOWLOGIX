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
- Agent, amacını ve tam değişikliği önceden öğretici biçimde sunduğu mekanik frontend tooling/config dosyalarını kullanıcının verdiği sınırlı yetki kapsamında doğrudan değiştirebilir.
- Bu sınırlı yetki React uygulama/ürün koduna, backend/domain koduna, migration'a veya ürün davranışına taşınmaz; bunlar için task-bazlı açık izin gerekir.
- Açık onay olmadan commit, merge, rebase, push, branch silme veya migration uygulama yapılmaz.
- Commit yetkisi verildiğinde değişiklikler amaçlarına göre küçük ama anlamlı gruplara ayrılır; dokümantasyon, repository/build altyapısı ve ürün davranışı gerekçesiz biçimde aynı commit'e karıştırılmaz.
- Conventional Commit başlığı yalnız dosya türünü değil değişikliğin niyetini anlatır. Kapsam büyük veya sonucu başlıktan anlaşılmıyorsa commit gövdesinde neden, ana değişiklikler ve doğrulama özeti bulunur.
- Her commit mümkün olduğunca kendi içinde tutarlı ve doğrulanabilir olmalı; sırf commit sayısını artırmak için yapay mikro-commit üretilmemelidir.

## Çalışma döngüsü

`iş amacı → öğrenme hedefi → tasarım ve alternatif → dosyalar/bağımlılıklar → küçük kod adımı → kullanıcı uygular → gerçek kod incelenir → build/test → belgeler güncellenir`

Kullanıcı tamamladığını söylemeden sonraki kaynak kod adımına geçilmez.

Her teknik adım iki katmanlı anlatılır:

1. Kod bilmeyen biri için kısa amaç, benzetme ve sistemdeki yeri
2. Geliştirici için gerçek framework davranışı, bağımlılık yönü, alternatif ve risk

Framework çağrıları yalnız isim olarak verilmez; pipeline'da ne zaman çalıştığı ve hangi problemi çözdüğü açıklanır.

React anlatılırken kullanıcının temel kavramları bildiği varsayılmaz. Yeni bir bileşen veya MUI/Router kavramı kullanılmadan önce bu parçanın görevi, ekranda neyi temsil ettiği ve diğer bileşenlerle nasıl çalıştığı sade Türkçeyle açıklanır. Anlatım şu sırayı izler: ortaya çıkacak ekranın genel görünümü → kullanılacak parçalar → verinin bileşenler arasında ilerleyişi ve ekranda gösterilmesi → değişecek dosyalar → kod → önemli satırlar → doğrulama. Kısa yazmak uğruna kopuk cümleler, gereksiz yabancı terimler veya açıklanmamış teknik ifadeler kullanılmaz.

Kullanıcıya gönderilecek öğretici metin, gönderilmeden önce Türkçe anlatım bakımından yeniden okunur. Yanlış kelime seçimi, İngilizceden doğrudan çevrilmiş yapay ifade, eksik özne/yüklem ve aynı düşünceyi bölen kopuk cümleler düzeltilir. Teknik terim gerekli olduğunda terimin Türkçe karşılığı veya kısa anlamı ilk kullanımda verilir.

Yanıt, React'i yeni öğrenen kullanıcının gözünden ikinci kez okunur: Kullanıcının henüz bilmediği hangi kavram varsayılmış, kod sonunda ekranda ne değişecek ve verilen adımın önceki adımla bağlantısı anlaşılır mı soruları denetlenir. “Route ağacı” gibi Türkçe–İngilizce karışımı ifadeler kullanılmaz; önce “adres eşleme yapısı” denir, gerekiyorsa kod terimi `route` parantez içinde belirtilir.

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

Frontend `src/FlowLogix.Web` altında oluşturuldu. Mevcut doğrulanmış komutlar:

```powershell
npm ci --prefix .\src\FlowLogix.Web
npm run format:check --prefix .\src\FlowLogix.Web
npm run lint --prefix .\src\FlowLogix.Web
npm run test --prefix .\src\FlowLogix.Web
npm run build --prefix .\src\FlowLogix.Web
```

Mevcut tek frontend testi, kalıcı uygulama çerçevesini ve operasyon genel bakış sayfasının görünür kullanıcı sözleşmesini sınar. Bu test başlangıç kabuğu için gerçek davranış kanıtıdır; henüz auth, müşteri veya lokasyon akışlarını kapsamaz.
