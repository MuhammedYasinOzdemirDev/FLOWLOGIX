# FlowLogix Karar Kaydı

## D-001 — Başlangıç taşıma kapsamı

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** MVP yurtiçi, tehlikesiz komple taşımaya odaklanacak. Aynı sevkiyatta temel sıralı duraklar olabilir; farklı siparişlerin parsiyel konsolidasyonu yapılmayacak.
- **Alternatifler:** Parsiyel taşıma; dağıtım; ADR.
- **Neden:** Tek geliştiricili 2–3 aylık MVP'de sipariş bölme, yük birimi, konsolidasyon ve maliyet dağıtımı karmaşıklığını ertelemek.
- **Yeniden değerlendirme:** FLOW-003 sonrası gerçek demo akışında parsiyel ihtiyaç ürünün değerini belirgin biçimde değiştirirse.

## D-002 — Kaynak modeli

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** MVP yalnız özmal araç ve sürücüyü planlayacak.
- **Alternatif:** Özmal + taşeron taşıyıcı.
- **Neden:** Taşıyıcı sözleşmesi, tender, buy-side maliyet ve dış kaynak sorumluluğunu MVP'den çıkarmak.
- **Yeniden değerlendirme:** v0.2 planlaması veya gerçek kullanıcı doğrulaması.

## D-003 — Organizasyon sınırı

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Tek şirket ve tek operasyon şubesi; tenant ve branch izolasyonu uygulanmayacak.
- **Alternatifler:** Tek şirket/çok şube; multi-tenant SaaS.
- **Neden:** Yetki ve veri izolasyonunu ilk sürümde gereksiz büyütmemek.
- **Yeniden değerlendirme:** İkinci firma/şube gerçek kullanım ihtiyacı oluştuğunda.

## D-004 — Teknik mimari

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** .NET 10 modüler monolith, modül içinde use-case odaklı dikey dilimler, karmaşık domainlerde seçici DDD, ASP.NET Core API, SQL Server ve React/TypeScript.
- **Ayrıntı:** Tek veritabanı; modül başına assembly, şema, DbContext ve migration sahipliği. Modül içinde bağımsız `Domain`, use-case bazlı `Features` ve `Infrastructure` alanları bulunur. API yalnız composition root'tur.
- **Bağımlılık kuralı:** Domain framework/persistence bilmez; modüller birbirinin tablolarına veya DbContext'ine erişmez. Registration/mapping yüzeyi dışında modül tipleri mümkün olduğunca `internal` tutulur.
- **Alternatifler:** Katman başına çok sayıda proje; mikroservis; tek monolitik proje.
- **Neden:** Pahalı modül/veri sahipliği kararını baştan doğru kurarken basit context'lere gereksiz DDD ve dağıtık sistem maliyeti yüklememek.
- **Yeniden değerlendirme:** Bağımsız deploy/ölçek veya ekip sahipliği oluşursa.

## D-005 — Kimlik doğrulama

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Same-origin ASP.NET Core Identity cookie ve state-changing API isteklerinde antiforgery.
- **Alternatif:** Ayrı origin/deployment ve token/OIDC.
- **Neden:** Birinci taraf browser uygulamasında token'ı JavaScript'e açmadan daha küçük ve güvenli başlangıç.
- **Yeniden değerlendirme:** Mobil uygulama, public API veya bağımsız frontend deployment gerektiğinde.

## D-006 — Çalışma kapasitesi

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Yol haritası haftada 10–15 saat varsayımıyla planlanacak.
- **Yeniden değerlendirme:** İki hafta üst üste fiili kapasite belirgin farklı çıkarsa.

## D-007 — Git akışı

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** `main` tabanlı kısa ömürlü `feature/FLOW-xxx-*` branch'leri.
- **Kural:** Agent açık onay olmadan commit, merge, rebase veya push yapmaz.
- **Alternatifler:** Doğrudan main; main + develop.
- **Neden:** Solo geliştiricide düşük süreç maliyetiyle güvenli task izolasyonu.

## D-008 — Sipariş–sevkiyat yönü

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Ticari sipariş ve fiziksel sevkiyat ayrı yaşam döngüleridir. Domain gelecekte bir siparişten birden fazla sevkiyatı destekleyecek; MVP başlangıcında tek sevkiyat üretilecek.
- **Neden:** Geleceği kapatmadan split/merge ve miktar dağıtımını ertelemek.
- **Yeniden değerlendirme:** Commercial Order ve Shipment Planning karar kapısında.

## D-009 — Kod yazma yetkisi

- **Tarih:** 2026-06-28
- **Durum:** Bağlayıcı
- **Karar:** Kaynak kodunu kullanıcı yazar. Agent yaşayan Markdown belgelerini güncelleyebilir; yalnız açıkça izin verilen belirli mekanik frontend taskında kaynak kodu değiştirebilir.

## D-010 — Pattern benimseme politikası

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Pattern ve altyapı “gelecekte gerekebilir” diye değil, çözmesi gereken problem ve benimseme kapısı doğrulandığında eklenir.
- **Şimdi uygulanacak:** Modül sınırı, veri sahipliği, dependency direction, use-case sınıfları, DTO/projection ayrımı, gerçek SQL Server testleri, transaction/concurrency değerlendirmesi.
- **Şimdilik uygulanmayacak:** Generic repository, tekrar bir Unit of Work abstraction'ı, MediatR, ayrı read store CQRS, event sourcing, outbox, broker, Redis ve mikroservis deployment.
- **Önemli ayrım:** Write/read use-case'lerini ayırmak tam CQRS altyapısı değildir; append-only `ShipmentEvent` tablosu da event sourcing değildir.
- **Paket notu:** MediatR v13+ lisans şartları ve license key mekanizması nedeniyle ihtiyaç doğarsa teknik yararın yanında lisans da yeniden değerlendirilecek.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-006.

## D-011 — Birleşik mimari pattern seti

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** Deployment ve modül sınırında modular monolith; bağımlılık yönünde Clean/Hexagonal ilkeler; modül içinde use-case odaklı Vertical Slice; karmaşık domainlerde seçici tactical DDD kullanılacak.
- **HTTP:** İnce Minimal API endpoint'leri ve modül route group'ları kullanılacak. Endpoint iş kuralı taşımayacak.
- **Persistence:** Modül başına ayrı `DbContext`, SQL şeması ve migration geçmişi bulunacak. Basit handler'lar kendi modül `DbContext`'ini doğrudan kullanabilecek.
- **Proje yapısı:** Her modül başlangıçta tek projede `Domain`, `Features`, `Infrastructure` ve kayıt noktasına ayrılacak. Her modül için dört ayrı Clean Architecture projesi oluşturulmayacak.
- **Soyutlama kuralı:** Generic repository eklenmeyecek. Spesifik repository veya port ancak karmaşık aggregate persistence'ı ya da gerçek dış adapter/test-double ihtiyacı kanıtlandığında eklenecek.
- **Neden:** Domain ve veri sahipliği sınırlarını korurken tek geliştiricinin 2–3 aylık MVP'sinde proje, interface ve mapping yükünü sınırlamak.
- **Yeniden değerlendirme:** Modül karmaşıklığı, ekip büyüklüğü, bağımsız deployment veya ölçülmüş okuma/entegrasyon gereksinimi mevcut sınırı yetersiz kıldığında.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-007.

## D-012 — Repository mühendislik temeli

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** FLOW-001 kapsamında `global.json`, `Directory.Build.props`, `Directory.Packages.props` ve `.editorconfig` ile repository genelinde SDK, build, analiz, paket sürümü ve kod biçimi politikası kurulacak.
- **API temeli:** ASP.NET Core'un birinci taraf OpenAPI üretimi yalnız Development ortamında açılacak. Composition root ortak Problem Details, exception handling ve gövdesiz hata durumlarını standartlaştıracak.
- **Frontend organizasyonu:** React kodu `features/auth`, `features/customers` ile küçük `app` ve `shared` alanları etrafında düzenlenecek.
- **Sınır:** Analyzer/style katılığı kontrollü başlayacak; açıklanmayan geniş “all rules” seti ve ek Swagger UI paketi başlangıçta eklenmeyecek.
- **Neden:** Projeler arasında sessiz ayar ve paket sürümü ayrışmasını önlemek; API sözleşmesi ve hata davranışını ilk dilimden görünür kılmak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-008.

## D-013 — Teknik kimlik, zaman ve audit politikası

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Kimlik:** Entity teknik anahtarları `Guid` olacak; SQL Server için elle UUID v7 yerine EF Core SQL Server provider'ın `ValueGeneratedOnAdd` sequential GUID üretimi kullanılacak.
- **Zaman:** Olay anları ve audit alanları UTC, sıfır offset'li `DateTimeOffset` olarak saklanacak; uygulama zamanı DI üzerinden `TimeProvider` ile üretilecek.
- **Gösterim:** `Europe/Istanbul` kullanıcı gösterimi ve yerel planlama girdilerinin yorumlanması içindir; storage zamanı UTC kalır.
- **Audit aktörü:** Customer ve Location için `CreatedAtUtc`, `CreatedByUserId`, `LastModifiedAtUtc`, `LastModifiedByUserId` tutulacak. Kullanıcı ID'leri scalar değer olacak; Customers ile Identity tabloları arasında foreign key kurulmayacak.
- **Concurrency:** Create yarışlarını SQL unique constraint koruyacak. `rowversion` ilk gerçek update use case'i geldiğinde değerlendirilecek.
- **Neden:** ERP izlenebilirliğini ve test edilebilir zamanı baştan korurken SQL Server'a uygun kimlik üretmek ve modül persistence bağımlılığı oluşturmamak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-008.

## D-014 — İlk CI kapısı

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** İlk yerel backend ve frontend build'i yeşil olduktan sonra FLOW-001 kapsamında GitHub Actions eklenecek.
- **Başlangıç kontrolleri:** Backend restore/build/test ile frontend clean install/lint/test/build.
- **Sınır:** Yerelde geçmeyen akış CI'a taşınmayacak; deployment yapılmayacak ve repository secret'ı eklenmeyecek.
- **Neden:** İlk dilimden itibaren tekrarlanabilirliği korumak, fakat henüz çalışmayan iskelet üzerinde CI YAML hata ayıklama maliyeti oluşturmamak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-008.

## D-015 — .NET test framework ve platformu

- **Tarih:** 2026-06-28
- **Durum:** Kabul edildi
- **Karar:** FlowLogix .NET unit ve integration test projelerinde MSTest SDK ve Microsoft.Testing.Platform kullanacak.
- **Sürüm/runner:** `MSTest.Sdk` sürümü `global.json` içindeki `msbuild-sdks` alanında exact `4.1.0` olarak; .NET 10 test runner'ı `test.runner = Microsoft.Testing.Platform` olarak repository genelinde tanımlanacak.
- **Kural:** Aynı solution koşusunda VSTest ve MTP tabanlı test projeleri karıştırılmayacak.
- **Neden:** .NET 10'da birinci taraf ve güncel test hattını kullanmak; runner/platform extension sürümlerini MSTest SDK ile hizalamak; unit ve integration test altyapısını tek modelde tutmak.
- **Alternatif:** xUnit v3 + MTP güçlü ve geçerli bir alternatiftir; ancak FlowLogix için ekosistem geçiş hareketliliğine karşı birinci taraf, tek SDK hattı tercih edildi.
- **Yeniden değerlendirme:** Gerekli bir test aracı MTP'yi desteklemezse veya doğrulanmış bir framework özelliği eksik kalırsa.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-009.

## D-016 — Mimari doğruluk ve erteleme disiplini

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi
- **Karar:** Bir mekanizma yalnız maliyetli olduğu için ertelenmeyecek. Veri/modül sınırı, dependency direction, güvenlik, audit, transaction ve kalıcı veri kuralları ilgili ilk kullanım öncesinde kurulacak.
- **Erteleme kuralı:** “Sonra bakarız” yeterli değildir. Ertelenen her konu çözdüğü problem, benimseme tetikleyicisi ve yeniden değerlendirme noktasıyla kaydedilecek.
- **Composition contract:** Onaylanan tek-proje-modül yapısında Identity ve Customers kendi service-registration ve endpoint-mapping yüzeylerini taşıyacak. Bu nedenle `Microsoft.AspNetCore.App` framework reference ve public modül giriş noktaları FLOW-001 içinde kurulacak.
- **Domain koruması:** Framework reference assembly seviyesinde olsa da `Domain` altındaki kod ASP.NET Core veya EF Core tipi kullanmayacak. Gerçek domain tipleri oluşunca bu kural architecture test kapısında yeniden değerlendirilecek.
- **Alternatifler:** Endpoint'leri API projesinde toplamak modül sahipliğini zayıflatır; her teknik katmanı ayrı projeye bölmek ise D-011'de seçilmeyen tam katman-proje modeline geçiş olur.
- **İletişim ayrımı:** gRPC ve broker/event-driven iletişim, ayrı süreçler arasındaki iş iletişimi seçenekleridir; aynı process içindeki DI/endpoint composition contract'ının veya Domain–Presentation katman izolasyonunun alternatifi değildir.
- **Fiziksel ayrım kapısı:** Domain katmanında framework bağımlılığı ihlali, bağımsız yeniden kullanım/deployment, ekip sahipliği veya tek assembly'de korunamayan karmaşıklık kanıtlanırsa ilgili modülün Domain/Application/Presentation projelerine ayrılması değerlendirilir; bütün modüller yalnız simetri için bölünmez.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-010.

## D-017 — Ortak modül omurgası, ihtiyaca göre pattern yoğunluğu

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi; D-011 ve D-016'nın uygulama ayrıntısı
- **Karar:** Bütün modüller aynı composition, veri sahipliği, vertical-slice, HTTP hata, authorization ve test standartlarına uyacak; iç domain pattern'leri iş karakterine göre seçilecek.
- **Öğrenme kuralı:** Pattern çeşitliliği gerçek bir problemi görünür kıldığı modülde öğretilecek. Sırf projede farklı teknoloji/pattern bulunsun diye üretim yapısına gereksiz mekanizma eklenmeyecek.
- **Kalibrasyon:** Customers sade ana veri modeli; Orders aggregate/value object; Shipments zengin durum/transaction modeli; Exceptions policy/rule kataloğu; Reporting read model/projection; Notifications process içi event/job modeliyle başlayacak.
- **Event evrimi:** Zorunlu tutarlılık önce aynı transaction; bağımsız yan etki process içi event; dayanıklı dış teslimat outbox; bağımsız tüketici/ölçek broker; bağımsız deployment ve veri sahipliği kanıtlanırsa mikroservis.
- **Fiziksel proje ayrımı:** İlgili modülün domain karmaşıklığı veya framework ihlali kanıtlanırsa yalnız o modül ayrıca ayrılabilir; bütün modüller simetri için zorla aynı proje sayısına çıkarılmaz.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-011.

## D-018 — CI ve aşamalı statik analiz

- **Tarih:** 2026-06-29
- **Durum:** GitHub Actions tamamlandı ve uzak koşuda doğrulandı; SonarQube Cloud aktivasyonu kullanıcı onayı/account işlemi bekliyor
- **CI kararı:** Frontend scaffold ve lockfile sonrasında, yerel backend/frontend komutlarını `pull_request` ve `main` push üzerinde çalıştıran GitHub Actions workflow'u eklendi ve GitHub-hosted Ubuntu runner'da doğrulandı.
- **Güvenlik:** Workflow varsayılan read-only permission kullanacak, `pull_request_target` kullanmayacak, third-party action'lar doğrulanmış full commit SHA ile pinlenecek ve secret tracked dosyaya yazılmayacak.
- **Action güncellemeleri:** Tam commit kimlikleri haftalık Dependabot `github-actions` kontrolüyle izlenecek; en fazla üç ayrı güncelleme PR'ı açılacak. Güncellemeler gruplanmayacak veya otomatik merge edilmeyecek.
- **Sonar önerisi:** Public FlowLogix repository için self-hosted SonarQube Server yerine SonarQube Cloud Free kullanılacak; server/DB/backup/upgrade işletim yükü alınmayacak.
- **Uyumluluk:** TypeScript 6 kararlı kalacak. Sonar resmi desteği TS6'yı kapsayana kadar ilk analiz C# ile sınırlandırılacak; analiz aracı uğruna frontend 5.9'a düşürülmeyecek.
- **Coverage:** Gerçek testler oluşmadan coverage quality gate bloklaması yapılmayacak. Coverage üretimi Sonar'ın işi değildir; uygun test aracıyla rapor üretildikten sonra import edilecek.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-012.

## D-019 — Frontend foundation araçları

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi
- **Runtime/build:** Node `24.16.0`, npm `11.13.0`, official `create-vite@9.1.0` `react-ts` template, Vite `8.1.0`, React/DOM `19.2.7` ve TypeScript `6.0.3`.
- **Routing:** Önceki React Router 7 planı, yeni proje için `react-router@8.0.1` Declarative Mode olarak güncellendi. Node/React/Vite minimumları mevcut stack ile tam uyumludur; `react-router-dom` kullanılmayacak.
- **Server state:** `@tanstack/react-query@5.101.2`; Redux/Zustand başlangıçta yok.
- **Test/lint:** Vitest `4.1.9`, Testing Library React `16.3.2`, Testing Library DOM `10.4.1`, user-event `14.6.1`, jest-dom `6.9.1`, jsdom `29.1.1`; ESLint `10.6.0`, typescript-eslint `8.62.0` ve Query ESLint plugin `5.101.2`.
- **Sınır:** React Compiler, Router Framework/Data Mode, Axios ve form/state kütüphanesi kanıtlanmış ihtiyaç olmadan eklenmeyecek.
- **Paket politikası:** Exact çözüm `package-lock.json` ile korunacak ve CI `npm ci` kullanacak. Node/npm pin'i frontend config aşamasında repository'ye eklenecek.
- **TLS:** `strict-ssl` kapatılmayacak. Yerel Windows CA zinciri için npm komutları process-level `NODE_OPTIONS=--use-system-ca` ile çalıştırılacak; repository'ye CA/secret yazılmayacak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-013.

## D-020 — Frontend mimarisi ve HTTP politikası

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi
- **Mimari:** React kodu `app`, iş kabiliyeti odaklı `features` ve yalnız gerçekten ortak parçalar için `shared` sınırlarını kullanacak. Boş klasör ordusu veya yatay `components/services/hooks` deposu oluşturulmayacak.
- **State sahipliği:** URL state React Router'a, server state TanStack Query'ye, kısa ömürlü form/UI state React'e ait olacak. Aynı veri birden fazla state katmanına kopyalanmayacak.
- **HTTP istemcisi:** Axios başlangıç dependency'si olmayacak. Native `fetch` üzerinde same-origin cookie, antiforgery, JSON, Problem Details, `204`, HTTP hata ve `AbortSignal` davranışını merkezileştiren tipli bir `shared/api` istemcisi kurulacak.
- **API sınırı:** Ortak transport/hata politikası `shared/api`; endpoint ve DTO bilgisi ilgili feature içinde kalacak. React bileşeni doğrudan `fetch` çağırmayacak.
- **React disiplini:** Saf/immutable bileşenler, hook kuralları, gereksiz Effect ve duplicate state yasağı, semantic HTML/accessibility ve davranış odaklı testler ilk ekrandan uygulanacak.
- **Yeniden değerlendirme:** Upload progress, birden çok dış API/adapter veya gerçek interceptor ihtiyacı Axios'u; karmaşık tekrar eden form davranışı form kütüphanesini; kanıtlanmış global client-state ihtiyacı ayrı state kütüphanesini gündeme getirir.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-014.

## D-021 — Frontend runtime ve dependency sürüm politikası

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi
- **Node:** Repository kökü `.nvmrc` ile `24.16.0` sürümünü pinleyecek; gelecekte CI aynı dosyayı okuyacak.
- **npm:** `package.json` `packageManager: npm@11.13.0` taşıyacak.
- **Uyumluluk:** `engines`, Node `>=24.16.0 <25` ve npm `>=11.13.0 <12` destek hattını bildirecek. Exact yerel/CI baseline ile uyumluluk aralığı birbirinden ayrılacak.
- **Dependency:** Deploy edilen uygulamanın bütün direct dependencies/devDependencies girdileri exact olacak; transitive ağaç tracked `package-lock.json` ile kilitlenecek.
- **Kurulum:** Yeni paket için kontrollü `npm install --save-exact`; temiz yerel/CI doğrulama için salt-okunur `npm ci` kullanılacak.
- **Güncelleme:** Paket güncellemesi ayrı değişiklik olarak incelenecek ve lint/test/build kapılarından geçecek.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-015.

## D-022 — Type-aware ve sorumluluk odaklı frontend lint

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi
- **TypeScript:** Mevcut syntax kurallarına `recommendedTypeChecked` ve Project Service eklenecek; lint'in type bilgisi kullanması kabul edilen küçük performans maliyetidir.
- **Query:** `@tanstack/eslint-plugin-query@5.101.2` resmi `flat/recommended` profili kullanılacak; strict profil gerçek Query kodu ve ekip deneyimi oluşmadan açılmayacak.
- **Test:** `eslint-plugin-testing-library@7.16.2` yalnız test dosyalarında React profiliyle uygulanacak.
- **Uyumsuzluk:** `eslint-plugin-jest-dom@5.5.0`, ESLint 10 peer desteği vermediği için zorla kurulmayacak; uyumlu release kapısında yeniden incelenecek.
- **Kural:** Plugin sayısı kalite göstergesi değildir. Her plugin yalnız sahip olduğu framework davranışına ve uygun dosya kapsamına uygulanacak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-016.

## D-023 — TypeScript strict application ve tool config

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi
- **Kapsam:** App ve Node tool TSConfig'lerinde `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noUncheckedSideEffectImports` ve `forceConsistentCasingInFileNames` etkin olacak.
- **Browser tipleri:** App config `ES2023`, `DOM` ve `DOM.Iterable` kullanacak.
- **Ayrım:** App kaynakları `moduleResolution: bundler`; Node tarafından çalışan Vite/Vitest config'leri `module: nodenext` kullanmayı sürdürecek.
- **Dependency declarations:** `skipLibCheck: true`, uygulama type-check'ini değil yalnız dependency `.d.ts` iç kontrolünü atladığı için korunacak.
- **Güncelleme riski:** `strict` ailesi yeni TypeScript sürümünde genişleyebilir; exact TypeScript güncellemesi ayrı taskta lint/test/build ile incelenecek.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-017.

## D-024 — Trusted HTTPS development proxy

- **Tarih:** 2026-06-29
- **Durum:** Kabul edildi
- **Proxy:** Browser yalnız Vite origin'ine `/api` isteği yapacak; Vite development proxy isteği `https://localhost:7185` ASP.NET Core hedefine aktaracak.
- **TLS:** ASP.NET Core development certificate Windows Current User store'da trusted olacak; Vite proxy sertifika doğrulamasını kapatmayacak.
- **Node CA:** Frontend project `.npmrc`, mevcut `NODE_OPTIONS` değerini koruyup `--use-system-ca` ekleyecek; ek `cross-env` dependency'si veya tracked certificate olmayacak.
- **npm policy:** Aynı `.npmrc` gelecekte `save-exact=true` ve `engine-strict=true` ile D-021 sürüm politikasını mekanik olarak destekleyecek.
- **Sınır:** Bu yalnız development davranışıdır. Production'da ASP.NET Core frontend çıktısını same-origin sunacak; Vite proxy bulunmayacak.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-018.

## D-025 — Material UI tabanlı ERP frontend tasarım sistemi

- **Tarih:** 2026-06-30
- **Durum:** Kabul edildi
- **Core:** `@mui/material@9.1.2`, `@emotion/react@11.14.0` ve `@emotion/styled@11.14.1` exact sürümleri kullanılacak.
- **Neden:** Veri/form yoğun ERP arayüzünde erişilebilir component davranışı, tema tutarlılığı ve tek geliştiricinin MVP teslim hızı; React 19 ve TypeScript 6 hattıyla uyumluluk.
- **Tema:** Root composition'da ThemeProvider + CssBaseline; CSS variables ve sistem font stack. Marka/layout değerleri theme token'larında tutulacak.
- **Stil sınırı:** Yerel ve tek seferlik düzen için `sx`; tekrar eden ürün davranışı için theme override veya `shared/ui`. Rastgele ortak component ve dağınık raw renk/spacing üretilmeyecek.
- **Paket sınırı:** Icons, MUI X Data Grid ve date pickers ilk gerçek kullanım öncesinde ayrıca değerlendirilecek. Data Grid Community MIT, Pro/Premium ticari sınırı gözden kaçırılmayacak.
- **Alternatifler:** Plain CSS/CSS Modules; Tailwind + açık component kodu; Ant Design; Mantine.
- **Yeniden değerlendirme:** MUI erişilebilirlik/customization engeli, ölçülmüş bundle sorunu veya Community grid'in zorunlu use-case'i karşılamaması.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-019.

## D-026 — Operasyon Kontrol Kulesi görsel kimliği

- **Tarih:** 2026-06-30
- **Durum:** Kabul edildi
- **Kimlik:** Koyu operasyon rayı, açık çalışma yüzeyi, yüksek bilgi yoğunluğu ve ürün davranışından türeyen durum/sapma görselleri kullanılacak.
- **Ürün imzaları:** Planned/actual timeline dili, exception severity+age+action, açıklanabilir atama katkıları, belge tamlığı ve kârlılık sapması.
- **Erişilebilirlik:** Durum yalnız renkle anlatılmayacak; metin/ikon/şekil eşlik edecek. Hareket reduced-motion tercihini izleyecek.
- **Kaçınılacaklar:** Generic admin-template kopyası, dekoratif fake KPI, yoğun glassmorphism, sürekli animasyon ve rastgele gradient.
- **Araç kapısı:** Phosphor ilk gerçek icon ihtiyacında; Motion gerçek transition ihtiyacında; MUI Charts gerçek KPI sözleşmesinde; MapLibre harita/tile kararıyla; Data Grid gerçek liste use-case'inde değerlendirilir.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-020.

## D-027 — ESLint'ten ayrı Prettier format kapısı

- **Tarih:** 2026-06-30
- **Durum:** Kabul edildi
- **Formatter:** Frontend biçimlendirmesi proje-yerel ve exact `prettier@3.9.1` ile yapılacak.
- **Sorumluluk ayrımı:** ESLint olası kod ve framework kullanım hatalarını; Prettier yalnız yerleşim, girinti ve satır kırılımını denetleyecek. Prettier ESLint içinde plugin olarak çalıştırılmayacak.
- **Stil:** `.editorconfig` TS/TSX için 2 boşluk ve LF politikasının kaynağıdır. Prettier config ayrıca semicolonsuz yazım, tek tırnak, trailing comma ve 100 karakter satır genişliğini tanımlar.
- **Komutlar:** `npm run format` dosyaları yazar; `npm run format:check` dosyaları değiştirmeden yerel/CI kapısı olarak denetler.
- **Alternatif:** Biome hızlı ve bütünleşik bir formatter/linter'dır; mevcut type-aware ESLint, React, Query ve Testing Library lint hattını tekrar eden ikinci bir toolchain oluşturacağı için seçilmedi.
- **Yeniden değerlendirme:** Frontend ölçeği büyüyüp ölçülmüş formatter/lint süresi sorun olursa Biome/Oxlint geçişi tek parça toolchain kararı olarak incelenir.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-021.

## D-028 — Declarative nested route ve kalıcı uygulama kabuğu

- **Tarih:** 2026-07-05
- **Durum:** Kabul edildi
- **Route sahibi:** `app` katmanı `<Routes>/<Route>` ile yalnız URL–ekran composition'ını yapacak; iş davranışı ve endpoint bilgisi feature sayfalarında kalacak.
- **Layout:** Path taşımayan bir layout route, `AppShell` bileşenini URL'ye ek segment koymadan operasyon sayfalarına uygulayacak. Eşleşen çocuk sayfa shell içindeki `<Outlet>` konumunda render edilecek.
- **Mod:** Mevcut React Router Declarative Mode korunacak. TanStack Query server state sahibi olduğu ve loader/action ihtiyacı bulunmadığı için Data Router veya Framework Mode'a geçilmeyecek.
- **Navigasyon:** İlk shell navigasyonu için MIT lisanslı, sıfır dependency'li `@phosphor-icons/react@2.1.10` kullanılacak. Geliştirme sırasında binlerce modüllük barrel işleme riskini azaltmak için ikonlar direct path'ten alınacak.
- **Sınır:** Layout yalnız kalıcı navigasyon, ürün kimliği ve içerik yerleşimini taşır; sahte KPI, müşteri/sevkiyat iş kuralı veya API çağrısı içermez.
- **Yeniden değerlendirme:** Route-level loader/action, automatic code splitting veya route error-boundary ihtiyacı kanıtlanırsa Data Mode; büyük route sayısı oluşursa lazy route sınırları ayrıca incelenir.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-022.

## D-029 — Ölçülü ve erişilebilir arayüz hareketi

- **Tarih:** 2026-07-05
- **Durum:** Kabul edildi
- **Karar:** İlk uygulama kabuğundaki kısa giriş, bağlantı çizimi ve kart üzerine gelme hareketleri mevcut Emotion/CSS altyapısıyla uygulanacak; yalnız görsel etki için yeni animasyon dependency'si eklenmeyecek.
- **Sınır:** Sürekli dönen, yanıp sönen veya operasyon bilgisinin okunmasını geciktiren hareket kullanılmayacak. Hareket, bilgi hiyerarşisini destekleyecek ve ürün davranışının yerine geçmeyecek.
- **Erişilebilirlik:** İşletim sistemi veya tarayıcıda azaltılmış hareket isteyen kullanıcılar için `prefers-reduced-motion: reduce` altında giriş ve geçiş hareketleri kapatılacak.
- **Yeniden değerlendirme:** Sayfalar arası çıkış/giriş koordinasyonu, sürükleme, karmaşık yerleşim geçişi veya CSS ile güvenilir biçimde yönetilemeyen gerçek ürün etkileşimi oluşursa Motion ayrıca değerlendirilecek.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-023.

## D-030 — Ücretsiz ilk demo deployment hedefi

- **Tarih:** 2026-07-05
- **Durum:** Araştırma önerisi olarak saklandı; 2026-07-08 kullanıcı kararıyla uygulaması sonraki fazlara ertelendi
- **Öneri:** İlk demo deployment zamanı geldiğinde Azure App Service Free F1 üzerinde Windows code-only .NET 10 uygulaması olarak yapılması önerilir. React production çıktısı ASP.NET Core tarafından sunulacak; API ve frontend aynı origin'i koruyacak. Bu öneri bugün kaynak açma, kurulum, abonelik veya secret oluşturma onayı değildir.
- **Veritabanı yönü:** İlk gerçek Identity migration'ına kadar bulut veritabanı oluşturulmayacak. Gerektiğinde aynı sağlayıcıdaki Azure SQL Database Free offer kullanılacak ve kota aşımında ücretlendirme yerine ay sonuna kadar otomatik durma seçilecek.
- **Deployment güvenliği:** İlk akış elle tetiklenecek. GitHub–Azure bağlantısında uzun ömürlü publish profile yerine OIDC/federated identity tercih edilecek. Connection string, seed parolası ve diğer production ayarları repository'de tutulmayacak.
- **Migration:** Production migration uygulama başlangıcında otomatik çalışmayacak; üretilen SQL incelendikten sonra açık deployment adımıyla uygulanacak.
- **Alternatifler:** Azure Container Apps Consumption teknik olarak ücretsiz kota ve scale-to-zero sağlar fakat Docker, image registry, revision ve Data Protection tasarımını erkenden getirir. Render Free kolaydır fakat servis uykuya geçer, .NET için Docker gerekir ve ücretsiz PostgreSQL 30 gün sonra sona erer; mevcut SQL Server kararını bozar veya iki sağlayıcıyı birleştirir.
- **Sınır:** App Service F1 yalnız demo/öğrenme hedefidir; günlük 60 CPU dakikası, 165 MB bant genişliği, 1 GB depolama, tek instance ve custom-domain yokluğu gerçek işletme üretimi için yeterli kabul edilmez.
- **Yeniden değerlendirme:** Deployment tekrar aktif faza alındığında güncel ücretsiz kota, otomatik ücret davranışı, veri kalıcılığı, silme/geri alma adımları ve GitHub OIDC ayrıntıları yeniden doğrulanır. Gerçek kullanıcı, özel alan adı, SLA, daha yüksek trafik, deployment slot veya kesintisiz çalışma gerektiğinde ücretli App Service planı ya da ölçülmüş ihtiyaçla Container Apps değerlendirilir.
- **Araştırma:** `docs/RESEARCH.md` içindeki R-024.
