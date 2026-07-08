# FlowLogix Aktif Backlog

Durumlar: `Bekliyor`, `Aktif`, `Kullanıcı uyguladı`, `Doğrulanıyor`, `Tamamlandı`, `Bloke`

## FLOW-001 — Dokümantasyon ve temel iskelet

**Öncelik:** Must  
**Durum:** Aktif  
**İş değeri:** Projenin kararlarını kaybolmadan taşır ve bütün sonraki kodun aynı doğrulanmış zeminde kurulmasını sağlar.  
**Öğrenme hedefi:** Solution yapısı, modül sınırı, proje referansı ve tekrarlanabilir CLI akışı.

### Alt işler

- [x] FLOW-001.1 — Bağlayıcı belgeleri ve Word ürün referansını tamamen incele
- [x] FLOW-001.2 — Domain/teknik başlangıç araştırmasını yap
- [x] FLOW-001.3 — MVP ve teknik kararları kullanıcıdan onayla
- [x] FLOW-001.4 — Yaşayan Markdown belgelerini oluştur
- [x] FLOW-001.5 — `feature/FLOW-001-foundation` branch'ini kullanıcı onayıyla aç
- [x] FLOW-001.6 — Repository genelinde SDK, build, paket ve biçim temelini kullanıcı oluştursun
  - [x] FLOW-001.6a — `global.json` ile .NET SDK feature band ve patch politikasını sabitle
  - [x] FLOW-001.6b — `Directory.Build.props` ile ortak .NET build ve analiz politikasını kur
  - [x] FLOW-001.6c — `Directory.Packages.props` ile merkezi NuGet sürüm yönetimini kur
  - [x] FLOW-001.6d — `.editorconfig` ile repository biçim ve temel C# stilini tanımla
  - [x] FLOW-001.6e — `.gitattributes` ile text satır sonu ve binary dosya politikasını tanımla
  - [x] FLOW-001.6f — Makineye özgü `*.user` proje dosyalarını Git dışında bırak
- [x] FLOW-001.7 — Solution ve backend proje iskeletini kullanıcı oluştursun
  - [x] FLOW-001.7a — Kök `FlowLogix.sln` dosyasını oluştur ve boş solution olarak doğrula
  - [x] FLOW-001.7b — `FlowLogix.Api` composition-root projesini oluştur ve solution'a ekle
  - [x] FLOW-001.7c — `FlowLogix.Identity` modül projesini oluştur ve solution'a ekle
  - [x] FLOW-001.7d — `FlowLogix.Customers` modül projesini oluştur ve solution'a ekle
  - [x] FLOW-001.7e — Customers unit ve SQL Server integration test projelerini oluştur
  - [x] FLOW-001.7f — Proje referans yönlerini kur ve backend solution build'ini doğrula
  - [x] FLOW-001.7g — Modüllerin public composition contract'larını ve gerekli ASP.NET Core framework referanslarını kur
    - [x] FLOW-001.7g.1 — Identity ve Customers projelerine `Microsoft.AspNetCore.App` framework reference ekle
    - [x] FLOW-001.7g.2 — `IdentityModule` service-registration ve endpoint-mapping contract'ını oluştur
    - [x] FLOW-001.7g.3 — `CustomersModule` service-registration ve endpoint-mapping contract'ını oluştur
    - [x] FLOW-001.7g.4 — API composition root'tan iki modülü kaydet ve endpoint'lerini eşle
    - [x] FLOW-001.7g.5 — Public yüzey, dependency graph, build ve runtime davranışını doğrula
  - [x] FLOW-001.7h — Development OpenAPI ve ortak Problem Details pipeline temelini kur ve HTTP üzerinden doğrula
- [x] FLOW-001.8 — React/Vite proje iskeletini kullanıcı oluştursun
  - [x] FLOW-001.8a — Güncel React/Vite/TypeScript/Router/Query/test sürüm, lisans ve Node uyumluluğunu doğrula
  - [x] FLOW-001.8b — Vite React/TypeScript iskeletini `src/FlowLogix.Web` altında oluştur
  - [x] FLOW-001.8c — Router ve Query bağımlılıklarını exact sürümlerle ekle
  - [x] FLOW-001.8d — Node/npm pin'i ile script, TypeScript, ESLint, Vitest, formatter ve Vite config'lerini repository politikasıyla doğrula
    - [x] FLOW-001.8d.1 — Node/npm sürüm sözleşmesini ve direct dependency sürüm politikasını tanımla
    - [x] FLOW-001.8d.2 — Vitest, Testing Library ve jsdom bağımlılıklarıyla gerçek `test` script'ini kur
      - [x] FLOW-001.8d.2a — Exact test dependency'lerini ekle
      - [x] FLOW-001.8d.2b — Vitest jsdom/setup ve test script'lerini yapılandır
      - [x] FLOW-001.8d.2c — İlk kullanıcı davranışı odaklı component testini yaz ve çalıştır
    - [x] FLOW-001.8d.3 — React/Query/test ESLint kurallarını ve TypeScript lint sınırını doğrula
      - [x] FLOW-001.8d.3a — Query ve Testing Library ESLint plugin'lerini exact sürümle ekle
      - [x] FLOW-001.8d.3b — Type-aware lint ile Query recommended ve test-scoped React kurallarını yapılandır
      - [x] FLOW-001.8d.3c — Lint performansını ve mevcut kaynak/test uyumluluğunu doğrula
    - [x] FLOW-001.8d.4 — Vite ve TypeScript config'lerini uygulama/CI ihtiyaçlarıyla doğrula
      - [x] FLOW-001.8d.4a — TypeScript strict ve ek güvenlik kurallarını belirle
      - [x] FLOW-001.8d.4b — Same-origin geliştirme için Vite `/api` proxy politikasını kur
        - [x] FLOW-001.8d.4b.1 — Trusted development certificate ve npm Node system-CA politikasını doğrula
        - [x] FLOW-001.8d.4b.2 — Vite `/api` HTTPS proxy ayarını ekle
      - [x] FLOW-001.8d.4c — Test/lint/build ve gerçek proxy davranışını doğrula
    - [x] FLOW-001.8d.5 — Prettier ile tekrarlanabilir frontend format kapısını kur
      - [x] FLOW-001.8d.5a — Formatter alternatiflerini araştır; exact Prettier dependency, config, ignore ve npm script'lerini ekle
      - [x] FLOW-001.8d.5b — Kullanıcı ilk format taban çizgisini kaynak dosyalara uygulasın
      - [x] FLOW-001.8d.5c — Format check, lint, test ve production build kapılarını birlikte doğrula
  - [x] FLOW-001.8e — Frontend state sahipliği, feature mimarisi, React yazım kuralları ve fetch/Axios kararını belirle
  - [x] FLOW-001.8e.1 — Başlangıç şablonunu boş klasör oluşturmadan FlowLogix uygulama kabuğuna indirgeme planını uygula
    - [x] FLOW-001.8e.1a — ERP arayüzü için styling/component seçeneklerini karşılaştır ve UI temelini seç
      - [x] FLOW-001.8e.1a.1 — FlowLogix'e özgü Operasyon Kontrol Kulesi görsel/etkileşim dilini ve ek kütüphane kapılarını belirle
    - [x] FLOW-001.8e.1b — MUI core ve Emotion dependency'lerini exact sürümle ekle
    - [x] FLOW-001.8e.1c — Theme, CssBaseline, QueryClient ve BrowserRouter provider composition'ını kur
      - [x] FLOW-001.8e.1c.1 — FlowLogix theme token'larını ve MUI component default'larını tanımla
      - [x] FLOW-001.8e.1c.2 — QueryClient ve root AppProviders composition'ını oluştur
      - [x] FLOW-001.8e.1c.3 — React bootstrap'ı AppProviders üzerinden bağla
    - [x] FLOW-001.8e.1d — İlk gerçek adres yönlendirme ve sayfa iskeletini kur; Vite demo dosyalarını kaldır
      - [x] FLOW-001.8e.1d.1 — Bildirimsel adres kuralları, URL'yi değiştirmeyen ortak sayfa iskeleti, `Outlet` ve ikon seçeneklerini karşılaştır
      - [x] FLOW-001.8e.1d.2 — Phosphor ikonlarını exact sürüm ve direct-path import politikasıyla ekle
      - [x] FLOW-001.8e.1d.3 — Kalıcı operasyon çerçevesini `AppShell` içinde oluştur
      - [x] FLOW-001.8e.1d.4 — Uygulamanın adres eşleme yapısını ortak sayfa iskeleti ve ana adresle bağla
        - [x] FLOW-001.8e.1d.4a — Ana adreste gösterilecek, sahte veri içermeyen başlangıç sayfasını ilgili özellik klasöründe oluştur
        - [x] FLOW-001.8e.1d.4b — Adres kurallarını ortak sayfa iskeleti ve başlangıç sayfasıyla eşleştir
        - [x] FLOW-001.8e.1d.4c — React başlangıç noktasını yeni adres eşleme bileşenine bağla
      - [x] FLOW-001.8e.1d.5 — Vite demo kaynak/asset'lerini kaldır ve format/lint/test/build ile doğrula
    - [x] FLOW-001.8e.1e — Geçici demo testini uygulama kabuğu davranış testiyle değiştir
  - [x] FLOW-001.8f — Clean install, lint, test ve production build kapılarını doğrula
- [x] FLOW-001.9 — Restore/build sonuçlarını agent doğrulasın
- [x] FLOW-001.10 — Frontend yerel kapısı da yeşil olduktan sonra GitHub Actions CI akışını ekle
  - [x] FLOW-001.10a — CI alternatiflerini, güncel official action hattını ve güvenlik kurallarını araştır
  - [x] FLOW-001.10b — PR ve `main` push tetikleyicili, read-only permission'lı CI workflow taslağını kullanıcı oluştursun
  - [x] FLOW-001.10c — Backend restore/build/test adımlarını `global.json` ile aynı SDK üzerinde çalıştır
  - [x] FLOW-001.10d — Frontend `npm ci`, lint, test ve build adımlarını lockfile üzerinden çalıştır
  - [x] FLOW-001.10e — Actions'ı full commit SHA ile pinle ve Dependabot Actions güncellemesini değerlendir
  - [x] FLOW-001.10f — İlk remote workflow sonucunu incelemeden required check/branch protection açma
- [ ] FLOW-001.11 — SonarQube Cloud statik analizini aşamalı kur
  - [x] FLOW-001.11a — SonarQube Cloud, self-hosted Server ve GitHub-native alternatifleri karşılaştır
  - [x] FLOW-001.11b — Kullanıcı public repository'yi SonarQube Cloud'a bağlasın ve `SONAR_TOKEN` repository secret'ını oluştursun
  - [x] FLOW-001.11c — SonarScanner for .NET'i local tool manifest ile exact sürüme sabitle
  - [ ] FLOW-001.11d — İlk aşamada C# analizini CI-based scanner ile çalıştır; token olmayan fork akışını güvenli ele al
  - [ ] FLOW-001.11e — Sonar TypeScript 6 desteği doğrulanınca frontend multi-language analizini aç
  - [ ] FLOW-001.11f — Gerçek testler oluşunca coverage üretimini/import'unu ve quality-gate bloklamasını etkinleştir
- [ ] FLOW-001.12 — SonarQube kurulumundan sonra ücretsiz demo deployment temelini kur
  - [x] FLOW-001.12a — .NET 10, React same-origin ve gelecekteki SQL Server ihtiyacı için ücretsiz hosting seçeneklerini araştır
  - [ ] FLOW-001.12b — Kullanıcı önerilen Azure hedefini ve abonelik/ücretsiz kota güvenlik sınırlarını onaylasın
  - [ ] FLOW-001.12c — React production çıktısını ASP.NET Core üzerinden same-origin sunan publish sözleşmesini kullanıcı uygulasın
  - [ ] FLOW-001.12d — Azure App Service Free F1 üzerinde .NET 10 uygulamasını ve production ayarlarını oluştur
  - [ ] FLOW-001.12e — GitHub Actions ile uzun ömürlü deployment parolası yerine OIDC tabanlı, önce elle tetiklenen deployment akışını kur
  - [ ] FLOW-001.12f — Public URL, HTTPS, API/SPA fallback, yeniden başlatma, log ve ücretsiz kota smoke kontrollerini doğrula
  - [ ] FLOW-001.12g — Azure SQL Database Free kaynağını ilk gerçek Identity migration'ına kadar oluşturma; bağlantı, firewall ve migration planını hazır tut

### Kabul kriterleri

- `FlowLogix.sln` .NET 10 ile clean build verir.
- API, Identity ve Customers modüllerinin proje sınırları görünürdür.
- SDK/build/paket/biçim politikaları repository kökünden uygulanır.
- Development OpenAPI üretimi ve ortak Problem Details temeli hazırdır.
- API yalnız composition root'tur; modüller yalnız açık registration/mapping contract'larıyla bağlanır.
- Frontend clean install ve build verir.
- GitHub Actions aynı backend ve frontend doğrulama komutlarını çalıştırır.
- Sonar secret'ı tracked dosyada bulunmaz; analiz kapsamı kullanılan dil sürümleriyle uyumludur.
- İlk demo deployment aynı origin üzerinde .NET API ve React çıktısını sunar; secret tracked dosyada bulunmaz ve ücretsiz kota aşımında otomatik ücret oluşmayacak sınır seçilir.
- Secret veya gerçek connection string tracked dosyada bulunmaz.
- Belgeler gerçek repository durumuyla tutarlıdır.

## FLOW-002 — Identity ve güvenli oturum

**Öncelik:** Must  
**Durum:** Bekliyor  
**Bağımlılık:** FLOW-001  
**İş değeri:** Operasyon ve müşteri verisine yalnız yetkili kullanıcının erişmesini sağlar.  
**Öğrenme hedefi:** ASP.NET Core Identity, cookie, antiforgery, policy authorization ve güvenli seed.

### Alt işler

- [ ] Identity DbContext ve `identity` şeması
- [ ] Admin/permission seed
- [ ] CSRF token, login, session ve logout endpoint'leri
- [ ] `Customers.Read` / `Customers.Write` policy'leri
- [ ] React login ve protected route
- [ ] Auth integration testleri

### Kabul kriterleri

- Anonymous müşteri isteği `401` döner.
- Yetkisiz kullanıcı yazma işleminde `403` alır.
- Geçerli admin cookie ile session okunur.
- State-changing istekte antiforgery eksikse işlem reddedilir.
- Parola source/config dosyasına yazılmaz.

## FLOW-003 — Müşteri ve lokasyon dikey dilimi

**Öncelik:** Must  
**Durum:** Bekliyor  
**Bağımlılık:** FLOW-002  
**İş değeri:** Sipariş akışının kullanacağı güvenilir müşteri ve adres ana verisini sağlar.  
**Öğrenme hedefi:** Domain invariants, EF Core mapping, SQL constraint, Problem Details, server state ve E2E.

### Alt işler

- [ ] Customer ve Location domain modeli
- [ ] Sequential Guid, UTC `DateTimeOffset`, `TimeProvider` ve kullanıcı bazlı audit alanları
- [ ] Customers DbContext, mapping ve `customers` şeması
- [ ] Create/list/detail/add-location application akışları
- [ ] API endpoint'leri ve standart hata gövdesi
- [ ] React liste/form/detay ekranları
- [ ] Unit, SQL Server integration ve kritik E2E testi

### Kabul kriterleri

- Yetkili kullanıcı müşteri oluşturur ve `201` alır.
- Normalize edilmiş müşteri kodu ve dolu vergi numarası benzersizdir; çakışma `409` döner.
- Geçersiz alanlar `400` ve alan bazlı hata döner.
- Liste arama, aktiflik, sıralama ve sayfalama yapar.
- Lokasyon müşteriye eklenir ve detayda görünür.
- Customer ve Location oluşturma/değiştirme zamanı ile işlemi yapan kullanıcı kimliği saklanır.
- Login → müşteri → lokasyon E2E akışı geçer.

## Backlog'a henüz alınmayanlar

Filo, sipariş, sevkiyat, atama, execution, exception ve finans hazırlığı yalnız roadmap başlığıdır; FLOW-003 doğrulanmadan ayrıntılı task üretilmez.
