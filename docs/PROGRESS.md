# FlowLogix İlerleme Durumu

## Aktif çalışma

- **Milestone:** Faz 0 — Bağlam ve çalışma zemini
- **Epic/Task:** FLOW-001 — Dokümantasyon ve temel iskelet
- **Aktif alt task:** FLOW-001.8e.1 — FlowLogix frontend uygulama kabuğu
- **Branch:** `feature/FLOW-001-foundation`
- **Son doğrulanan kaynak commit:** `29c6f4c` — `feat(web): define application provider foundation`
- **Son repository commit (bu handoff commit'i öncesi):** `be84d7d` — `docs: strengthen frontend collaboration rules`

## Mevcut repository yapısı

- `FlowLogix.sln`
- `src/FlowLogix.Api` — composition root; OpenAPI, Problem Details ve Identity/Customers modül bağlantıları
- `src/FlowLogix.Identity` — ASP.NET Core framework reference ve public composition contract mevcut
- `src/FlowLogix.Customers` — ASP.NET Core framework reference ve public composition contract mevcut
- `tests/FlowLogix.Customers.UnitTests` — MSTest SDK/MTP; `Customers` referansı
- `tests/FlowLogix.Customers.IntegrationTests` — MSTest SDK/MTP; seri çalışma; `Customers` referansı
- `src/FlowLogix.Web` — React 19/Vite 8/TypeScript 6 scaffold; Router, Query, Vitest, type-aware ESLint, strict TS ve trusted HTTPS `/api` proxy hazır

## Bu oturumda tamamlananlar

- Bağlayıcı başlangıç promptu, Word ürün/domain belgesi ve örnek PRINCIPLES tamamen okundu.
- Word belgesindeki 263 paragraf ve 58 tablo incelendi.
- Başlangıç domain ve teknik araştırması yapıldı.
- Kullanıcı şu kararları onayladı:
  - Yurtiçi, tehlikesiz komple taşıma
  - Yalnız özmal filo
  - Tek şirket/tek şube
  - .NET 10 modüler monolith, SQL Server, React/TypeScript, same-origin Identity cookie
  - Haftada 10–15 saat
  - Kısa ömürlü feature branch
- .NET SDK 10.0.301, Node 24.16.0 ve çalışan `MSSQLSERVER` doğrulandı.
- Yaşayan Markdown belgeleri oluşturuldu.
- Mimari derinlik; modüler monolith, Clean Architecture ilkeleri, dikey dilimler, DDD, repository, CQRS, MediatR, event-driven yapı, outbox ve event sourcing açısından birincil kaynaklarla araştırıldı.
- Mimari karar `modül assembly'si + Domain/Features/Infrastructure + use-case bazlı dikey dilim + seçici DDD` olarak netleştirildi.
- Clean Architecture, Hexagonal, Onion ve Vertical Slice karşılaştırıldı; birleşik pattern seti D-011 ile kaydedildi.
- Kodlama öncesi mühendislik hazırlık boşlukları R-008 ile değerlendirildi; kullanıcı `1A, 2A, 3A, 4A` seçeneklerinin tamamını onayladı.
- Repository temeli D-012, kimlik/zaman/audit politikası D-013 ve ilk CI kapısı D-014 ile kaydedildi.
- Mevcut branch'in `feature/FLOW-001-foundation` olduğu doğrulandı; FLOW-001.5 tamamlandı.
- Kullanıcının oluşturduğu `global.json` repository'den okundu; `10.0.301` ve `latestPatch` politikasıyla `dotnet --version` sonucu doğrulandı.
- Kullanıcının oluşturduğu `Directory.Build.props` XML olarak doğrulandı; nullable, implicit usings, warning-as-error, build code-style ve Recommended analyzer politikaları eksiksiz.
- Kullanıcının oluşturduğu `Directory.Packages.props` XML olarak doğrulandı; NuGet Central Package Management etkin ve paket listesi ilk gerçek bağımlılıkları bekliyor.
- Kullanıcının oluşturduğu `.editorconfig` doğrulandı; UTF-8/LF, dosya türüne göre indentation, file-scoped namespace ve açık accessibility kuralları etkin.
- Kullanıcının oluşturduğu `.gitattributes` doğrulandı; text dosyaları LF, Windows batch dosyaları CRLF ve ofis/görsel arşivleri binary olarak çözümleniyor.
- FLOW-001.6 repository mühendislik temeli tamamlandı.
- Kullanıcının oluşturduğu `FlowLogix.sln` format 12.00 olarak doğrulandı; “Çözümde proje bulunamadı” mesajı beklenen boş-solution sonucu.
- Kullanıcının oluşturduğu `src/FlowLogix.Api` boş ASP.NET Core projesi incelendi; ortak MSBuild politikalarını miras aldığı ve tek başına `0` uyarı/`0` hatayla build verdiği doğrulandı.
- `FlowLogix.Api` solution'ın `src` klasörüne eklendi; tüm solution `0` uyarı/`0` hatayla build edildi.
- Kullanıcının oluşturduğu `src/FlowLogix.Identity` class-library şablonu incelendi; merkezi MSBuild politikalarını miras aldığı ve tek başına temiz build verdiği doğrulandı.
- Identity şablonundaki `Class1.cs` ve merkezi ayar tekrarları kullanıcı tarafından kaldırıldı; boş modül assembly'si tekrar temiz build verdi.
- `FlowLogix.Identity` solution'ın `src` klasörüne eklendi; API ve Identity birlikte `0` uyarı/`0` hatayla build edildi.
- Kullanıcının oluşturduğu `src/FlowLogix.Customers` class-library şablonu incelendi; merkezi MSBuild politikalarını miras aldığı ve tek başına temiz build verdiği doğrulandı.
- Customers şablonundaki `Class1.cs` ve merkezi ayar tekrarları kullanıcı tarafından kaldırıldı; boş modül assembly'si tekrar temiz build verdi.
- `FlowLogix.Customers` solution'ın `src` klasörüne eklendi; API, Identity ve Customers birlikte `0` uyarı/`0` hatayla build edildi.
- .NET test framework/platform seçenekleri R-009'da karşılaştırıldı; MSTest SDK + Microsoft.Testing.Platform D-015 ile seçildi.
- `FlowLogix.Customers.UnitTests` şablonu restore edilmeden oluşturuldu; yerel şablonun ürettiği `MSTest.Sdk/4.0.2` yerine güncel `4.1.0` sürümünün `global.json` üzerinden merkezileştirilmesine karar verildi.
- `global.json` içindeki merkezi `MSTest.Sdk 4.1.0` ve `Microsoft.Testing.Platform` runner seçimi JSON ve CLI üzerinden doğrulandı.
- Unit test `.csproj` dosyası merkezi SDK sürümüne bağlandı; MSBuild `MSTestVersion=4.1.0` raporladı ve MTP runner'da şablon testi `1/1` geçti.
- `FlowLogix.Customers.UnitTests → FlowLogix.Customers` project reference yönü doğrulandı; test projesi `0` uyarı/`0` hatayla build ve `1/1` başarılı test verdi.
- `FlowLogix.Customers.IntegrationTests` oluşturuldu; merkezi MSTest SDK 4.1.0, MTP, assembly-level non-parallel çalışma ve `IntegrationTests → Customers` referansı doğrulandı.
- Unit ve integration test projeleri solution'ın `tests` klasörüne eklendi.
- `FlowLogix.Api → FlowLogix.Identity` ve `FlowLogix.Api → FlowLogix.Customers` referansları kuruldu; modüllerin birbirine referans vermediği doğrulandı.
- `Microsoft.AspNetCore.OpenApi 10.0.9` merkezi paket yönetimine ve API projesine eklendi; yerel ASP.NET Core runtime 10.0.9 ile eşleştiği doğrulandı.
- API composition root'a Development OpenAPI, Problem Details, exception handling, status-code pages ve HTTPS redirection eklendi.
- Gerçek HTTP kontrolünde `/openapi/v1.json` `200`; bilinmeyen route `404`, `application/problem+json` ve `traceId` döndürdü.
- Bağlayıcı rehber ve yaşayan belgeler yeniden okundu; belgelerin gerçek repository'nin gerisinde kaldığı tespit edilerek bu güncellemeyle eşitlendi.
- Framework reference ve modül endpoint sahipliği R-010'da karşılaştırıldı; composition contract'ın FLOW-001 içinde kurulması D-016 ile netleştirildi.
- `.gitignore` içindeki `*.user` kuralı gerçek `FlowLogix.Api.csproj.user` üzerinde doğrulandı; makineye özgü dosya Git durumundan çıkarıldı.
- Context küçülmesi ve handoff disiplini `AGENTS.md`, `docs/PRINCIPLES.md` ve L-012 ile kalıcı çalışma kuralına dönüştürüldü.
- Identity ve Customers projelerine `Microsoft.AspNetCore.App` framework reference eklendi; bunun NuGet paketi oluşturmadığı doğrulandı. Solution `0` uyarı/`0` hata, MTP testleri `2/2` başarılı.
- Teknik anlatımın başlangıç seviyesi benzetme + geliştirici seviyesi gerçek davranış şeklinde iki katmanlı olması yaşayan çalışma kuralına eklendi.
- Kullanıcının oluşturduğu `IdentityModule.cs` incelendi; `AddIdentityModule` ve `MapIdentityEndpoints` public extension contract'larının doğru tipleri döndürdüğü doğrulandı.
- Identity composition contract eklendikten sonra solution restore/build/test tekrar çalıştırıldı; 5 proje `0` uyarı/`0` hatayla derlendi ve 2 geçici keşif testi geçti.
- `IdentityModule.cs` içindeki üç gereksiz şablon using'i kullanıcı tarafından kaldırıldı; son solution build'i 5 projede `0` uyarı/`0` hatayla tamamlandı ve FLOW-001.7g.2 kapatıldı.
- Kullanıcının oluşturduğu `CustomersModule.cs` incelendi; `AddCustomersModule` ve `MapCustomersEndpoints` public extension contract'ları Identity ile tutarlı ve gereksiz bağımlılık içermiyor.
- Customers composition contract sonrasında solution build'i 5 projede `0` uyarı/`0` hatayla, mevcut MTP testleri `2/2` başarılı tamamlandı ve FLOW-001.7g.3 kapatıldı.
- Presentation proje ayrımı, gRPC, event-driven iletişim ve Minimal API/REPR alternatifleri resmi kaynaklarla R-010'da yeniden karşılaştırıldı; bunların farklı problemleri çözdüğü kaydedildi ve mevcut tek-proje-modül kararı benimseme kapılarıyla korundu.
- Word belgesindeki MVP modülleri ve v0.2–v1.0 büyüme yönleri yeniden incelendi; modül karakterine göre pattern matrisi, ortak standartlar ve event/outbox/broker/mikroservis evrim kapıları R-011 ve D-017 ile kaydedildi.
- İlk `Program.cs` kontrolünde Identity/Customers namespace'leri, iki `Add...Module()` çağrısı ve `if (` düzeltmesi hazırdı; eksik iki `Map...Endpoints()` çağrısı sonraki kullanıcı adımında tamamlandı.
- Kullanıcı `Program.cs` içindeki iki `Map...Endpoints()` çağrısını tamamladı; API yalnız modüllerin public composition yüzeylerini çağırıyor.
- Dependency graph yeniden doğrulandı: API → Identity/Customers; Identity ve Customers arasında project reference yok.
- Final backend iskelet restore/build/test kapısı geçti: 5 proje, `0` uyarı, `0` hata ve `2/2` geçici MTP testi başarılı.
- Çalışan API kontrolünde OpenAPI `200`; bilinmeyen route `404`, `application/problem+json` ve `traceId` döndürdü. HTTP-only doğrulama adresinde HTTPS portu bulunamadığı uyarısı test koşulundan kaynaklandı.
- FLOW-001.7g.4, FLOW-001.7g.5 ve backend iskelet FLOW-001.7 tamamlandı.
- Kullanıcı mevcut değişiklikleri Conventional Commits ile mantıksal gruplar hâlinde commit etme yetkisi verdi; push/merge yetkisi vermedi.
- `origin` remote'u `MuhammedYasinOzdemirDev/FLOWLOGIX` olarak doğrulandı; GitHub CLI makinede kurulu olmadığı için CLI authentication kontrolü yapılamadı.
- Conventional Commits ile `01a0d29 docs: establish FlowLogix project guidance`, `8c2345b build: configure repository tooling`, `7c650ce feat(api): establish modular backend foundation` ve `7ab78a2 docs: record CI and analysis strategy` commitleri oluşturuldu.
- Son source commit öncesi whitespace kontrolü, solution build ve test tekrar geçti; 5 proje `0` uyarı/`0` hata ve `2/2` geçici test başarılı.
- GitHub API repository'nin public, default branch'in `main` olduğunu doğruladı; push yapılmadı.
- GitHub Actions, SonarQube Cloud/Server, CodeQL, action pinning, secret, coverage ve TypeScript uyumluluğu R-012'de araştırıldı.
- Frontend local kapısı yeşil olduktan sonra read-only GitHub Actions CI kurulmasına; kullanıcı dış hizmet aktivasyonunu onaylarsa public repo için SonarQube Cloud Free kullanılmasına karar verildi.
- TypeScript `6.0.3` kararlı olmasına rağmen Sonar'ın resmi tam desteği `5.9.3`te kaldığı için ilk Sonar taramasının C# ile sınırlandırılması ve frontend analizinin destek kapısında açılması kaydedildi.
- Kullanıcı gelecek commitlerin değişiklik niyetine göre daha açıklayıcı gruplandırılmasını istedi; kural `AGENTS.md` ve `docs/PRINCIPLES.md` içine kalıcı olarak eklendi. Bu belge değişikliği yapay bir mikro-commit yerine yarınki ilgili dokümantasyon grubuna alınacak.
- Yeni oturumda repository, solution graph, Node/npm/.NET sürümleri ve frontend klasörünün yokluğu yeniden doğrulandı.
- R-013 ile frontend sürüm/lisans/engine matrisi tamamlandı; React Router 7 planı mevcut stack ile uyumlu `react-router@8.0.1` Declarative Mode'a güncellendi ve D-019'a kaydedildi.
- npm registry erişimindeki sertifika zinciri hatası TLS doğrulaması kapatılmadan, process-level `NODE_OPTIONS=--use-system-ca` ile çözüldü.
- R-014 ile frontend feature mimarisi, state sahipliği, React yazım kuralları ve fetch/Axios karşılaştırması tamamlandı; tipli native fetch istemcisi D-020 ile seçildi.
- FLOW-001.8b scaffold komutu çalıştırıldı; Vite tam template, lockfile ve `node_modules` üretti ancak Windows/npm argüman yorumlaması hedefi `src/FlowLogix.Web` yerine repository kökündeki `.srcFlowLogix.Web` klasörü yaptı. İçerik silinmeden doğru konuma taşınacak.
- Kullanıcı scaffold'u `src/FlowLogix.Web` konumuna taşıdı; yanlış `.srcFlowLogix.Web` yolu artık yok. Gerçek package/config/source dosyaları okundu, dependency ağacı doğrulandı, lint ve production build başarılı oldu; FLOW-001.8b tamamlandı.
- Scaffold'un ESLint seçiminde öğretici açıklama atlandığı kullanıcı geri bildirimiyle tespit edildi; ESLint'in type-check/test/build'den farkı L-019'a kaydedildi.
- Kullanıcı `react-router@8.0.1` ve `@tanstack/react-query@5.101.2` paketlerini exact sürümle ekledi. Manifest, lockfile ve `npm ls` aynı sürümleri doğruladı; paket eklemesi sonrası lint ve production build yeniden geçti, FLOW-001.8c tamamlandı.
- Kullanıcı kök `.nvmrc`, `packageManager`, `engines` ve exact direct dependency sözleşmesini uyguladı. Node/npm sürümleri, manifest/lockfile ve kurulu ağaç eşleşti; temiz `npm ci` sonrası audit, lint ve build yeşil tamamlandı, FLOW-001.8d.1 kapandı.
- Kullanıcı Vitest, Testing Library React/DOM/user-event, jest-dom ve jsdom paketlerini doğrulanmış exact sürümlerle dev dependency olarak ekledi. Manifest ve kurulu ağaç doğrulandı; lint/build yeniden geçti, FLOW-001.8d.2a tamamlandı.
- Kullanıcı test script'leri, ayrı Vitest config, jsdom/setup ve TypeScript config kapsamını ekledi. ESLint geçti; explicit solution build eşdeğeri `tsc -b && vite build`, `vitest.config.ts` içindeki uzantısız `./vite.config` import'unu NodeNext altında çözemedi (`TS2307`). FLOW-001.8d.2b düzeltme doğrulanana kadar açık.
- Kullanıcı Vitest config import'unu `./vite.config.ts` olarak düzeltti; NodeNext çözümlemesiyle lint/build yeniden geçti ve FLOW-001.8d.2b tamamlandı.
- Kullanıcı Vite demo `App` sayacının görünür kullanıcı davranışını sınayan ilk geçici component testini ekledi. Vitest jsdom/setup zincirinde `1/1` test geçti; lint/build yeşil, FLOW-001.8d.2 tamamlandı.
- Kullanıcı Query ve Testing Library ESLint plugin'lerini exact dev dependency olarak ekledi. Manifest/lockfile/ağaç uyumlu; mevcut test, lint ve build yeşil, FLOW-001.8d.3a tamamlandı. Export şekli ayrıca doğrulandı: Query recommended dizi, Testing Library React config nesnesidir.
- Kullanıcı ESLint config'ini type-aware Project Service, Query recommended ve test-scoped Testing Library React kurallarıyla güncelledi. Yeni lint, test ve build yeşil; FLOW-001.8d.3 tamamlandı.
- Kullanıcı app ve Node TSConfig'lerine strict ve ek güvenlik kontrollerini uyguladı; browser/Node module-resolution ayrımı korundu. Type-aware lint, Vitest `1/1` ve production build geçti, FLOW-001.8d.4a tamamlandı.
- Kullanıcı ASP.NET Core development certificate'a Windows trust onayı verdi; CLI `TrustLevel: Full`, localhost SAN ve geçerlilik süresini doğruladı.
- Kullanıcı mekanik frontend tooling/config dosyalarını, aynı öğretici açıklama korunarak agent'ın doğrudan yazmasına sınırlı yetki verdi. Yetki React ürün kodu, backend/domain, migration veya ürün davranışını kapsamıyor; sınır AGENTS ve PRINCIPLES'a işlendi.
- Agent sınırlı config yetkisiyle frontend project `.npmrc` dosyasını ekledi; npm `node-options`, `save-exact` ve `engine-strict` değerlerini doğruladı. FLOW-001.8d.4b.1 tamamlandı.
- Agent sınırlı config yetkisiyle Vite port/strictPort ve `secure: true` HTTPS `/api` proxy config'ini ekledi. Lint, test ve build geçti; çalışan Vite üzerinden API'ye istek Kestrel Problem Details döndürdü. Geçici servisler kapatıldı, FLOW-001.8d tamamlandı.
- Yeni task başında handoff özeti denetlendi; üstte kalan eski FLOW-001.8b/frontend-yok bilgisi gerçek repository durumuyla eşitlendi.
- R-019 ile ERP UI/styling seçenekleri karşılaştırıldı; MUI v9 core + Emotion D-025 ile seçildi. Data Grid/icons/date picker gerçek use-case'e ertelendi.
- Agent sınırlı dependency/config yetkisiyle MUI core `9.1.2` ve Emotion `11.14.0/11.14.1` paketlerini exact kurdu. Manifest/lockfile/ağaç, test `1/1`, lint ve build yeşil; FLOW-001.8e.1b tamamlandı.
- R-020/D-026 ile FlowLogix'in Operasyon Kontrol Kulesi görsel dili ve Phosphor/Motion/Charts/MapLibre/Data Grid benimseme kapıları kaydedildi; hiçbir ek “havalı” paket ihtiyaçtan önce kurulmadı.
- Kullanıcı `src/app/theme.ts` içinde FlowLogix CSS-variable prefix, semantic palette, sistem fontu ve MUI component default'larını oluşturdu. Strict TypeScript, lint, test `1/1` ve build geçti; FLOW-001.8e.1c.1 tamamlandı.
- Kullanıcı `queryClient.ts` ve `AppProviders.tsx` provider composition kaynaklarını ekledi; test `1/1`, lint ve build geçti. Ancak `AppProviders.tsx` 4 boşluk girintili, repository `.editorconfig` TS/TSX için 2 boşluk istiyor; FLOW-001.8e.1c.2 format düzeltilmeden kapanmadı.
- R-021/D-027 ile frontend formatter seçenekleri karşılaştırıldı; mevcut type-aware ESLint hattını koruyup biçimlendirmeyi ayrı `prettier@3.9.1` kapısına verme kararı alındı.
- Agent sınırlı frontend tooling/config yetkisiyle exact Prettier dependency'sini, `.prettierrc.json`, `.prettierignore`, `format` ve `format:check` script'lerini ekledi. Paket audit'i 0 bilinen açık verdi.
- İlk `format:check` kaynakları değiştirmeden `AppProviders.tsx` dâhil 14 mevcut dosyada format farkı buldu. FLOW-001.8d.5 ve FLOW-001.8e.1c.2 kullanıcı baseline'ı uygulayıp tüm kapılar doğrulanana kadar açık.
- Kullanıcı ilk Prettier baseline'ını uyguladı. `AppProviders.tsx` 2 boşluk standardına geldi; format check, lint, Vitest `1/1`, production build, .NET solution build ve backend testleri `2/2` geçti. FLOW-001.8d.5 ve FLOW-001.8e.1c.2 tamamlandı.
- Bu oturumda `f0b190b build(web): establish deterministic React toolchain`, `29c6f4c feat(web): define application provider foundation` ve `be84d7d docs: strengthen frontend collaboration rules` commitleri niyet bazlı gruplarla oluşturuldu; yaşayan frontend belgeleri bu handoff commit'iyle kaydedildi. Push veya merge yapılmadı.

## Kullanıcı tarafından uygulanan kaynak dosyalar

- `global.json`, `Directory.Build.props`, `Directory.Packages.props`, `.editorconfig`, `.gitattributes`
- `FlowLogix.sln`
- `src/FlowLogix.Api/*` (`Program.cs` modül kayıt/eşleme çağrıları dahil)
- `src/FlowLogix.Identity/FlowLogix.Identity.csproj`, `src/FlowLogix.Identity/IdentityModule.cs`
- `src/FlowLogix.Customers/FlowLogix.Customers.csproj`
- `src/FlowLogix.Customers/CustomersModule.cs`
- `tests/FlowLogix.Customers.UnitTests/*`
- `tests/FlowLogix.Customers.IntegrationTests/*`
- `src/FlowLogix.Web/*` — resmi Vite `react-ts` scaffold, lockfile ve başlangıç React kaynakları

## Çalıştırılan doğrulamalar

- `dotnet --info` — başarılı; SDK 10.0.301
- `node --version` — başarılı; 24.16.0
- `npm --version` — başarılı; 11.13.0
- SQL Server servis kontrolü — `MSSQLSERVER` çalışıyor
- Git durum/commit incelemesi — başarılı
- `dotnet restore .\FlowLogix.sln` — başarılı
- `dotnet build .\FlowLogix.sln --no-restore` — başarılı; 5 proje, 0 uyarı, 0 hata
- `dotnet test .\FlowLogix.sln --no-build --no-restore` — başarılı; 2 geçici şablon testi
- `dotnet msbuild ... -getProperty:MSTestVersion` — `4.1.0`
- Development HTTP OpenAPI/404 Problem Details kontrolleri — başarılı
- Composition sonrası Development HTTP kontrolü — OpenAPI `200`; bilinmeyen route `404 application/problem+json` ve `traceId`
- `npm ls --depth=0 --prefix .\src\FlowLogix.Web` — başarılı; lockfile/kurulu direct dependency ağacı tutarlı
- `npm run lint --prefix .\src\FlowLogix.Web` — başarılı; ESLint ihlali yok
- `npm run build --prefix .\src\FlowLogix.Web` — başarılı; TypeScript build ve Vite 8.1.0 production bundle
- Router/Query sonrası `npm run lint --prefix .\src\FlowLogix.Web` — başarılı
- Router/Query sonrası `npm run build --prefix .\src\FlowLogix.Web` — başarılı; 20 modül transform edildi
- `npm ci --prefix .\src\FlowLogix.Web` — başarılı; 156 paket temiz kuruldu, 157 paket audit edildi, 0 bilinen vulnerability
- Exact sürüm sözleşmesi sonrası `npm run lint` ve `npm run build` — başarılı
- Test dependency kurulumu sonrası `npm run lint` ve `npm run build` — başarılı
- Vitest config sonrası `npm run lint` — başarılı; `npm run build` — başarısız, `TS2307 Cannot find module './vite.config'`
- `.ts` import düzeltmesi sonrası `npm run lint` ve `npm run build` — başarılı
- `npm run test --prefix .\src\FlowLogix.Web` — başarılı; 1 test dosyası, 1 test
- İlk component testi sonrası `npm run lint` ve `npm run build` — başarılı
- ESLint plugin kurulumu sonrası `npm run test`, `npm run lint` ve `npm run build` — başarılı
- Type-aware ESLint config sonrası `npm run lint`, `npm run test` (1/1) ve `npm run build` — başarılı
- Strict TSConfig sonrası `npm run lint`, `npm run test` (1/1) ve `npm run build` — başarılı
- Vite proxy config sonrası `npm run lint`, `npm run test` (1/1) ve `npm run build` — başarılı
- Runtime Vite proxy kontrolü — `/api/proxy-check` → Kestrel `404 application/problem+json` + `traceId`; Vite `/` → `200`
- MUI/Emotion kurulumu sonrası `npm run test`, `npm run lint` ve `npm run build` — başarılı
- FlowLogix theme sonrası `npm run test`, `npm run lint` ve `npm run build` — başarılı
- `npm ls prettier --depth=0 --prefix .\src\FlowLogix.Web` — başarılı; exact `prettier@3.9.1`
- `npm run format:check --prefix .\src\FlowLogix.Web` — beklenen başarısız; 14 mevcut dosya ilk format baseline'ını bekliyor
- Prettier config kurulumu sonrası `npm run lint`, `npm run test` (1/1) ve `npm run build` — başarılı
- İlk format baseline'ı sonrası `npm run format:check`, `npm run lint`, `npm run test` (1/1) ve `npm run build` — başarılı
- Commit öncesi `dotnet build .\FlowLogix.sln --no-restore` — başarılı; 5 proje, 0 uyarı, 0 hata
- Commit öncesi `dotnet test .\FlowLogix.sln --no-build --no-restore` — başarılı; 2/2 geçici test

## Açık durum ve riskler

- Frontend source/tooling, çalışma kuralları ve yaşayan proje hafızası dört mantıksal commit grubunda kaydedildi. GitHub'a push edilmedi.
- `FlowLogix.Customers.csproj` için çalışma ağacı ve index içerik hash'lerinin aynı olduğu doğrulandı; CRLF/LF stat bilgisi içerik commit'i oluşturmadan yenilendi ve çalışma ağacı temizlendi.
- `.vs/` ignore kuralı kullanıcı tarafından eklendi ve doğrulandı.
- İki `Test1.cs` yalnız MTP keşif altyapısını doğrulayan geçici şablon testidir; gerçek domain/integration kapsamı gibi sayılmamalı ve ilk gerçek testlerle değiştirilmelidir.
- React/Vite scaffold doğru konumda; Router/Query exact sürümle kurulu ve son test/lint/build kapıları yeşil. `test` script'i ve 1 geçici component testi mevcut.
- SQL Server bağlantı biçimi ve development database adı source adımında doğrulanmalı; secret repository'ye yazılmamalı.
- Paket exact sürümleri kurulum anında resmi kaynak/NuGet/npm üzerinden tekrar doğrulanmalı.
- GitHub CLI makinede kurulu değil; remote API erişimi mevcut, ancak CLI ile auth/secret/push işlemi yapılamıyor.
- SonarQube Cloud project import ve `SONAR_TOKEN` oluşturma dış hizmet işlemi olduğundan kullanıcı tarafından yapılmalı.
- SonarQube Cloud resmi TypeScript tam desteği `5.9.3`; FlowLogix TypeScript 6 frontend analizi açılmadan yeniden doğrulanmalı.
- API development HTTPS sertifikası trusted; Vite proxy Node process'inin system CA kullanması project `.npmrc` ile uygulandı ve gerçek proxy isteğinde doğrulandı.
- Prettier format kapısı ve ilk baseline doğrulandı; format check yeşil. Geçici Vite demo ekranı/testi gerçek uygulama kabuğu kurulunca değiştirilmeli.
- Word belgesinin görsel render kontrolü ortamda LibreOffice bulunmadığı için yapılamadı; içerik OOXML ve metin/tablo çıkarımıyla okundu.

## Alınan kararlar

Bkz. `docs/DECISIONS.md`.

## İleri kontrol notları

- Sipariş modeli açıldığında `TransportOrder 1:N Shipment`, fakat MVP'de tek sevkiyat davranışı tekrar kontrol edilecek.
- Fleet taskında belge ve ehliyet hard/soft constraint ayrımı araştırılacak.
- ADR kapsamı açılırsa U-ETDS tehlikeli madde bildirim süresi güncel resmi mevzuattan yeniden doğrulanacak.
- Dış pasaport linki düşünülürse eFTI uyumluluğu iddia edilmeden erişim güvenliği tasarlanacak.

## Sıradaki tek ve kesin adım

FLOW-001.8e.1c.3 kapsamında kullanıcı `src/FlowLogix.Web/src/main.tsx` bootstrap'ını `AppProviders` üzerinden bağlayacak; başlamadan önce iş amacı, React root/provider çalışma sırası, dosya ve eksiksiz küçük kod adımı öğretici biçimde anlatılacak.

## Yeni sohbet okuma sırası

1. `AGENTS.md`
2. `docs/PRINCIPLES.md`
3. `docs/PROJECT-BRIEF.md`
4. `docs/DECISIONS.md`
5. `docs/PROGRESS.md`
6. `docs/BACKLOG.md`
