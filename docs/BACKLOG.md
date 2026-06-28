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
- [ ] FLOW-001.8 — React/Vite proje iskeletini kullanıcı oluştursun
  - [ ] FLOW-001.8a — Güncel React/Vite/TypeScript/Router/Query sürüm ve Node uyumluluğunu doğrula
  - [ ] FLOW-001.8b — Vite React/TypeScript iskeletini `src/FlowLogix.Web` altında oluştur
  - [ ] FLOW-001.8c — Router ve Query bağımlılıklarını exact sürümlerle ekle
  - [ ] FLOW-001.8d — Script, TypeScript, ESLint ve Vite config'lerini repository politikasıyla doğrula
  - [ ] FLOW-001.8e — Başlangıç şablonunu FlowLogix uygulama kabuğuna indirgeme planını belirle
  - [ ] FLOW-001.8f — Clean install, lint, test ve production build kapılarını doğrula
- [ ] FLOW-001.9 — Restore/build sonuçlarını agent doğrulasın
- [ ] FLOW-001.10 — İlk yerel yeşil build sonrasında GitHub Actions doğrulama akışını ekle

### Kabul kriterleri

- `FlowLogix.sln` .NET 10 ile clean build verir.
- API, Identity ve Customers modüllerinin proje sınırları görünürdür.
- SDK/build/paket/biçim politikaları repository kökünden uygulanır.
- Development OpenAPI üretimi ve ortak Problem Details temeli hazırdır.
- API yalnız composition root'tur; modüller yalnız açık registration/mapping contract'larıyla bağlanır.
- Frontend clean install ve build verir.
- GitHub Actions aynı backend ve frontend doğrulama komutlarını çalıştırır.
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
